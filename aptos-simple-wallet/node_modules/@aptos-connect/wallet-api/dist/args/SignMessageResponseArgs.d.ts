import { Deserializer, Serializer, Signature } from '@aptos-labs/ts-sdk';
export interface SignMessageResponseArgs {
    fullMessage: string;
    signature: Signature;
}
export declare function serializeSignMessageResponseArgs(serializer: Serializer, value: SignMessageResponseArgs): void;
export declare function deserializeSignMessageResponseArgs(deserializer: Deserializer): SignMessageResponseArgs;
//# sourceMappingURL=SignMessageResponseArgs.d.ts.map