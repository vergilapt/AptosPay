import { AnyRawTransaction, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { MizuSupportNetwork } from '../config';
import { CommonHelper } from './CommonHelper';

declare class TelegramMiniAppHelper extends CommonHelper {
    /**
     * @param manifestURL
     */
    manifestURL: string;
    miniAppURL: string;
    /**
     *
     * @param args.manifestURL Manifest URL
     */
    constructor(args: {
        manifestURL: string;
        network: MizuSupportNetwork;
    });
    /**
     * Connect
     *
     * Open MizuWallet MiniApp to connect
     * Try to get Address info back
     *
     *
     * @returns
     */
    connect(): Promise<{
        address: any;
        publicKey: any;
    }>;
    disconnect(): void;
    signAndSubmitTransaction(transaction: InputGenerateTransactionPayloadData): Promise<unknown>;
    signTransaction(transaction: AnyRawTransaction): Promise<unknown>;
    signMessage(args: {
        message: string;
        nonce: string;
    }): Promise<unknown>;
}
export default TelegramMiniAppHelper;
