import { Deserializer, Network, Serializer, TransactionPayload } from '@aptos-labs/ts-sdk';
import { type AccountAuthenticatorInput } from '../shared';
export interface SignAndSubmitTransactionRequestArgs {
    expirationTimestamp?: number;
    feePayer?: AccountAuthenticatorInput;
    gasUnitPrice?: number;
    maxGasAmount?: number;
    network: Network;
    payload: TransactionPayload;
}
export declare function serializeSignAndSubmitTransactionRequestArgs(serializer: Serializer, value: SignAndSubmitTransactionRequestArgs): void;
export declare function deserializeSignAndSubmitTransactionRequestArgs(deserializer: Deserializer): SignAndSubmitTransactionRequestArgs;
//# sourceMappingURL=SignAndSubmitTransactionRequestArgs.d.ts.map