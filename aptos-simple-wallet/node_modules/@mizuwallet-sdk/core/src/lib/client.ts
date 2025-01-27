import { Network } from '@aptos-labs/ts-sdk';
import { Base64 } from '@mizuwallet-sdk/protocol';
import request from 'graphql-request';
import { decodeJWT } from '../helpers/JWTHelper';
import {
  CheckUserIsExistQueryByTgId,
  TGLoginMutation,
  TGLoginWithShortIDMutation,
  TGWidgetLoginMutation,
  TGWidgetLoginWithShortIDMutation,
  UserWalletAddressQuery,
  bindGoogleQuery,
  confirmOrderQuery,
  createOrderMutation,
  createOrderWithCodeMutation,
  createSignMessageMutation,
  createSignatureMutation,
  fetchOrderListQuery,
  fetchOrderQuery,
  simulateOrderQuery,
} from '../query';
import { payloadRebuild } from '../utils';
import { ORDER_STATUS } from './config/enum';

export const GRAPHQL_URL: Record<'mainnet' | 'testnet', string> = {
  testnet: 'https://hasura-wallet.mizu.one/v1/graphql',
  mainnet: 'https://api.mz.xyz/v1/graphql/',
};

export type JWTToken = string;

interface PaginationSettings {
  limit?: number;
  offset?: number;
}

const KEYLESS_GOOGLE_SITE_URL = 'https://mizu.io/keyless_google';

/**
 * MizuWallet SDK Core Client
 *
 *
 *
 */
export class Mizu {
  appId: string;
  network: Network.MAINNET | Network.TESTNET;
  graphqlEndPoint: string = '';

  userId: string = '';
  jwtToken: string = '';
  initialized: boolean = false;

  /**
   * Initialize MizuWallet SDK Core Client
   *
   * @param args.appId - Application ID
   * @param args.network - Network.MAINNET | Network.TESTNET
   */
  constructor(args: { appId: string; network: Network.MAINNET | Network.TESTNET }) {
    if (!args.appId) throw new Error('appId is required');
    if (!args.network) throw new Error('network is required');

    this.appId = args.appId;
    this.network = args.network;
    this.graphqlEndPoint = GRAPHQL_URL[this.network];

    // after all
    this.initialized = true;
  }

  /**
   * Check if MizuWallet SDK Core Client is initialized
   */
  private checkInitialized() {
    if (!this.initialized) throw new Error('MizuWallet SDK Core Client not initialized');
  }

  /**
   * Check if JWT Token is available
   */
  private checkJWTToken() {
    if (!this.jwtToken) throw new Error('JWT Token not found. Please login first.');
  }

  /**
   * Decode JWT Token
   */
  static decodeJWTToken(tokenStr: string) {
    const [userId, jwt]: any = decodeJWT(tokenStr);
    return [userId, jwt];
  }

  /**
   * Clone MizuWallet SDK Core Client
   *
   * @param args.appId - Application ID
   * @param args.network - Network.MAINNET | Network.TESTNET
   * @param args.jwtToken - JWT Token
   */
  static clone(args: {
    appId: string;
    network: Network.MAINNET | Network.TESTNET;
    jwtToken: string;
  }) {
    if (!args.appId) throw new Error('appId is required');
    if (!args.network) throw new Error('network is required');
    if (!args.jwtToken) throw new Error('jwtToken is required');

    const clone: Mizu = new Mizu({ appId: args.appId, network: args.network });
    [clone.userId, clone.jwtToken] = Mizu.decodeJWTToken(args.jwtToken);
    return clone;
  }

  /**
   * Update network
   * @param network - Network.MAINNET | Network.TESTNET
   */
  updateNetwork(network: Network.MAINNET | Network.TESTNET) {
    this.checkInitialized();
    this.network = network;
    this.graphqlEndPoint = GRAPHQL_URL[this.network];
  }

  /**
   * Get network info
   */
  get networkInfo() {
    return {
      name: this.network,
      chainId: this.network === Network.MAINNET ? 1 : 2,
      url:
        this.network === Network.MAINNET
          ? 'https://fullnode.mainnet.aptoslabs.com/v1'
          : 'https://fullnode.testnet.aptoslabs.com/v1',
    };
  }

  /**
   *
   *
   */
  login() {
    this.checkInitialized();
  }

  /**
   * Login in TG
   *
   * @param data - initial data of TG, or stringified widget user object
   * @param opt.isWidget - is from login widget
   */
  async loginInTG(data: string, opt?: { isWidget?: boolean; shortID?: string }) {
    this.checkInitialized();

    // if isWidget, then use TGWidgetLoginMutation
    let tokenStr = '';
    if (opt?.isWidget) {
      const result: any = await request({
        url: this.graphqlEndPoint,
        document: opt?.shortID ? TGWidgetLoginWithShortIDMutation : TGWidgetLoginMutation,
        variables: {
          appId: this.appId,
          authData: Base64.encode(data),
          ...(opt?.shortID ? { shortId: opt.shortID } : {}),
        },
      });

      tokenStr = result.tgWidgetLogin;
    } else {
      const result: any = await request({
        url: this.graphqlEndPoint,
        document: opt?.shortID ? TGLoginWithShortIDMutation : TGLoginMutation,
        variables: {
          appId: this.appId,
          initData: data,
          ...(opt?.shortID ? { shortId: opt.shortID } : {}),
        },
      });
      tokenStr = result.tgLogin;
    }

    try {
      [this.userId, this.jwtToken] = Mizu.decodeJWTToken(tokenStr);
    } catch (e) {
      this.logout();
    }
  }

  /**
   * Check if user exist by TG ID
   *
   * @param tgId
   * @returns
   */
  async isUserExistByTgID(tgId: string) {
    this.checkInitialized();
    if (!tgId) throw new Error('tgId is required');

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: CheckUserIsExistQueryByTgId,
      variables: {},
      requestHeaders: {
        'x-hasura-tg-id': tgId,
      },
    });

    return result?.telegramUser?.length > 0;
  }

  /**
   * fetch user wallet address
   *
   * @returns
   */
  async getUserWalletAddress() {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: UserWalletAddressQuery,
      variables: {
        id: this.userId,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result.walletUserByPk.sub_wallets[0].address;
  }

  /**
   * fetch user wallet address
   *
   * @returns
   */
  async getUserInfo() {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: UserWalletAddressQuery,
      variables: {
        id: this.userId,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result.walletUserByPk;
  }

  /**
   * Logout
   */
  logout() {
    this.userId = '';
    this.jwtToken = '';
  }

  /**
   *
   * @param args.redirect_uri
   */
  async startBindGoogle(args: { redirect_uri: string }) {
    this.checkInitialized();
    this.checkJWTToken();

    const urlSearchParams = new URLSearchParams({
      token: this.jwtToken,
      appId: this.appId,
      ...args,
    });

    window.open(`${KEYLESS_GOOGLE_SITE_URL}?${urlSearchParams.toString()}`, '_blank');
  }

  /**
   *
   * @param args.address keyless address
   * @param args.idToken google jwt
   * @returns
   */
  async bindGoogleAccount(args: { address: string; idToken: string }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: bindGoogleQuery,
      variables: {
        ...args,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result;
  }

  /**
   * Simulate Order
   *
   * @param args.payload TransactionPayload
   */
  async simulateOrder(args: { payload: any }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: simulateOrderQuery,
      variables: {
        payload: Base64.encode(payloadRebuild(args.payload)),
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result?.simulateOrder;
  }

  /**
   * Create Order
   *
   * @param args.payload TransactionPayload
   * @returns
   */
  async createOrder(args: { payload: any }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: createOrderMutation,
      variables: {
        appId: this.appId,
        payload: Base64.encode(payloadRebuild(args.payload)),
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result?.createOrder;
  }

  /**
   * Create Order with Code
   *
   * @param args.payload
   * @param args.code
   * @returns
   */
  async createOrderWithCode(args: { payload: any; code: string }) {
    this.checkInitialized();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: createOrderWithCodeMutation,
      variables: {
        appId: this.appId,
        authCode: args.code,
        payload: Base64.encode(payloadRebuild(args.payload)),
      },
      requestHeaders: {},
    });

    return result?.createOrderWithCode;
  }

  /**
   * Create Signature
   *
   * @param args.transactionHex AnyRawTransaction.bscToHex().toStringWithoutPrefix()
   * @returns
   */
  async createSignature(args: { transactionHex: any }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: createSignatureMutation,
      variables: {
        appId: this.appId,
        transactionHex: args.transactionHex,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result?.createSignature;
  }

  /**
   * Sign Message
   *
   * @param args.message message to sign
   * @param args.nonce nonce
   * @returns
   */
  async signMessage(args: { message: string; nonce: string }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: createSignMessageMutation,
      variables: {
        appId: this.appId,
        ...args,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result?.createSignMessage;
  }

  /**
   * User interactive
   *
   * @param args.orderId Order ID
   * return bool
   */
  async confirmOrder(args: { orderId: string }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: confirmOrderQuery,
      variables: {
        orderId: args.orderId,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return result?.confirmOrder;
  }

  /**
   * Fetch Order By ID
   *
   * @param args.id order.id
   * @returns
   */
  async fetchOrder(args: { id: string }) {
    this.checkInitialized();
    this.checkJWTToken();

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: fetchOrderQuery,
      variables: {
        id: args.id,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    if (!result.orderByPk) throw new Error('Order not found');

    return {
      ...result.orderByPk,
      payload: result.orderByPk.decodedPayload,
    };
  }

  /**
   * Wait for order
   *
   * @param args.orderId order.id
   * @returns
   */
  async waitForOrder(args: { orderId: string }) {
    let order = await this.fetchOrder({
      id: args.orderId,
    });
    let MAX_RETRY = 20;

    while (
      MAX_RETRY-- > 0 &&
      ![ORDER_STATUS.SUCCESS, ORDER_STATUS.FAIL, ORDER_STATUS.CANCELED].includes(order.status)
    ) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      order = await this.fetchOrder({
        id: args.orderId,
      });
    }

    if (order.status === ORDER_STATUS.FAIL) {
      throw new Error('Order failed');
    }

    return order;
  }

  /**
   * fetch order list
   *
   * @param args.walletUserId
   * @param args.limit
   * @param args.offset
   *
   * @returns
   */
  async fetchOrderList(fetchParams?: PaginationSettings & { status: ORDER_STATUS[] }) {
    this.checkInitialized();
    this.checkJWTToken();

    const { limit = 10, offset = 0 } = fetchParams || {};

    const result: any = await request({
      url: this.graphqlEndPoint,
      document: fetchOrderListQuery,
      variables: {
        walletUserId: this.userId,
        limit,
        offset,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    return {
      data: result?.order.map((order: any) => {
        let payloadStruct = {};
        try {
          payloadStruct = order.decodedPayload;
        } catch (error) {
          console.error(error);
        }

        return {
          ...order,
          payload: payloadStruct,
        };
      }),
      pagination: {
        total: result?.orderAggregate.aggregate.count,
        limit,
        offset,
      },
    };
  }
}

