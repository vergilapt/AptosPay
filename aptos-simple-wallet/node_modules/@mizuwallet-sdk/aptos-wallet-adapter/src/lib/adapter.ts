import {
  Account,
  AccountAuthenticator,
  AnyRawTransaction,
  Deserializer,
  Network,
  SigningScheme,
} from '@aptos-labs/ts-sdk';
import {
  APTOS_CHAINS,
  AccountInfo,
  AptosConnectMethod,
  AptosDisconnectMethod,
  AptosFeatures,
  AptosGetAccountMethod,
  AptosGetNetworkMethod,
  AptosOnAccountChangeMethod,
  AptosOnNetworkChangeMethod,
  AptosSignAndSubmitTransactionInput,
  AptosSignAndSubmitTransactionMethod,
  AptosSignAndSubmitTransactionOutput,
  AptosSignMessageInput,
  AptosSignMessageMethod,
  AptosSignMessageOutput,
  AptosSignTransactionMethod,
  AptosWallet,
  AptosWalletAccount,
  AptosWalletError,
  AptosWalletErrorCode,
  IdentifierArray,
  NetworkInfo,
  UserResponse,
  UserResponseStatus,
} from '@aptos-labs/wallet-standard';
import { Mizu } from '@mizuwallet-sdk/core';
import { Buffer } from 'buffer';
import {
  DEFAULT_MIZUWALLET_ID,
  MZ_MSG_TYPE,
  MizuSupportNetwork,
  WALLET_ICON,
  WALLET_NAME,
  WALLET_WEB_URL,
} from '../config';
import TelegramMiniAppHelper from '../helpers/TelegramMiniAppHelper';
import WebsiteHelper from '../helpers/WebsiteHelper';
import { IsTelegram } from '../utils';

/**
 * A class to create a mock wallet for demonstration a wallet
 * implementation compatible with Aptos AIP-62 Wallet Standard
 */
export class MizuWalletAccount implements AptosWalletAccount {
  address: string;
  publicKey: Uint8Array;
  chains: IdentifierArray = APTOS_CHAINS;
  features: IdentifierArray = [];
  signingScheme: SigningScheme;
  label?: string;
  icon?:
    | `data:image/svg+xml;base64,${string}`
    | `data:image/webp;base64,${string}`
    | `data:image/png;base64,${string}`
    | `data:image/gif;base64,${string}`
    | undefined;

  constructor(account: Account) {
    this.address = account.accountAddress.toString();
    this.publicKey = account.publicKey.toUint8Array();
    this.signingScheme = account.signingScheme;
  }
}

export interface InitParams {
  network: MizuSupportNetwork;
  manifestURL: string;
  appId?: string;
}

export class MizuWallet implements AptosWallet {
  readonly url: string = WALLET_WEB_URL;
  readonly version = '1.0.0';
  readonly name: string = WALLET_NAME;
  readonly icon = WALLET_ICON;
  chains = APTOS_CHAINS;
  accounts: MizuWalletAccount[] = [];

  provider:
    | {
        address: string;
        network: Network;
      }
    | undefined;

  mizuClient: Mizu;
  telegramMiniAppHelper: TelegramMiniAppHelper | undefined;
  websiteHelper: WebsiteHelper | undefined;
  accountInfo: AccountInfo | undefined;

  get features(): AptosFeatures {
    return {
      'aptos:connect': {
        version: '1.0.0',
        connect: this.connect,
      },
      'aptos:network': {
        version: '1.0.0',
        network: this.network,
      },
      'aptos:disconnect': {
        version: '1.0.0',
        disconnect: this.disconnect,
      },
      'aptos:signTransaction': {
        version: '1.0.0',
        signTransaction: this.signTransaction,
      },
      'aptos:signAndSubmitTransaction': {
        version: '1.1.0',
        signAndSubmitTransaction: this.signAndSubmitTransaction,
      },
      'aptos:signMessage': {
        version: '1.0.0',
        signMessage: this.signMessage,
      },
      'aptos:onAccountChange': {
        version: '1.0.0',
        onAccountChange: this.onAccountChange,
      },
      'aptos:onNetworkChange': {
        version: '1.0.0',
        onNetworkChange: this.onNetworkChange,
      },
      'aptos:account': {
        version: '1.0.0',
        account: this.account,
      },
    };
  }

  constructor(args: InitParams) {
    if (!args.network) throw new Error('MizuWallet: network is required');

    this.mizuClient = new Mizu({
      appId: args.appId || DEFAULT_MIZUWALLET_ID(args.network),
      network: args.network,
    });

    this.provider = {
      network: args.network,
      address: '',
    };

    if (args.manifestURL.indexOf('_') > -1)
      throw new Error('manifestURL can not contain underscore: "_"');

    if (args?.manifestURL) {
      this.telegramMiniAppHelper = new TelegramMiniAppHelper({
        manifestURL: args?.manifestURL,
        network: args.network,
      });
    }

    this.websiteHelper = new WebsiteHelper({
      manifestURL: args.manifestURL,
      network: args.network,
      mizuClient: this.mizuClient,
    });
  }

  account: AptosGetAccountMethod = async (): Promise<AccountInfo> => {
    return (this.accountInfo || {
      address: '',
      publicKey: '',
    }) as any;
  };

  connect: AptosConnectMethod = async (): Promise<UserResponse<AccountInfo>> => {
    try {
      if (IsTelegram) {
        if (this.telegramMiniAppHelper) {
          this.accountInfo = (await this.telegramMiniAppHelper.connect()) as any;
        } else {
          throw new Error(`${MZ_MSG_TYPE.CONNECT} Please pass a valid manifestURL`);
        }
      } else {
        this.accountInfo = (await this.websiteHelper?.connect()) as any;
      }

      return {
        args: {
          ...this.accountInfo,
        } as any,
        status: UserResponseStatus.APPROVED,
      };
    } catch (error) {
      console.error(error);
      return {
        status: UserResponseStatus.REJECTED,
      };
    }
  };

  network: AptosGetNetworkMethod = async (): Promise<NetworkInfo> => {
    return {
      name: this.provider!.network,
      chainId: this.provider!.network === 'mainnet' ? 1 : 2,
    };
  };

  disconnect: AptosDisconnectMethod = async (): Promise<void> => {
    try {
      if (IsTelegram) {
        await this.telegramMiniAppHelper?.disconnect();
      } else {
        await this.websiteHelper?.disconnect();
      }
    } catch (error: any) {
      throw error;
    }
  };

  signTransaction: AptosSignTransactionMethod = async (
    transaction: AnyRawTransaction,
    asFeePayer?: boolean,
  ): Promise<UserResponse<AccountAuthenticator>> => {
    try {
      console.log(asFeePayer);
      let response: any = {};
      if (IsTelegram) {
        response = await this.telegramMiniAppHelper?.signTransaction(transaction);
      } else {
        response = await this.websiteHelper?.signTransaction(transaction);
      }

      if (response.signature) {
        const der = new Deserializer(Buffer.from(response.signature, 'hex'));
        const authenticator: AccountAuthenticator = AccountAuthenticator.deserialize(der);

        return {
          args: authenticator,
          status: UserResponseStatus.APPROVED,
        };
      } else {
        return {
          status: UserResponseStatus.REJECTED,
        };
      }
    } catch (err: any) {
      if (err.message || err) {
        throw new Error(err.message || err);
      }
      throw new AptosWalletError(AptosWalletErrorCode.InternalError);
    }
  };

  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod = async (
    transaction: AptosSignAndSubmitTransactionInput,
  ): Promise<UserResponse<AptosSignAndSubmitTransactionOutput>> => {
    try {
      let response: any = {};
      if (IsTelegram) {
        response = await this.telegramMiniAppHelper?.signAndSubmitTransaction(transaction.payload);
      } else {
        response = await this.websiteHelper?.signAndSubmitTransaction(transaction.payload);
      }

      if (response?.hash) {
        return {
          args: response,
          status: UserResponseStatus.APPROVED,
        };
      } else {
        return {
          status: UserResponseStatus.REJECTED,
        };
      }
    } catch (err: any) {
      if (err.message || err) {
        throw new Error(err.message || err);
      }
      throw new AptosWalletError(AptosWalletErrorCode.InternalError);
    }
  };

  signMessage: AptosSignMessageMethod = async (
    input: AptosSignMessageInput,
  ): Promise<UserResponse<AptosSignMessageOutput>> => {
    try {
      const { message, nonce, ...rest } = input;

      let response: any = {};
      if (IsTelegram) {
        response = await this.telegramMiniAppHelper?.signMessage({
          message,
          nonce,
        });
      } else {
        response = await this.websiteHelper?.signMessage({
          message,
          nonce,
        });
      }

      if (response?.data) {
        return {
          args: {
            ...response?.data,
            ...rest,
          },
          status: UserResponseStatus.APPROVED,
        };
      } else {
        return {
          status: UserResponseStatus.REJECTED,
        };
      }
    } catch (err: any) {
      if (err.message || err) {
        throw new Error(err.message || err);
      }
      throw new AptosWalletError(AptosWalletErrorCode.InternalError);
    }
  };

  onAccountChange: AptosOnAccountChangeMethod = async (): Promise<void> => {
    return Promise.resolve();
  };

  onNetworkChange: AptosOnNetworkChangeMethod = async (): Promise<void> => {
    return Promise.resolve();
  };
}

