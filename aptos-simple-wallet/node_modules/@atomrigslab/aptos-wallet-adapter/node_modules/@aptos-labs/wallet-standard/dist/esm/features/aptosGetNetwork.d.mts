import { NetworkInfo } from '../misc.mjs';
import '@aptos-labs/ts-sdk';

/** Version of the feature. */
type AptosGetNetworkVersion = '1.0.0';
/** Name of the feature. */
declare const AptosGetNetworkNamespace = "aptos:network";
/** TODO: docs */
type AptosGetNetworkFeature = {
    /** Namespace for the feature. */
    [AptosGetNetworkNamespace]: {
        /** Version of the feature API. */
        version: AptosGetNetworkVersion;
        network: AptosGetNetworkMethod;
    };
};
/** TODO: docs */
type AptosGetNetworkMethod = () => Promise<AptosGetNetworkOutput>;
/** TODO: docs */
type AptosGetNetworkOutput = NetworkInfo;

export { AptosGetNetworkFeature, AptosGetNetworkMethod, AptosGetNetworkNamespace, AptosGetNetworkOutput, AptosGetNetworkVersion };
