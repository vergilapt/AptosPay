"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shimWeb3 = void 0;
/**
 * If no existing window.web3 is found, this function injects a web3 "shim" to
 * not break dapps that rely on window.web3.currentProvider.
 *
 * @param provider - The provider to set as window.web3.currentProvider.
 * @param log - The logging API to use.
 */
function shimWeb3(provider, log = console) {
    let loggedCurrentProvider = false;
    let loggedMissingProperty = false;
    if (!window.web3) {
        const SHIM_IDENTIFIER = '__isMetaMaskShim__';
        let web3Shim = { currentProvider: provider };
        Object.defineProperty(web3Shim, SHIM_IDENTIFIER, {
            value: true,
            enumerable: true,
            configurable: false,
            writable: false,
        });
        web3Shim = new Proxy(web3Shim, {
            get: (target, property, ...args) => {
                if (property === 'currentProvider' && !loggedCurrentProvider) {
                    loggedCurrentProvider = true;
                    log.warn('You are accessing the Dekey window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead.');
                }
                else if (property !== 'currentProvider' &&
                    property !== SHIM_IDENTIFIER &&
                    !loggedMissingProperty) {
                    loggedMissingProperty = true;
                    log.error('Dekey no longer injects web3.');
                    provider
                        .request({ method: 'metamask_logWeb3ShimUsage' })
                        .catch((error) => {
                        log.debug('Dekey: Failed to log web3 shim usage.', error);
                    });
                }
                return Reflect.get(target, property, ...args);
            },
            set: (...args) => {
                log.warn('You are accessing the Dekey window.web3 shim. This object is deprecated; use window.ethereum instead.');
                return Reflect.set(...args);
            },
        });
        Object.defineProperty(window, 'web3', {
            value: web3Shim,
            enumerable: false,
            configurable: true,
            writable: true,
        });
    }
}
exports.shimWeb3 = shimWeb3;
//# sourceMappingURL=shimWeb3.js.map