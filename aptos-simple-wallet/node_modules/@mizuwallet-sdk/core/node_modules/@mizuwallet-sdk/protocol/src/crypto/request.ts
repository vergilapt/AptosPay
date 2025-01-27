import { fetchEventSource } from '@microsoft/fetch-event-source';
import { SessionMessage } from '../lib/SessionMessage';
import { hexToByteArray, toHexString } from '../utils';
import { KeyPair, SessionCrypto } from './session-crypto';

const ctrl = new AbortController();
const SSE_HOST = 'https://bridge.mz.xyz';

const MESSAGE_TYPE = {
  CONNECT: '[MizuWallet SSE Connect]',
};

export enum CALLBACK_MESSAGE_STATUS {
  SUCCESS = 0,
  ERROR = 1,
}

export enum SESSION_MESSAGE_FROM {
  MIZU = 0,
  THIRD_PARTY = 1,
}

export enum SESSION_MESSAGE_TYPE {
  START,
  DATA,
  FULFILLED,
  REJECT,
  CANCEL,
}

export const abortSession = () => {
  ctrl.abort();
};

export interface CallbackParam {
  status: CALLBACK_MESSAGE_STATUS;
  message?: SessionMessage;
  error?: Error | string;
}

/**
 * Sent Message to Bridge
 *
 * @param args.to receiver
 * @param args.ttl time to live
 * @param args.content message content
 */
export const SessionPost = async (args: {
  to: string | number;
  ttl: string | number;
  content: any;
  keypair?: KeyPair;
}) => {
  const query = new URLSearchParams();
  const sc = new SessionCrypto(args.keypair);

  /**
   * Construct query
   */
  query.append('client_id', sc.sessionId.toString());
  query.append('to', args.to.toString());
  query.append('ttl', args.ttl.toString());

  // Stringify content
  const contentString = JSON.stringify(args.content);
  // Convert receiver public key to byte array
  const publicKeyByteArray = hexToByteArray(args.to.toString());
  // Encrypt content by receiver public key & sender's secret key
  const encryptedContent = sc.encrypt(contentString, publicKeyByteArray);
  // Convert encrypted content to hex string for sending
  const bodyHexString = toHexString(encryptedContent);

  // Send Message to bridge
  await fetchEventSource(`${SSE_HOST}/bridge/message?${query.toString()}`, {
    method: 'POST',
    openWhenHidden: false,
    headers: {
      Accept: 'text/event-stream',
    },
    onopen(res) {
      if (res.ok && res.status === 200) {
        console.log('Connection made ', res);
        return Promise.resolve();
      }

      console.log('Client side error ', res);
      return Promise.reject();
    },
    onmessage() {
      // console.log(event.data);
    },
    onclose() {
      console.log('Connection closed by the server');
    },
    onerror(err) {
      console.log('There was an error from server', err);
    },
    body: bodyHexString,
    signal: ctrl.signal,
  });
};

/**
 * Listen to the server for message
 *
 * @param args.keypair KeyPair
 * @returns
 */
export const SessionListener = async (args: { keypair: KeyPair }) => {
  // Construct query
  const query = new URLSearchParams();
  query.append('client_id', args.keypair.publicKey.toString());

  return new Promise(async (resolve, reject) => {
    await fetchEventSource(`${SSE_HOST}/bridge/events?${query.toString()}`, {
      openWhenHidden: false,
      onopen(res) {
        if (res.status === 200) {
          console.info(`${MESSAGE_TYPE.CONNECT} Opened`);
          return Promise.resolve();
        }
        console.error(`${MESSAGE_TYPE.CONNECT} Failed to open`);
        return Promise.reject();
      },
      onmessage(ev) {
        try {
          // If data is stringified object
          if (ev.data && ev.data.startsWith('{')) {
            // Parse the data
            const data = JSON.parse(ev.data);

            if (data.message) {
              const sc = new SessionCrypto({
                ...args.keypair,
              });

              const bodyHexString = data.message;
              // Convert the hex string to a byte array
              const encryptedContent = hexToByteArray(bodyHexString);
              // Decrypt the message
              const contentString = sc.decrypt(
                encryptedContent,
                hexToByteArray(data.from.toString()),
              );
              // Parse the content to JSON
              const content = JSON.parse(contentString);
              resolve(content);
            }
          }
        } catch (err: any) {
          console.error(err);
          reject(err);
        }
      },
      signal: ctrl.signal,
    });
  });
};

/**
 * Listen to the server for message forever
 *
 * @param args.keypair KeyPair
 * @param args.nonce to make sure the listener is unique
 * @param args.callback when receive message callback function to handle the message
 * @returns
 */

export const SessionListenerLong = async (args: {
  keypair: KeyPair;
  callback: (arg: CallbackParam) => void;
  nonce?: string;
}) => {
  // Construct query
  const query = new URLSearchParams();
  query.append('client_id', args.keypair.publicKey.toString());

  fetchEventSource(`${SSE_HOST}/bridge/events?${query.toString()}`, {
    openWhenHidden: false,
    onopen(res) {
      if (res.status === 200) {
        console.info(`${MESSAGE_TYPE.CONNECT} Opened`);
        return Promise.resolve();
      }
      console.error(`${MESSAGE_TYPE.CONNECT} Failed to open`);
      return Promise.reject();
    },
    onmessage(ev) {
      try {
        // If data is stringified object
        if (ev.data && ev.data.startsWith('{')) {
          // Parse the data
          const data = JSON.parse(ev.data);

          if (data.message) {
            const sc = new SessionCrypto({
              ...args.keypair,
            });

            const bodyHexString = data.message;
            // Convert the hex string to a byte array
            const encryptedContent = hexToByteArray(bodyHexString);
            // Decrypt the message
            const contentString = sc.decrypt(
              encryptedContent,
              hexToByteArray(data.from.toString()),
            );
            // Parse the content to JSON
            const message = JSON.parse(contentString);

            // if nonce is match or nonce is not provided
            if ((args.nonce && message.nonce == args.nonce) || !args.nonce) {
              args.callback?.({
                status: CALLBACK_MESSAGE_STATUS.SUCCESS,
                message,
              });
            }
          }
        }
      } catch (error: any) {
        console.error(error);
        args.callback?.({
          status: CALLBACK_MESSAGE_STATUS.ERROR,
          error,
        });
      }
    },
    signal: ctrl.signal,
  });
};

