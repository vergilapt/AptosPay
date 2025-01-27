import { Signature } from '@aptos-labs/ts-sdk';
import { UserResponse } from '../misc.mjs';

/** Version of the feature. */
type AptosSignMessageVersion = '1.0.0';
/** Name of the feature. */
declare const AptosSignMessageNamespace = "aptos:signMessage";
/** TODO: docs */
type AptosSignMessageFeature = {
    /** Namespace for the feature. */
    [AptosSignMessageNamespace]: {
        /** Version of the feature API. */
        version: AptosSignMessageVersion;
        signMessage: AptosSignMessageMethod;
    };
};
/** TODO: docs */
type AptosSignMessageMethod = (input: AptosSignMessageInput) => Promise<UserResponse<AptosSignMessageOutput>>;
/** TODO: docs */
type AptosSignMessageInput = {
    address?: boolean;
    application?: boolean;
    chainId?: boolean;
    message: string;
    nonce: string;
};
/** TODO: docs */
type AptosSignMessageOutput = {
    address?: string;
    application?: string;
    chainId?: number;
    fullMessage: string;
    message: string;
    nonce: string;
    prefix: 'APTOS';
    signature: Signature;
};

export { AptosSignMessageFeature, AptosSignMessageInput, AptosSignMessageMethod, AptosSignMessageNamespace, AptosSignMessageOutput, AptosSignMessageVersion };
