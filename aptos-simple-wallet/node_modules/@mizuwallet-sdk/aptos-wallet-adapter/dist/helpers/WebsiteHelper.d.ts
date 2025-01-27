import { AnyRawTransaction, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { Mizu } from '@mizuwallet-sdk/core';
import { MizuSupportNetwork } from '../config';
import { CommonHelper } from './CommonHelper';

declare class WebsiteHelper extends CommonHelper {
    authCode: string;
    address: string;
    manifestURL: string;
    network: string;
    mizuClient: Mizu;
    provider: any;
    origin: string;
    /**
     *
     * @param args.manifestURL Manifest URL
     */
    constructor(args: {
        manifestURL: string;
        network: MizuSupportNetwork;
        mizuClient: Mizu;
    });
    connect(): Promise<{
        address: any;
        publicKey: any;
    }>;
    disconnect(): Promise<void>;
    signAndSubmitTransaction(transaction: InputGenerateTransactionPayloadData): Promise<any>;
    signTransaction(transaction: AnyRawTransaction): Promise<{
        signature: any;
    }>;
    signMessage(args: {
        message: string;
        nonce: string;
    }): Promise<{
        data: any;
    }>;
}
export default WebsiteHelper;
