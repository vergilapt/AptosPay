import { AccountAuthenticator, Deserializer, RawTransaction, Serializer } from '@aptos-labs/ts-sdk';
export interface SignTransactionResponseArgs {
    authenticator: AccountAuthenticator;
    rawTransaction?: RawTransaction;
}
export declare function serializeSignTransactionResponseArgs(serializer: Serializer, value: SignTransactionResponseArgs): void;
export declare function deserializeSignTransactionResponseArgs(deserializer: Deserializer): {
    authenticator: AccountAuthenticator;
    rawTransaction: RawTransaction | undefined;
};
//# sourceMappingURL=SignTransactionResponseArgs.d.ts.map