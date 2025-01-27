import { AnyRawTransaction, AccountAuthenticator } from '@aptos-labs/ts-sdk';
import { UserResponse } from '../misc.mjs';

/** Version of the feature. */
type AptosSignTransactionVersion = '1.0.0';
/** Name of the feature. */
declare const AptosSignTransactionNamespace = "aptos:signTransaction";
/**
 * A Wallet Standard feature for signing a Aptos transaction, and returning the
 * account authenticator.
 */
type AptosSignTransactionFeature = {
    /** Namespace for the feature. */
    [AptosSignTransactionNamespace]: {
        /** Version of the feature API. */
        version: AptosSignTransactionVersion;
        signTransaction: AptosSignTransactionMethod;
    };
};
/** TODO: docs */
type AptosSignTransactionMethod = (transaction: AnyRawTransaction, asFeePayer?: boolean) => Promise<UserResponse<AptosSignTransactionOutput>>;
/** Output of signing transactions. */
type AptosSignTransactionOutput = AccountAuthenticator;

export { AptosSignTransactionFeature, AptosSignTransactionMethod, AptosSignTransactionNamespace, AptosSignTransactionOutput, AptosSignTransactionVersion };
