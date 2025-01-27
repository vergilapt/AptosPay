import { NetworkInfo } from '../misc.mjs';
import '@aptos-labs/ts-sdk';

/** Version of the feature. */
type AptosOnNetworkChangeVersion = '1.0.0';
/** Name of the feature. */
declare const AptosOnNetworkChangeNamespace = "aptos:onNetworkChange";
/** TODO: docs */
type AptosOnNetworkChangeFeature = {
    /** Namespace for the feature. */
    [AptosOnNetworkChangeNamespace]: {
        /** Version of the feature API. */
        version: AptosOnNetworkChangeVersion;
        onNetworkChange: AptosOnNetworkChangeMethod;
    };
};
/** TODO: docs */
type AptosOnNetworkChangeMethod = (input: AptosOnNetworkChangeInput) => Promise<void>;
/** TODO: docs */
type AptosOnNetworkChangeInput = (newNetwork: NetworkInfo) => void;

export { AptosOnNetworkChangeFeature, AptosOnNetworkChangeInput, AptosOnNetworkChangeMethod, AptosOnNetworkChangeNamespace, AptosOnNetworkChangeVersion };
