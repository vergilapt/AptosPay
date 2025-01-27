import { Serializable, Deserializer, AccountAuthenticator, RawTransaction, EntryFunctionPayloadResponse, MultisigPayloadResponse, TransactionPayload, FeePayerRawTransaction, MultiAgentRawTransaction } from '@aptos-labs/ts-sdk';
import { BCS, TxnBuilderTypes } from 'aptos';

type BcsSerializableV1 = {
    serialize(serializer: BCS.Serializer): void;
};
type BcsDeserializableV1Class<T extends BcsSerializableV1> = {
    deserialize(deserializer: BCS.Deserializer): T;
};
type BcsDeserializableV2Class<T extends Serializable> = {
    deserialize(deserializer: Deserializer): T;
};
/**
 * Check if a value is BCS serializable
 */
declare function isBcsSerializable(value: any): value is BcsSerializableV1 | Serializable;
declare function bcsSerialize(serializable: BcsSerializableV1 | Serializable): string;
declare function bcsDeserialize<T extends Serializable>(deserializableClass: BcsDeserializableV2Class<T>, serializedValue: string): T;

interface SignAndSubmitTransactionResponseArgs {
    hash: string;
}

interface FullMessageFlags {
    address?: boolean;
    application?: boolean;
    chainId?: boolean;
}
interface FullMessageParams {
    address: string;
    application: string;
    chainId: number;
    message: string;
    nonce: string;
}
interface FullMessageResult {
    fullMessage: string;
    prefix: string;
}

type SignMessageResponseArgs = FullMessageParams & FullMessageResult & {
    signature: string;
};

interface SignTransactionWithPayloadResponseArgs {
    accountAuthenticator: AccountAuthenticator;
    rawTxn: RawTransaction;
}
interface SignTransactionWithRawTxnResponseArgs {
    accountAuthenticator: AccountAuthenticator;
}
type SignTransactionResponseArgs = SignTransactionWithPayloadResponseArgs | SignTransactionWithRawTxnResponseArgs;

type EntryFunctionJsonTransactionPayload = EntryFunctionPayloadResponse & {
    type: 'entry_function_payload';
};
type MultisigJsonTransactionPayload = MultisigPayloadResponse & {
    type: 'multisig_payload';
};
type JsonTransactionPayload = EntryFunctionJsonTransactionPayload | MultisigJsonTransactionPayload;

interface TransactionOptions {
    expirationSecondsFromNow?: number;
    expirationTimestamp?: number;
    gasUnitPrice?: number;
    maxGasAmount?: number;
    sender?: string;
    sequenceNumber?: number;
}

interface SignAndSubmitTransactionWithPayloadRequestArgs {
    options?: TransactionOptions;
    payload: JsonTransactionPayload | TransactionPayload;
}
interface SignAndSubmitTransactionWithRawTxnRequestArgs {
    rawTxn: RawTransaction;
}
interface SignAndSubmitTransactionWithFeePayerRawTxnRequestArgs {
    feePayerAuthenticator: AccountAuthenticator;
    rawTxn: FeePayerRawTransaction;
}
type SignAndSubmitTransactionRequestArgs = SignAndSubmitTransactionWithPayloadRequestArgs | SignAndSubmitTransactionWithRawTxnRequestArgs | SignAndSubmitTransactionWithFeePayerRawTxnRequestArgs;

type SignMessageRequestArgs = FullMessageFlags & {
    message: string;
    nonce: string;
};

interface SignTransactionWithPayloadRequestArgs {
    options?: TransactionOptions;
    payload: JsonTransactionPayload | TransactionPayload;
}
interface SignTransactionWithRawTxnRequestArgs {
    rawTxn: RawTransaction | FeePayerRawTransaction | MultiAgentRawTransaction;
}
type SignTransactionRequestArgs = SignTransactionWithPayloadRequestArgs | SignTransactionWithRawTxnRequestArgs;

interface Account {
    address: string;
    name?: string;
    publicKey: string;
}

interface Network {
    chainId?: string;
    name?: string;
    url: string;
}

interface SignAndSubmitTransactionWithPayloadRequestV1Args {
    options?: TransactionOptions;
    payload: JsonTransactionPayload | TxnBuilderTypes.TransactionPayload;
}
interface SignAndSubmitTransactionWithRawTxnRequestV1Args {
    rawTxn: TxnBuilderTypes.RawTransaction;
}
interface SignAndSubmitTransactionWithFeePayerRawTxnRequestV1Args {
    feePayerAuthenticator: TxnBuilderTypes.AccountAuthenticator;
    rawTxn: TxnBuilderTypes.FeePayerRawTransaction;
}
type SignAndSubmitTransactionRequestV1Args = SignAndSubmitTransactionWithPayloadRequestV1Args | SignAndSubmitTransactionWithRawTxnRequestV1Args | SignAndSubmitTransactionWithFeePayerRawTxnRequestV1Args;

interface SignTransactionWithPayloadRequestV1Args {
    options?: TransactionOptions;
    payload: JsonTransactionPayload | TxnBuilderTypes.TransactionPayload;
}
interface SignTransactionWithRawTxnRequestV1Args {
    rawTxn: TxnBuilderTypes.RawTransaction | TxnBuilderTypes.FeePayerRawTransaction | TxnBuilderTypes.MultiAgentRawTransaction;
}
type SignTransactionRequestV1Args = SignTransactionWithPayloadRequestV1Args | SignTransactionWithRawTxnRequestV1Args;
interface SignTransactionWithPayloadResponseV1Args {
    accountAuthenticator: TxnBuilderTypes.AccountAuthenticator;
    rawTxn: TxnBuilderTypes.RawTransaction;
}
interface SignTransactionWithRawTxnResponseV1Args {
    accountAuthenticator: TxnBuilderTypes.AccountAuthenticator;
}
type SignTransactionResponseV1Args = SignTransactionWithPayloadResponseV1Args | SignTransactionWithRawTxnResponseV1Args;

declare function serializeJsonTransactionPayload(payload: JsonTransactionPayload): JsonTransactionPayload;
declare function deserializeJsonTransactionPayload(payload: JsonTransactionPayload): JsonTransactionPayload;

type SerializableRawTransaction = RawTransaction | FeePayerRawTransaction | MultiAgentRawTransaction;
type SerializableRawTransactionV1 = TxnBuilderTypes.RawTransaction | TxnBuilderTypes.FeePayerRawTransaction | TxnBuilderTypes.MultiAgentRawTransaction;
interface SerializedSimpleRawTransaction {
    type: 'raw_txn';
    value: string;
}
interface SerializedFeePayerRawTransaction {
    type: 'fee_payer_raw_txn';
    value: string;
}
interface SerializedMultiAgentRawTransaction {
    type: 'multi_agent_raw_txn';
    value: string;
}
type SerializedRawTransaction = SerializedSimpleRawTransaction | SerializedFeePayerRawTransaction | SerializedMultiAgentRawTransaction;
declare function serializeRawTransaction(rawTxn: RawTransaction | TxnBuilderTypes.RawTransaction): SerializedSimpleRawTransaction;
declare function serializeRawTransaction(rawTxn: FeePayerRawTransaction | TxnBuilderTypes.FeePayerRawTransaction): SerializedFeePayerRawTransaction;
declare function serializeRawTransaction(rawTxn: MultiAgentRawTransaction | TxnBuilderTypes.MultiAgentRawTransaction): SerializedMultiAgentRawTransaction;
declare function serializeRawTransaction(rawTxn: SerializableRawTransaction | SerializableRawTransactionV1): SerializedRawTransaction;
declare function deserializeRawTransaction(serialized: SerializedSimpleRawTransaction): RawTransaction;
declare function deserializeRawTransaction(serialized: SerializedFeePayerRawTransaction): FeePayerRawTransaction;
declare function deserializeRawTransaction(serialized: SerializedMultiAgentRawTransaction): MultiAgentRawTransaction;
declare function deserializeRawTransaction(serialized: SerializedRawTransaction): SerializableRawTransaction;

interface SerializedSignAndSubmitTransactionWithPayloadRequestArgs {
    options?: TransactionOptions;
    payload: JsonTransactionPayload | string;
}
interface SerializedSignAndSubmitTransactionWithRawTxnRequestArgs {
    rawTxn: SerializedSimpleRawTransaction;
}
interface SerializedSignAndSubmitTransactionWithFeePayerRawTxnRequestArgs {
    feePayerAuthenticator: string;
    rawTxn: SerializedFeePayerRawTransaction;
}
type SerializedSignAndSubmitTransactionRequestArgs = SerializedSignAndSubmitTransactionWithPayloadRequestArgs | SerializedSignAndSubmitTransactionWithRawTxnRequestArgs | SerializedSignAndSubmitTransactionWithFeePayerRawTxnRequestArgs;
declare function serializeSignAndSubmitTransactionRequestArgs(args: SignAndSubmitTransactionRequestArgs | SignAndSubmitTransactionRequestV1Args): SerializedSignAndSubmitTransactionRequestArgs;
declare function deserializeSignAndSubmitTransactionRequestArgs(args: SerializedSignAndSubmitTransactionWithPayloadRequestArgs): SignAndSubmitTransactionWithPayloadRequestArgs;
declare function deserializeSignAndSubmitTransactionRequestArgs(args: SerializedSignAndSubmitTransactionWithRawTxnRequestArgs): SignAndSubmitTransactionWithRawTxnRequestArgs;
declare function deserializeSignAndSubmitTransactionRequestArgs(args: SerializedSignAndSubmitTransactionWithFeePayerRawTxnRequestArgs): SignAndSubmitTransactionWithFeePayerRawTxnRequestArgs;
declare function deserializeSignAndSubmitTransactionRequestArgs(args: SerializedSignAndSubmitTransactionRequestArgs): SignAndSubmitTransactionRequestArgs;

interface SerializedSignTransactionWithPayloadRequestArgs {
    options?: TransactionOptions;
    payload: JsonTransactionPayload | string;
}
interface SerializedSignTransactionWithRawTxnRequestArgs {
    rawTxn: SerializedRawTransaction;
}
type SerializedSignTransactionRequestArgs = SerializedSignTransactionWithPayloadRequestArgs | SerializedSignTransactionWithRawTxnRequestArgs;
declare function serializeSignTransactionRequestArgs(args: SignTransactionRequestArgs | SignTransactionRequestV1Args): SerializedSignTransactionRequestArgs;
declare function deserializeSignTransactionRequestArgs(args: SerializedSignTransactionWithPayloadRequestArgs): SignTransactionWithPayloadRequestArgs;
declare function deserializeSignTransactionRequestArgs(args: SerializedSignTransactionWithRawTxnRequestArgs): SignTransactionWithRawTxnRequestArgs;
declare function deserializeSignTransactionRequestArgs(args: SerializedSignTransactionRequestArgs): SignTransactionRequestArgs;

interface SerializedSignTransactionWithPayloadResponseArgs {
    accountAuthenticator: string;
    rawTxn: string;
}
interface SerializedSignTransactionWithRawTxnResponseArgs {
    accountAuthenticator: string;
}
type SerializedSignTransactionResponseArgs = SerializedSignTransactionWithPayloadResponseArgs | SerializedSignTransactionWithRawTxnResponseArgs;
declare function serializeSignTransactionResponseArgs(args: SignTransactionResponseArgs): SerializedSignTransactionResponseArgs;
declare function deserializeSignTransactionResponseArgs(args: SerializedSignTransactionResponseArgs): SignTransactionResponseArgs;

declare function makeFullMessage(params: FullMessageParams, flags: FullMessageFlags): FullMessageResult;

export { Account, BcsDeserializableV1Class, BcsDeserializableV2Class, BcsSerializableV1, EntryFunctionJsonTransactionPayload, FullMessageFlags, FullMessageParams, FullMessageResult, JsonTransactionPayload, MultisigJsonTransactionPayload, Network, SerializableRawTransaction, SerializableRawTransactionV1, SerializedFeePayerRawTransaction, SerializedMultiAgentRawTransaction, SerializedRawTransaction, SerializedSignAndSubmitTransactionRequestArgs, SerializedSignAndSubmitTransactionWithFeePayerRawTxnRequestArgs, SerializedSignAndSubmitTransactionWithPayloadRequestArgs, SerializedSignAndSubmitTransactionWithRawTxnRequestArgs, SerializedSignTransactionRequestArgs, SerializedSignTransactionResponseArgs, SerializedSignTransactionWithPayloadRequestArgs, SerializedSignTransactionWithPayloadResponseArgs, SerializedSignTransactionWithRawTxnRequestArgs, SerializedSignTransactionWithRawTxnResponseArgs, SerializedSimpleRawTransaction, SignAndSubmitTransactionRequestArgs, SignAndSubmitTransactionRequestV1Args, SignAndSubmitTransactionResponseArgs, SignAndSubmitTransactionWithFeePayerRawTxnRequestArgs, SignAndSubmitTransactionWithFeePayerRawTxnRequestV1Args, SignAndSubmitTransactionWithPayloadRequestArgs, SignAndSubmitTransactionWithPayloadRequestV1Args, SignAndSubmitTransactionWithRawTxnRequestArgs, SignAndSubmitTransactionWithRawTxnRequestV1Args, SignMessageRequestArgs, SignMessageResponseArgs, SignTransactionRequestArgs, SignTransactionRequestV1Args, SignTransactionResponseArgs, SignTransactionResponseV1Args, SignTransactionWithPayloadRequestArgs, SignTransactionWithPayloadRequestV1Args, SignTransactionWithPayloadResponseArgs, SignTransactionWithPayloadResponseV1Args, SignTransactionWithRawTxnRequestArgs, SignTransactionWithRawTxnRequestV1Args, SignTransactionWithRawTxnResponseArgs, SignTransactionWithRawTxnResponseV1Args, TransactionOptions, bcsDeserialize, bcsSerialize, deserializeJsonTransactionPayload, deserializeRawTransaction, deserializeSignAndSubmitTransactionRequestArgs, deserializeSignTransactionRequestArgs, deserializeSignTransactionResponseArgs, isBcsSerializable, makeFullMessage, serializeJsonTransactionPayload, serializeRawTransaction, serializeSignAndSubmitTransactionRequestArgs, serializeSignTransactionRequestArgs, serializeSignTransactionResponseArgs };
