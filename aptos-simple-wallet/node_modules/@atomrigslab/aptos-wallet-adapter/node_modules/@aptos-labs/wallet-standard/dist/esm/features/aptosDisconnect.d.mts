/** Version of the feature. */
type AptosDisconnectVersion = '1.0.0';
/** Name of the feature. */
declare const AptosDisconnectNamespace = "aptos:disconnect";
/** TODO: docs */
type AptosDisconnectFeature = {
    /** Namespace for the feature. */
    [AptosDisconnectNamespace]: {
        /** Version of the feature API. */
        version: AptosDisconnectVersion;
        disconnect: AptosDisconnectMethod;
    };
};
/** TODO: docs */
type AptosDisconnectMethod = () => Promise<void>;

export { AptosDisconnectFeature, AptosDisconnectMethod, AptosDisconnectNamespace, AptosDisconnectVersion };
