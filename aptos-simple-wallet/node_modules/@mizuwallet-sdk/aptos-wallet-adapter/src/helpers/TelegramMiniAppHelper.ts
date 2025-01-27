import {
  AccountAddress,
  AnyRawTransaction,
  InputGenerateTransactionPayloadData,
} from '@aptos-labs/ts-sdk';
import { DEFAULT_MINI_APP_URL, MizuSupportNetwork, MZ_MSG_TYPE } from '../config';
import { CommonHelper } from './CommonHelper';

const MZ_STORAGE_ADDRESS = 'mizuwallet-address';
const MZ_STORAGE_PUBLICKEY = 'mizuwallet-publickey';

class TelegramMiniAppHelper extends CommonHelper {
  /**
   * @param manifestURL
   */
  manifestURL: string;
  miniAppURL: string;

  /**
   *
   * @param args.manifestURL Manifest URL
   */
  constructor(args: { manifestURL: string; network: MizuSupportNetwork }) {
    super();

    if (!args.manifestURL) throw new Error('manifestURL is required');

    this.manifestURL = args.manifestURL;
    this.miniAppURL = DEFAULT_MINI_APP_URL(args.network);
  }

  /**
   * Connect
   *
   * Open MizuWallet MiniApp to connect
   * Try to get Address info back
   *
   *
   * @returns
   */
  async connect() {
    if (
      window?.localStorage &&
      window.localStorage?.getItem(MZ_STORAGE_ADDRESS) &&
      window.localStorage?.getItem(MZ_STORAGE_PUBLICKEY)
    ) {
      return {
        address: window.localStorage.getItem(MZ_STORAGE_ADDRESS)?.toString() || '',
        publicKey: window.localStorage.getItem(MZ_STORAGE_PUBLICKEY)?.toString() || '',
      };
    }

    const { account }: any = await this.startChannel({
      buildAction: {
        actions: 'miniapp-connectv2',
      },
      metadata: {},
      returnKey: 'account',
    });

    if (
      window?.localStorage &&
      account?.address &&
      AccountAddress.isValid({
        input: account?.address,
        strict: true,
      })
    ) {
      window.localStorage.setItem(MZ_STORAGE_ADDRESS, account?.address);
      window.localStorage.setItem(MZ_STORAGE_PUBLICKEY, account?.publicKey);
      return {
        address: account?.address,
        publicKey: account?.publicKey,
      };
    } else {
      throw new Error(`${MZ_MSG_TYPE.CONNECT} Error`);
    }
  }

  disconnect() {
    if (window?.localStorage.getItem(MZ_STORAGE_ADDRESS)) {
      window?.localStorage.removeItem(MZ_STORAGE_ADDRESS);
    }

    if (window?.localStorage.getItem(MZ_STORAGE_PUBLICKEY)) {
      window?.localStorage.removeItem(MZ_STORAGE_PUBLICKEY);
    }
  }

  async signAndSubmitTransaction(transaction: InputGenerateTransactionPayloadData) {
    return await this.startChannel({
      buildAction: {
        actions: 'miniapp-transactionv2',
      },
      metadata: {
        transaction,
      },
      returnKey: 'hash',
      isAddressRequired: true,
    });
  }

  async signTransaction(transaction: AnyRawTransaction) {
    return await this.startChannel({
      buildAction: {
        actions: 'miniapp-signtransactionv2',
      },
      metadata: {
        transaction: transaction.bcsToHex().toStringWithoutPrefix(),
      },
      returnKey: 'signature',
      isAddressRequired: true,
    });
  }

  async signMessage(args: { message: string; nonce: string }) {
    return await this.startChannel({
      buildAction: {
        actions: 'miniapp-signmessagev2',
      },
      metadata: {
        args,
      },
      returnKey: 'data',
      isAddressRequired: true,
    });
  }
}

export default TelegramMiniAppHelper;

