import { Deserializer, Network, PublicKey, RawTransaction, Serializer, TransactionPayload } from '@aptos-labs/ts-sdk';
import { AccountInput } from '../shared';
export interface SignTransactionRequestArgs {
    expirationSecondsFromNow?: number;
    expirationTimestamp?: number;
    feePayer?: AccountInput;
    gasUnitPrice?: number;
    maxGasAmount?: number;
    network: Network;
    payload: TransactionPayload;
    secondarySigners?: AccountInput[];
    sender?: AccountInput;
    sequenceNumber?: number | bigint;
}
export declare function serializeSignTransactionRequestArgs(serializer: Serializer, value: SignTransactionRequestArgs): void;
export declare function deserializeSignTransactionRequestArgs(deserializer: Deserializer): SignTransactionRequestArgs;
export interface SignTransactionRequestArgsWithTransaction {
    feePayer?: AccountInput;
    secondarySigners?: AccountInput[];
    senderPublicKey?: PublicKey;
    transaction: RawTransaction;
}
export declare function normalizeSignTransactionRequestArgs(args: SignTransactionRequestArgsWithTransaction): SignTransactionRequestArgs;
//# sourceMappingURL=SignTransactionRequestArgs.d.ts.map