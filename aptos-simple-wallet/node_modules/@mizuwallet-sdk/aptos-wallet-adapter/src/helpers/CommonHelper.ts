import { Mizu } from '@mizuwallet-sdk/core';
import {
  Base64,
  CALLBACK_MESSAGE_STATUS,
  CallbackParam,
  SESSION_MESSAGE_FROM,
  SESSION_MESSAGE_TYPE,
  SessionCrypto,
  SessionListenerLong,
  SessionMessage,
  SessionPost,
} from '@mizuwallet-sdk/protocol';
import { MZ_MSG_TYPE } from '../config';
import { openTelegramLink } from '../utils';
import ActionHelper from '../utils/ActionHelper';

const MZ_STORAGE_ADDRESS = 'mizuwallet-address';

export class CommonHelper {
  manifestURL: string = '';
  miniAppURL: string = '';
  origin: string = '';
  mizuClient: Mizu | null = null;
  network: string = '';

  constructor() {}

  async startWebChannel(args: {
    url: string;
    metadata: any;
    returnKey: string;
    address?: string;
    redirectURL?: string;
  }) {
    // App receiver
    const sc = new SessionCrypto();
    const nonce = Date.now().toString();

    // Wallet receiver
    const toWalletSession = await SessionCrypto.generateKeyPairByString(
      `${args.address || ''}+${nonce}`,
    );
    // Encode wallet receiver
    const encodeStr = Base64.encode(toWalletSession, true);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('network', this.network);
    urlSearchParams.append('sessionId', sc.sessionId);
    urlSearchParams.append('nonce', nonce.toString());
    urlSearchParams.append('k', encodeStr);

    if (args.redirectURL) {
      urlSearchParams.append('redirect_url', args.redirectURL);
    }

    if (document.querySelector('.mizu-wallet-frame')) {
      document.querySelector('.mizu-wallet-frame')?.remove();
    }

    // console.log('mizu listen:', toWalletSession.publicKey);
    // console.log('sdk listen at:', sc.sessionId);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'mizu-wallet-frame');
    iframe.setAttribute('src', `${this.origin}/walletv2/${args.url}?${urlSearchParams.toString()}`);
    document.body.appendChild(iframe);

    // tell wallet about transaction by wallet receiver
    const { ctrl: postCtrl } = await SessionPost({
      to: toWalletSession.publicKey,
      ttl: 300,
      content: new SessionMessage({
        from: SESSION_MESSAGE_FROM.THIRD_PARTY,
        type: SESSION_MESSAGE_TYPE.DATA,
        // put all data here
        body: {
          manifestURL: this.manifestURL,
          address: window?.localStorage.getItem(MZ_STORAGE_ADDRESS),
          ...args.metadata,
        },
        nonce,
      }),
    });

    // wait for wallet response
    return new Promise(async (resolve, reject) => {
      const { ctrl: listenCtrl } = await SessionListenerLong({
        keypair: sc.stringifyKeypair(),
        callback: (cbArgs: CallbackParam) => {
          const { message, status } = cbArgs;

          // Only accept message from wallet
          if (message?.from === SESSION_MESSAGE_FROM.MIZU_PC) {
            // handle error from wallet
            if (status === CALLBACK_MESSAGE_STATUS.ERROR) {
              iframe.parentNode?.removeChild(iframe);
              postCtrl.abort();
              listenCtrl.abort();
              reject(cbArgs.error);
              return;
            }

            if (message?.type == SESSION_MESSAGE_TYPE.CLOSE) {
              iframe.parentNode?.removeChild(iframe);
              postCtrl.abort();
              listenCtrl.abort();
              resolve({});
              return;
            }

            if (message?.type == SESSION_MESSAGE_TYPE.CANCEL) {
              iframe.parentNode?.removeChild(iframe);
              postCtrl.abort();
              listenCtrl.abort();
              reject('User Canceled');
              return;
            }

            if (message.type === SESSION_MESSAGE_TYPE.FULFILLED) {
              iframe.parentNode?.removeChild(iframe);
              postCtrl.abort();
              listenCtrl.abort();
              if (args.returnKey) {
                resolve({
                  [args.returnKey]: message.body?.[args.returnKey],
                });
              } else {
                resolve({});
              }

              return;
            }
          }
        },
      });
    });
  }

  async startChannel(args: {
    buildAction: {
      actions: string;
    };
    metadata: any;
    returnKey: string;
    isAddressRequired?: boolean;
  }) {
    const address = window?.localStorage.getItem(MZ_STORAGE_ADDRESS);

    if ((address && args.isAddressRequired) || !args.isAddressRequired) {
      // App receiver
      const sc = new SessionCrypto();
      const nonce = Date.now().toString();

      // Wallet receiver
      const toWalletSession = await SessionCrypto.generateKeyPairByString(
        `${address || ''}+${nonce}`,
      );
      // Encode wallet receiver
      const encodeStr = Base64.encode(toWalletSession, true);

      // pass app receiver & wallet receiver to wallet
      const startapp = ActionHelper.buildAction({
        prefix: 'R_',
        action: args.buildAction.actions,
        params: [sc.sessionId, nonce, encodeStr],
      });

      openTelegramLink(`${this.miniAppURL}?startapp=${startapp}`);

      // tell wallet about transaction by wallet receiver
      const { ctrl: postCtrl } = await SessionPost({
        to: toWalletSession.publicKey,
        ttl: 300,
        content: new SessionMessage({
          from: SESSION_MESSAGE_FROM.THIRD_PARTY,
          type: SESSION_MESSAGE_TYPE.DATA,
          // put all data here
          body: {
            manifestURL: this.manifestURL,
            address: window?.localStorage.getItem(MZ_STORAGE_ADDRESS),
            ...args.metadata,
          },
          nonce,
        }),
      });

      // wait for wallet response
      return new Promise(async (resolve, reject) => {
        const { ctrl: listenCtrl } = await SessionListenerLong({
          keypair: sc.stringifyKeypair(),
          callback: (cbArgs: CallbackParam) => {
            const { message, status } = cbArgs;

            // Only accept message from wallet
            if (message?.from === SESSION_MESSAGE_FROM.MIZU) {
              // handle error from wallet
              if (status === CALLBACK_MESSAGE_STATUS.ERROR) {
                postCtrl.abort();
                listenCtrl.abort();
                reject(cbArgs.error);
                return;
              }

              if (message?.type == SESSION_MESSAGE_TYPE.CANCEL) {
                postCtrl.abort();
                listenCtrl.abort();
                reject('User Canceled');
                return;
              }

              if (message.type === SESSION_MESSAGE_TYPE.FULFILLED) {
                postCtrl.abort();
                listenCtrl.abort();
                if (args.returnKey) {
                  resolve({
                    [args.returnKey]: message.body?.[args.returnKey],
                  });
                } else {
                  resolve({});
                }
                return;
              }
            }
          },
        });
      });
    } else {
      throw new Error(`${MZ_MSG_TYPE.TRANSACTION} No address found`);
    }
  }
}

