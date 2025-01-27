import { Deserializer, Serializer } from '@aptos-labs/ts-sdk';
export interface SignMessageRequestArgs {
    chainId: number;
    message: Uint8Array;
    nonce: Uint8Array;
}
export declare function serializeSignMessageRequestArgs(serializer: Serializer, value: SignMessageRequestArgs): void;
export declare function deserializeSignMessageRequestArgs(deserializer: Deserializer): SignMessageRequestArgs;
//# sourceMappingURL=SignMessageRequestArgs.d.ts.map