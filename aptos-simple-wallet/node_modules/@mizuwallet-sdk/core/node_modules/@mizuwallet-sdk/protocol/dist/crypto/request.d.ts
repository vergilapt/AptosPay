import { SessionMessage } from '../lib/SessionMessage';
import { KeyPair } from './session-crypto';

export declare enum CALLBACK_MESSAGE_STATUS {
    SUCCESS = 0,
    ERROR = 1
}
export declare enum SESSION_MESSAGE_FROM {
    MIZU = 0,
    THIRD_PARTY = 1
}
export declare enum SESSION_MESSAGE_TYPE {
    START = 0,
    DATA = 1,
    FULFILLED = 2,
    REJECT = 3,
    CANCEL = 4
}
export declare const abortSession: () => void;
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
export declare const SessionPost: (args: {
    to: string | number;
    ttl: string | number;
    content: any;
    keypair?: KeyPair;
}) => Promise<void>;
/**
 * Listen to the server for message
 *
 * @param args.keypair KeyPair
 * @returns
 */
export declare const SessionListener: (args: {
    keypair: KeyPair;
}) => Promise<unknown>;
/**
 * Listen to the server for message forever
 *
 * @param args.keypair KeyPair
 * @param args.nonce to make sure the listener is unique
 * @param args.callback when receive message callback function to handle the message
 * @returns
 */
export declare const SessionListenerLong: (args: {
    keypair: KeyPair;
    callback: (arg: CallbackParam) => void;
    nonce?: string;
}) => Promise<void>;
