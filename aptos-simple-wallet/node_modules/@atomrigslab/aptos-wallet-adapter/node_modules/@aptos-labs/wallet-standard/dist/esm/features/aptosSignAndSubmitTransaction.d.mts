import { AnyRawTransaction, PendingTransactionResponse } from '@aptos-labs/ts-sdk';
import { UserResponse } from '../misc.mjs';

/** Version of the feature. */
type AptosSignAndSubmitTransactionVersion = '1.0.0';
/** Name of the feature. */
declare const AptosSignAndSubmitTransactionNamespace = "aptos:signAndSubmitTransaction";
/**
 * A Wallet Standard feature for signing a transaction, and returning the
 * hash of the transaction.
 */
type AptosSignAndSubmitTransactionFeature = {
    /** Namespace for the feature. */
    [AptosSignAndSubmitTransactionNamespace]: {
        /** Version of the feature API. */
        version: AptosSignAndSubmitTransactionVersion;
        signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
    };
};
/** TODO: docs */
type AptosSignAndSubmitTransactionMethod = (transaction: AptosSignAndSubmitTransactionInput) => Promise<UserResponse<AptosSignAndSubmitTransactionOutput>>;
/** TODO: docs */
type AptosSignAndSubmitTransactionInput = AnyRawTransaction;
/** Output of signing transactions. */
type AptosSignAndSubmitTransactionOutput = PendingTransactionResponse;

export { AptosSignAndSubmitTransactionFeature, AptosSignAndSubmitTransactionInput, AptosSignAndSubmitTransactionMethod, AptosSignAndSubmitTransactionNamespace, AptosSignAndSubmitTransactionOutput, AptosSignAndSubmitTransactionVersion };
