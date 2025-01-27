var wr = Object.defineProperty;
var pr = (c, i, o) => i in c ? wr(c, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : c[i] = o;
var W = (c, i, o) => pr(c, typeof i != "symbol" ? i + "" : i, o);
import { Network as fr, AccountAddress as br, Deserializer as Er, AccountAuthenticator as vr } from "@aptos-labs/ts-sdk";
import { Mizu as mr } from "@mizuwallet-sdk/core";
import { Buffer as Ur } from "buffer";
var Rr = "aptos:devnet", Ir = "aptos:testnet", Cr = "aptos:localnet", Sr = "aptos:mainnet", Br = [Rr, Ir, Cr, Sr], st = ((c) => (c[c.Unauthorized = 4100] = "Unauthorized", c[c.InternalError = -30001] = "InternalError", c))(st || {}), Wt = Object.freeze({ 4100: { status: "Unauthorized", message: "The requested method and/or account has not been authorized by the user." }, [-30001]: { status: "Internal error", message: "Something went wrong within the wallet." } }), Rt = class nr extends Error {
  constructor(i, o) {
    var h, u;
    super(o ?? ((h = Wt[i]) == null ? void 0 : h.message) ?? "Unknown error occurred"), this.code = i, this.status = ((u = Wt[i]) == null ? void 0 : u.status) ?? "Unknown error", this.name = "AptosWalletError", Object.setPrototypeOf(this, nr.prototype);
  }
}, Ie = ((c) => (c.APPROVED = "Approved", c.REJECTED = "Rejected", c))(Ie || {});
const Tr = "https://t.me/mizuwallet_bot/mizuwallet", Lr = "https://t.me/mizuwallet_bot/mizuwallet_testnet", Or = (c) => c === fr.TESTNET ? Lr : Tr, Tt = {
  CONNECT: "[Mizu Wallet Connection] ",
  TRANSACTION: "[Mizu Wallet Transaction] "
}, Mr = "07418a1b-9574-4449-bd34-2146db60b05c", Nr = "0c460c1a-5175-4383-b1c2-35b934f5aa71", Pr = (c) => c === fr.TESTNET ? Nr : Mr, Kr = "Mizu Wallet", kr = "https://mizu.io", Qr = "data:image/png;base64,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";
var Dr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function or(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
function jr(c) {
  if (c.__esModule) return c;
  var i = c.default;
  if (typeof i == "function") {
    var o = function h() {
      return this instanceof h ? Reflect.construct(i, arguments, this.constructor) : i.apply(this, arguments);
    };
    o.prototype = i.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(c).forEach(function(h) {
    var u = Object.getOwnPropertyDescriptor(c, h);
    Object.defineProperty(o, h, u.get ? u : {
      enumerable: !0,
      get: function() {
        return c[h];
      }
    });
  }), o;
}
var ir = { exports: {} };
(function(c) {
  (function(i, o) {
    c.exports ? c.exports = o() : (i.nacl || (i.nacl = {}), i.nacl.util = o());
  })(Dr, function() {
    var i = {};
    function o(h) {
      if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(h))
        throw new TypeError("invalid encoding");
    }
    return i.decodeUTF8 = function(h) {
      if (typeof h != "string") throw new TypeError("expected string");
      var u, E = unescape(encodeURIComponent(h)), L = new Uint8Array(E.length);
      for (u = 0; u < E.length; u++) L[u] = E.charCodeAt(u);
      return L;
    }, i.encodeUTF8 = function(h) {
      var u, E = [];
      for (u = 0; u < h.length; u++) E.push(String.fromCharCode(h[u]));
      return decodeURIComponent(escape(E.join("")));
    }, typeof atob > "u" ? typeof Buffer.from < "u" ? (i.encodeBase64 = function(h) {
      return Buffer.from(h).toString("base64");
    }, i.decodeBase64 = function(h) {
      return o(h), new Uint8Array(Array.prototype.slice.call(Buffer.from(h, "base64"), 0));
    }) : (i.encodeBase64 = function(h) {
      return new Buffer(h).toString("base64");
    }, i.decodeBase64 = function(h) {
      return o(h), new Uint8Array(Array.prototype.slice.call(new Buffer(h, "base64"), 0));
    }) : (i.encodeBase64 = function(h) {
      var u, E = [], L = h.length;
      for (u = 0; u < L; u++) E.push(String.fromCharCode(h[u]));
      return btoa(E.join(""));
    }, i.decodeBase64 = function(h) {
      o(h);
      var u, E = atob(h), L = new Uint8Array(E.length);
      for (u = 0; u < E.length; u++) L[u] = E.charCodeAt(u);
      return L;
    }), i;
  });
})(ir);
var Yr = ir.exports;
const Ve = /* @__PURE__ */ or(Yr);
function Hr(c) {
  throw new Error('Could not dynamically require "' + c + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ar = { exports: {} };
const zr = {}, Fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zr
}, Symbol.toStringTag, { value: "Module" })), Jr = /* @__PURE__ */ jr(Fr);
(function(c) {
  (function(i) {
    var o = function(t) {
      var f, r = new Float64Array(16);
      if (t) for (f = 0; f < t.length; f++) r[f] = t[f];
      return r;
    }, h = function() {
      throw new Error("no PRNG");
    }, u = new Uint8Array(16), E = new Uint8Array(32);
    E[0] = 9;
    var L = o(), M = o([1]), $ = o([56129, 1]), te = o([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), ie = o([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), le = o([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), xe = o([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), se = o([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function re(t, f, r, e) {
      t[f] = r >> 24 & 255, t[f + 1] = r >> 16 & 255, t[f + 2] = r >> 8 & 255, t[f + 3] = r & 255, t[f + 4] = e >> 24 & 255, t[f + 5] = e >> 16 & 255, t[f + 6] = e >> 8 & 255, t[f + 7] = e & 255;
    }
    function ye(t, f, r, e, n) {
      var s, x = 0;
      for (s = 0; s < n; s++) x |= t[f + s] ^ r[e + s];
      return (1 & x - 1 >>> 8) - 1;
    }
    function Ce(t, f, r, e) {
      return ye(t, f, r, e, 16);
    }
    function ve(t, f, r, e) {
      return ye(t, f, r, e, 32);
    }
    function Se(t, f, r, e) {
      for (var n = e[0] & 255 | (e[1] & 255) << 8 | (e[2] & 255) << 16 | (e[3] & 255) << 24, s = r[0] & 255 | (r[1] & 255) << 8 | (r[2] & 255) << 16 | (r[3] & 255) << 24, x = r[4] & 255 | (r[5] & 255) << 8 | (r[6] & 255) << 16 | (r[7] & 255) << 24, g = r[8] & 255 | (r[9] & 255) << 8 | (r[10] & 255) << 16 | (r[11] & 255) << 24, b = r[12] & 255 | (r[13] & 255) << 8 | (r[14] & 255) << 16 | (r[15] & 255) << 24, B = e[4] & 255 | (e[5] & 255) << 8 | (e[6] & 255) << 16 | (e[7] & 255) << 24, m = f[0] & 255 | (f[1] & 255) << 8 | (f[2] & 255) << 16 | (f[3] & 255) << 24, X = f[4] & 255 | (f[5] & 255) << 8 | (f[6] & 255) << 16 | (f[7] & 255) << 24, R = f[8] & 255 | (f[9] & 255) << 8 | (f[10] & 255) << 16 | (f[11] & 255) << 24, N = f[12] & 255 | (f[13] & 255) << 8 | (f[14] & 255) << 16 | (f[15] & 255) << 24, P = e[8] & 255 | (e[9] & 255) << 8 | (e[10] & 255) << 16 | (e[11] & 255) << 24, j = r[16] & 255 | (r[17] & 255) << 8 | (r[18] & 255) << 16 | (r[19] & 255) << 24, D = r[20] & 255 | (r[21] & 255) << 8 | (r[22] & 255) << 16 | (r[23] & 255) << 24, K = r[24] & 255 | (r[25] & 255) << 8 | (r[26] & 255) << 16 | (r[27] & 255) << 24, Q = r[28] & 255 | (r[29] & 255) << 8 | (r[30] & 255) << 16 | (r[31] & 255) << 24, k = e[12] & 255 | (e[13] & 255) << 8 | (e[14] & 255) << 16 | (e[15] & 255) << 24, I = n, T = s, U = x, C = g, S = b, v = B, l = m, A = X, w = R, d = N, y = P, p = j, O = D, Y = K, z = Q, H = k, a, J = 0; J < 20; J += 2)
        a = I + O | 0, S ^= a << 7 | a >>> 25, a = S + I | 0, w ^= a << 9 | a >>> 23, a = w + S | 0, O ^= a << 13 | a >>> 19, a = O + w | 0, I ^= a << 18 | a >>> 14, a = v + T | 0, d ^= a << 7 | a >>> 25, a = d + v | 0, Y ^= a << 9 | a >>> 23, a = Y + d | 0, T ^= a << 13 | a >>> 19, a = T + Y | 0, v ^= a << 18 | a >>> 14, a = y + l | 0, z ^= a << 7 | a >>> 25, a = z + y | 0, U ^= a << 9 | a >>> 23, a = U + z | 0, l ^= a << 13 | a >>> 19, a = l + U | 0, y ^= a << 18 | a >>> 14, a = H + p | 0, C ^= a << 7 | a >>> 25, a = C + H | 0, A ^= a << 9 | a >>> 23, a = A + C | 0, p ^= a << 13 | a >>> 19, a = p + A | 0, H ^= a << 18 | a >>> 14, a = I + C | 0, T ^= a << 7 | a >>> 25, a = T + I | 0, U ^= a << 9 | a >>> 23, a = U + T | 0, C ^= a << 13 | a >>> 19, a = C + U | 0, I ^= a << 18 | a >>> 14, a = v + S | 0, l ^= a << 7 | a >>> 25, a = l + v | 0, A ^= a << 9 | a >>> 23, a = A + l | 0, S ^= a << 13 | a >>> 19, a = S + A | 0, v ^= a << 18 | a >>> 14, a = y + d | 0, p ^= a << 7 | a >>> 25, a = p + y | 0, w ^= a << 9 | a >>> 23, a = w + p | 0, d ^= a << 13 | a >>> 19, a = d + w | 0, y ^= a << 18 | a >>> 14, a = H + z | 0, O ^= a << 7 | a >>> 25, a = O + H | 0, Y ^= a << 9 | a >>> 23, a = Y + O | 0, z ^= a << 13 | a >>> 19, a = z + Y | 0, H ^= a << 18 | a >>> 14;
      I = I + n | 0, T = T + s | 0, U = U + x | 0, C = C + g | 0, S = S + b | 0, v = v + B | 0, l = l + m | 0, A = A + X | 0, w = w + R | 0, d = d + N | 0, y = y + P | 0, p = p + j | 0, O = O + D | 0, Y = Y + K | 0, z = z + Q | 0, H = H + k | 0, t[0] = I >>> 0 & 255, t[1] = I >>> 8 & 255, t[2] = I >>> 16 & 255, t[3] = I >>> 24 & 255, t[4] = T >>> 0 & 255, t[5] = T >>> 8 & 255, t[6] = T >>> 16 & 255, t[7] = T >>> 24 & 255, t[8] = U >>> 0 & 255, t[9] = U >>> 8 & 255, t[10] = U >>> 16 & 255, t[11] = U >>> 24 & 255, t[12] = C >>> 0 & 255, t[13] = C >>> 8 & 255, t[14] = C >>> 16 & 255, t[15] = C >>> 24 & 255, t[16] = S >>> 0 & 255, t[17] = S >>> 8 & 255, t[18] = S >>> 16 & 255, t[19] = S >>> 24 & 255, t[20] = v >>> 0 & 255, t[21] = v >>> 8 & 255, t[22] = v >>> 16 & 255, t[23] = v >>> 24 & 255, t[24] = l >>> 0 & 255, t[25] = l >>> 8 & 255, t[26] = l >>> 16 & 255, t[27] = l >>> 24 & 255, t[28] = A >>> 0 & 255, t[29] = A >>> 8 & 255, t[30] = A >>> 16 & 255, t[31] = A >>> 24 & 255, t[32] = w >>> 0 & 255, t[33] = w >>> 8 & 255, t[34] = w >>> 16 & 255, t[35] = w >>> 24 & 255, t[36] = d >>> 0 & 255, t[37] = d >>> 8 & 255, t[38] = d >>> 16 & 255, t[39] = d >>> 24 & 255, t[40] = y >>> 0 & 255, t[41] = y >>> 8 & 255, t[42] = y >>> 16 & 255, t[43] = y >>> 24 & 255, t[44] = p >>> 0 & 255, t[45] = p >>> 8 & 255, t[46] = p >>> 16 & 255, t[47] = p >>> 24 & 255, t[48] = O >>> 0 & 255, t[49] = O >>> 8 & 255, t[50] = O >>> 16 & 255, t[51] = O >>> 24 & 255, t[52] = Y >>> 0 & 255, t[53] = Y >>> 8 & 255, t[54] = Y >>> 16 & 255, t[55] = Y >>> 24 & 255, t[56] = z >>> 0 & 255, t[57] = z >>> 8 & 255, t[58] = z >>> 16 & 255, t[59] = z >>> 24 & 255, t[60] = H >>> 0 & 255, t[61] = H >>> 8 & 255, t[62] = H >>> 16 & 255, t[63] = H >>> 24 & 255;
    }
    function Pe(t, f, r, e) {
      for (var n = e[0] & 255 | (e[1] & 255) << 8 | (e[2] & 255) << 16 | (e[3] & 255) << 24, s = r[0] & 255 | (r[1] & 255) << 8 | (r[2] & 255) << 16 | (r[3] & 255) << 24, x = r[4] & 255 | (r[5] & 255) << 8 | (r[6] & 255) << 16 | (r[7] & 255) << 24, g = r[8] & 255 | (r[9] & 255) << 8 | (r[10] & 255) << 16 | (r[11] & 255) << 24, b = r[12] & 255 | (r[13] & 255) << 8 | (r[14] & 255) << 16 | (r[15] & 255) << 24, B = e[4] & 255 | (e[5] & 255) << 8 | (e[6] & 255) << 16 | (e[7] & 255) << 24, m = f[0] & 255 | (f[1] & 255) << 8 | (f[2] & 255) << 16 | (f[3] & 255) << 24, X = f[4] & 255 | (f[5] & 255) << 8 | (f[6] & 255) << 16 | (f[7] & 255) << 24, R = f[8] & 255 | (f[9] & 255) << 8 | (f[10] & 255) << 16 | (f[11] & 255) << 24, N = f[12] & 255 | (f[13] & 255) << 8 | (f[14] & 255) << 16 | (f[15] & 255) << 24, P = e[8] & 255 | (e[9] & 255) << 8 | (e[10] & 255) << 16 | (e[11] & 255) << 24, j = r[16] & 255 | (r[17] & 255) << 8 | (r[18] & 255) << 16 | (r[19] & 255) << 24, D = r[20] & 255 | (r[21] & 255) << 8 | (r[22] & 255) << 16 | (r[23] & 255) << 24, K = r[24] & 255 | (r[25] & 255) << 8 | (r[26] & 255) << 16 | (r[27] & 255) << 24, Q = r[28] & 255 | (r[29] & 255) << 8 | (r[30] & 255) << 16 | (r[31] & 255) << 24, k = e[12] & 255 | (e[13] & 255) << 8 | (e[14] & 255) << 16 | (e[15] & 255) << 24, I = n, T = s, U = x, C = g, S = b, v = B, l = m, A = X, w = R, d = N, y = P, p = j, O = D, Y = K, z = Q, H = k, a, J = 0; J < 20; J += 2)
        a = I + O | 0, S ^= a << 7 | a >>> 25, a = S + I | 0, w ^= a << 9 | a >>> 23, a = w + S | 0, O ^= a << 13 | a >>> 19, a = O + w | 0, I ^= a << 18 | a >>> 14, a = v + T | 0, d ^= a << 7 | a >>> 25, a = d + v | 0, Y ^= a << 9 | a >>> 23, a = Y + d | 0, T ^= a << 13 | a >>> 19, a = T + Y | 0, v ^= a << 18 | a >>> 14, a = y + l | 0, z ^= a << 7 | a >>> 25, a = z + y | 0, U ^= a << 9 | a >>> 23, a = U + z | 0, l ^= a << 13 | a >>> 19, a = l + U | 0, y ^= a << 18 | a >>> 14, a = H + p | 0, C ^= a << 7 | a >>> 25, a = C + H | 0, A ^= a << 9 | a >>> 23, a = A + C | 0, p ^= a << 13 | a >>> 19, a = p + A | 0, H ^= a << 18 | a >>> 14, a = I + C | 0, T ^= a << 7 | a >>> 25, a = T + I | 0, U ^= a << 9 | a >>> 23, a = U + T | 0, C ^= a << 13 | a >>> 19, a = C + U | 0, I ^= a << 18 | a >>> 14, a = v + S | 0, l ^= a << 7 | a >>> 25, a = l + v | 0, A ^= a << 9 | a >>> 23, a = A + l | 0, S ^= a << 13 | a >>> 19, a = S + A | 0, v ^= a << 18 | a >>> 14, a = y + d | 0, p ^= a << 7 | a >>> 25, a = p + y | 0, w ^= a << 9 | a >>> 23, a = w + p | 0, d ^= a << 13 | a >>> 19, a = d + w | 0, y ^= a << 18 | a >>> 14, a = H + z | 0, O ^= a << 7 | a >>> 25, a = O + H | 0, Y ^= a << 9 | a >>> 23, a = Y + O | 0, z ^= a << 13 | a >>> 19, a = z + Y | 0, H ^= a << 18 | a >>> 14;
      t[0] = I >>> 0 & 255, t[1] = I >>> 8 & 255, t[2] = I >>> 16 & 255, t[3] = I >>> 24 & 255, t[4] = v >>> 0 & 255, t[5] = v >>> 8 & 255, t[6] = v >>> 16 & 255, t[7] = v >>> 24 & 255, t[8] = y >>> 0 & 255, t[9] = y >>> 8 & 255, t[10] = y >>> 16 & 255, t[11] = y >>> 24 & 255, t[12] = H >>> 0 & 255, t[13] = H >>> 8 & 255, t[14] = H >>> 16 & 255, t[15] = H >>> 24 & 255, t[16] = l >>> 0 & 255, t[17] = l >>> 8 & 255, t[18] = l >>> 16 & 255, t[19] = l >>> 24 & 255, t[20] = A >>> 0 & 255, t[21] = A >>> 8 & 255, t[22] = A >>> 16 & 255, t[23] = A >>> 24 & 255, t[24] = w >>> 0 & 255, t[25] = w >>> 8 & 255, t[26] = w >>> 16 & 255, t[27] = w >>> 24 & 255, t[28] = d >>> 0 & 255, t[29] = d >>> 8 & 255, t[30] = d >>> 16 & 255, t[31] = d >>> 24 & 255;
    }
    function me(t, f, r, e) {
      Se(t, f, r, e);
    }
    function Be(t, f, r, e) {
      Pe(t, f, r, e);
    }
    var we = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    function Le(t, f, r, e, n, s, x) {
      var g = new Uint8Array(16), b = new Uint8Array(64), B, m;
      for (m = 0; m < 16; m++) g[m] = 0;
      for (m = 0; m < 8; m++) g[m] = s[m];
      for (; n >= 64; ) {
        for (me(b, g, x, we), m = 0; m < 64; m++) t[f + m] = r[e + m] ^ b[m];
        for (B = 1, m = 8; m < 16; m++)
          B = B + (g[m] & 255) | 0, g[m] = B & 255, B >>>= 8;
        n -= 64, f += 64, e += 64;
      }
      if (n > 0)
        for (me(b, g, x, we), m = 0; m < n; m++) t[f + m] = r[e + m] ^ b[m];
      return 0;
    }
    function pe(t, f, r, e, n) {
      var s = new Uint8Array(16), x = new Uint8Array(64), g, b;
      for (b = 0; b < 16; b++) s[b] = 0;
      for (b = 0; b < 8; b++) s[b] = e[b];
      for (; r >= 64; ) {
        for (me(x, s, n, we), b = 0; b < 64; b++) t[f + b] = x[b];
        for (g = 1, b = 8; b < 16; b++)
          g = g + (s[b] & 255) | 0, s[b] = g & 255, g >>>= 8;
        r -= 64, f += 64;
      }
      if (r > 0)
        for (me(x, s, n, we), b = 0; b < r; b++) t[f + b] = x[b];
      return 0;
    }
    function Ot(t, f, r, e, n) {
      var s = new Uint8Array(32);
      Be(s, e, n, we);
      for (var x = new Uint8Array(8), g = 0; g < 8; g++) x[g] = e[g + 16];
      return pe(t, f, r, x, s);
    }
    function ct(t, f, r, e, n, s, x) {
      var g = new Uint8Array(32);
      Be(g, s, x, we);
      for (var b = new Uint8Array(8), B = 0; B < 8; B++) b[B] = s[B + 16];
      return Le(t, f, r, e, n, b, g);
    }
    var $e = function(t) {
      this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
      var f, r, e, n, s, x, g, b;
      f = t[0] & 255 | (t[1] & 255) << 8, this.r[0] = f & 8191, r = t[2] & 255 | (t[3] & 255) << 8, this.r[1] = (f >>> 13 | r << 3) & 8191, e = t[4] & 255 | (t[5] & 255) << 8, this.r[2] = (r >>> 10 | e << 6) & 7939, n = t[6] & 255 | (t[7] & 255) << 8, this.r[3] = (e >>> 7 | n << 9) & 8191, s = t[8] & 255 | (t[9] & 255) << 8, this.r[4] = (n >>> 4 | s << 12) & 255, this.r[5] = s >>> 1 & 8190, x = t[10] & 255 | (t[11] & 255) << 8, this.r[6] = (s >>> 14 | x << 2) & 8191, g = t[12] & 255 | (t[13] & 255) << 8, this.r[7] = (x >>> 11 | g << 5) & 8065, b = t[14] & 255 | (t[15] & 255) << 8, this.r[8] = (g >>> 8 | b << 8) & 8191, this.r[9] = b >>> 5 & 127, this.pad[0] = t[16] & 255 | (t[17] & 255) << 8, this.pad[1] = t[18] & 255 | (t[19] & 255) << 8, this.pad[2] = t[20] & 255 | (t[21] & 255) << 8, this.pad[3] = t[22] & 255 | (t[23] & 255) << 8, this.pad[4] = t[24] & 255 | (t[25] & 255) << 8, this.pad[5] = t[26] & 255 | (t[27] & 255) << 8, this.pad[6] = t[28] & 255 | (t[29] & 255) << 8, this.pad[7] = t[30] & 255 | (t[31] & 255) << 8;
    };
    $e.prototype.blocks = function(t, f, r) {
      for (var e = this.fin ? 0 : 2048, n, s, x, g, b, B, m, X, R, N, P, j, D, K, Q, k, I, T, U, C = this.h[0], S = this.h[1], v = this.h[2], l = this.h[3], A = this.h[4], w = this.h[5], d = this.h[6], y = this.h[7], p = this.h[8], O = this.h[9], Y = this.r[0], z = this.r[1], H = this.r[2], a = this.r[3], J = this.r[4], V = this.r[5], _ = this.r[6], F = this.r[7], q = this.r[8], G = this.r[9]; r >= 16; )
        n = t[f + 0] & 255 | (t[f + 1] & 255) << 8, C += n & 8191, s = t[f + 2] & 255 | (t[f + 3] & 255) << 8, S += (n >>> 13 | s << 3) & 8191, x = t[f + 4] & 255 | (t[f + 5] & 255) << 8, v += (s >>> 10 | x << 6) & 8191, g = t[f + 6] & 255 | (t[f + 7] & 255) << 8, l += (x >>> 7 | g << 9) & 8191, b = t[f + 8] & 255 | (t[f + 9] & 255) << 8, A += (g >>> 4 | b << 12) & 8191, w += b >>> 1 & 8191, B = t[f + 10] & 255 | (t[f + 11] & 255) << 8, d += (b >>> 14 | B << 2) & 8191, m = t[f + 12] & 255 | (t[f + 13] & 255) << 8, y += (B >>> 11 | m << 5) & 8191, X = t[f + 14] & 255 | (t[f + 15] & 255) << 8, p += (m >>> 8 | X << 8) & 8191, O += X >>> 5 | e, R = 0, N = R, N += C * Y, N += S * (5 * G), N += v * (5 * q), N += l * (5 * F), N += A * (5 * _), R = N >>> 13, N &= 8191, N += w * (5 * V), N += d * (5 * J), N += y * (5 * a), N += p * (5 * H), N += O * (5 * z), R += N >>> 13, N &= 8191, P = R, P += C * z, P += S * Y, P += v * (5 * G), P += l * (5 * q), P += A * (5 * F), R = P >>> 13, P &= 8191, P += w * (5 * _), P += d * (5 * V), P += y * (5 * J), P += p * (5 * a), P += O * (5 * H), R += P >>> 13, P &= 8191, j = R, j += C * H, j += S * z, j += v * Y, j += l * (5 * G), j += A * (5 * q), R = j >>> 13, j &= 8191, j += w * (5 * F), j += d * (5 * _), j += y * (5 * V), j += p * (5 * J), j += O * (5 * a), R += j >>> 13, j &= 8191, D = R, D += C * a, D += S * H, D += v * z, D += l * Y, D += A * (5 * G), R = D >>> 13, D &= 8191, D += w * (5 * q), D += d * (5 * F), D += y * (5 * _), D += p * (5 * V), D += O * (5 * J), R += D >>> 13, D &= 8191, K = R, K += C * J, K += S * a, K += v * H, K += l * z, K += A * Y, R = K >>> 13, K &= 8191, K += w * (5 * G), K += d * (5 * q), K += y * (5 * F), K += p * (5 * _), K += O * (5 * V), R += K >>> 13, K &= 8191, Q = R, Q += C * V, Q += S * J, Q += v * a, Q += l * H, Q += A * z, R = Q >>> 13, Q &= 8191, Q += w * Y, Q += d * (5 * G), Q += y * (5 * q), Q += p * (5 * F), Q += O * (5 * _), R += Q >>> 13, Q &= 8191, k = R, k += C * _, k += S * V, k += v * J, k += l * a, k += A * H, R = k >>> 13, k &= 8191, k += w * z, k += d * Y, k += y * (5 * G), k += p * (5 * q), k += O * (5 * F), R += k >>> 13, k &= 8191, I = R, I += C * F, I += S * _, I += v * V, I += l * J, I += A * a, R = I >>> 13, I &= 8191, I += w * H, I += d * z, I += y * Y, I += p * (5 * G), I += O * (5 * q), R += I >>> 13, I &= 8191, T = R, T += C * q, T += S * F, T += v * _, T += l * V, T += A * J, R = T >>> 13, T &= 8191, T += w * a, T += d * H, T += y * z, T += p * Y, T += O * (5 * G), R += T >>> 13, T &= 8191, U = R, U += C * G, U += S * q, U += v * F, U += l * _, U += A * V, R = U >>> 13, U &= 8191, U += w * J, U += d * a, U += y * H, U += p * z, U += O * Y, R += U >>> 13, U &= 8191, R = (R << 2) + R | 0, R = R + N | 0, N = R & 8191, R = R >>> 13, P += R, C = N, S = P, v = j, l = D, A = K, w = Q, d = k, y = I, p = T, O = U, f += 16, r -= 16;
      this.h[0] = C, this.h[1] = S, this.h[2] = v, this.h[3] = l, this.h[4] = A, this.h[5] = w, this.h[6] = d, this.h[7] = y, this.h[8] = p, this.h[9] = O;
    }, $e.prototype.finish = function(t, f) {
      var r = new Uint16Array(10), e, n, s, x;
      if (this.leftover) {
        for (x = this.leftover, this.buffer[x++] = 1; x < 16; x++) this.buffer[x] = 0;
        this.fin = 1, this.blocks(this.buffer, 0, 16);
      }
      for (e = this.h[1] >>> 13, this.h[1] &= 8191, x = 2; x < 10; x++)
        this.h[x] += e, e = this.h[x] >>> 13, this.h[x] &= 8191;
      for (this.h[0] += e * 5, e = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += e, e = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += e, r[0] = this.h[0] + 5, e = r[0] >>> 13, r[0] &= 8191, x = 1; x < 10; x++)
        r[x] = this.h[x] + e, e = r[x] >>> 13, r[x] &= 8191;
      for (r[9] -= 8192, n = (e ^ 1) - 1, x = 0; x < 10; x++) r[x] &= n;
      for (n = ~n, x = 0; x < 10; x++) this.h[x] = this.h[x] & n | r[x];
      for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, s = this.h[0] + this.pad[0], this.h[0] = s & 65535, x = 1; x < 8; x++)
        s = (this.h[x] + this.pad[x] | 0) + (s >>> 16) | 0, this.h[x] = s & 65535;
      t[f + 0] = this.h[0] >>> 0 & 255, t[f + 1] = this.h[0] >>> 8 & 255, t[f + 2] = this.h[1] >>> 0 & 255, t[f + 3] = this.h[1] >>> 8 & 255, t[f + 4] = this.h[2] >>> 0 & 255, t[f + 5] = this.h[2] >>> 8 & 255, t[f + 6] = this.h[3] >>> 0 & 255, t[f + 7] = this.h[3] >>> 8 & 255, t[f + 8] = this.h[4] >>> 0 & 255, t[f + 9] = this.h[4] >>> 8 & 255, t[f + 10] = this.h[5] >>> 0 & 255, t[f + 11] = this.h[5] >>> 8 & 255, t[f + 12] = this.h[6] >>> 0 & 255, t[f + 13] = this.h[6] >>> 8 & 255, t[f + 14] = this.h[7] >>> 0 & 255, t[f + 15] = this.h[7] >>> 8 & 255;
    }, $e.prototype.update = function(t, f, r) {
      var e, n;
      if (this.leftover) {
        for (n = 16 - this.leftover, n > r && (n = r), e = 0; e < n; e++)
          this.buffer[this.leftover + e] = t[f + e];
        if (r -= n, f += n, this.leftover += n, this.leftover < 16)
          return;
        this.blocks(this.buffer, 0, 16), this.leftover = 0;
      }
      if (r >= 16 && (n = r - r % 16, this.blocks(t, f, n), f += n, r -= n), r) {
        for (e = 0; e < r; e++)
          this.buffer[this.leftover + e] = t[f + e];
        this.leftover += r;
      }
    };
    function xt(t, f, r, e, n, s) {
      var x = new $e(s);
      return x.update(r, e, n), x.finish(t, f), 0;
    }
    function Mt(t, f, r, e, n, s) {
      var x = new Uint8Array(16);
      return xt(x, 0, r, e, n, s), Ce(t, f, x, 0);
    }
    function lt(t, f, r, e, n) {
      var s;
      if (r < 32) return -1;
      for (ct(t, 0, f, 0, r, e, n), xt(t, 16, t, 32, r - 32, t), s = 0; s < 16; s++) t[s] = 0;
      return 0;
    }
    function At(t, f, r, e, n) {
      var s, x = new Uint8Array(32);
      if (r < 32 || (Ot(x, 0, 32, e, n), Mt(f, 16, f, 32, r - 32, x) !== 0)) return -1;
      for (ct(t, 0, f, 0, r, e, n), s = 0; s < 32; s++) t[s] = 0;
      return 0;
    }
    function Ue(t, f) {
      var r;
      for (r = 0; r < 16; r++) t[r] = f[r] | 0;
    }
    function ht(t) {
      var f, r, e = 1;
      for (f = 0; f < 16; f++)
        r = t[f] + e + 65535, e = Math.floor(r / 65536), t[f] = r - e * 65536;
      t[0] += e - 1 + 37 * (e - 1);
    }
    function Ke(t, f, r) {
      for (var e, n = ~(r - 1), s = 0; s < 16; s++)
        e = n & (t[s] ^ f[s]), t[s] ^= e, f[s] ^= e;
    }
    function ke(t, f) {
      var r, e, n, s = o(), x = o();
      for (r = 0; r < 16; r++) x[r] = f[r];
      for (ht(x), ht(x), ht(x), e = 0; e < 2; e++) {
        for (s[0] = x[0] - 65517, r = 1; r < 15; r++)
          s[r] = x[r] - 65535 - (s[r - 1] >> 16 & 1), s[r - 1] &= 65535;
        s[15] = x[15] - 32767 - (s[14] >> 16 & 1), n = s[15] >> 16 & 1, s[14] &= 65535, Ke(x, s, 1 - n);
      }
      for (r = 0; r < 16; r++)
        t[2 * r] = x[r] & 255, t[2 * r + 1] = x[r] >> 8;
    }
    function Nt(t, f) {
      var r = new Uint8Array(32), e = new Uint8Array(32);
      return ke(r, t), ke(e, f), ve(r, 0, e, 0);
    }
    function Pt(t) {
      var f = new Uint8Array(32);
      return ke(f, t), f[0] & 1;
    }
    function ut(t, f) {
      var r;
      for (r = 0; r < 16; r++) t[r] = f[2 * r] + (f[2 * r + 1] << 8);
      t[15] &= 32767;
    }
    function be(t, f, r) {
      for (var e = 0; e < 16; e++) t[e] = f[e] + r[e];
    }
    function Ee(t, f, r) {
      for (var e = 0; e < 16; e++) t[e] = f[e] - r[e];
    }
    function Z(t, f, r) {
      var e, n, s = 0, x = 0, g = 0, b = 0, B = 0, m = 0, X = 0, R = 0, N = 0, P = 0, j = 0, D = 0, K = 0, Q = 0, k = 0, I = 0, T = 0, U = 0, C = 0, S = 0, v = 0, l = 0, A = 0, w = 0, d = 0, y = 0, p = 0, O = 0, Y = 0, z = 0, H = 0, a = r[0], J = r[1], V = r[2], _ = r[3], F = r[4], q = r[5], G = r[6], ae = r[7], ee = r[8], fe = r[9], ne = r[10], oe = r[11], ce = r[12], Ae = r[13], he = r[14], ue = r[15];
      e = f[0], s += e * a, x += e * J, g += e * V, b += e * _, B += e * F, m += e * q, X += e * G, R += e * ae, N += e * ee, P += e * fe, j += e * ne, D += e * oe, K += e * ce, Q += e * Ae, k += e * he, I += e * ue, e = f[1], x += e * a, g += e * J, b += e * V, B += e * _, m += e * F, X += e * q, R += e * G, N += e * ae, P += e * ee, j += e * fe, D += e * ne, K += e * oe, Q += e * ce, k += e * Ae, I += e * he, T += e * ue, e = f[2], g += e * a, b += e * J, B += e * V, m += e * _, X += e * F, R += e * q, N += e * G, P += e * ae, j += e * ee, D += e * fe, K += e * ne, Q += e * oe, k += e * ce, I += e * Ae, T += e * he, U += e * ue, e = f[3], b += e * a, B += e * J, m += e * V, X += e * _, R += e * F, N += e * q, P += e * G, j += e * ae, D += e * ee, K += e * fe, Q += e * ne, k += e * oe, I += e * ce, T += e * Ae, U += e * he, C += e * ue, e = f[4], B += e * a, m += e * J, X += e * V, R += e * _, N += e * F, P += e * q, j += e * G, D += e * ae, K += e * ee, Q += e * fe, k += e * ne, I += e * oe, T += e * ce, U += e * Ae, C += e * he, S += e * ue, e = f[5], m += e * a, X += e * J, R += e * V, N += e * _, P += e * F, j += e * q, D += e * G, K += e * ae, Q += e * ee, k += e * fe, I += e * ne, T += e * oe, U += e * ce, C += e * Ae, S += e * he, v += e * ue, e = f[6], X += e * a, R += e * J, N += e * V, P += e * _, j += e * F, D += e * q, K += e * G, Q += e * ae, k += e * ee, I += e * fe, T += e * ne, U += e * oe, C += e * ce, S += e * Ae, v += e * he, l += e * ue, e = f[7], R += e * a, N += e * J, P += e * V, j += e * _, D += e * F, K += e * q, Q += e * G, k += e * ae, I += e * ee, T += e * fe, U += e * ne, C += e * oe, S += e * ce, v += e * Ae, l += e * he, A += e * ue, e = f[8], N += e * a, P += e * J, j += e * V, D += e * _, K += e * F, Q += e * q, k += e * G, I += e * ae, T += e * ee, U += e * fe, C += e * ne, S += e * oe, v += e * ce, l += e * Ae, A += e * he, w += e * ue, e = f[9], P += e * a, j += e * J, D += e * V, K += e * _, Q += e * F, k += e * q, I += e * G, T += e * ae, U += e * ee, C += e * fe, S += e * ne, v += e * oe, l += e * ce, A += e * Ae, w += e * he, d += e * ue, e = f[10], j += e * a, D += e * J, K += e * V, Q += e * _, k += e * F, I += e * q, T += e * G, U += e * ae, C += e * ee, S += e * fe, v += e * ne, l += e * oe, A += e * ce, w += e * Ae, d += e * he, y += e * ue, e = f[11], D += e * a, K += e * J, Q += e * V, k += e * _, I += e * F, T += e * q, U += e * G, C += e * ae, S += e * ee, v += e * fe, l += e * ne, A += e * oe, w += e * ce, d += e * Ae, y += e * he, p += e * ue, e = f[12], K += e * a, Q += e * J, k += e * V, I += e * _, T += e * F, U += e * q, C += e * G, S += e * ae, v += e * ee, l += e * fe, A += e * ne, w += e * oe, d += e * ce, y += e * Ae, p += e * he, O += e * ue, e = f[13], Q += e * a, k += e * J, I += e * V, T += e * _, U += e * F, C += e * q, S += e * G, v += e * ae, l += e * ee, A += e * fe, w += e * ne, d += e * oe, y += e * ce, p += e * Ae, O += e * he, Y += e * ue, e = f[14], k += e * a, I += e * J, T += e * V, U += e * _, C += e * F, S += e * q, v += e * G, l += e * ae, A += e * ee, w += e * fe, d += e * ne, y += e * oe, p += e * ce, O += e * Ae, Y += e * he, z += e * ue, e = f[15], I += e * a, T += e * J, U += e * V, C += e * _, S += e * F, v += e * q, l += e * G, A += e * ae, w += e * ee, d += e * fe, y += e * ne, p += e * oe, O += e * ce, Y += e * Ae, z += e * he, H += e * ue, s += 38 * T, x += 38 * U, g += 38 * C, b += 38 * S, B += 38 * v, m += 38 * l, X += 38 * A, R += 38 * w, N += 38 * d, P += 38 * y, j += 38 * p, D += 38 * O, K += 38 * Y, Q += 38 * z, k += 38 * H, n = 1, e = s + n + 65535, n = Math.floor(e / 65536), s = e - n * 65536, e = x + n + 65535, n = Math.floor(e / 65536), x = e - n * 65536, e = g + n + 65535, n = Math.floor(e / 65536), g = e - n * 65536, e = b + n + 65535, n = Math.floor(e / 65536), b = e - n * 65536, e = B + n + 65535, n = Math.floor(e / 65536), B = e - n * 65536, e = m + n + 65535, n = Math.floor(e / 65536), m = e - n * 65536, e = X + n + 65535, n = Math.floor(e / 65536), X = e - n * 65536, e = R + n + 65535, n = Math.floor(e / 65536), R = e - n * 65536, e = N + n + 65535, n = Math.floor(e / 65536), N = e - n * 65536, e = P + n + 65535, n = Math.floor(e / 65536), P = e - n * 65536, e = j + n + 65535, n = Math.floor(e / 65536), j = e - n * 65536, e = D + n + 65535, n = Math.floor(e / 65536), D = e - n * 65536, e = K + n + 65535, n = Math.floor(e / 65536), K = e - n * 65536, e = Q + n + 65535, n = Math.floor(e / 65536), Q = e - n * 65536, e = k + n + 65535, n = Math.floor(e / 65536), k = e - n * 65536, e = I + n + 65535, n = Math.floor(e / 65536), I = e - n * 65536, s += n - 1 + 37 * (n - 1), n = 1, e = s + n + 65535, n = Math.floor(e / 65536), s = e - n * 65536, e = x + n + 65535, n = Math.floor(e / 65536), x = e - n * 65536, e = g + n + 65535, n = Math.floor(e / 65536), g = e - n * 65536, e = b + n + 65535, n = Math.floor(e / 65536), b = e - n * 65536, e = B + n + 65535, n = Math.floor(e / 65536), B = e - n * 65536, e = m + n + 65535, n = Math.floor(e / 65536), m = e - n * 65536, e = X + n + 65535, n = Math.floor(e / 65536), X = e - n * 65536, e = R + n + 65535, n = Math.floor(e / 65536), R = e - n * 65536, e = N + n + 65535, n = Math.floor(e / 65536), N = e - n * 65536, e = P + n + 65535, n = Math.floor(e / 65536), P = e - n * 65536, e = j + n + 65535, n = Math.floor(e / 65536), j = e - n * 65536, e = D + n + 65535, n = Math.floor(e / 65536), D = e - n * 65536, e = K + n + 65535, n = Math.floor(e / 65536), K = e - n * 65536, e = Q + n + 65535, n = Math.floor(e / 65536), Q = e - n * 65536, e = k + n + 65535, n = Math.floor(e / 65536), k = e - n * 65536, e = I + n + 65535, n = Math.floor(e / 65536), I = e - n * 65536, s += n - 1 + 37 * (n - 1), t[0] = s, t[1] = x, t[2] = g, t[3] = b, t[4] = B, t[5] = m, t[6] = X, t[7] = R, t[8] = N, t[9] = P, t[10] = j, t[11] = D, t[12] = K, t[13] = Q, t[14] = k, t[15] = I;
    }
    function ge(t, f) {
      Z(t, f, f);
    }
    function Kt(t, f) {
      var r = o(), e;
      for (e = 0; e < 16; e++) r[e] = f[e];
      for (e = 253; e >= 0; e--)
        ge(r, r), e !== 2 && e !== 4 && Z(r, r, f);
      for (e = 0; e < 16; e++) t[e] = r[e];
    }
    function kt(t, f) {
      var r = o(), e;
      for (e = 0; e < 16; e++) r[e] = f[e];
      for (e = 250; e >= 0; e--)
        ge(r, r), e !== 1 && Z(r, r, f);
      for (e = 0; e < 16; e++) t[e] = r[e];
    }
    function et(t, f, r) {
      var e = new Uint8Array(32), n = new Float64Array(80), s, x, g = o(), b = o(), B = o(), m = o(), X = o(), R = o();
      for (x = 0; x < 31; x++) e[x] = f[x];
      for (e[31] = f[31] & 127 | 64, e[0] &= 248, ut(n, r), x = 0; x < 16; x++)
        b[x] = n[x], m[x] = g[x] = B[x] = 0;
      for (g[0] = m[0] = 1, x = 254; x >= 0; --x)
        s = e[x >>> 3] >>> (x & 7) & 1, Ke(g, b, s), Ke(B, m, s), be(X, g, B), Ee(g, g, B), be(B, b, m), Ee(b, b, m), ge(m, X), ge(R, g), Z(g, B, g), Z(B, b, X), be(X, g, B), Ee(g, g, B), ge(b, g), Ee(B, m, R), Z(g, B, $), be(g, g, m), Z(B, B, g), Z(g, m, R), Z(m, b, n), ge(b, X), Ke(g, b, s), Ke(B, m, s);
      for (x = 0; x < 16; x++)
        n[x + 16] = g[x], n[x + 32] = B[x], n[x + 48] = b[x], n[x + 64] = m[x];
      var N = n.subarray(32), P = n.subarray(16);
      return Kt(N, N), Z(P, P, N), ke(t, P), 0;
    }
    function tt(t, f) {
      return et(t, f, E);
    }
    function Qt(t, f) {
      return h(f, 32), tt(t, f);
    }
    function rt(t, f, r) {
      var e = new Uint8Array(32);
      return et(e, r, f), Be(t, u, e, we);
    }
    var Dt = lt, lr = At;
    function Ar(t, f, r, e, n, s) {
      var x = new Uint8Array(32);
      return rt(x, n, s), Dt(t, f, r, e, x);
    }
    function hr(t, f, r, e, n, s) {
      var x = new Uint8Array(32);
      return rt(x, n, s), lr(t, f, r, e, x);
    }
    var jt = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function Yt(t, f, r, e) {
      for (var n = new Int32Array(16), s = new Int32Array(16), x, g, b, B, m, X, R, N, P, j, D, K, Q, k, I, T, U, C, S, v, l, A, w, d, y, p, O = t[0], Y = t[1], z = t[2], H = t[3], a = t[4], J = t[5], V = t[6], _ = t[7], F = f[0], q = f[1], G = f[2], ae = f[3], ee = f[4], fe = f[5], ne = f[6], oe = f[7], ce = 0; e >= 128; ) {
        for (S = 0; S < 16; S++)
          v = 8 * S + ce, n[S] = r[v + 0] << 24 | r[v + 1] << 16 | r[v + 2] << 8 | r[v + 3], s[S] = r[v + 4] << 24 | r[v + 5] << 16 | r[v + 6] << 8 | r[v + 7];
        for (S = 0; S < 80; S++)
          if (x = O, g = Y, b = z, B = H, m = a, X = J, R = V, N = _, P = F, j = q, D = G, K = ae, Q = ee, k = fe, I = ne, T = oe, l = _, A = oe, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = (a >>> 14 | ee << 18) ^ (a >>> 18 | ee << 14) ^ (ee >>> 9 | a << 23), A = (ee >>> 14 | a << 18) ^ (ee >>> 18 | a << 14) ^ (a >>> 9 | ee << 23), w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, l = a & J ^ ~a & V, A = ee & fe ^ ~ee & ne, w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, l = jt[S * 2], A = jt[S * 2 + 1], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, l = n[S % 16], A = s[S % 16], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, U = y & 65535 | p << 16, C = w & 65535 | d << 16, l = U, A = C, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = (O >>> 28 | F << 4) ^ (F >>> 2 | O << 30) ^ (F >>> 7 | O << 25), A = (F >>> 28 | O << 4) ^ (O >>> 2 | F << 30) ^ (O >>> 7 | F << 25), w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, l = O & Y ^ O & z ^ Y & z, A = F & q ^ F & G ^ q & G, w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, N = y & 65535 | p << 16, T = w & 65535 | d << 16, l = B, A = K, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = U, A = C, w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, B = y & 65535 | p << 16, K = w & 65535 | d << 16, Y = x, z = g, H = b, a = B, J = m, V = X, _ = R, O = N, q = P, G = j, ae = D, ee = K, fe = Q, ne = k, oe = I, F = T, S % 16 === 15)
            for (v = 0; v < 16; v++)
              l = n[v], A = s[v], w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = n[(v + 9) % 16], A = s[(v + 9) % 16], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, U = n[(v + 1) % 16], C = s[(v + 1) % 16], l = (U >>> 1 | C << 31) ^ (U >>> 8 | C << 24) ^ U >>> 7, A = (C >>> 1 | U << 31) ^ (C >>> 8 | U << 24) ^ (C >>> 7 | U << 25), w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, U = n[(v + 14) % 16], C = s[(v + 14) % 16], l = (U >>> 19 | C << 13) ^ (C >>> 29 | U << 3) ^ U >>> 6, A = (C >>> 19 | U << 13) ^ (U >>> 29 | C << 3) ^ (C >>> 6 | U << 26), w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, n[v] = y & 65535 | p << 16, s[v] = w & 65535 | d << 16;
        l = O, A = F, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[0], A = f[0], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[0] = O = y & 65535 | p << 16, f[0] = F = w & 65535 | d << 16, l = Y, A = q, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[1], A = f[1], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[1] = Y = y & 65535 | p << 16, f[1] = q = w & 65535 | d << 16, l = z, A = G, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[2], A = f[2], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[2] = z = y & 65535 | p << 16, f[2] = G = w & 65535 | d << 16, l = H, A = ae, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[3], A = f[3], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[3] = H = y & 65535 | p << 16, f[3] = ae = w & 65535 | d << 16, l = a, A = ee, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[4], A = f[4], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[4] = a = y & 65535 | p << 16, f[4] = ee = w & 65535 | d << 16, l = J, A = fe, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[5], A = f[5], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[5] = J = y & 65535 | p << 16, f[5] = fe = w & 65535 | d << 16, l = V, A = ne, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[6], A = f[6], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[6] = V = y & 65535 | p << 16, f[6] = ne = w & 65535 | d << 16, l = _, A = oe, w = A & 65535, d = A >>> 16, y = l & 65535, p = l >>> 16, l = t[7], A = f[7], w += A & 65535, d += A >>> 16, y += l & 65535, p += l >>> 16, d += w >>> 16, y += d >>> 16, p += y >>> 16, t[7] = _ = y & 65535 | p << 16, f[7] = oe = w & 65535 | d << 16, ce += 128, e -= 128;
      }
      return e;
    }
    function Oe(t, f, r) {
      var e = new Int32Array(8), n = new Int32Array(8), s = new Uint8Array(256), x, g = r;
      for (e[0] = 1779033703, e[1] = 3144134277, e[2] = 1013904242, e[3] = 2773480762, e[4] = 1359893119, e[5] = 2600822924, e[6] = 528734635, e[7] = 1541459225, n[0] = 4089235720, n[1] = 2227873595, n[2] = 4271175723, n[3] = 1595750129, n[4] = 2917565137, n[5] = 725511199, n[6] = 4215389547, n[7] = 327033209, Yt(e, n, f, r), r %= 128, x = 0; x < r; x++) s[x] = f[g - r + x];
      for (s[r] = 128, r = 256 - 128 * (r < 112 ? 1 : 0), s[r - 9] = 0, re(s, r - 8, g / 536870912 | 0, g << 3), Yt(e, n, s, r), x = 0; x < 8; x++) re(t, 8 * x, e[x], n[x]);
      return 0;
    }
    function ft(t, f) {
      var r = o(), e = o(), n = o(), s = o(), x = o(), g = o(), b = o(), B = o(), m = o();
      Ee(r, t[1], t[0]), Ee(m, f[1], f[0]), Z(r, r, m), be(e, t[0], t[1]), be(m, f[0], f[1]), Z(e, e, m), Z(n, t[3], f[3]), Z(n, n, ie), Z(s, t[2], f[2]), be(s, s, s), Ee(x, e, r), Ee(g, s, n), be(b, s, n), be(B, e, r), Z(t[0], x, g), Z(t[1], B, b), Z(t[2], b, g), Z(t[3], x, B);
    }
    function Ht(t, f, r) {
      var e;
      for (e = 0; e < 4; e++)
        Ke(t[e], f[e], r);
    }
    function dt(t, f) {
      var r = o(), e = o(), n = o();
      Kt(n, f[2]), Z(r, f[0], n), Z(e, f[1], n), ke(t, e), t[31] ^= Pt(r) << 7;
    }
    function gt(t, f, r) {
      var e, n;
      for (Ue(t[0], L), Ue(t[1], M), Ue(t[2], M), Ue(t[3], L), n = 255; n >= 0; --n)
        e = r[n / 8 | 0] >> (n & 7) & 1, Ht(t, f, e), ft(f, t), ft(t, t), Ht(t, f, e);
    }
    function nt(t, f) {
      var r = [o(), o(), o(), o()];
      Ue(r[0], le), Ue(r[1], xe), Ue(r[2], M), Z(r[3], le, xe), gt(t, r, f);
    }
    function yt(t, f, r) {
      var e = new Uint8Array(64), n = [o(), o(), o(), o()], s;
      for (r || h(f, 32), Oe(e, f, 32), e[0] &= 248, e[31] &= 127, e[31] |= 64, nt(n, e), dt(t, n), s = 0; s < 32; s++) f[s + 32] = t[s];
      return 0;
    }
    var ot = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function wt(t, f) {
      var r, e, n, s;
      for (e = 63; e >= 32; --e) {
        for (r = 0, n = e - 32, s = e - 12; n < s; ++n)
          f[n] += r - 16 * f[e] * ot[n - (e - 32)], r = Math.floor((f[n] + 128) / 256), f[n] -= r * 256;
        f[n] += r, f[e] = 0;
      }
      for (r = 0, n = 0; n < 32; n++)
        f[n] += r - (f[31] >> 4) * ot[n], r = f[n] >> 8, f[n] &= 255;
      for (n = 0; n < 32; n++) f[n] -= r * ot[n];
      for (e = 0; e < 32; e++)
        f[e + 1] += f[e] >> 8, t[e] = f[e] & 255;
    }
    function pt(t) {
      var f = new Float64Array(64), r;
      for (r = 0; r < 64; r++) f[r] = t[r];
      for (r = 0; r < 64; r++) t[r] = 0;
      wt(t, f);
    }
    function zt(t, f, r, e) {
      var n = new Uint8Array(64), s = new Uint8Array(64), x = new Uint8Array(64), g, b, B = new Float64Array(64), m = [o(), o(), o(), o()];
      Oe(n, e, 32), n[0] &= 248, n[31] &= 127, n[31] |= 64;
      var X = r + 64;
      for (g = 0; g < r; g++) t[64 + g] = f[g];
      for (g = 0; g < 32; g++) t[32 + g] = n[32 + g];
      for (Oe(x, t.subarray(32), r + 32), pt(x), nt(m, x), dt(t, m), g = 32; g < 64; g++) t[g] = e[g];
      for (Oe(s, t, r + 64), pt(s), g = 0; g < 64; g++) B[g] = 0;
      for (g = 0; g < 32; g++) B[g] = x[g];
      for (g = 0; g < 32; g++)
        for (b = 0; b < 32; b++)
          B[g + b] += s[g] * n[b];
      return wt(t.subarray(32), B), X;
    }
    function ur(t, f) {
      var r = o(), e = o(), n = o(), s = o(), x = o(), g = o(), b = o();
      return Ue(t[2], M), ut(t[1], f), ge(n, t[1]), Z(s, n, te), Ee(n, n, t[2]), be(s, t[2], s), ge(x, s), ge(g, x), Z(b, g, x), Z(r, b, n), Z(r, r, s), kt(r, r), Z(r, r, n), Z(r, r, s), Z(r, r, s), Z(t[0], r, s), ge(e, t[0]), Z(e, e, s), Nt(e, n) && Z(t[0], t[0], se), ge(e, t[0]), Z(e, e, s), Nt(e, n) ? -1 : (Pt(t[0]) === f[31] >> 7 && Ee(t[0], L, t[0]), Z(t[3], t[0], t[1]), 0);
    }
    function bt(t, f, r, e) {
      var n, s = new Uint8Array(32), x = new Uint8Array(64), g = [o(), o(), o(), o()], b = [o(), o(), o(), o()];
      if (r < 64 || ur(b, e)) return -1;
      for (n = 0; n < r; n++) t[n] = f[n];
      for (n = 0; n < 32; n++) t[n + 32] = e[n];
      if (Oe(x, t, r), pt(x), gt(g, b, x), nt(b, f.subarray(32)), ft(g, b), dt(s, g), r -= 64, ve(f, 0, s, 0)) {
        for (n = 0; n < r; n++) t[n] = 0;
        return -1;
      }
      for (n = 0; n < r; n++) t[n] = f[n + 64];
      return r;
    }
    var Et = 32, it = 24, He = 32, Qe = 16, ze = 32, at = 32, Fe = 32, Je = 32, vt = 32, Ft = it, dr = He, gr = Qe, Re = 64, Me = 32, De = 64, mt = 32, Ut = 64;
    i.lowlevel = {
      crypto_core_hsalsa20: Be,
      crypto_stream_xor: ct,
      crypto_stream: Ot,
      crypto_stream_salsa20_xor: Le,
      crypto_stream_salsa20: pe,
      crypto_onetimeauth: xt,
      crypto_onetimeauth_verify: Mt,
      crypto_verify_16: Ce,
      crypto_verify_32: ve,
      crypto_secretbox: lt,
      crypto_secretbox_open: At,
      crypto_scalarmult: et,
      crypto_scalarmult_base: tt,
      crypto_box_beforenm: rt,
      crypto_box_afternm: Dt,
      crypto_box: Ar,
      crypto_box_open: hr,
      crypto_box_keypair: Qt,
      crypto_hash: Oe,
      crypto_sign: zt,
      crypto_sign_keypair: yt,
      crypto_sign_open: bt,
      crypto_secretbox_KEYBYTES: Et,
      crypto_secretbox_NONCEBYTES: it,
      crypto_secretbox_ZEROBYTES: He,
      crypto_secretbox_BOXZEROBYTES: Qe,
      crypto_scalarmult_BYTES: ze,
      crypto_scalarmult_SCALARBYTES: at,
      crypto_box_PUBLICKEYBYTES: Fe,
      crypto_box_SECRETKEYBYTES: Je,
      crypto_box_BEFORENMBYTES: vt,
      crypto_box_NONCEBYTES: Ft,
      crypto_box_ZEROBYTES: dr,
      crypto_box_BOXZEROBYTES: gr,
      crypto_sign_BYTES: Re,
      crypto_sign_PUBLICKEYBYTES: Me,
      crypto_sign_SECRETKEYBYTES: De,
      crypto_sign_SEEDBYTES: mt,
      crypto_hash_BYTES: Ut,
      gf: o,
      D: te,
      L: ot,
      pack25519: ke,
      unpack25519: ut,
      M: Z,
      A: be,
      S: ge,
      Z: Ee,
      pow2523: kt,
      add: ft,
      set25519: Ue,
      modL: wt,
      scalarmult: gt,
      scalarbase: nt
    };
    function Jt(t, f) {
      if (t.length !== Et) throw new Error("bad key size");
      if (f.length !== it) throw new Error("bad nonce size");
    }
    function yr(t, f) {
      if (t.length !== Fe) throw new Error("bad public key size");
      if (f.length !== Je) throw new Error("bad secret key size");
    }
    function de() {
      for (var t = 0; t < arguments.length; t++)
        if (!(arguments[t] instanceof Uint8Array))
          throw new TypeError("unexpected type, use Uint8Array");
    }
    function Zt(t) {
      for (var f = 0; f < t.length; f++) t[f] = 0;
    }
    i.randomBytes = function(t) {
      var f = new Uint8Array(t);
      return h(f, t), f;
    }, i.secretbox = function(t, f, r) {
      de(t, f, r), Jt(r, f);
      for (var e = new Uint8Array(He + t.length), n = new Uint8Array(e.length), s = 0; s < t.length; s++) e[s + He] = t[s];
      return lt(n, e, e.length, f, r), n.subarray(Qe);
    }, i.secretbox.open = function(t, f, r) {
      de(t, f, r), Jt(r, f);
      for (var e = new Uint8Array(Qe + t.length), n = new Uint8Array(e.length), s = 0; s < t.length; s++) e[s + Qe] = t[s];
      return e.length < 32 || At(n, e, e.length, f, r) !== 0 ? null : n.subarray(He);
    }, i.secretbox.keyLength = Et, i.secretbox.nonceLength = it, i.secretbox.overheadLength = Qe, i.scalarMult = function(t, f) {
      if (de(t, f), t.length !== at) throw new Error("bad n size");
      if (f.length !== ze) throw new Error("bad p size");
      var r = new Uint8Array(ze);
      return et(r, t, f), r;
    }, i.scalarMult.base = function(t) {
      if (de(t), t.length !== at) throw new Error("bad n size");
      var f = new Uint8Array(ze);
      return tt(f, t), f;
    }, i.scalarMult.scalarLength = at, i.scalarMult.groupElementLength = ze, i.box = function(t, f, r, e) {
      var n = i.box.before(r, e);
      return i.secretbox(t, f, n);
    }, i.box.before = function(t, f) {
      de(t, f), yr(t, f);
      var r = new Uint8Array(vt);
      return rt(r, t, f), r;
    }, i.box.after = i.secretbox, i.box.open = function(t, f, r, e) {
      var n = i.box.before(r, e);
      return i.secretbox.open(t, f, n);
    }, i.box.open.after = i.secretbox.open, i.box.keyPair = function() {
      var t = new Uint8Array(Fe), f = new Uint8Array(Je);
      return Qt(t, f), { publicKey: t, secretKey: f };
    }, i.box.keyPair.fromSecretKey = function(t) {
      if (de(t), t.length !== Je)
        throw new Error("bad secret key size");
      var f = new Uint8Array(Fe);
      return tt(f, t), { publicKey: f, secretKey: new Uint8Array(t) };
    }, i.box.publicKeyLength = Fe, i.box.secretKeyLength = Je, i.box.sharedKeyLength = vt, i.box.nonceLength = Ft, i.box.overheadLength = i.secretbox.overheadLength, i.sign = function(t, f) {
      if (de(t, f), f.length !== De)
        throw new Error("bad secret key size");
      var r = new Uint8Array(Re + t.length);
      return zt(r, t, t.length, f), r;
    }, i.sign.open = function(t, f) {
      if (de(t, f), f.length !== Me)
        throw new Error("bad public key size");
      var r = new Uint8Array(t.length), e = bt(r, t, t.length, f);
      if (e < 0) return null;
      for (var n = new Uint8Array(e), s = 0; s < n.length; s++) n[s] = r[s];
      return n;
    }, i.sign.detached = function(t, f) {
      for (var r = i.sign(t, f), e = new Uint8Array(Re), n = 0; n < e.length; n++) e[n] = r[n];
      return e;
    }, i.sign.detached.verify = function(t, f, r) {
      if (de(t, f, r), f.length !== Re)
        throw new Error("bad signature size");
      if (r.length !== Me)
        throw new Error("bad public key size");
      var e = new Uint8Array(Re + t.length), n = new Uint8Array(Re + t.length), s;
      for (s = 0; s < Re; s++) e[s] = f[s];
      for (s = 0; s < t.length; s++) e[s + Re] = t[s];
      return bt(n, e, e.length, r) >= 0;
    }, i.sign.keyPair = function() {
      var t = new Uint8Array(Me), f = new Uint8Array(De);
      return yt(t, f), { publicKey: t, secretKey: f };
    }, i.sign.keyPair.fromSecretKey = function(t) {
      if (de(t), t.length !== De)
        throw new Error("bad secret key size");
      for (var f = new Uint8Array(Me), r = 0; r < f.length; r++) f[r] = t[32 + r];
      return { publicKey: f, secretKey: new Uint8Array(t) };
    }, i.sign.keyPair.fromSeed = function(t) {
      if (de(t), t.length !== mt)
        throw new Error("bad seed size");
      for (var f = new Uint8Array(Me), r = new Uint8Array(De), e = 0; e < 32; e++) r[e] = t[e];
      return yt(f, r, !0), { publicKey: f, secretKey: r };
    }, i.sign.publicKeyLength = Me, i.sign.secretKeyLength = De, i.sign.seedLength = mt, i.sign.signatureLength = Re, i.hash = function(t) {
      de(t);
      var f = new Uint8Array(Ut);
      return Oe(f, t, t.length), f;
    }, i.hash.hashLength = Ut, i.verify = function(t, f) {
      return de(t, f), t.length === 0 || f.length === 0 || t.length !== f.length ? !1 : ye(t, 0, f, 0, t.length) === 0;
    }, i.setPRNG = function(t) {
      h = t;
    }, function() {
      var t = typeof self < "u" ? self.crypto || self.msCrypto : null;
      if (t && t.getRandomValues) {
        var f = 65536;
        i.setPRNG(function(r, e) {
          var n, s = new Uint8Array(e);
          for (n = 0; n < e; n += f)
            t.getRandomValues(s.subarray(n, n + Math.min(e - n, f)));
          for (n = 0; n < e; n++) r[n] = s[n];
          Zt(s);
        });
      } else typeof Hr < "u" && (t = Jr, t && t.randomBytes && i.setPRNG(function(r, e) {
        var n, s = t.randomBytes(e);
        for (n = 0; n < e; n++) r[n] = s[n];
        Zt(s);
      }));
    }();
  })(c.exports ? c.exports : self.nacl = self.nacl || {});
})(ar);
var Zr = ar.exports;
const Ze = /* @__PURE__ */ or(Zr);
var Wr = Object.defineProperty, qr = (c, i, o) => i in c ? Wr(c, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : c[i] = o, Ne = (c, i, o) => qr(c, typeof i != "symbol" ? i + "" : i, o);
async function Gr(c, i) {
  const o = c.getReader();
  let h;
  for (; !(h = await o.read()).done; )
    i(h.value);
}
function Xr(c) {
  let i, o, h, u = !1;
  return function(E) {
    i === void 0 ? (i = E, o = 0, h = -1) : i = _r(i, E);
    const L = i.length;
    let M = 0;
    for (; o < L; ) {
      u && (i[o] === 10 && (M = ++o), u = !1);
      let $ = -1;
      for (; o < L && $ === -1; ++o)
        switch (i[o]) {
          case 58:
            h === -1 && (h = o - M);
            break;
          case 13:
            u = !0;
          case 10:
            $ = o;
            break;
        }
      if ($ === -1)
        break;
      c(i.subarray(M, $), h), M = o, h = -1;
    }
    M === L ? i = void 0 : M !== 0 && (i = i.subarray(M), o -= M);
  };
}
function Vr(c, i, o) {
  let h = qt();
  const u = new TextDecoder();
  return function(E, L) {
    if (E.length === 0)
      o == null || o(h), h = qt();
    else if (L > 0) {
      const M = u.decode(E.subarray(0, L)), $ = L + (E[L + 1] === 32 ? 2 : 1), te = u.decode(E.subarray($));
      switch (M) {
        case "data":
          h.data = h.data ? h.data + `
` + te : te;
          break;
        case "event":
          h.event = te;
          break;
        case "id":
          c(h.id = te);
          break;
        case "retry":
          const ie = parseInt(te, 10);
          isNaN(ie) || i(h.retry = ie);
          break;
      }
    }
  };
}
function _r(c, i) {
  const o = new Uint8Array(c.length + i.length);
  return o.set(c), o.set(i, c.length), o;
}
function qt() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
var $r = function(c, i) {
  var o = {};
  for (var h in c) Object.prototype.hasOwnProperty.call(c, h) && i.indexOf(h) < 0 && (o[h] = c[h]);
  if (c != null && typeof Object.getOwnPropertySymbols == "function")
    for (var u = 0, h = Object.getOwnPropertySymbols(c); u < h.length; u++)
      i.indexOf(h[u]) < 0 && Object.prototype.propertyIsEnumerable.call(c, h[u]) && (o[h[u]] = c[h[u]]);
  return o;
};
const St = "text/event-stream", ef = 1e3, Gt = "last-event-id";
function sr(c, i) {
  var { signal: o, headers: h, onopen: u, onmessage: E, onclose: L, onerror: M, openWhenHidden: $, fetch: te } = i, ie = $r(i, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise((le, xe) => {
    const se = Object.assign({}, h);
    se.accept || (se.accept = St);
    let re;
    function ye() {
      re.abort(), document.hidden || Be();
    }
    $ || document.addEventListener("visibilitychange", ye);
    let Ce = ef, ve = 0;
    function Se() {
      document.removeEventListener("visibilitychange", ye), window.clearTimeout(ve), re.abort();
    }
    o == null || o.addEventListener("abort", () => {
      Se(), le();
    });
    const Pe = te ?? window.fetch, me = u ?? tf;
    async function Be() {
      var we;
      re = new AbortController();
      try {
        const Le = await Pe(c, Object.assign(Object.assign({}, ie), { headers: se, signal: re.signal }));
        await me(Le), await Gr(Le.body, Xr(Vr((pe) => {
          pe ? se[Gt] = pe : delete se[Gt];
        }, (pe) => {
          Ce = pe;
        }, E))), L == null || L(), Se(), le();
      } catch (Le) {
        if (!re.signal.aborted)
          try {
            const pe = (we = M == null ? void 0 : M(Le)) !== null && we !== void 0 ? we : Ce;
            window.clearTimeout(ve), ve = window.setTimeout(Be, pe);
          } catch (pe) {
            Se(), xe(pe);
          }
      }
    }
    Be();
  });
}
function tf(c) {
  const i = c.headers.get("content-type");
  if (!(i != null && i.startsWith(St)))
    throw new Error(`Expected content-type to be ${St}, Actual: ${i}`);
}
function rf(c, i) {
  const o = Ve.encodeBase64(c);
  return i ? encodeURIComponent(o) : o;
}
function ff(c, i) {
  return i && (c = decodeURIComponent(c)), Ve.decodeBase64(c);
}
function nf(c, i = !1) {
  let o;
  return c instanceof Uint8Array ? o = c : (typeof c != "string" && (c = JSON.stringify(c)), o = Ve.decodeUTF8(c)), rf(o, i);
}
function of(c, i = !1) {
  const o = ff(c, i);
  return {
    toString() {
      return Ve.encodeUTF8(o);
    },
    toObject() {
      try {
        return JSON.parse(Ve.encodeUTF8(o));
      } catch {
        return null;
      }
    },
    toUint8Array() {
      return o;
    }
  };
}
const Xt = {
  encode: nf,
  decode: of
};
function af(c, i) {
  const o = new Uint8Array(c.length + i.length);
  return o.set(c), o.set(i, c.length), o;
}
function sf(c, i) {
  if (i >= c.length)
    throw new Error("Index is out of buffer");
  const o = c.slice(0, i), h = c.slice(i);
  return [o, h];
}
function je(c) {
  let i = "";
  return c.forEach((o) => {
    i += ("0" + (o & 255).toString(16)).slice(-2);
  }), i;
}
function _e(c) {
  if (c.length % 2 !== 0)
    throw new Error(`Cannot convert ${c} to bytesArray`);
  const i = new Uint8Array(c.length / 2);
  for (let o = 0; o < c.length; o += 2)
    i[o / 2] = parseInt(c.slice(o, o + 2), 16);
  return i;
}
class Ye {
  constructor(i) {
    Ne(this, "nonceLength", 24), Ne(this, "keyPair"), Ne(this, "sessionId"), this.keyPair = i ? this.createKeypairFromString(i) : this.createKeypair(), this.sessionId = je(this.keyPair.publicKey);
  }
  createKeypair() {
    return Ze.box.keyPair();
  }
  createKeypairFromString(i) {
    return {
      publicKey: _e(i.publicKey),
      secretKey: _e(i.secretKey)
    };
  }
  createNonce() {
    return Ze.randomBytes(this.nonceLength);
  }
  encrypt(i, o) {
    const h = new TextEncoder().encode(i), u = this.createNonce(), E = Ze.box(h, u, o, this.keyPair.secretKey);
    return af(u, E);
  }
  decrypt(i, o) {
    const [h, u] = sf(i, this.nonceLength), E = Ze.box.open(
      u,
      h,
      o,
      this.keyPair.secretKey
    );
    if (!E)
      throw new Error(
        `Decryption error: 
 message: ${i.toString()} 
 sender pubkey: ${o.toString()} 
 keypair pubkey: ${this.keyPair.publicKey.toString()} 
 keypair secretkey: ${this.keyPair.secretKey.toString()}`
      );
    return new TextDecoder().decode(E);
  }
  stringifyKeypair() {
    return {
      publicKey: je(this.keyPair.publicKey),
      secretKey: je(this.keyPair.secretKey)
    };
  }
  static async generateKeyPairByString(i) {
    const o = new TextEncoder().encode(i), h = await crypto.subtle.digest("SHA-256", o), u = new Uint8Array(h), E = Ze.box.keyPair.fromSecretKey(u.slice(0, 32));
    return {
      publicKey: je(E.publicKey),
      secretKey: je(E.secretKey)
    };
  }
  static isSameKeypair(i, o) {
    return !i || !o ? !1 : i.publicKey === o.publicKey && i.secretKey === o.secretKey;
  }
}
const cr = "https://bridge.mz.xyz", Vt = {
  CONNECT: "[MizuWallet SSE Connect]"
};
var Bt = /* @__PURE__ */ ((c) => (c[c.SUCCESS = 0] = "SUCCESS", c[c.ERROR = 1] = "ERROR", c))(Bt || {}), Xe = /* @__PURE__ */ ((c) => (c[c.MIZU = 0] = "MIZU", c[c.MIZU_PC = 1] = "MIZU_PC", c[c.THIRD_PARTY = 2] = "THIRD_PARTY", c))(Xe || {}), Te = /* @__PURE__ */ ((c) => (c[c.START = 0] = "START", c[c.DATA = 1] = "DATA", c[c.FULFILLED = 2] = "FULFILLED", c[c.REJECT = 3] = "REJECT", c[c.CANCEL = 4] = "CANCEL", c[c.CLOSE = 5] = "CLOSE", c))(Te || {});
const _t = async (c) => {
  const i = new URLSearchParams(), o = new Ye(c.keypair), h = new AbortController();
  i.append("client_id", o.sessionId.toString()), i.append("to", c.to.toString()), i.append("ttl", c.ttl.toString());
  const u = JSON.stringify(c.content), E = _e(c.to.toString()), L = o.encrypt(u, E), M = je(L);
  return await sr(`${cr}/bridge/message?${i.toString()}`, {
    method: "POST",
    openWhenHidden: !1,
    headers: {
      Accept: "text/event-stream"
    },
    onopen($) {
      var te, ie, le, xe;
      return $.ok && $.status === 200 ? ((te = console.group) == null || te.call(console, "[SessionPost]"), console.log(`The connection from ${o.sessionId} to ${c.to}`), (ie = console.groupEnd) == null || ie.call(console), Promise.resolve()) : ((le = console.group) == null || le.call(console, "[SessionPost]"), console.log(`The connection from ${o.sessionId} to ${c.to}`), console.log("Client side error ", $), (xe = console.groupEnd) == null || xe.call(console), Promise.reject());
    },
    onmessage() {
    },
    onclose() {
      var $, te;
      ($ = console.group) == null || $.call(console, "[SessionPost]"), console.log(`The connection from ${o.sessionId} to ${c.to} is closed by the server`), (te = console.groupEnd) == null || te.call(console), console.log("abort"), h == null || h.abort();
    },
    onerror($) {
      var te, ie;
      (te = console.group) == null || te.call(console, "[SessionPost]"), console.log(`The connection from ${o.sessionId} to ${c.to}`), console.log("There was an error from server", $.message || $), (ie = console.groupEnd) == null || ie.call(console), h == null || h.abort();
    },
    body: M,
    signal: h.signal
  }), {
    ctrl: h
  };
}, $t = async (c) => {
  const i = new URLSearchParams(), o = c.keypair.publicKey.toString();
  i.append("client_id", o);
  const h = new AbortController();
  return sr(`${cr}/bridge/events?${i.toString()}`, {
    openWhenHidden: !1,
    onopen(u) {
      return u.status === 200 ? (console.info(`${Vt.CONNECT} Opened`), Promise.resolve()) : (console.error(`${Vt.CONNECT} Failed to open`), Promise.reject());
    },
    onmessage(u) {
      var E, L;
      try {
        if (u.data && u.data.startsWith("{")) {
          const M = JSON.parse(u.data);
          if (M.message) {
            const $ = new Ye({
              ...c.keypair
            }), te = M.message, ie = _e(te), le = $.decrypt(
              ie,
              _e(M.from.toString())
            ), xe = JSON.parse(le);
            (c.nonce && xe.nonce == c.nonce || !c.nonce) && ((E = c.callback) == null || E.call(c, {
              status: 0,
              message: xe
            }));
          }
        }
      } catch (M) {
        console.error(M), (L = c.callback) == null || L.call(c, {
          status: 1,
          error: M
        });
      }
    },
    onclose() {
      var u, E;
      (u = console.group) == null || u.call(console, "[SessionListenerLong]"), console.log(`Listening channel: ${o}`), console.log("Close abort"), (E = console.groupEnd) == null || E.call(console), h == null || h.abort();
    },
    onerror(u) {
      var E, L;
      (E = console.group) == null || E.call(console, "[SessionListenerLong]"), console.log(`Listening channel: ${o}`), console.log("There was an error from server", u.message || u), console.log("Error abort"), (L = console.groupEnd) == null || L.call(console), h == null || h.abort();
    },
    signal: h.signal
  }), {
    ctrl: h
  };
};
class er {
  constructor(i) {
    Ne(this, "from", ""), Ne(this, "nonce", ""), Ne(this, "body"), Ne(this, "type", ""), Object.assign(this, i), this.body = i.body;
  }
}
const We = typeof window < "u" && !!(window != null && window.TelegramWebviewProxy);
var tr, rr;
typeof window < "u" && ((rr = (tr = window == null ? void 0 : window.Telegram) == null ? void 0 : tr.WebApp) != null && rr.openTelegramLink);
const cf = typeof window < "u" && (window == null ? void 0 : window.parent) != null && window != (window == null ? void 0 : window.parent);
function xf(c, i, o) {
  if (i || (i = function() {
  }), o === void 0 && (o = ""), console.log("[Telegram.WebView] > postEvent", c, o), (window == null ? void 0 : window.TelegramWebviewProxy) !== void 0)
    window == null || window.TelegramWebviewProxy.postEvent(c, JSON.stringify(o)), i();
  else if (cf)
    try {
      var h = "https://web.telegram.org";
      h = "*", window == null || window.parent.postMessage(
        JSON.stringify({ eventType: c, eventData: o }),
        h
      ), i();
    } catch (u) {
      i(u);
    }
  else
    i({ notAvailable: !0 });
}
const lf = function(c) {
  var h, u, E, L;
  if (typeof window < "u" && ((u = (h = window == null ? void 0 : window.Telegram) == null ? void 0 : h.WebApp) != null && u.openTelegramLink)) {
    (L = (E = window == null ? void 0 : window.Telegram) == null ? void 0 : E.WebApp) == null || L.openTelegramLink(c);
    return;
  }
  let i = document.createElement("A");
  if (i.href = c, i.protocol != "http:" && i.protocol != "https:")
    throw console.error("[Telegram.WebApp] Url protocol is not supported", c), Error("WebAppTgUrlInvalid");
  if (i.hostname != "t.me")
    throw console.error("[Telegram.WebApp] Url host is not supported", c), Error("WebAppTgUrlInvalid");
  var o = i.pathname + i.search;
  xf("web_app_open_tg_link", !1, { path_full: o });
}, It = (c) => {
  var i, o, h;
  return ((h = (o = (i = c == null ? void 0 : c.response) == null ? void 0 : i.errors) == null ? void 0 : o[0]) == null ? void 0 : h.message) || c.message || c;
};
class Lt {
  static buildAction(i) {
    return `${i.prefix}${i.action}_${i.params.map((o) => Lt.actionParamsEncode(o)).join("_")}`;
  }
  static actionParamsEncode(i) {
    return encodeURIComponent(i).replace(/\./g, "%2E").replace(/%/g, "--");
  }
  static actionParamsDecode(i) {
    return decodeURIComponent(i.replace(/--/g, "%"));
  }
}
const Ct = "mizuwallet-address";
class xr {
  constructor() {
    W(this, "manifestURL", "");
    W(this, "miniAppURL", "");
    W(this, "origin", "");
    W(this, "mizuClient", null);
    W(this, "network", "");
  }
  async startWebChannel(i) {
    var te;
    const o = new Ye(), h = Date.now().toString(), u = await Ye.generateKeyPairByString(
      `${i.address || ""}+${h}`
    ), E = Xt.encode(u, !0), L = new URLSearchParams();
    L.append("network", this.network), L.append("sessionId", o.sessionId), L.append("nonce", h.toString()), L.append("k", E), i.redirectURL && L.append("redirect_url", i.redirectURL), document.querySelector(".mizu-wallet-frame") && ((te = document.querySelector(".mizu-wallet-frame")) == null || te.remove());
    const M = document.createElement("iframe");
    M.setAttribute("class", "mizu-wallet-frame"), M.setAttribute("src", `${this.origin}/walletv2/${i.url}?${L.toString()}`), document.body.appendChild(M);
    const { ctrl: $ } = await _t({
      to: u.publicKey,
      ttl: 300,
      content: new er({
        from: Xe.THIRD_PARTY,
        type: Te.DATA,
        // put all data here
        body: {
          manifestURL: this.manifestURL,
          address: window == null ? void 0 : window.localStorage.getItem(Ct),
          ...i.metadata
        },
        nonce: h
      })
    });
    return new Promise(async (ie, le) => {
      const { ctrl: xe } = await $t({
        keypair: o.stringifyKeypair(),
        callback: (se) => {
          var Ce, ve, Se, Pe, me;
          const { message: re, status: ye } = se;
          if ((re == null ? void 0 : re.from) === Xe.MIZU_PC) {
            if (ye === Bt.ERROR) {
              (Ce = M.parentNode) == null || Ce.removeChild(M), $.abort(), xe.abort(), le(se.error);
              return;
            }
            if ((re == null ? void 0 : re.type) == Te.CLOSE) {
              (ve = M.parentNode) == null || ve.removeChild(M), $.abort(), xe.abort(), ie({});
              return;
            }
            if ((re == null ? void 0 : re.type) == Te.CANCEL) {
              (Se = M.parentNode) == null || Se.removeChild(M), $.abort(), xe.abort(), le("User Canceled");
              return;
            }
            if (re.type === Te.FULFILLED) {
              (Pe = M.parentNode) == null || Pe.removeChild(M), $.abort(), xe.abort(), i.returnKey ? ie({
                [i.returnKey]: (me = re.body) == null ? void 0 : me[i.returnKey]
              }) : ie({});
              return;
            }
          }
        }
      });
    });
  }
  async startChannel(i) {
    const o = window == null ? void 0 : window.localStorage.getItem(Ct);
    if (o && i.isAddressRequired || !i.isAddressRequired) {
      const h = new Ye(), u = Date.now().toString(), E = await Ye.generateKeyPairByString(
        `${o || ""}+${u}`
      ), L = Xt.encode(E, !0), M = Lt.buildAction({
        prefix: "R_",
        action: i.buildAction.actions,
        params: [h.sessionId, u, L]
      });
      lf(`${this.miniAppURL}?startapp=${M}`);
      const { ctrl: $ } = await _t({
        to: E.publicKey,
        ttl: 300,
        content: new er({
          from: Xe.THIRD_PARTY,
          type: Te.DATA,
          // put all data here
          body: {
            manifestURL: this.manifestURL,
            address: window == null ? void 0 : window.localStorage.getItem(Ct),
            ...i.metadata
          },
          nonce: u
        })
      });
      return new Promise(async (te, ie) => {
        const { ctrl: le } = await $t({
          keypair: h.stringifyKeypair(),
          callback: (xe) => {
            var ye;
            const { message: se, status: re } = xe;
            if ((se == null ? void 0 : se.from) === Xe.MIZU) {
              if (re === Bt.ERROR) {
                $.abort(), le.abort(), ie(xe.error);
                return;
              }
              if ((se == null ? void 0 : se.type) == Te.CANCEL) {
                $.abort(), le.abort(), ie("User Canceled");
                return;
              }
              if (se.type === Te.FULFILLED) {
                $.abort(), le.abort(), i.returnKey ? te({
                  [i.returnKey]: (ye = se.body) == null ? void 0 : ye[i.returnKey]
                }) : te({});
                return;
              }
            }
          }
        });
      });
    } else
      throw new Error(`${Tt.TRANSACTION} No address found`);
  }
}
const qe = "mizuwallet-address", Ge = "mizuwallet-publickey";
class Af extends xr {
  /**
   *
   * @param args.manifestURL Manifest URL
   */
  constructor(o) {
    super();
    /**
     * @param manifestURL
     */
    W(this, "manifestURL");
    W(this, "miniAppURL");
    if (!o.manifestURL) throw new Error("manifestURL is required");
    this.manifestURL = o.manifestURL, this.miniAppURL = Or(o.network);
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
    var h, u, E, L;
    if (window != null && window.localStorage && ((h = window.localStorage) != null && h.getItem(qe)) && ((u = window.localStorage) != null && u.getItem(Ge)))
      return {
        address: ((E = window.localStorage.getItem(qe)) == null ? void 0 : E.toString()) || "",
        publicKey: ((L = window.localStorage.getItem(Ge)) == null ? void 0 : L.toString()) || ""
      };
    const { account: o } = await this.startChannel({
      buildAction: {
        actions: "miniapp-connectv2"
      },
      metadata: {},
      returnKey: "account"
    });
    if (window != null && window.localStorage && (o != null && o.address) && br.isValid({
      input: o == null ? void 0 : o.address,
      strict: !0
    }))
      return window.localStorage.setItem(qe, o == null ? void 0 : o.address), window.localStorage.setItem(Ge, o == null ? void 0 : o.publicKey), {
        address: o == null ? void 0 : o.address,
        publicKey: o == null ? void 0 : o.publicKey
      };
    throw new Error(`${Tt.CONNECT} Error`);
  }
  disconnect() {
    window != null && window.localStorage.getItem(qe) && (window == null || window.localStorage.removeItem(qe)), window != null && window.localStorage.getItem(Ge) && (window == null || window.localStorage.removeItem(Ge));
  }
  async signAndSubmitTransaction(o) {
    return await this.startChannel({
      buildAction: {
        actions: "miniapp-transactionv2"
      },
      metadata: {
        transaction: o
      },
      returnKey: "hash",
      isAddressRequired: !0
    });
  }
  async signTransaction(o) {
    return await this.startChannel({
      buildAction: {
        actions: "miniapp-signtransactionv2"
      },
      metadata: {
        transaction: o.bcsToHex().toStringWithoutPrefix()
      },
      returnKey: "signature",
      isAddressRequired: !0
    });
  }
  async signMessage(o) {
    return await this.startChannel({
      buildAction: {
        actions: "miniapp-signmessagev2"
      },
      metadata: {
        args: o
      },
      returnKey: "data",
      isAddressRequired: !0
    });
  }
}
const hf = "https://mizu.io", uf = () => {
  const c = document.createElement("style");
  c.innerHTML = `
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
	`, document.head.appendChild(c);
};
class df extends xr {
  /**
   *
   * @param args.manifestURL Manifest URL
   */
  constructor(o) {
    super();
    W(this, "authCode");
    W(this, "address");
    W(this, "manifestURL");
    W(this, "network");
    W(this, "mizuClient");
    W(this, "provider");
    W(this, "origin");
    if (!o.manifestURL) throw new Error("manifestURL is required");
    this.authCode = "", this.manifestURL = o.manifestURL, this.network = o.network, this.mizuClient = o.mizuClient, this.origin = hf, this.address = "", uf();
  }
  async connect() {
    var h, u, E, L;
    const o = await this.startWebChannel({
      url: "checkLogin",
      metadata: {
        manifestURL: this.manifestURL,
        network: this.network,
        appId: this.mizuClient.appId
      },
      returnKey: "account"
    });
    return o.account ? (this.authCode = (h = o.account) == null ? void 0 : h.code, this.address = (u = o.account) == null ? void 0 : u.address, Promise.resolve({
      address: (E = o.account) == null ? void 0 : E.address,
      publicKey: ((L = o.account) == null ? void 0 : L.publicKey) || ""
    })) : Promise.reject("User Canceled");
  }
  async disconnect() {
    var o;
    await this.startWebChannel({
      url: "checkLogin",
      redirectURL: "/walletv2/logout",
      metadata: {
        manifestURL: this.manifestURL,
        network: this.network,
        appId: this.mizuClient.appId
      },
      returnKey: ""
    }), await ((o = this.mizuClient) == null ? void 0 : o.logout());
  }
  async signAndSubmitTransaction(o) {
    var h;
    try {
      const u = await ((h = this.mizuClient) == null ? void 0 : h.createOrderWithCode({
        code: this.authCode,
        payload: o
      }));
      if (!u) throw new Error("Transaction creation failed");
      return await this.startWebChannel({
        url: "checkLogin",
        redirectURL: "/walletv2/transaction",
        metadata: {
          manifestURL: this.manifestURL,
          network: this.network,
          appId: this.mizuClient.appId,
          orderId: u,
          transaction: o
        },
        returnKey: "hash"
      });
    } catch (u) {
      throw console.error(u), new Error(It(u));
    }
  }
  async signTransaction(o) {
    try {
      return {
        signature: (await this.startWebChannel({
          url: "checkLogin",
          redirectURL: "/walletv2/sign_transaction",
          metadata: {
            manifestURL: this.manifestURL,
            network: this.network,
            appId: this.mizuClient.appId,
            transaction: o.bcsToHex().toStringWithoutPrefix()
          },
          returnKey: "signature"
        })).signature
      };
    } catch (h) {
      throw console.error(h), new Error(It(h));
    }
  }
  async signMessage(o) {
    try {
      return {
        data: {
          ...(await this.startWebChannel({
            url: "checkLogin",
            redirectURL: "/walletv2/sign_message",
            metadata: {
              manifestURL: this.manifestURL,
              network: this.network,
              appId: this.mizuClient.appId,
              messageInfo: {
                ...o
              }
            },
            returnKey: "message"
          })).message
        }
      };
    } catch (h) {
      throw console.error(h), new Error(It(h));
    }
  }
}
class bf {
  constructor(i) {
    W(this, "url", kr);
    W(this, "version", "1.0.0");
    W(this, "name", Kr);
    W(this, "icon", Qr);
    W(this, "chains", Br);
    W(this, "accounts", []);
    W(this, "provider");
    W(this, "mizuClient");
    W(this, "telegramMiniAppHelper");
    W(this, "websiteHelper");
    W(this, "accountInfo");
    W(this, "account", async () => this.accountInfo || {
      address: "",
      publicKey: ""
    });
    W(this, "connect", async () => {
      var i;
      try {
        if (We)
          if (this.telegramMiniAppHelper)
            this.accountInfo = await this.telegramMiniAppHelper.connect();
          else
            throw new Error(`${Tt.CONNECT} Please pass a valid manifestURL`);
        else
          this.accountInfo = await ((i = this.websiteHelper) == null ? void 0 : i.connect());
        return {
          args: {
            ...this.accountInfo
          },
          status: Ie.APPROVED
        };
      } catch (o) {
        return console.error(o), {
          status: Ie.REJECTED
        };
      }
    });
    W(this, "network", async () => ({
      name: this.provider.network,
      chainId: this.provider.network === "mainnet" ? 1 : 2
    }));
    W(this, "disconnect", async () => {
      var i, o;
      try {
        We ? await ((i = this.telegramMiniAppHelper) == null ? void 0 : i.disconnect()) : await ((o = this.websiteHelper) == null ? void 0 : o.disconnect());
      } catch (h) {
        throw h;
      }
    });
    W(this, "signTransaction", async (i, o) => {
      var h, u;
      try {
        console.log(o);
        let E = {};
        if (We ? E = await ((h = this.telegramMiniAppHelper) == null ? void 0 : h.signTransaction(i)) : E = await ((u = this.websiteHelper) == null ? void 0 : u.signTransaction(i)), E.signature) {
          const L = new Er(Ur.from(E.signature, "hex"));
          return {
            args: vr.deserialize(L),
            status: Ie.APPROVED
          };
        } else
          return {
            status: Ie.REJECTED
          };
      } catch (E) {
        throw E.message || E ? new Error(E.message || E) : new Rt(st.InternalError);
      }
    });
    W(this, "signAndSubmitTransaction", async (i) => {
      var o, h;
      try {
        let u = {};
        return We ? u = await ((o = this.telegramMiniAppHelper) == null ? void 0 : o.signAndSubmitTransaction(i.payload)) : u = await ((h = this.websiteHelper) == null ? void 0 : h.signAndSubmitTransaction(i.payload)), u != null && u.hash ? {
          args: u,
          status: Ie.APPROVED
        } : {
          status: Ie.REJECTED
        };
      } catch (u) {
        throw u.message || u ? new Error(u.message || u) : new Rt(st.InternalError);
      }
    });
    W(this, "signMessage", async (i) => {
      var o, h;
      try {
        const { message: u, nonce: E, ...L } = i;
        let M = {};
        return We ? M = await ((o = this.telegramMiniAppHelper) == null ? void 0 : o.signMessage({
          message: u,
          nonce: E
        })) : M = await ((h = this.websiteHelper) == null ? void 0 : h.signMessage({
          message: u,
          nonce: E
        })), M != null && M.data ? {
          args: {
            ...M == null ? void 0 : M.data,
            ...L
          },
          status: Ie.APPROVED
        } : {
          status: Ie.REJECTED
        };
      } catch (u) {
        throw u.message || u ? new Error(u.message || u) : new Rt(st.InternalError);
      }
    });
    W(this, "onAccountChange", async () => Promise.resolve());
    W(this, "onNetworkChange", async () => Promise.resolve());
    if (!i.network) throw new Error("MizuWallet: network is required");
    if (this.mizuClient = new mr({
      appId: i.appId || Pr(i.network),
      network: i.network
    }), this.provider = {
      network: i.network,
      address: ""
    }, i.manifestURL.indexOf("_") > -1)
      throw new Error('manifestURL can not contain underscore: "_"');
    i != null && i.manifestURL && (this.telegramMiniAppHelper = new Af({
      manifestURL: i == null ? void 0 : i.manifestURL,
      network: i.network
    })), this.websiteHelper = new df({
      manifestURL: i.manifestURL,
      network: i.network,
      mizuClient: this.mizuClient
    });
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
        version: "1.1.0",
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
export {
  bf as MizuWallet
};
