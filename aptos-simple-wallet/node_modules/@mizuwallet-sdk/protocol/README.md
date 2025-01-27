# @mizuwallet-sdk/core

## Installation

```base
$ pnpm add @mizuwallet-sdk/core
```

## Usage

Initialized by **APP_ID**

```ts
import { Mizu } from '@mizuwallet-sdk/core';

const MIZU_WALLET_APP_ID = 'xxxxx';

// Initialization
const MizuClient = new Mizu({
  appId: MIZU_WALLET_APP_ID,
  // 'mainnet'  | 'testnet'
  network: 'mainnet',
});
```

Login In **Telegram** [[Docs of Telegram Mini App](https://core.telegram.org/bots/webapps#designing-mini-apps)]

```ts
// In Tg mini app
await MizuClient.loginInTG(window.Telegram.WebApp.initData);

// Login Widget
await MizuClient.loginInTG(
  JSON.stringify({
    id: 123,
    first_name: '',
    username: '',
    photo_url: 'https://t.me/i/userpic/320/abc.jpg',
    auth_date: 123,
    hash: '123',
  }),
  {
    isWidget: true,
  },
);
```

Logout

```ts
await MizuClient.logout();
```

Fetch User's Address

```ts
const address: string = await MizuClient.getUserWalletAddress();
```

### Functions

1. Create Order

The very first step is **Order Creation**, when your user try to interactive with the chain.

```ts
const orderId: any = await MizuClient.createOrder({
  payload: {
    function: '0x1::aptos_account::transfer_coins',
    typeArguments: ['0x1::aptos_coin::AptosCoin'],
    functionArguments: ['0x12345abcde', 10000000],
  },
});

// orderId: 1234-abcd-12312412
```

2. Confirm Order

Let the order confirmed by user, and the payload will be submitted to the chain.

```ts
await MizuClient.confirmOrder({
  orderId: '1234-abcd-12312412',
});
```

3. **since(1.1.3)** Fetch Order Info

```ts
await MizuClient.fetchOrder({
  orderId: '1234-abcd-12312412',
});
```

4. **since(1.1.3)** Wait for Order to settled (Status to be: SUCCESS/FAIL/CANCELED)

```ts
await MizuClient.waitForOrder({
  orderId: '1234-abcd-12312412',
});
```

5. Check is user existed.

```ts
await MizuClient.isUserExistByTgID('123123');
```

