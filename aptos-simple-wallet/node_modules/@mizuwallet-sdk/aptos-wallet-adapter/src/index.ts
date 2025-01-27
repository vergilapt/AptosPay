declare global {
  interface Window {
    MizuWalletConfig: any;
    Telegram: any;
    TelegramWebviewProxy: any;
  }
}

export { MizuWallet } from './lib/adapter';

