import { AccountAddress, AccountAuthenticator, Serializer, Deserializer, PublicKey, Signature, Ed25519Signature, MultiEd25519Signature, AnySignature, MultiSignature, Network, TransactionPayload, RawTransaction } from '@aptos-labs/ts-sdk';

interface AccountAuthenticatorInput {
    address: AccountAddress;
    authenticator: AccountAuthenticator;
}
declare function serializeAccountAuthenticatorInput(serializer: Serializer, value: AccountAuthenticatorInput): void;
declare function deserializeAccountAuthenticatorInput(deserializer: Deserializer): AccountAuthenticatorInput;

interface AccountInfo {
    address: AccountAddress;
    name?: string;
    publicKey: PublicKey;
}
declare function serializeAccountInfo(serializer: Serializer, value: AccountInfo): string;
declare function deserializeAccountInfo(deserializer: Deserializer): AccountInfo;

interface AccountInput {
    address: AccountAddress;
    publicKey?: PublicKey;
}
declare function serializeAccountInput(serializer: Serializer, value: AccountInput): void;
declare function deserializeAccountInput(deserializer: Deserializer): AccountInput;

interface DappInfo {
    domain: string;
    imageURI?: string;
    name: string;
}
declare function serializeDappInfo(serializer: Serializer, value: DappInfo): void;
declare function deserializeDappInfo(deserializer: Deserializer): DappInfo;

declare function serializePublicKey(serializer: Serializer, value: PublicKey): void;
declare function deserializePublicKey(deserializer: Deserializer): PublicKey;

declare function serializeSignature(serializer: Serializer, value: Signature): void;
declare function deserializeSignature(deserializer: Deserializer): Ed25519Signature | MultiEd25519Signature | AnySignature | MultiSignature;

interface ConnectResponseArgs {
    account: AccountInfo;
}
declare function serializeConnectResponseArgs(value: ConnectResponseArgs): string;
declare function deserializeConnectResponseArgs(value: string): ConnectResponseArgs;

type GetConnectedAccountsResponseArgs = AccountInfo[];
declare function serializeGetConnectedAccountsResponseArgs(accounts: GetConnectedAccountsResponseArgs): string;
declare function deserializeGetConnectedAccountsResponseArgs(value: string): GetConnectedAccountsResponseArgs;

interface SignAndSubmitTransactionRequestArgs {
    expirationTimestamp?: number;
    feePayer?: AccountAuthenticatorInput;
    gasUnitPrice?: number;
    maxGasAmount?: number;
    network: Network;
    payload: TransactionPayload;
}
declare function serializeSignAndSubmitTransactionRequestArgs(serializer: Serializer, value: SignAndSubmitTransactionRequestArgs): void;
declare function deserializeSignAndSubmitTransactionRequestArgs(deserializer: Deserializer): SignAndSubmitTransactionRequestArgs;

interface SignAndSubmitTransactionResponseArgs {
    txnHash: string;
}
declare function serializeSignAndSubmitTransactionResponseArgs(value: SignAndSubmitTransactionResponseArgs): string;
declare function deserializeSignAndSubmitTransactionResponseArgs(value: string): {
    txnHash: string;
};

interface SignMessageRequestArgs {
    chainId: number;
    message: Uint8Array;
    nonce: Uint8Array;
}
declare function serializeSignMessageRequestArgs(serializer: Serializer, value: SignMessageRequestArgs): void;
declare function deserializeSignMessageRequestArgs(deserializer: Deserializer): SignMessageRequestArgs;

interface SignMessageResponseArgs {
    fullMessage: string;
    signature: Signature;
}
declare function serializeSignMessageResponseArgs(value: SignMessageResponseArgs): string;
declare function deserializeSignMessageResponseArgs(value: string): SignMessageResponseArgs;

interface SignTransactionRequestArgs {
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
declare function serializeSignTransactionRequestArgs(serializer: Serializer, value: SignTransactionRequestArgs): void;
declare function deserializeSignTransactionRequestArgs(deserializer: Deserializer): SignTransactionRequestArgs;
interface SignTransactionRequestArgsWithTransaction {
    feePayer?: AccountInput;
    payload: TransactionPayload;
    secondarySigners?: AccountInput[];
    senderPublicKey?: PublicKey;
    transaction: RawTransaction;
}
declare function normalizeSignTransactionRequestArgs(args: SignTransactionRequestArgsWithTransaction): SignTransactionRequestArgs;

interface SignTransactionResponseArgs {
    authenticator: AccountAuthenticator;
    rawTransaction?: RawTransaction;
}
declare function serializeSignTransactionResponseArgs(value: SignTransactionResponseArgs): string;
declare function deserializeSignTransactionResponseArgs(value: string): {
    authenticator: AccountAuthenticator;
    rawTransaction: RawTransaction | undefined;
};

declare class PromptOpenerPingRequest {
    static readonly TYPE = "PromptOpenerPingRequest";
    readonly _type = "PromptOpenerPingRequest";
}
declare class PromptOpenerPingResponse {
    static readonly TYPE = "PromptOpenerPingResponse";
    readonly _type = "PromptOpenerPingResponse";
}
declare class PromptApprovalResponse<TResponseArgs> {
    args: TResponseArgs;
    static readonly TYPE = "PromptApprovalResponse";
    readonly _type = "PromptApprovalResponse";
    constructor(args: TResponseArgs);
}
type TypedConstructor<T> = {
    TYPE: string;
    new (...args: any[]): T;
};
declare function isPromptMessage<TMessage>(messageCls: TypedConstructor<TMessage>, message: any): message is TMessage;

declare enum WalletRequestType {
    IsConnected = 0,
    Connect = 1,
    Disconnect = 2,
    GetConnectedAccounts = 3,
    SignMessage = 4,
    SignTransaction = 5,
    SignAndSubmitTransaction = 6
}
interface BaseWalletRequest {
    dappInfo: DappInfo;
}
interface IsConnectedRequest extends BaseWalletRequest {
    type: WalletRequestType.IsConnected;
}
interface ConnectRequest extends BaseWalletRequest {
    type: WalletRequestType.Connect;
}
interface DisconnectRequest extends BaseWalletRequest {
    type: WalletRequestType.Disconnect;
}
interface GetConnectedAccountsRequest extends BaseWalletRequest {
    type: WalletRequestType.GetConnectedAccounts;
}
interface SignMessageRequest extends BaseWalletRequest {
    args: SignMessageRequestArgs;
    type: WalletRequestType.SignMessage;
}
interface SignTransactionRequest extends BaseWalletRequest {
    args: SignTransactionRequestArgs;
    type: WalletRequestType.SignTransaction;
}
interface SignAndSubmitTransactionRequest extends BaseWalletRequest {
    args: SignAndSubmitTransactionRequestArgs;
    type: WalletRequestType.SignAndSubmitTransaction;
}
type WalletRequest = IsConnectedRequest | ConnectRequest | DisconnectRequest | GetConnectedAccountsRequest | SignMessageRequest | SignTransactionRequest | SignAndSubmitTransactionRequest;
declare function serializeWalletRequest(value: WalletRequest): string;
declare function deserializeWalletRequest(value: string): WalletRequest;

export { AccountAuthenticatorInput, AccountInfo, AccountInput, BaseWalletRequest, ConnectRequest, ConnectResponseArgs, DappInfo, DisconnectRequest, GetConnectedAccountsRequest, GetConnectedAccountsResponseArgs, IsConnectedRequest, PromptApprovalResponse, PromptOpenerPingRequest, PromptOpenerPingResponse, SignAndSubmitTransactionRequest, SignAndSubmitTransactionRequestArgs, SignAndSubmitTransactionResponseArgs, SignMessageRequest, SignMessageRequestArgs, SignMessageResponseArgs, SignTransactionRequest, SignTransactionRequestArgs, SignTransactionRequestArgsWithTransaction, SignTransactionResponseArgs, TypedConstructor, WalletRequest, WalletRequestType, deserializeAccountAuthenticatorInput, deserializeAccountInfo, deserializeAccountInput, deserializeConnectResponseArgs, deserializeDappInfo, deserializeGetConnectedAccountsResponseArgs, deserializePublicKey, deserializeSignAndSubmitTransactionRequestArgs, deserializeSignAndSubmitTransactionResponseArgs, deserializeSignMessageRequestArgs, deserializeSignMessageResponseArgs, deserializeSignTransactionRequestArgs, deserializeSignTransactionResponseArgs, deserializeSignature, deserializeWalletRequest, isPromptMessage, normalizeSignTransactionRequestArgs, serializeAccountAuthenticatorInput, serializeAccountInfo, serializeAccountInput, serializeConnectResponseArgs, serializeDappInfo, serializeGetConnectedAccountsResponseArgs, serializePublicKey, serializeSignAndSubmitTransactionRequestArgs, serializeSignAndSubmitTransactionResponseArgs, serializeSignMessageRequestArgs, serializeSignMessageResponseArgs, serializeSignTransactionRequestArgs, serializeSignTransactionResponseArgs, serializeSignature, serializeWalletRequest };
