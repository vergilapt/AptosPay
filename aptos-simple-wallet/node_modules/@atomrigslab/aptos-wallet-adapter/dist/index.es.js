import { SigningScheme as A, Secp256k1PublicKey as v, Secp256k1Signature as d, AccountAuthenticatorSingleKey as m, AnyPublicKey as y, AnySignature as P } from "@aptos-labs/ts-sdk";
import { APTOS_CHAINS as g, UserResponseStatus as c, registerWallet as p } from "@aptos-labs/wallet-standard";
class b {
  constructor(t) {
    this.address = t.accountAddress.toString(), this.publicKey = t.publicKey.toUint8Array(), this.chains = g, this.features = ["aptos:connect"], this.signingScheme = A.SingleKey;
  }
}
class h {
  constructor(t = {}) {
    this.option = t, this.url = "https://www.twallet.ai", this.version = "1.0.0", this.name = "T wallet", this.icon = "data:image/png;base64,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", this.chains = g, this.accounts = [], this.provider = typeof window < "u" ? window.dekey : void 0, this.initializing = !1, this.account = async () => {
      var e;
      const s = await ((e = this.provider) == null ? void 0 : e.request({
        method: "aptos_account"
      }));
      return {
        address: s.address,
        publicKey: s.publicKey
      };
    }, this.connect = async () => {
      var n, r, o;
      if (!this.initializing) {
        this.initializing = !0, await import(
          // @ts-ignore
          "./index-DRmafxZ_.mjs"
        );
        const a = f((n = this.option) == null ? void 0 : n.env);
        if (!a)
          throw this.initializing = !1, new Error(`walletDomain not found with env: ${(r = this.option) == null ? void 0 : r.env}`);
        if (!(window != null && window.initializeDekeyProvider))
          throw this.initializing = !1, new Error("initializeDekeyProvider not found");
        await window.initializeDekeyProvider(a), this.provider = window.dekey;
      }
      if (!await this.checkProvider())
        return {
          status: c.REJECTED
        };
      const e = await ((o = this.provider) == null ? void 0 : o.request({
        method: "aptos_requestAccounts"
      }));
      return e ? {
        status: c.APPROVED,
        args: {
          address: e.address,
          publicKey: e.publicKey
        }
      } : (await new Promise((a) => setTimeout(a, 2e3)), {
        status: c.REJECTED
      });
    }, this.checkProvider = async () => new Promise((s) => {
      setTimeout(() => {
        s(!1);
      }, 1e4);
      const e = setInterval(() => {
        this.provider && (s(!0), clearInterval(e));
      }, 100);
    }), this.network = async () => {
      const { chainId: s, name: e, url: n } = await this.provider.request({
        method: "aptos_network"
      });
      return {
        name: e,
        chainId: s,
        url: n
      };
    }, this.disconnect = async () => Promise.resolve(), this.signTransaction = async (s, e) => {
      try {
        const n = s.rawTransaction.bcsToBytes(), { concatedSig: r, uncompressedPubkey: o } = await this.provider.request({
          method: "aptos_signTransaction",
          params: [Array.from(n)]
        }), a = new v(o), l = new d(r), w = new m(
          new y(a),
          new P(l)
        );
        return Promise.resolve({
          status: c.APPROVED,
          args: w
        });
      } catch (n) {
        throw n.message;
      }
    }, this.signAndSubmitTransaction = async (s) => {
      const e = s.rawTransaction.bcsToBytes(), n = await this.provider.request({
        method: "aptos_signAndSubmitTransaction",
        params: [Array.from(e)]
      });
      return {
        status: c.APPROVED,
        args: n
      };
    }, this.signMessage = async (s) => {
      var e;
      try {
        const n = await ((e = this.provider) == null ? void 0 : e.request({
          method: "aptos_signMessage",
          params: [s.message]
        }));
        return {
          status: c.APPROVED,
          args: n
        };
      } catch (n) {
        throw n.message;
      }
    }, this.onAccountChange = async () => Promise.resolve(), this.onNetworkChange = async (s) => {
      const e = async () => {
        const n = await this.network(), { name: r, chainId: o, url: a } = n;
        s({
          name: r,
          chainId: o,
          url: a
        });
      };
      this.provider.on("chainChanged", () => {
        e();
      });
    }, !(t != null && t.env) && (t == null ? void 0 : t.registerWallet) === !0 && u(this);
  }
  get features() {
    return {
      "aptos:connect": {
        version: "1.0.0",
        connect: this.connect
      },
      "aptos:network": {
        version: "1.0.0",
        network: this.network
      },
      "aptos:disconnect": {
        version: "1.0.0",
        disconnect: this.disconnect
      },
      "aptos:signTransaction": {
        version: "1.0.0",
        signTransaction: this.signTransaction
      },
      "aptos:signAndSubmitTransaction": {
        version: "1.0.0",
        signAndSubmitTransaction: this.signAndSubmitTransaction
      },
      "aptos:signMessage": {
        version: "1.0.0",
        signMessage: this.signMessage
      },
      "aptos:onAccountChange": {
        version: "1.0.0",
        onAccountChange: this.onAccountChange
      },
      "aptos:onNetworkChange": {
        version: "1.0.0",
        onNetworkChange: this.onNetworkChange
      },
      "aptos:account": {
        version: "1.0.0",
        account: this.account
      }
    };
  }
}
const f = (i) => i === "LOCAL" ? "http://localhost:5173" : i === "DEV" ? "https://dev.twallet.ai" : i === "QA" ? "https://qa.twallet.ai" : "https://www.twallet.ai", u = (i) => {
  typeof window > "u" || p(i);
};
class C extends h {
  constructor(t = {}) {
    super({ ...t, env: "LOCAL" }), this.url = "http://localhost:5173", this.name = "Local T wallet", (t == null ? void 0 : t.registerWallet) === !0 && u(this);
  }
}
class W extends h {
  constructor(t = {}) {
    super({ ...t, env: "DEV" }), this.url = "https://dev.twallet.ai", this.name = "Dev T wallet", (t == null ? void 0 : t.registerWallet) === !0 && u(this);
  }
}
class F extends h {
  constructor(t = {}) {
    super({ ...t, env: "QA" }), this.url = "https://qa.twallet.ai", this.name = "Qa T wallet", (t == null ? void 0 : t.registerWallet) === !0 && u(this);
  }
}
export {
  W as DevTWallet,
  C as LocalTWallet,
  b as MyWalletAccount,
  F as QaTWallet,
  h as TWallet
};
