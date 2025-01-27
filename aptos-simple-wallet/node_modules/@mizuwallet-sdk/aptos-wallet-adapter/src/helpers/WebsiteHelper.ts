import { AnyRawTransaction, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { Mizu } from '@mizuwallet-sdk/core';
import { MizuSupportNetwork } from '../config';
import { ErrorMessage } from '../utils';
import { CommonHelper } from './CommonHelper';

// const PRO_ORIGIN = 'https://dev.fuzzwallet.com:7654';
const PRO_ORIGIN = 'https://mizu.io';

const initStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
	  .mizu-wallet-frame {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		border: none;
		z-index: 999999999;
		inset: 0px;
    color-scheme: light;
    pointer-events: auto;
	  }
	`;
  document.head.appendChild(style);
};

class WebsiteHelper extends CommonHelper {
  authCode: string;
  address: string;
  manifestURL: string;
  network: string;
  mizuClient: Mizu;
  provider: any;
  origin: string;

  /**
   *
   * @param args.manifestURL Manifest URL
   */
  constructor(args: { manifestURL: string; network: MizuSupportNetwork; mizuClient: Mizu }) {
    super();

    if (!args.manifestURL) throw new Error('manifestURL is required');

    this.authCode = '';
    this.manifestURL = args.manifestURL;
    this.network = args.network;
    this.mizuClient = args.mizuClient;
    this.origin = PRO_ORIGIN;
    this.address = '';

    initStyles();
  }

  async connect() {
    // In React, it will definitely run twice.
    // the reject will definitely triggered.

    // if (document.querySelector('[name=mizu-wallet-login]')) {
    //   return Promise.reject('Already start login process');
    // }

    const loginResult: any = await this.startWebChannel({
      url: 'checkLogin',
      metadata: {
        manifestURL: this.manifestURL,
        network: this.network,
        appId: this.mizuClient.appId,
      },
      returnKey: 'account',
    });

    if (loginResult.account) {
      this.authCode = loginResult.account?.code;
      this.address = loginResult.account?.address;

      return Promise.resolve({
        address: loginResult.account?.address,
        publicKey: loginResult.account?.publicKey || '',
      });
    }

    return Promise.reject('User Canceled');
  }

  async disconnect() {
    /**
     * Remove session
     */
    await this.startWebChannel({
      url: 'checkLogin',
      redirectURL: '/walletv2/logout',
      metadata: {
        manifestURL: this.manifestURL,
        network: this.network,
        appId: this.mizuClient.appId,
      },
      returnKey: '',
    });

    await this.mizuClient?.logout();
  }

  async signAndSubmitTransaction(transaction: InputGenerateTransactionPayloadData) {
    /**
     * Check if user is logged in first.
     *
     * if it is, direct to create order.
     * Create order and confirm it.
     *
     * send code, payload
     */
    try {
      // create order by code
      const orderId = await this.mizuClient?.createOrderWithCode({
        code: this.authCode,
        payload: transaction,
      });

      if (!orderId) throw new Error('Transaction creation failed');

      const orderResult: any = await this.startWebChannel({
        url: 'checkLogin',
        redirectURL: '/walletv2/transaction',
        metadata: {
          manifestURL: this.manifestURL,
          network: this.network,
          appId: this.mizuClient.appId,
          orderId,
          transaction,
        },
        returnKey: 'hash',
      });

      return orderResult;
    } catch (error: any) {
      console.error(error);
      throw new Error(ErrorMessage(error));
    }
  }

  async signTransaction(transaction: AnyRawTransaction) {
    try {
      /**
       *
       * Check if user is logged in first.
       */

      const signResult: any = await this.startWebChannel({
        url: 'checkLogin',
        redirectURL: '/walletv2/sign_transaction',
        metadata: {
          manifestURL: this.manifestURL,
          network: this.network,
          appId: this.mizuClient.appId,
          transaction: transaction.bcsToHex().toStringWithoutPrefix(),
        },
        returnKey: 'signature',
      });

      return {
        signature: signResult.signature,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(ErrorMessage(error));
    }
  }

  async signMessage(args: { message: string; nonce: string }) {
    try {
      /**
       *
       * Check if user is logged in first.
       */

      const signResult: any = await this.startWebChannel({
        url: 'checkLogin',
        redirectURL: '/walletv2/sign_message',
        metadata: {
          manifestURL: this.manifestURL,
          network: this.network,
          appId: this.mizuClient.appId,
          messageInfo: {
            ...args,
          },
        },
        returnKey: 'message',
      });

      return {
        data: {
          ...signResult.message,
        },
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(ErrorMessage(error));
    }
  }
}

export default WebsiteHelper;

