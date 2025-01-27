import { Mizu } from '@mizuwallet-sdk/core';

export declare class CommonHelper {
    manifestURL: string;
    miniAppURL: string;
    origin: string;
    mizuClient: Mizu | null;
    network: string;
    constructor();
    startWebChannel(args: {
        url: string;
        metadata: any;
        returnKey: string;
        address?: string;
        redirectURL?: string;
    }): Promise<unknown>;
    startChannel(args: {
        buildAction: {
            actions: string;
        };
        metadata: any;
        returnKey: string;
        isAddressRequired?: boolean;
    }): Promise<unknown>;
}
