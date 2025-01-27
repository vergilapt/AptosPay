"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {
    errors: {
        disconnected: () => 'Dekey: Disconnected from chain. Attempting to connect.',
        permanentlyDisconnected: () => 'Dekey: Disconnected from Dekey background. Page reload required.',
        sendSiteMetadata: () => `Dekey: Failed to send site metadata. This is an internal error, please report this bug.`,
        unsupportedSync: (method) => `Dekey: The Dekey Ethereum provider does not support synchronous methods like ${method} without a callback parameter.`,
        invalidDuplexStream: () => 'Must provide a Node.js-style duplex stream.',
        invalidNetworkParams: () => 'Dekey: Received invalid network parameters. Please report this bug.',
        invalidRequestArgs: () => `Expected a single, non-array, object argument.`,
        invalidRequestMethod: () => `'args.method' must be a non-empty string.`,
        invalidRequestParams: () => `'args.params' must be an object or array if provided.`,
        invalidLoggerObject: () => `'args.logger' must be an object if provided.`,
        invalidLoggerMethod: (method) => `'args.logger' must include required method '${method}'.`,
    },
    info: {
        connected: (chainId) => `Dekey: Connected to chain with ID "${chainId}".`,
    },
    warnings: {
        // deprecated methods
        enableDeprecation: `Dekey: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1102`,
        sendDeprecation: `Dekey: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193`,
        // deprecated events
        events: {
            close: `Dekey: The event 'close' is deprecated and may be removed in the future. Please use 'disconnect' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#disconnect`,
            data: `Dekey: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message`,
            networkChanged: `Dekey: The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#chainchanged`,
            notification: `Dekey: The event 'notification' is deprecated and may be removed in the future. Use 'message' instead.\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message`,
        },
        // misc
        experimentalMethods: `Dekey: 'ethereum._dekey' exposes non-standard, experimental methods. They may be removed or changed without warning.`,
    },
};
exports.default = messages;
//# sourceMappingURL=messages.js.map