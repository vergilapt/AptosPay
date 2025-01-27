import { gql } from 'graphql-request';

/**
 * For login
 */
export const TGLoginMutation = gql`
  mutation TGLoginMutation($appId: String = "", $initData: String = "") {
    tgLogin(appId: $appId, initData: $initData)
  }
`;

export const TGLoginWithShortIDMutation = gql`
  mutation TGLoginMutation($appId: String = "", $initData: String = "", $shortId: String = "") {
    tgLogin(appId: $appId, initData: $initData, shortId: $shortId)
  }
`;

export const TGWidgetLoginMutation = gql`
  mutation tgWidgetLoginMutation($appId: String = "", $authData: String = "") {
    tgWidgetLogin(appId: $appId, authData: $authData)
  }
`;

export const TGWidgetLoginWithShortIDMutation = gql`
  mutation tgWidgetLoginMutation(
    $appId: String = ""
    $authData: String = ""
    $shortId: String = ""
  ) {
    tgWidgetLogin(appId: $appId, authData: $authData, shortId: $shortId)
  }
`;

/**
 * For getting user by TG ID
 */
export const CheckUserIsExistQueryByTgId = gql`
  query CheckUserIsExistQueryByTgId {
    telegramUser {
      walletUserId
      tgId
    }
  }
`;

/**
 * For getting user wallet address
 */
export const UserWalletAddressQuery = gql`
  query UserWalletAddressQuery($id: uuid = "") {
    walletUserByPk(id: $id) {
      sub_wallets {
        address
        publicKey
      }
      google_user {
        email
      }
      telegram_user {
        firstName
        lastName
        photoUrl
        userName
      }
      twitter_user {
        name
        userName
      }
    }
  }
`;

/**
 * For creating order
 */
export const createOrderMutation = gql`
  mutation CreateOrderQuery($appId: String = "", $payload: String = "") {
    createOrder(appId: $appId, payload: $payload, encode: "base64")
  }
`;

/**
 * For sign signature
 */
export const createSignatureMutation = gql`
  mutation createSignatureMutation($appId: String = "", $transactionHex: String = "") {
    createSignature(appId: $appId, transactionHex: $transactionHex)
  }
`;

/**
 * For sign message
 */
export const createSignMessageMutation = gql`
  mutation createSignMessageMutation(
    $appId: String = ""
    $message: String = ""
    $nonce: String = ""
  ) {
    createSignMessage(appId: $appId, nonce: $nonce, message: $message) {
      fullMessage
      message
      nonce
      prefix
      signature
    }
  }
`;

/**
 * For simulate order
 */
export const simulateOrderQuery = gql`
  query simulateOrderQuery($payload: String = "") {
    simulateOrder(payload: $payload, encode: "base64")
  }
`;

/**
 * Confirm order
 */
export const confirmOrderQuery = gql`
  mutation confirmOrderQuery($orderId: String = "") {
    confirmOrder(orderId: $orderId)
  }
`;

/**
 * Fetch Order By ID
 */
export const fetchOrderQuery = gql`
  query fetchOrderQuery($id: uuid = "") {
    orderByPk(id: $id) {
      id
      createdAt
      payload
      decodedPayload
      status
      type
      updatedAt
      walletUserId
      applicationId
      hash
      type
      transactions {
        hash
        type
      }
    }
  }
`;

/**
 * Fetch order hash
 */
export const fetchOrderHashQuery = gql`
  query fetchOrderHashQuery($orderId: String = "") {
    getOrderHash(orderId: $orderId)
  }
`;

/**
 * Fetch order list
 */
export const fetchOrderListQuery = gql`
  query fetchOrderListQuery(
    $walletUserId: uuid = ""
    $limit: Int = 10
    $offset: Int = 0
    $status: [Int] = []
  ) {
    order(
      where: { walletUserId: { _eq: $walletUserId } }
      limit: $limit
      offset: $offset
      orderBy: { createdAt: DESC }
    ) {
      applicationId
      createdAt
      id
      payload
      decodedPayload
      status
      transactionSeqNo
      type
      updatedAt
      walletUserId
      hash
      gasFee
      transactions {
        hash
        gasFee
        createdAt
        status
        type
      }
    }
    orderAggregate(where: { walletUserId: { _eq: $walletUserId } }) {
      aggregate {
        count
      }
    }
  }
`;

/**
 * Bind Google
 */
export const bindGoogleQuery = gql`
  mutation bindGoogleQuery($address: String = "", $idToken: String = "") {
    googleBind(address: $address, idToken: $idToken)
  }
`;

/**
 * Create order with code
 */
export const createOrderWithCodeMutation = gql`
  mutation createOrderWithCodeMutation(
    $appId: String = ""
    $authCode: String = ""
    $payload: String = ""
  ) {
    createOrderWithCode(appId: $appId, authCode: $authCode, payload: $payload, encode: "base64")
  }
`;

