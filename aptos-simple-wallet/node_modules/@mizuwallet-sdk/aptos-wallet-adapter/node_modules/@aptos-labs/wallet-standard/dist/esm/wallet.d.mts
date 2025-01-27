import { AptosWalletAccount, AptosWalletMultiSigAccount } from './account.mjs';
import { WalletWithAptosFeatures } from './features/index.mjs';
import '@aptos-labs/ts-sdk';
import '@wallet-standard/core';
import './features/aptosSignAndSubmitTransaction.mjs';
import './misc.mjs';
import './features/aptosSignMessage.mjs';
import './features/aptosGetAccount.mjs';
import './AccountInfo.mjs';
import './features/aptosConnect.mjs';
import './features/aptosGetNetwork.mjs';
import './features/aptosOnAccountChange.mjs';
import './features/aptosOnNetworkChange.mjs';
import './features/aptosSignTransaction.mjs';
import './features/aptosDisconnect.mjs';
import './features/aptosOpenInMobileApp.mjs';
import './features/aptosChangeNetwork.mjs';

/**
 * Interafce for a single signer Aptos wallet
 */
interface AptosWallet extends Omit<WalletWithAptosFeatures, 'accounts'> {
    /**
     * Website URL of the Wallet
     */
    readonly url: string;
    readonly accounts: AptosWalletAccount[] | AptosWalletMultiSigAccount[];
}

export { AptosWallet };
