import { AccountInfo } from '../AccountInfo.mjs';
import { UserResponse, NetworkInfo } from '../misc.mjs';
import '@aptos-labs/ts-sdk';

/** Version of the feature. */
type AptosConnectVersion = '1.0.0';
/** Name of the feature. */
declare const AptosConnectNamespace = "aptos:connect";
/** TODO: docs */
type AptosConnectFeature = {
    /** Namespace for the feature. */
    [AptosConnectNamespace]: {
        /** Version of the feature API. */
        version: AptosConnectVersion;
        connect: AptosConnectMethod;
    };
};
/** TODO: docs */
type AptosConnectMethod = (...args: AptosConnectInput) => Promise<UserResponse<AptosConnectOutput>>;
/** TODO: docs */
type AptosConnectInput = [silent?: boolean, networkInfo?: NetworkInfo];
/** TODO: docs */
type AptosConnectOutput = AccountInfo;

export { AptosConnectFeature, AptosConnectInput, AptosConnectMethod, AptosConnectNamespace, AptosConnectOutput, AptosConnectVersion };
