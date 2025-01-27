import { Network } from '@aptos-labs/ts-sdk';
import { ORDER_STATUS } from './config/enum';

export declare const GRAPHQL_URL: Record<'mainnet' | 'testnet', string>;
export type JWTToken = string;
interface PaginationSettings {
    limit?: number;
    offset?: number;
}
/**
 * MizuWallet SDK Core Client
 *
 *
 *
 */
export declare class Mizu {
    appId: string;
    network: Network.MAINNET | Network.TESTNET;
    graphqlEndPoint: string;
    userId: string;
    jwtToken: string;
    initialized: boolean;
    /**
     * Initialize MizuWallet SDK Core Client
     *
     * @param args.appId - Application ID
     * @param args.network - Network.MAINNET | Network.TESTNET
     */
    constructor(args: {
        appId: string;
        network: Network.MAINNET | Network.TESTNET;
    });
    /**
     * Check if MizuWallet SDK Core Client is initialized
     */
    private checkInitialized;
    /**
     * Check if JWT Token is available
     */
    private checkJWTToken;
    /**
     * Decode JWT Token
     */
    static decodeJWTToken(tokenStr: string): any[];
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
    }): Mizu;
    /**
     * Update network
     * @param network - Network.MAINNET | Network.TESTNET
     */
    updateNetwork(network: Network.MAINNET | Network.TESTNET): void;
    /**
     * Get network info
     */
    get networkInfo(): {
        name: Network.MAINNET | Network.TESTNET;
        chainId: number;
        url: string;
    };
    /**
     *
     *
     */
    login(): void;
    /**
     * Login in TG
     *
     * @param data - initial data of TG, or stringified widget user object
     * @param opt.isWidget - is from login widget
     */
    loginInTG(data: string, opt?: {
        isWidget?: boolean;
        shortID?: string;
    }): Promise<void>;
    /**
     * Check if user exist by TG ID
     *
     * @param tgId
     * @returns
     */
    isUserExistByTgID(tgId: string): Promise<boolean>;
    /**
     * fetch user wallet address
     *
     * @returns
     */
    getUserWalletAddress(): Promise<any>;
    /**
     * fetch user wallet address
     *
     * @returns
     */
    getUserInfo(): Promise<any>;
    /**
     * Logout
     */
    logout(): void;
    /**
     *
     * @param args.redirect_uri
     */
    startBindGoogle(args: {
        redirect_uri: string;
    }): Promise<void>;
    /**
     *
     * @param args.address keyless address
     * @param args.idToken google jwt
     * @returns
     */
    bindGoogleAccount(args: {
        address: string;
        idToken: string;
    }): Promise<any>;
    /**
     * Simulate Order
     *
     * @param args.payload TransactionPayload
     */
    simulateOrder(args: {
        payload: any;
    }): Promise<any>;
    /**
     * Create Order
     *
     * @param args.payload TransactionPayload
     * @returns
     */
    createOrder(args: {
        payload: any;
    }): Promise<any>;
    /**
     * Create Order with Code
     *
     * @param args.payload
     * @param args.code
     * @returns
     */
    createOrderWithCode(args: {
        payload: any;
        code: string;
    }): Promise<any>;
    /**
     * Create Signature
     *
     * @param args.transactionHex AnyRawTransaction.bscToHex().toStringWithoutPrefix()
     * @returns
     */
    createSignature(args: {
        transactionHex: any;
    }): Promise<any>;
    /**
     * Sign Message
     *
     * @param args.message message to sign
     * @param args.nonce nonce
     * @returns
     */
    signMessage(args: {
        message: string;
        nonce: string;
    }): Promise<any>;
    /**
     * User interactive
     *
     * @param args.orderId Order ID
     * return bool
     */
    confirmOrder(args: {
        orderId: string;
    }): Promise<any>;
    /**
     * Fetch Order By ID
     *
     * @param args.id order.id
     * @returns
     */
    fetchOrder(args: {
        id: string;
    }): Promise<any>;
    /**
     * Wait for order
     *
     * @param args.orderId order.id
     * @returns
     */
    waitForOrder(args: {
        orderId: string;
    }): Promise<any>;
    /**
     * fetch order list
     *
     * @param args.walletUserId
     * @param args.limit
     * @param args.offset
     *
     * @returns
     */
    fetchOrderList(fetchParams?: PaginationSettings & {
        status: ORDER_STATUS[];
    }): Promise<{
        data: any;
        pagination: {
            total: any;
            limit: number;
            offset: number;
        };
    }>;
}
export {};
