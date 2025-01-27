var J = Object.defineProperty;
var W = (e, t, n) => t in e ? J(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var u = (e, t, n) => W(e, typeof t != "symbol" ? t + "" : t, n);
import w from "tweetnacl-util";
import m from "tweetnacl";
async function B(e, t) {
  const n = e.getReader();
  let r;
  for (; !(r = await n.read()).done; )
    t(r.value);
}
function I(e) {
  let t, n, r, o = !1;
  return function(c) {
    t === void 0 ? (t = c, n = 0, r = -1) : t = z(t, c);
    const i = t.length;
    let a = 0;
    for (; n < i; ) {
      o && (t[n] === 10 && (a = ++n), o = !1);
      let d = -1;
      for (; n < i && d === -1; ++n)
        switch (t[n]) {
          case 58:
            r === -1 && (r = n - a);
            break;
          case 13:
            o = !0;
          case 10:
            d = n;
            break;
        }
      if (d === -1)
        break;
      e(t.subarray(a, d), r), a = n, r = -1;
    }
    a === i ? t = void 0 : a !== 0 && (t = t.subarray(a), n -= a);
  };
}
function q(e, t, n) {
  let r = N();
  const o = new TextDecoder();
  return function(c, i) {
    if (c.length === 0)
      n == null || n(r), r = N();
    else if (i > 0) {
      const a = o.decode(c.subarray(0, i)), d = i + (c[i + 1] === 32 ? 2 : 1), l = o.decode(c.subarray(d));
      switch (a) {
        case "data":
          r.data = r.data ? r.data + `
` + l : l;
          break;
        case "event":
          r.event = l;
          break;
        case "id":
          e(r.id = l);
          break;
        case "retry":
          const g = parseInt(l, 10);
          isNaN(g) || t(r.retry = g);
          break;
      }
    }
  };
}
function z(e, t) {
  const n = new Uint8Array(e.length + t.length);
  return n.set(e), n.set(t, e.length), n;
}
function N() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
var Z = function(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
};
const P = "text/event-stream", V = 1e3, j = "last-event-id";
function R(e, t) {
  var { signal: n, headers: r, onopen: o, onmessage: s, onclose: c, onerror: i, openWhenHidden: a, fetch: d } = t, l = Z(t, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise((g, A) => {
    const h = Object.assign({}, r);
    h.accept || (h.accept = P);
    let b;
    function L() {
      b.abort(), document.hidden || O();
    }
    a || document.addEventListener("visibilitychange", L);
    let H = V, k = 0;
    function T() {
      document.removeEventListener("visibilitychange", L), window.clearTimeout(k), b.abort();
    }
    n == null || n.addEventListener("abort", () => {
      T(), g();
    });
    const D = d ?? window.fetch, F = o ?? Q;
    async function O() {
      var U;
      b = new AbortController();
      try {
        const v = await D(e, Object.assign(Object.assign({}, l), { headers: h, signal: b.signal }));
        await F(v), await B(v.body, I(q((y) => {
          y ? h[j] = y : delete h[j];
        }, (y) => {
          H = y;
        }, s))), c == null || c(), T(), g();
      } catch (v) {
        if (!b.signal.aborted)
          try {
            const y = (U = i == null ? void 0 : i(v)) !== null && U !== void 0 ? U : H;
            window.clearTimeout(k), k = window.setTimeout(O, y);
          } catch (y) {
            T(), A(y);
          }
      }
    }
    O();
  });
}
function Q(e) {
  const t = e.headers.get("content-type");
  if (!(t != null && t.startsWith(P)))
    throw new Error(`Expected content-type to be ${P}, Actual: ${t}`);
}
function X(e, t) {
  const n = w.encodeBase64(e);
  return t ? encodeURIComponent(n) : n;
}
function Y(e, t) {
  return t && (e = decodeURIComponent(e)), w.decodeBase64(e);
}
function S(e, t = !1) {
  let n;
  return e instanceof Uint8Array ? n = e : (typeof e != "string" && (e = JSON.stringify(e)), n = w.decodeUTF8(e)), X(n, t);
}
function M(e, t = !1) {
  const n = Y(e, t);
  return {
    toString() {
      return w.encodeUTF8(n);
    },
    toObject() {
      try {
        return JSON.parse(w.encodeUTF8(n));
      } catch {
        return null;
      }
    },
    toUint8Array() {
      return n;
    }
  };
}
const se = {
  encode: S,
  decode: M
};
function E(e, t) {
  const n = new Uint8Array(e.length + t.length);
  return n.set(e), n.set(t, e.length), n;
}
function G(e, t) {
  if (t >= e.length)
    throw new Error("Index is out of buffer");
  const n = e.slice(0, t), r = e.slice(t);
  return [n, r];
}
function f(e) {
  let t = "";
  return e.forEach((n) => {
    t += ("0" + (n & 255).toString(16)).slice(-2);
  }), t;
}
function p(e) {
  if (e.length % 2 !== 0)
    throw new Error(`Cannot convert ${e} to bytesArray`);
  const t = new Uint8Array(e.length / 2);
  for (let n = 0; n < e.length; n += 2)
    t[n / 2] = parseInt(e.slice(n, n + 2), 16);
  return t;
}
function ie() {
  var e;
  return !!((e = process == null ? void 0 : process.versions) != null && e.node);
}
class $ {
  constructor(t) {
    u(this, "nonceLength", 24);
    u(this, "keyPair");
    u(this, "sessionId");
    this.keyPair = t ? this.createKeypairFromString(t) : this.createKeypair(), this.sessionId = f(this.keyPair.publicKey);
  }
  createKeypair() {
    return m.box.keyPair();
  }
  createKeypairFromString(t) {
    return {
      publicKey: p(t.publicKey),
      secretKey: p(t.secretKey)
    };
  }
  createNonce() {
    return m.randomBytes(this.nonceLength);
  }
  encrypt(t, n) {
    const r = new TextEncoder().encode(t), o = this.createNonce(), s = m.box(r, o, n, this.keyPair.secretKey);
    return E(o, s);
  }
  decrypt(t, n) {
    const [r, o] = G(t, this.nonceLength), s = m.box.open(
      o,
      r,
      n,
      this.keyPair.secretKey
    );
    if (!s)
      throw new Error(
        `Decryption error: 
 message: ${t.toString()} 
 sender pubkey: ${n.toString()} 
 keypair pubkey: ${this.keyPair.publicKey.toString()} 
 keypair secretkey: ${this.keyPair.secretKey.toString()}`
      );
    return new TextDecoder().decode(s);
  }
  stringifyKeypair() {
    return {
      publicKey: f(this.keyPair.publicKey),
      secretKey: f(this.keyPair.secretKey)
    };
  }
  static async generateKeyPairByString(t) {
    const r = new TextEncoder().encode(t), o = await crypto.subtle.digest("SHA-256", r), s = new Uint8Array(o), c = m.box.keyPair.fromSecretKey(s.slice(0, 32));
    return {
      publicKey: f(c.publicKey),
      secretKey: f(c.secretKey)
    };
  }
  static isSameKeypair(t, n) {
    return !t || !n ? !1 : t.publicKey === n.publicKey && t.secretKey === n.secretKey;
  }
}
const K = new AbortController(), x = "https://bridge.mz.xyz", C = {
  CONNECT: "[MizuWallet SSE Connect]"
};
var _ = /* @__PURE__ */ ((e) => (e[e.SUCCESS = 0] = "SUCCESS", e[e.ERROR = 1] = "ERROR", e))(_ || {}), ee = /* @__PURE__ */ ((e) => (e[e.MIZU = 0] = "MIZU", e[e.THIRD_PARTY = 1] = "THIRD_PARTY", e))(ee || {}), te = /* @__PURE__ */ ((e) => (e[e.START = 0] = "START", e[e.DATA = 1] = "DATA", e[e.FULFILLED = 2] = "FULFILLED", e[e.REJECT = 3] = "REJECT", e[e.CANCEL = 4] = "CANCEL", e))(te || {});
const ce = () => {
  K.abort();
}, ae = async (e) => {
  const t = new URLSearchParams(), n = new $(e.keypair);
  t.append("client_id", n.sessionId.toString()), t.append("to", e.to.toString()), t.append("ttl", e.ttl.toString());
  const r = JSON.stringify(e.content), o = p(e.to.toString()), s = n.encrypt(r, o), c = f(s);
  await R(`${x}/bridge/message?${t.toString()}`, {
    method: "POST",
    openWhenHidden: !1,
    headers: {
      Accept: "text/event-stream"
    },
    onopen(i) {
      return i.ok && i.status === 200 ? (console.log("Connection made ", i), Promise.resolve()) : (console.log("Client side error ", i), Promise.reject());
    },
    onmessage() {
    },
    onclose() {
      console.log("Connection closed by the server");
    },
    onerror(i) {
      console.log("There was an error from server", i);
    },
    body: c,
    signal: K.signal
  });
}, de = async (e) => {
  const t = new URLSearchParams();
  return t.append("client_id", e.keypair.publicKey.toString()), new Promise(async (n, r) => {
    await R(`${x}/bridge/events?${t.toString()}`, {
      openWhenHidden: !1,
      onopen(o) {
        return o.status === 200 ? (console.info(`${C.CONNECT} Opened`), Promise.resolve()) : (console.error(`${C.CONNECT} Failed to open`), Promise.reject());
      },
      onmessage(o) {
        try {
          if (o.data && o.data.startsWith("{")) {
            const s = JSON.parse(o.data);
            if (s.message) {
              const c = new $({
                ...e.keypair
              }), i = s.message, a = p(i), d = c.decrypt(
                a,
                p(s.from.toString())
              ), l = JSON.parse(d);
              n(l);
            }
          }
        } catch (s) {
          console.error(s), r(s);
        }
      },
      signal: K.signal
    });
  });
}, le = async (e) => {
  const t = new URLSearchParams();
  t.append("client_id", e.keypair.publicKey.toString()), R(`${x}/bridge/events?${t.toString()}`, {
    openWhenHidden: !1,
    onopen(n) {
      return n.status === 200 ? (console.info(`${C.CONNECT} Opened`), Promise.resolve()) : (console.error(`${C.CONNECT} Failed to open`), Promise.reject());
    },
    onmessage(n) {
      var r, o;
      try {
        if (n.data && n.data.startsWith("{")) {
          const s = JSON.parse(n.data);
          if (s.message) {
            const c = new $({
              ...e.keypair
            }), i = s.message, a = p(i), d = c.decrypt(
              a,
              p(s.from.toString())
            ), l = JSON.parse(d);
            (e.nonce && l.nonce == e.nonce || !e.nonce) && ((r = e.callback) == null || r.call(e, {
              status: 0,
              message: l
            }));
          }
        }
      } catch (s) {
        console.error(s), (o = e.callback) == null || o.call(e, {
          status: 1,
          error: s
        });
      }
    },
    signal: K.signal
  });
};
class ye {
  constructor(t) {
    u(this, "from", "");
    u(this, "nonce", "");
    u(this, "body");
    u(this, "type", "");
    Object.assign(this, t), this.body = t.body;
  }
}
export {
  se as Base64,
  _ as CALLBACK_MESSAGE_STATUS,
  ee as SESSION_MESSAGE_FROM,
  te as SESSION_MESSAGE_TYPE,
  $ as SessionCrypto,
  de as SessionListener,
  le as SessionListenerLong,
  ye as SessionMessage,
  ae as SessionPost,
  ce as abortSession,
  E as concatUint8Arrays,
  p as hexToByteArray,
  ie as isNode,
  G as splitToUint8Arrays,
  f as toHexString
};
