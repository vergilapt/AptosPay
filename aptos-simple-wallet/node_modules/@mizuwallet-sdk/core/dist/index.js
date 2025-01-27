var Gt = Object.defineProperty;
var Ht = (E, s, x) => s in E ? Gt(E, s, { enumerable: !0, configurable: !0, writable: !0, value: x }) : E[s] = x;
var pf = (E, s, x) => Ht(E, typeof s != "symbol" ? s + "" : s, x);
import { Network as Mt } from "@aptos-labs/ts-sdk";
import xf, { gql as af } from "graphql-request";
import { jwtDecode as Rt } from "jwt-decode";
var Qt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Kt(E) {
  return E && E.__esModule && Object.prototype.hasOwnProperty.call(E, "default") ? E.default : E;
}
function Zt(E) {
  if (E.__esModule) return E;
  var s = E.default;
  if (typeof s == "function") {
    var x = function $() {
      return this instanceof $ ? Reflect.construct(s, arguments, this.constructor) : s.apply(this, arguments);
    };
    x.prototype = s.prototype;
  } else x = {};
  return Object.defineProperty(x, "__esModule", { value: !0 }), Object.keys(E).forEach(function($) {
    var N = Object.getOwnPropertyDescriptor(E, $);
    Object.defineProperty(x, $, N.get ? N : {
      enumerable: !0,
      get: function() {
        return E[$];
      }
    });
  }), x;
}
var Lt = { exports: {} };
(function(E) {
  (function(s, x) {
    E.exports ? E.exports = x() : (s.nacl || (s.nacl = {}), s.nacl.util = x());
  })(Qt, function() {
    var s = {};
    function x($) {
      if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test($))
        throw new TypeError("invalid encoding");
    }
    return s.decodeUTF8 = function($) {
      if (typeof $ != "string") throw new TypeError("expected string");
      var N, ff = unescape(encodeURIComponent($)), of = new Uint8Array(ff.length);
      for (N = 0; N < ff.length; N++) of[N] = ff.charCodeAt(N);
      return of;
    }, s.encodeUTF8 = function($) {
      var N, ff = [];
      for (N = 0; N < $.length; N++) ff.push(String.fromCharCode($[N]));
      return decodeURIComponent(escape(ff.join("")));
    }, typeof atob > "u" ? typeof Buffer.from < "u" ? (s.encodeBase64 = function($) {
      return Buffer.from($).toString("base64");
    }, s.decodeBase64 = function($) {
      return x($), new Uint8Array(Array.prototype.slice.call(Buffer.from($, "base64"), 0));
    }) : (s.encodeBase64 = function($) {
      return new Buffer($).toString("base64");
    }, s.decodeBase64 = function($) {
      return x($), new Uint8Array(Array.prototype.slice.call(new Buffer($, "base64"), 0));
    }) : (s.encodeBase64 = function($) {
      var N, ff = [], of = $.length;
      for (N = 0; N < of; N++) ff.push(String.fromCharCode($[N]));
      return btoa(ff.join(""));
    }, s.decodeBase64 = function($) {
      x($);
      var N, ff = atob($), of = new Uint8Array(ff.length);
      for (N = 0; N < ff.length; N++) of[N] = ff.charCodeAt(N);
      return of;
    }), s;
  });
})(Lt);
var Xt = Lt.exports;
const $f = /* @__PURE__ */ Kt(Xt);
function Vt(E) {
  throw new Error('Could not dynamically require "' + E + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var fr = { exports: {} };
const tr = {}, rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tr
}, Symbol.toStringTag, { value: "Module" })), er = /* @__PURE__ */ Zt(rr);
(function(E) {
  (function(s) {
    var x = function(t) {
      var e, r = new Float64Array(16);
      if (t) for (e = 0; e < t.length; e++) r[e] = t[e];
      return r;
    }, $ = function() {
      throw new Error("no PRNG");
    }, N = new Uint8Array(16), ff = new Uint8Array(32);
    ff[0] = 9;
    var of = x(), wf = x([1]), zt = x([56129, 1]), xt = x([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), Ot = x([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), st = x([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), ht = x([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), Pt = x([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function ct(t, e, r, f) {
      t[e] = r >> 24 & 255, t[e + 1] = r >> 16 & 255, t[e + 2] = r >> 8 & 255, t[e + 3] = r & 255, t[e + 4] = f >> 24 & 255, t[e + 5] = f >> 16 & 255, t[e + 6] = f >> 8 & 255, t[e + 7] = f & 255;
    }
    function Df(t, e, r, f, n) {
      var i, o = 0;
      for (i = 0; i < n; i++) o |= t[e + i] ^ r[f + i];
      return (1 & o - 1 >>> 8) - 1;
    }
    function dt(t, e, r, f) {
      return Df(t, e, r, f, 16);
    }
    function Ff(t, e, r, f) {
      return Df(t, e, r, f, 32);
    }
    function mt(t, e, r, f) {
      for (var n = f[0] & 255 | (f[1] & 255) << 8 | (f[2] & 255) << 16 | (f[3] & 255) << 24, i = r[0] & 255 | (r[1] & 255) << 8 | (r[2] & 255) << 16 | (r[3] & 255) << 24, o = r[4] & 255 | (r[5] & 255) << 8 | (r[6] & 255) << 16 | (r[7] & 255) << 24, u = r[8] & 255 | (r[9] & 255) << 8 | (r[10] & 255) << 16 | (r[11] & 255) << 24, g = r[12] & 255 | (r[13] & 255) << 8 | (r[14] & 255) << 16 | (r[15] & 255) << 24, U = f[4] & 255 | (f[5] & 255) << 8 | (f[6] & 255) << 16 | (f[7] & 255) << 24, w = e[0] & 255 | (e[1] & 255) << 8 | (e[2] & 255) << 16 | (e[3] & 255) << 24, G = e[4] & 255 | (e[5] & 255) << 8 | (e[6] & 255) << 16 | (e[7] & 255) << 24, _ = e[8] & 255 | (e[9] & 255) << 8 | (e[10] & 255) << 16 | (e[11] & 255) << 24, M = e[12] & 255 | (e[13] & 255) << 8 | (e[14] & 255) << 16 | (e[15] & 255) << 24, j = f[8] & 255 | (f[9] & 255) << 8 | (f[10] & 255) << 16 | (f[11] & 255) << 24, P = r[16] & 255 | (r[17] & 255) << 8 | (r[18] & 255) << 16 | (r[19] & 255) << 24, O = r[20] & 255 | (r[21] & 255) << 8 | (r[22] & 255) << 16 | (r[23] & 255) << 24, C = r[24] & 255 | (r[25] & 255) << 8 | (r[26] & 255) << 16 | (r[27] & 255) << 24, z = r[28] & 255 | (r[29] & 255) << 8 | (r[30] & 255) << 16 | (r[31] & 255) << 24, L = f[12] & 255 | (f[13] & 255) << 8 | (f[14] & 255) << 16 | (f[15] & 255) << 24, I = n, S = i, v = o, A = u, T = g, p = U, h = w, c = G, b = _, d = M, l = j, y = P, B = O, m = C, Y = z, q = L, a, W = 0; W < 20; W += 2)
        a = I + B | 0, T ^= a << 7 | a >>> 25, a = T + I | 0, b ^= a << 9 | a >>> 23, a = b + T | 0, B ^= a << 13 | a >>> 19, a = B + b | 0, I ^= a << 18 | a >>> 14, a = p + S | 0, d ^= a << 7 | a >>> 25, a = d + p | 0, m ^= a << 9 | a >>> 23, a = m + d | 0, S ^= a << 13 | a >>> 19, a = S + m | 0, p ^= a << 18 | a >>> 14, a = l + h | 0, Y ^= a << 7 | a >>> 25, a = Y + l | 0, v ^= a << 9 | a >>> 23, a = v + Y | 0, h ^= a << 13 | a >>> 19, a = h + v | 0, l ^= a << 18 | a >>> 14, a = q + y | 0, A ^= a << 7 | a >>> 25, a = A + q | 0, c ^= a << 9 | a >>> 23, a = c + A | 0, y ^= a << 13 | a >>> 19, a = y + c | 0, q ^= a << 18 | a >>> 14, a = I + A | 0, S ^= a << 7 | a >>> 25, a = S + I | 0, v ^= a << 9 | a >>> 23, a = v + S | 0, A ^= a << 13 | a >>> 19, a = A + v | 0, I ^= a << 18 | a >>> 14, a = p + T | 0, h ^= a << 7 | a >>> 25, a = h + p | 0, c ^= a << 9 | a >>> 23, a = c + h | 0, T ^= a << 13 | a >>> 19, a = T + c | 0, p ^= a << 18 | a >>> 14, a = l + d | 0, y ^= a << 7 | a >>> 25, a = y + l | 0, b ^= a << 9 | a >>> 23, a = b + y | 0, d ^= a << 13 | a >>> 19, a = d + b | 0, l ^= a << 18 | a >>> 14, a = q + Y | 0, B ^= a << 7 | a >>> 25, a = B + q | 0, m ^= a << 9 | a >>> 23, a = m + B | 0, Y ^= a << 13 | a >>> 19, a = Y + m | 0, q ^= a << 18 | a >>> 14;
      I = I + n | 0, S = S + i | 0, v = v + o | 0, A = A + u | 0, T = T + g | 0, p = p + U | 0, h = h + w | 0, c = c + G | 0, b = b + _ | 0, d = d + M | 0, l = l + j | 0, y = y + P | 0, B = B + O | 0, m = m + C | 0, Y = Y + z | 0, q = q + L | 0, t[0] = I >>> 0 & 255, t[1] = I >>> 8 & 255, t[2] = I >>> 16 & 255, t[3] = I >>> 24 & 255, t[4] = S >>> 0 & 255, t[5] = S >>> 8 & 255, t[6] = S >>> 16 & 255, t[7] = S >>> 24 & 255, t[8] = v >>> 0 & 255, t[9] = v >>> 8 & 255, t[10] = v >>> 16 & 255, t[11] = v >>> 24 & 255, t[12] = A >>> 0 & 255, t[13] = A >>> 8 & 255, t[14] = A >>> 16 & 255, t[15] = A >>> 24 & 255, t[16] = T >>> 0 & 255, t[17] = T >>> 8 & 255, t[18] = T >>> 16 & 255, t[19] = T >>> 24 & 255, t[20] = p >>> 0 & 255, t[21] = p >>> 8 & 255, t[22] = p >>> 16 & 255, t[23] = p >>> 24 & 255, t[24] = h >>> 0 & 255, t[25] = h >>> 8 & 255, t[26] = h >>> 16 & 255, t[27] = h >>> 24 & 255, t[28] = c >>> 0 & 255, t[29] = c >>> 8 & 255, t[30] = c >>> 16 & 255, t[31] = c >>> 24 & 255, t[32] = b >>> 0 & 255, t[33] = b >>> 8 & 255, t[34] = b >>> 16 & 255, t[35] = b >>> 24 & 255, t[36] = d >>> 0 & 255, t[37] = d >>> 8 & 255, t[38] = d >>> 16 & 255, t[39] = d >>> 24 & 255, t[40] = l >>> 0 & 255, t[41] = l >>> 8 & 255, t[42] = l >>> 16 & 255, t[43] = l >>> 24 & 255, t[44] = y >>> 0 & 255, t[45] = y >>> 8 & 255, t[46] = y >>> 16 & 255, t[47] = y >>> 24 & 255, t[48] = B >>> 0 & 255, t[49] = B >>> 8 & 255, t[50] = B >>> 16 & 255, t[51] = B >>> 24 & 255, t[52] = m >>> 0 & 255, t[53] = m >>> 8 & 255, t[54] = m >>> 16 & 255, t[55] = m >>> 24 & 255, t[56] = Y >>> 0 & 255, t[57] = Y >>> 8 & 255, t[58] = Y >>> 16 & 255, t[59] = Y >>> 24 & 255, t[60] = q >>> 0 & 255, t[61] = q >>> 8 & 255, t[62] = q >>> 16 & 255, t[63] = q >>> 24 & 255;
    }
    function qt(t, e, r, f) {
      for (var n = f[0] & 255 | (f[1] & 255) << 8 | (f[2] & 255) << 16 | (f[3] & 255) << 24, i = r[0] & 255 | (r[1] & 255) << 8 | (r[2] & 255) << 16 | (r[3] & 255) << 24, o = r[4] & 255 | (r[5] & 255) << 8 | (r[6] & 255) << 16 | (r[7] & 255) << 24, u = r[8] & 255 | (r[9] & 255) << 8 | (r[10] & 255) << 16 | (r[11] & 255) << 24, g = r[12] & 255 | (r[13] & 255) << 8 | (r[14] & 255) << 16 | (r[15] & 255) << 24, U = f[4] & 255 | (f[5] & 255) << 8 | (f[6] & 255) << 16 | (f[7] & 255) << 24, w = e[0] & 255 | (e[1] & 255) << 8 | (e[2] & 255) << 16 | (e[3] & 255) << 24, G = e[4] & 255 | (e[5] & 255) << 8 | (e[6] & 255) << 16 | (e[7] & 255) << 24, _ = e[8] & 255 | (e[9] & 255) << 8 | (e[10] & 255) << 16 | (e[11] & 255) << 24, M = e[12] & 255 | (e[13] & 255) << 8 | (e[14] & 255) << 16 | (e[15] & 255) << 24, j = f[8] & 255 | (f[9] & 255) << 8 | (f[10] & 255) << 16 | (f[11] & 255) << 24, P = r[16] & 255 | (r[17] & 255) << 8 | (r[18] & 255) << 16 | (r[19] & 255) << 24, O = r[20] & 255 | (r[21] & 255) << 8 | (r[22] & 255) << 16 | (r[23] & 255) << 24, C = r[24] & 255 | (r[25] & 255) << 8 | (r[26] & 255) << 16 | (r[27] & 255) << 24, z = r[28] & 255 | (r[29] & 255) << 8 | (r[30] & 255) << 16 | (r[31] & 255) << 24, L = f[12] & 255 | (f[13] & 255) << 8 | (f[14] & 255) << 16 | (f[15] & 255) << 24, I = n, S = i, v = o, A = u, T = g, p = U, h = w, c = G, b = _, d = M, l = j, y = P, B = O, m = C, Y = z, q = L, a, W = 0; W < 20; W += 2)
        a = I + B | 0, T ^= a << 7 | a >>> 25, a = T + I | 0, b ^= a << 9 | a >>> 23, a = b + T | 0, B ^= a << 13 | a >>> 19, a = B + b | 0, I ^= a << 18 | a >>> 14, a = p + S | 0, d ^= a << 7 | a >>> 25, a = d + p | 0, m ^= a << 9 | a >>> 23, a = m + d | 0, S ^= a << 13 | a >>> 19, a = S + m | 0, p ^= a << 18 | a >>> 14, a = l + h | 0, Y ^= a << 7 | a >>> 25, a = Y + l | 0, v ^= a << 9 | a >>> 23, a = v + Y | 0, h ^= a << 13 | a >>> 19, a = h + v | 0, l ^= a << 18 | a >>> 14, a = q + y | 0, A ^= a << 7 | a >>> 25, a = A + q | 0, c ^= a << 9 | a >>> 23, a = c + A | 0, y ^= a << 13 | a >>> 19, a = y + c | 0, q ^= a << 18 | a >>> 14, a = I + A | 0, S ^= a << 7 | a >>> 25, a = S + I | 0, v ^= a << 9 | a >>> 23, a = v + S | 0, A ^= a << 13 | a >>> 19, a = A + v | 0, I ^= a << 18 | a >>> 14, a = p + T | 0, h ^= a << 7 | a >>> 25, a = h + p | 0, c ^= a << 9 | a >>> 23, a = c + h | 0, T ^= a << 13 | a >>> 19, a = T + c | 0, p ^= a << 18 | a >>> 14, a = l + d | 0, y ^= a << 7 | a >>> 25, a = y + l | 0, b ^= a << 9 | a >>> 23, a = b + y | 0, d ^= a << 13 | a >>> 19, a = d + b | 0, l ^= a << 18 | a >>> 14, a = q + Y | 0, B ^= a << 7 | a >>> 25, a = B + q | 0, m ^= a << 9 | a >>> 23, a = m + B | 0, Y ^= a << 13 | a >>> 19, a = Y + m | 0, q ^= a << 18 | a >>> 14;
      t[0] = I >>> 0 & 255, t[1] = I >>> 8 & 255, t[2] = I >>> 16 & 255, t[3] = I >>> 24 & 255, t[4] = p >>> 0 & 255, t[5] = p >>> 8 & 255, t[6] = p >>> 16 & 255, t[7] = p >>> 24 & 255, t[8] = l >>> 0 & 255, t[9] = l >>> 8 & 255, t[10] = l >>> 16 & 255, t[11] = l >>> 24 & 255, t[12] = q >>> 0 & 255, t[13] = q >>> 8 & 255, t[14] = q >>> 16 & 255, t[15] = q >>> 24 & 255, t[16] = h >>> 0 & 255, t[17] = h >>> 8 & 255, t[18] = h >>> 16 & 255, t[19] = h >>> 24 & 255, t[20] = c >>> 0 & 255, t[21] = c >>> 8 & 255, t[22] = c >>> 16 & 255, t[23] = c >>> 24 & 255, t[24] = b >>> 0 & 255, t[25] = b >>> 8 & 255, t[26] = b >>> 16 & 255, t[27] = b >>> 24 & 255, t[28] = d >>> 0 & 255, t[29] = d >>> 8 & 255, t[30] = d >>> 16 & 255, t[31] = d >>> 24 & 255;
    }
    function Mf(t, e, r, f) {
      mt(t, e, r, f);
    }
    function jf(t, e, r, f) {
      qt(t, e, r, f);
    }
    var bf = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    function ut(t, e, r, f, n, i, o) {
      var u = new Uint8Array(16), g = new Uint8Array(64), U, w;
      for (w = 0; w < 16; w++) u[w] = 0;
      for (w = 0; w < 8; w++) u[w] = i[w];
      for (; n >= 64; ) {
        for (Mf(g, u, o, bf), w = 0; w < 64; w++) t[e + w] = r[f + w] ^ g[w];
        for (U = 1, w = 8; w < 16; w++)
          U = U + (u[w] & 255) | 0, u[w] = U & 255, U >>>= 8;
        n -= 64, e += 64, f += 64;
      }
      if (n > 0)
        for (Mf(g, u, o, bf), w = 0; w < n; w++) t[e + w] = r[f + w] ^ g[w];
      return 0;
    }
    function lt(t, e, r, f, n) {
      var i = new Uint8Array(16), o = new Uint8Array(64), u, g;
      for (g = 0; g < 16; g++) i[g] = 0;
      for (g = 0; g < 8; g++) i[g] = f[g];
      for (; r >= 64; ) {
        for (Mf(o, i, n, bf), g = 0; g < 64; g++) t[e + g] = o[g];
        for (u = 1, g = 8; g < 16; g++)
          u = u + (i[g] & 255) | 0, i[g] = u & 255, u >>>= 8;
        r -= 64, e += 64;
      }
      if (r > 0)
        for (Mf(o, i, n, bf), g = 0; g < r; g++) t[e + g] = o[g];
      return 0;
    }
    function bt(t, e, r, f, n) {
      var i = new Uint8Array(32);
      jf(i, f, n, bf);
      for (var o = new Uint8Array(8), u = 0; u < 8; u++) o[u] = f[u + 16];
      return lt(t, e, r, o, i);
    }
    function Jf(t, e, r, f, n, i, o) {
      var u = new Uint8Array(32);
      jf(u, i, o, bf);
      for (var g = new Uint8Array(8), U = 0; U < 8; U++) g[U] = i[U + 16];
      return ut(t, e, r, f, n, g, u);
    }
    var Cf = function(t) {
      this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
      var e, r, f, n, i, o, u, g;
      e = t[0] & 255 | (t[1] & 255) << 8, this.r[0] = e & 8191, r = t[2] & 255 | (t[3] & 255) << 8, this.r[1] = (e >>> 13 | r << 3) & 8191, f = t[4] & 255 | (t[5] & 255) << 8, this.r[2] = (r >>> 10 | f << 6) & 7939, n = t[6] & 255 | (t[7] & 255) << 8, this.r[3] = (f >>> 7 | n << 9) & 8191, i = t[8] & 255 | (t[9] & 255) << 8, this.r[4] = (n >>> 4 | i << 12) & 255, this.r[5] = i >>> 1 & 8190, o = t[10] & 255 | (t[11] & 255) << 8, this.r[6] = (i >>> 14 | o << 2) & 8191, u = t[12] & 255 | (t[13] & 255) << 8, this.r[7] = (o >>> 11 | u << 5) & 8065, g = t[14] & 255 | (t[15] & 255) << 8, this.r[8] = (u >>> 8 | g << 8) & 8191, this.r[9] = g >>> 5 & 127, this.pad[0] = t[16] & 255 | (t[17] & 255) << 8, this.pad[1] = t[18] & 255 | (t[19] & 255) << 8, this.pad[2] = t[20] & 255 | (t[21] & 255) << 8, this.pad[3] = t[22] & 255 | (t[23] & 255) << 8, this.pad[4] = t[24] & 255 | (t[25] & 255) << 8, this.pad[5] = t[26] & 255 | (t[27] & 255) << 8, this.pad[6] = t[28] & 255 | (t[29] & 255) << 8, this.pad[7] = t[30] & 255 | (t[31] & 255) << 8;
    };
    Cf.prototype.blocks = function(t, e, r) {
      for (var f = this.fin ? 0 : 2048, n, i, o, u, g, U, w, G, _, M, j, P, O, C, z, L, I, S, v, A = this.h[0], T = this.h[1], p = this.h[2], h = this.h[3], c = this.h[4], b = this.h[5], d = this.h[6], l = this.h[7], y = this.h[8], B = this.h[9], m = this.r[0], Y = this.r[1], q = this.r[2], a = this.r[3], W = this.r[4], H = this.r[5], R = this.r[6], k = this.r[7], F = this.r[8], J = this.r[9]; r >= 16; )
        n = t[e + 0] & 255 | (t[e + 1] & 255) << 8, A += n & 8191, i = t[e + 2] & 255 | (t[e + 3] & 255) << 8, T += (n >>> 13 | i << 3) & 8191, o = t[e + 4] & 255 | (t[e + 5] & 255) << 8, p += (i >>> 10 | o << 6) & 8191, u = t[e + 6] & 255 | (t[e + 7] & 255) << 8, h += (o >>> 7 | u << 9) & 8191, g = t[e + 8] & 255 | (t[e + 9] & 255) << 8, c += (u >>> 4 | g << 12) & 8191, b += g >>> 1 & 8191, U = t[e + 10] & 255 | (t[e + 11] & 255) << 8, d += (g >>> 14 | U << 2) & 8191, w = t[e + 12] & 255 | (t[e + 13] & 255) << 8, l += (U >>> 11 | w << 5) & 8191, G = t[e + 14] & 255 | (t[e + 15] & 255) << 8, y += (w >>> 8 | G << 8) & 8191, B += G >>> 5 | f, _ = 0, M = _, M += A * m, M += T * (5 * J), M += p * (5 * F), M += h * (5 * k), M += c * (5 * R), _ = M >>> 13, M &= 8191, M += b * (5 * H), M += d * (5 * W), M += l * (5 * a), M += y * (5 * q), M += B * (5 * Y), _ += M >>> 13, M &= 8191, j = _, j += A * Y, j += T * m, j += p * (5 * J), j += h * (5 * F), j += c * (5 * k), _ = j >>> 13, j &= 8191, j += b * (5 * R), j += d * (5 * H), j += l * (5 * W), j += y * (5 * a), j += B * (5 * q), _ += j >>> 13, j &= 8191, P = _, P += A * q, P += T * Y, P += p * m, P += h * (5 * J), P += c * (5 * F), _ = P >>> 13, P &= 8191, P += b * (5 * k), P += d * (5 * R), P += l * (5 * H), P += y * (5 * W), P += B * (5 * a), _ += P >>> 13, P &= 8191, O = _, O += A * a, O += T * q, O += p * Y, O += h * m, O += c * (5 * J), _ = O >>> 13, O &= 8191, O += b * (5 * F), O += d * (5 * k), O += l * (5 * R), O += y * (5 * H), O += B * (5 * W), _ += O >>> 13, O &= 8191, C = _, C += A * W, C += T * a, C += p * q, C += h * Y, C += c * m, _ = C >>> 13, C &= 8191, C += b * (5 * J), C += d * (5 * F), C += l * (5 * k), C += y * (5 * R), C += B * (5 * H), _ += C >>> 13, C &= 8191, z = _, z += A * H, z += T * W, z += p * a, z += h * q, z += c * Y, _ = z >>> 13, z &= 8191, z += b * m, z += d * (5 * J), z += l * (5 * F), z += y * (5 * k), z += B * (5 * R), _ += z >>> 13, z &= 8191, L = _, L += A * R, L += T * H, L += p * W, L += h * a, L += c * q, _ = L >>> 13, L &= 8191, L += b * Y, L += d * m, L += l * (5 * J), L += y * (5 * F), L += B * (5 * k), _ += L >>> 13, L &= 8191, I = _, I += A * k, I += T * R, I += p * H, I += h * W, I += c * a, _ = I >>> 13, I &= 8191, I += b * q, I += d * Y, I += l * m, I += y * (5 * J), I += B * (5 * F), _ += I >>> 13, I &= 8191, S = _, S += A * F, S += T * k, S += p * R, S += h * H, S += c * W, _ = S >>> 13, S &= 8191, S += b * a, S += d * q, S += l * Y, S += y * m, S += B * (5 * J), _ += S >>> 13, S &= 8191, v = _, v += A * J, v += T * F, v += p * k, v += h * R, v += c * H, _ = v >>> 13, v &= 8191, v += b * W, v += d * a, v += l * q, v += y * Y, v += B * m, _ += v >>> 13, v &= 8191, _ = (_ << 2) + _ | 0, _ = _ + M | 0, M = _ & 8191, _ = _ >>> 13, j += _, A = M, T = j, p = P, h = O, c = C, b = z, d = L, l = I, y = S, B = v, e += 16, r -= 16;
      this.h[0] = A, this.h[1] = T, this.h[2] = p, this.h[3] = h, this.h[4] = c, this.h[5] = b, this.h[6] = d, this.h[7] = l, this.h[8] = y, this.h[9] = B;
    }, Cf.prototype.finish = function(t, e) {
      var r = new Uint16Array(10), f, n, i, o;
      if (this.leftover) {
        for (o = this.leftover, this.buffer[o++] = 1; o < 16; o++) this.buffer[o] = 0;
        this.fin = 1, this.blocks(this.buffer, 0, 16);
      }
      for (f = this.h[1] >>> 13, this.h[1] &= 8191, o = 2; o < 10; o++)
        this.h[o] += f, f = this.h[o] >>> 13, this.h[o] &= 8191;
      for (this.h[0] += f * 5, f = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += f, f = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += f, r[0] = this.h[0] + 5, f = r[0] >>> 13, r[0] &= 8191, o = 1; o < 10; o++)
        r[o] = this.h[o] + f, f = r[o] >>> 13, r[o] &= 8191;
      for (r[9] -= 8192, n = (f ^ 1) - 1, o = 0; o < 10; o++) r[o] &= n;
      for (n = ~n, o = 0; o < 10; o++) this.h[o] = this.h[o] & n | r[o];
      for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, i = this.h[0] + this.pad[0], this.h[0] = i & 65535, o = 1; o < 8; o++)
        i = (this.h[o] + this.pad[o] | 0) + (i >>> 16) | 0, this.h[o] = i & 65535;
      t[e + 0] = this.h[0] >>> 0 & 255, t[e + 1] = this.h[0] >>> 8 & 255, t[e + 2] = this.h[1] >>> 0 & 255, t[e + 3] = this.h[1] >>> 8 & 255, t[e + 4] = this.h[2] >>> 0 & 255, t[e + 5] = this.h[2] >>> 8 & 255, t[e + 6] = this.h[3] >>> 0 & 255, t[e + 7] = this.h[3] >>> 8 & 255, t[e + 8] = this.h[4] >>> 0 & 255, t[e + 9] = this.h[4] >>> 8 & 255, t[e + 10] = this.h[5] >>> 0 & 255, t[e + 11] = this.h[5] >>> 8 & 255, t[e + 12] = this.h[6] >>> 0 & 255, t[e + 13] = this.h[6] >>> 8 & 255, t[e + 14] = this.h[7] >>> 0 & 255, t[e + 15] = this.h[7] >>> 8 & 255;
    }, Cf.prototype.update = function(t, e, r) {
      var f, n;
      if (this.leftover) {
        for (n = 16 - this.leftover, n > r && (n = r), f = 0; f < n; f++)
          this.buffer[this.leftover + f] = t[e + f];
        if (r -= n, e += n, this.leftover += n, this.leftover < 16)
          return;
        this.blocks(this.buffer, 0, 16), this.leftover = 0;
      }
      if (r >= 16 && (n = r - r % 16, this.blocks(t, e, n), e += n, r -= n), r) {
        for (f = 0; f < r; f++)
          this.buffer[this.leftover + f] = t[e + f];
        this.leftover += r;
      }
    };
    function Gf(t, e, r, f, n, i) {
      var o = new Cf(i);
      return o.update(r, f, n), o.finish(t, e), 0;
    }
    function yt(t, e, r, f, n, i) {
      var o = new Uint8Array(16);
      return Gf(o, 0, r, f, n, i), dt(t, e, o, 0);
    }
    function Hf(t, e, r, f, n) {
      var i;
      if (r < 32) return -1;
      for (Jf(t, 0, e, 0, r, f, n), Gf(t, 16, t, 32, r - 32, t), i = 0; i < 16; i++) t[i] = 0;
      return 0;
    }
    function Rf(t, e, r, f, n) {
      var i, o = new Uint8Array(32);
      if (r < 32 || (bt(o, 0, 32, f, n), yt(e, 16, e, 32, r - 32, o) !== 0)) return -1;
      for (Jf(t, 0, e, 0, r, f, n), i = 0; i < 32; i++) t[i] = 0;
      return 0;
    }
    function uf(t, e) {
      var r;
      for (r = 0; r < 16; r++) t[r] = e[r] | 0;
    }
    function Qf(t) {
      var e, r, f = 1;
      for (e = 0; e < 16; e++)
        r = t[e] + f + 65535, f = Math.floor(r / 65536), t[e] = r - f * 65536;
      t[0] += f - 1 + 37 * (f - 1);
    }
    function vf(t, e, r) {
      for (var f, n = ~(r - 1), i = 0; i < 16; i++)
        f = n & (t[i] ^ e[i]), t[i] ^= f, e[i] ^= f;
    }
    function _f(t, e) {
      var r, f, n, i = x(), o = x();
      for (r = 0; r < 16; r++) o[r] = e[r];
      for (Qf(o), Qf(o), Qf(o), f = 0; f < 2; f++) {
        for (i[0] = o[0] - 65517, r = 1; r < 15; r++)
          i[r] = o[r] - 65535 - (i[r - 1] >> 16 & 1), i[r - 1] &= 65535;
        i[15] = o[15] - 32767 - (i[14] >> 16 & 1), n = i[15] >> 16 & 1, i[14] &= 65535, vf(o, i, 1 - n);
      }
      for (r = 0; r < 16; r++)
        t[2 * r] = o[r] & 255, t[2 * r + 1] = o[r] >> 8;
    }
    function gt(t, e) {
      var r = new Uint8Array(32), f = new Uint8Array(32);
      return _f(r, t), _f(f, e), Ff(r, 0, f, 0);
    }
    function pt(t) {
      var e = new Uint8Array(32);
      return _f(e, t), e[0] & 1;
    }
    function Kf(t, e) {
      var r;
      for (r = 0; r < 16; r++) t[r] = e[2 * r] + (e[2 * r + 1] << 8);
      t[15] &= 32767;
    }
    function cf(t, e, r) {
      for (var f = 0; f < 16; f++) t[f] = e[f] + r[f];
    }
    function df(t, e, r) {
      for (var f = 0; f < 16; f++) t[f] = e[f] - r[f];
    }
    function D(t, e, r) {
      var f, n, i = 0, o = 0, u = 0, g = 0, U = 0, w = 0, G = 0, _ = 0, M = 0, j = 0, P = 0, O = 0, C = 0, z = 0, L = 0, I = 0, S = 0, v = 0, A = 0, T = 0, p = 0, h = 0, c = 0, b = 0, d = 0, l = 0, y = 0, B = 0, m = 0, Y = 0, q = 0, a = r[0], W = r[1], H = r[2], R = r[3], k = r[4], F = r[5], J = r[6], V = r[7], Q = r[8], K = r[9], Z = r[10], X = r[11], tf = r[12], rf = r[13], ef = r[14], nf = r[15];
      f = e[0], i += f * a, o += f * W, u += f * H, g += f * R, U += f * k, w += f * F, G += f * J, _ += f * V, M += f * Q, j += f * K, P += f * Z, O += f * X, C += f * tf, z += f * rf, L += f * ef, I += f * nf, f = e[1], o += f * a, u += f * W, g += f * H, U += f * R, w += f * k, G += f * F, _ += f * J, M += f * V, j += f * Q, P += f * K, O += f * Z, C += f * X, z += f * tf, L += f * rf, I += f * ef, S += f * nf, f = e[2], u += f * a, g += f * W, U += f * H, w += f * R, G += f * k, _ += f * F, M += f * J, j += f * V, P += f * Q, O += f * K, C += f * Z, z += f * X, L += f * tf, I += f * rf, S += f * ef, v += f * nf, f = e[3], g += f * a, U += f * W, w += f * H, G += f * R, _ += f * k, M += f * F, j += f * J, P += f * V, O += f * Q, C += f * K, z += f * Z, L += f * X, I += f * tf, S += f * rf, v += f * ef, A += f * nf, f = e[4], U += f * a, w += f * W, G += f * H, _ += f * R, M += f * k, j += f * F, P += f * J, O += f * V, C += f * Q, z += f * K, L += f * Z, I += f * X, S += f * tf, v += f * rf, A += f * ef, T += f * nf, f = e[5], w += f * a, G += f * W, _ += f * H, M += f * R, j += f * k, P += f * F, O += f * J, C += f * V, z += f * Q, L += f * K, I += f * Z, S += f * X, v += f * tf, A += f * rf, T += f * ef, p += f * nf, f = e[6], G += f * a, _ += f * W, M += f * H, j += f * R, P += f * k, O += f * F, C += f * J, z += f * V, L += f * Q, I += f * K, S += f * Z, v += f * X, A += f * tf, T += f * rf, p += f * ef, h += f * nf, f = e[7], _ += f * a, M += f * W, j += f * H, P += f * R, O += f * k, C += f * F, z += f * J, L += f * V, I += f * Q, S += f * K, v += f * Z, A += f * X, T += f * tf, p += f * rf, h += f * ef, c += f * nf, f = e[8], M += f * a, j += f * W, P += f * H, O += f * R, C += f * k, z += f * F, L += f * J, I += f * V, S += f * Q, v += f * K, A += f * Z, T += f * X, p += f * tf, h += f * rf, c += f * ef, b += f * nf, f = e[9], j += f * a, P += f * W, O += f * H, C += f * R, z += f * k, L += f * F, I += f * J, S += f * V, v += f * Q, A += f * K, T += f * Z, p += f * X, h += f * tf, c += f * rf, b += f * ef, d += f * nf, f = e[10], P += f * a, O += f * W, C += f * H, z += f * R, L += f * k, I += f * F, S += f * J, v += f * V, A += f * Q, T += f * K, p += f * Z, h += f * X, c += f * tf, b += f * rf, d += f * ef, l += f * nf, f = e[11], O += f * a, C += f * W, z += f * H, L += f * R, I += f * k, S += f * F, v += f * J, A += f * V, T += f * Q, p += f * K, h += f * Z, c += f * X, b += f * tf, d += f * rf, l += f * ef, y += f * nf, f = e[12], C += f * a, z += f * W, L += f * H, I += f * R, S += f * k, v += f * F, A += f * J, T += f * V, p += f * Q, h += f * K, c += f * Z, b += f * X, d += f * tf, l += f * rf, y += f * ef, B += f * nf, f = e[13], z += f * a, L += f * W, I += f * H, S += f * R, v += f * k, A += f * F, T += f * J, p += f * V, h += f * Q, c += f * K, b += f * Z, d += f * X, l += f * tf, y += f * rf, B += f * ef, m += f * nf, f = e[14], L += f * a, I += f * W, S += f * H, v += f * R, A += f * k, T += f * F, p += f * J, h += f * V, c += f * Q, b += f * K, d += f * Z, l += f * X, y += f * tf, B += f * rf, m += f * ef, Y += f * nf, f = e[15], I += f * a, S += f * W, v += f * H, A += f * R, T += f * k, p += f * F, h += f * J, c += f * V, b += f * Q, d += f * K, l += f * Z, y += f * X, B += f * tf, m += f * rf, Y += f * ef, q += f * nf, i += 38 * S, o += 38 * v, u += 38 * A, g += 38 * T, U += 38 * p, w += 38 * h, G += 38 * c, _ += 38 * b, M += 38 * d, j += 38 * l, P += 38 * y, O += 38 * B, C += 38 * m, z += 38 * Y, L += 38 * q, n = 1, f = i + n + 65535, n = Math.floor(f / 65536), i = f - n * 65536, f = o + n + 65535, n = Math.floor(f / 65536), o = f - n * 65536, f = u + n + 65535, n = Math.floor(f / 65536), u = f - n * 65536, f = g + n + 65535, n = Math.floor(f / 65536), g = f - n * 65536, f = U + n + 65535, n = Math.floor(f / 65536), U = f - n * 65536, f = w + n + 65535, n = Math.floor(f / 65536), w = f - n * 65536, f = G + n + 65535, n = Math.floor(f / 65536), G = f - n * 65536, f = _ + n + 65535, n = Math.floor(f / 65536), _ = f - n * 65536, f = M + n + 65535, n = Math.floor(f / 65536), M = f - n * 65536, f = j + n + 65535, n = Math.floor(f / 65536), j = f - n * 65536, f = P + n + 65535, n = Math.floor(f / 65536), P = f - n * 65536, f = O + n + 65535, n = Math.floor(f / 65536), O = f - n * 65536, f = C + n + 65535, n = Math.floor(f / 65536), C = f - n * 65536, f = z + n + 65535, n = Math.floor(f / 65536), z = f - n * 65536, f = L + n + 65535, n = Math.floor(f / 65536), L = f - n * 65536, f = I + n + 65535, n = Math.floor(f / 65536), I = f - n * 65536, i += n - 1 + 37 * (n - 1), n = 1, f = i + n + 65535, n = Math.floor(f / 65536), i = f - n * 65536, f = o + n + 65535, n = Math.floor(f / 65536), o = f - n * 65536, f = u + n + 65535, n = Math.floor(f / 65536), u = f - n * 65536, f = g + n + 65535, n = Math.floor(f / 65536), g = f - n * 65536, f = U + n + 65535, n = Math.floor(f / 65536), U = f - n * 65536, f = w + n + 65535, n = Math.floor(f / 65536), w = f - n * 65536, f = G + n + 65535, n = Math.floor(f / 65536), G = f - n * 65536, f = _ + n + 65535, n = Math.floor(f / 65536), _ = f - n * 65536, f = M + n + 65535, n = Math.floor(f / 65536), M = f - n * 65536, f = j + n + 65535, n = Math.floor(f / 65536), j = f - n * 65536, f = P + n + 65535, n = Math.floor(f / 65536), P = f - n * 65536, f = O + n + 65535, n = Math.floor(f / 65536), O = f - n * 65536, f = C + n + 65535, n = Math.floor(f / 65536), C = f - n * 65536, f = z + n + 65535, n = Math.floor(f / 65536), z = f - n * 65536, f = L + n + 65535, n = Math.floor(f / 65536), L = f - n * 65536, f = I + n + 65535, n = Math.floor(f / 65536), I = f - n * 65536, i += n - 1 + 37 * (n - 1), t[0] = i, t[1] = o, t[2] = u, t[3] = g, t[4] = U, t[5] = w, t[6] = G, t[7] = _, t[8] = M, t[9] = j, t[10] = P, t[11] = O, t[12] = C, t[13] = z, t[14] = L, t[15] = I;
    }
    function hf(t, e) {
      D(t, e, e);
    }
    function wt(t, e) {
      var r = x(), f;
      for (f = 0; f < 16; f++) r[f] = e[f];
      for (f = 253; f >= 0; f--)
        hf(r, r), f !== 2 && f !== 4 && D(r, r, e);
      for (f = 0; f < 16; f++) t[f] = r[f];
    }
    function vt(t, e) {
      var r = x(), f;
      for (f = 0; f < 16; f++) r[f] = e[f];
      for (f = 250; f >= 0; f--)
        hf(r, r), f !== 1 && D(r, r, e);
      for (f = 0; f < 16; f++) t[f] = r[f];
    }
    function Lf(t, e, r) {
      var f = new Uint8Array(32), n = new Float64Array(80), i, o, u = x(), g = x(), U = x(), w = x(), G = x(), _ = x();
      for (o = 0; o < 31; o++) f[o] = e[o];
      for (f[31] = e[31] & 127 | 64, f[0] &= 248, Kf(n, r), o = 0; o < 16; o++)
        g[o] = n[o], w[o] = u[o] = U[o] = 0;
      for (u[0] = w[0] = 1, o = 254; o >= 0; --o)
        i = f[o >>> 3] >>> (o & 7) & 1, vf(u, g, i), vf(U, w, i), cf(G, u, U), df(u, u, U), cf(U, g, w), df(g, g, w), hf(w, G), hf(_, u), D(u, U, u), D(U, g, G), cf(G, u, U), df(u, u, U), hf(g, u), df(U, w, _), D(u, U, zt), cf(u, u, w), D(U, U, u), D(u, w, _), D(w, g, n), hf(g, G), vf(u, g, i), vf(U, w, i);
      for (o = 0; o < 16; o++)
        n[o + 16] = u[o], n[o + 32] = U[o], n[o + 48] = g[o], n[o + 64] = w[o];
      var M = n.subarray(32), j = n.subarray(16);
      return wt(M, M), D(j, j, M), _f(t, j), 0;
    }
    function zf(t, e) {
      return Lf(t, e, ff);
    }
    function _t(t, e) {
      return $(e, 32), zf(t, e);
    }
    function Of(t, e, r) {
      var f = new Uint8Array(32);
      return Lf(f, r, e), jf(t, N, f, bf);
    }
    var Et = Hf, Yt = Rf;
    function kt(t, e, r, f, n, i) {
      var o = new Uint8Array(32);
      return Of(o, n, i), Et(t, e, r, f, o);
    }
    function Wt(t, e, r, f, n, i) {
      var o = new Uint8Array(32);
      return Of(o, n, i), Yt(t, e, r, f, o);
    }
    var It = [
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
    function At(t, e, r, f) {
      for (var n = new Int32Array(16), i = new Int32Array(16), o, u, g, U, w, G, _, M, j, P, O, C, z, L, I, S, v, A, T, p, h, c, b, d, l, y, B = t[0], m = t[1], Y = t[2], q = t[3], a = t[4], W = t[5], H = t[6], R = t[7], k = e[0], F = e[1], J = e[2], V = e[3], Q = e[4], K = e[5], Z = e[6], X = e[7], tf = 0; f >= 128; ) {
        for (T = 0; T < 16; T++)
          p = 8 * T + tf, n[T] = r[p + 0] << 24 | r[p + 1] << 16 | r[p + 2] << 8 | r[p + 3], i[T] = r[p + 4] << 24 | r[p + 5] << 16 | r[p + 6] << 8 | r[p + 7];
        for (T = 0; T < 80; T++)
          if (o = B, u = m, g = Y, U = q, w = a, G = W, _ = H, M = R, j = k, P = F, O = J, C = V, z = Q, L = K, I = Z, S = X, h = R, c = X, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = (a >>> 14 | Q << 18) ^ (a >>> 18 | Q << 14) ^ (Q >>> 9 | a << 23), c = (Q >>> 14 | a << 18) ^ (Q >>> 18 | a << 14) ^ (a >>> 9 | Q << 23), b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, h = a & W ^ ~a & H, c = Q & K ^ ~Q & Z, b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, h = It[T * 2], c = It[T * 2 + 1], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, h = n[T % 16], c = i[T % 16], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, v = l & 65535 | y << 16, A = b & 65535 | d << 16, h = v, c = A, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = (B >>> 28 | k << 4) ^ (k >>> 2 | B << 30) ^ (k >>> 7 | B << 25), c = (k >>> 28 | B << 4) ^ (B >>> 2 | k << 30) ^ (B >>> 7 | k << 25), b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, h = B & m ^ B & Y ^ m & Y, c = k & F ^ k & J ^ F & J, b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, M = l & 65535 | y << 16, S = b & 65535 | d << 16, h = U, c = C, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = v, c = A, b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, U = l & 65535 | y << 16, C = b & 65535 | d << 16, m = o, Y = u, q = g, a = U, W = w, H = G, R = _, B = M, F = j, J = P, V = O, Q = C, K = z, Z = L, X = I, k = S, T % 16 === 15)
            for (p = 0; p < 16; p++)
              h = n[p], c = i[p], b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = n[(p + 9) % 16], c = i[(p + 9) % 16], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, v = n[(p + 1) % 16], A = i[(p + 1) % 16], h = (v >>> 1 | A << 31) ^ (v >>> 8 | A << 24) ^ v >>> 7, c = (A >>> 1 | v << 31) ^ (A >>> 8 | v << 24) ^ (A >>> 7 | v << 25), b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, v = n[(p + 14) % 16], A = i[(p + 14) % 16], h = (v >>> 19 | A << 13) ^ (A >>> 29 | v << 3) ^ v >>> 6, c = (A >>> 19 | v << 13) ^ (v >>> 29 | A << 3) ^ (A >>> 6 | v << 26), b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, n[p] = l & 65535 | y << 16, i[p] = b & 65535 | d << 16;
        h = B, c = k, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[0], c = e[0], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[0] = B = l & 65535 | y << 16, e[0] = k = b & 65535 | d << 16, h = m, c = F, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[1], c = e[1], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[1] = m = l & 65535 | y << 16, e[1] = F = b & 65535 | d << 16, h = Y, c = J, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[2], c = e[2], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[2] = Y = l & 65535 | y << 16, e[2] = J = b & 65535 | d << 16, h = q, c = V, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[3], c = e[3], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[3] = q = l & 65535 | y << 16, e[3] = V = b & 65535 | d << 16, h = a, c = Q, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[4], c = e[4], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[4] = a = l & 65535 | y << 16, e[4] = Q = b & 65535 | d << 16, h = W, c = K, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[5], c = e[5], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[5] = W = l & 65535 | y << 16, e[5] = K = b & 65535 | d << 16, h = H, c = Z, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[6], c = e[6], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[6] = H = l & 65535 | y << 16, e[6] = Z = b & 65535 | d << 16, h = R, c = X, b = c & 65535, d = c >>> 16, l = h & 65535, y = h >>> 16, h = t[7], c = e[7], b += c & 65535, d += c >>> 16, l += h & 65535, y += h >>> 16, d += b >>> 16, l += d >>> 16, y += l >>> 16, t[7] = R = l & 65535 | y << 16, e[7] = X = b & 65535 | d << 16, tf += 128, f -= 128;
      }
      return f;
    }
    function yf(t, e, r) {
      var f = new Int32Array(8), n = new Int32Array(8), i = new Uint8Array(256), o, u = r;
      for (f[0] = 1779033703, f[1] = 3144134277, f[2] = 1013904242, f[3] = 2773480762, f[4] = 1359893119, f[5] = 2600822924, f[6] = 528734635, f[7] = 1541459225, n[0] = 4089235720, n[1] = 2227873595, n[2] = 4271175723, n[3] = 1595750129, n[4] = 2917565137, n[5] = 725511199, n[6] = 4215389547, n[7] = 327033209, At(f, n, e, r), r %= 128, o = 0; o < r; o++) i[o] = e[u - r + o];
      for (i[r] = 128, r = 256 - 128 * (r < 112 ? 1 : 0), i[r - 9] = 0, ct(i, r - 8, u / 536870912 | 0, u << 3), At(f, n, i, r), o = 0; o < 8; o++) ct(t, 8 * o, f[o], n[o]);
      return 0;
    }
    function Pf(t, e) {
      var r = x(), f = x(), n = x(), i = x(), o = x(), u = x(), g = x(), U = x(), w = x();
      df(r, t[1], t[0]), df(w, e[1], e[0]), D(r, r, w), cf(f, t[0], t[1]), cf(w, e[0], e[1]), D(f, f, w), D(n, t[3], e[3]), D(n, n, Ot), D(i, t[2], e[2]), cf(i, i, i), df(o, f, r), df(u, i, n), cf(g, i, n), cf(U, f, r), D(t[0], o, u), D(t[1], U, g), D(t[2], g, u), D(t[3], o, U);
    }
    function Tt(t, e, r) {
      var f;
      for (f = 0; f < 4; f++)
        vf(t[f], e[f], r);
    }
    function Zf(t, e) {
      var r = x(), f = x(), n = x();
      wt(n, e[2]), D(r, e[0], n), D(f, e[1], n), _f(t, f), t[31] ^= pt(r) << 7;
    }
    function Xf(t, e, r) {
      var f, n;
      for (uf(t[0], of), uf(t[1], wf), uf(t[2], wf), uf(t[3], of), n = 255; n >= 0; --n)
        f = r[n / 8 | 0] >> (n & 7) & 1, Tt(t, e, f), Pf(e, t), Pf(t, t), Tt(t, e, f);
    }
    function mf(t, e) {
      var r = [x(), x(), x(), x()];
      uf(r[0], st), uf(r[1], ht), uf(r[2], wf), D(r[3], st, ht), Xf(t, r, e);
    }
    function Vf(t, e, r) {
      var f = new Uint8Array(64), n = [x(), x(), x(), x()], i;
      for (r || $(e, 32), yf(f, e, 32), f[0] &= 248, f[31] &= 127, f[31] |= 64, mf(n, f), Zf(t, n), i = 0; i < 32; i++) e[i + 32] = t[i];
      return 0;
    }
    var qf = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function ft(t, e) {
      var r, f, n, i;
      for (f = 63; f >= 32; --f) {
        for (r = 0, n = f - 32, i = f - 12; n < i; ++n)
          e[n] += r - 16 * e[f] * qf[n - (f - 32)], r = Math.floor((e[n] + 128) / 256), e[n] -= r * 256;
        e[n] += r, e[f] = 0;
      }
      for (r = 0, n = 0; n < 32; n++)
        e[n] += r - (e[31] >> 4) * qf[n], r = e[n] >> 8, e[n] &= 255;
      for (n = 0; n < 32; n++) e[n] -= r * qf[n];
      for (f = 0; f < 32; f++)
        e[f + 1] += e[f] >> 8, t[f] = e[f] & 255;
    }
    function tt(t) {
      var e = new Float64Array(64), r;
      for (r = 0; r < 64; r++) e[r] = t[r];
      for (r = 0; r < 64; r++) t[r] = 0;
      ft(t, e);
    }
    function Ut(t, e, r, f) {
      var n = new Uint8Array(64), i = new Uint8Array(64), o = new Uint8Array(64), u, g, U = new Float64Array(64), w = [x(), x(), x(), x()];
      yf(n, f, 32), n[0] &= 248, n[31] &= 127, n[31] |= 64;
      var G = r + 64;
      for (u = 0; u < r; u++) t[64 + u] = e[u];
      for (u = 0; u < 32; u++) t[32 + u] = n[32 + u];
      for (yf(o, t.subarray(32), r + 32), tt(o), mf(w, o), Zf(t, w), u = 32; u < 64; u++) t[u] = f[u];
      for (yf(i, t, r + 64), tt(i), u = 0; u < 64; u++) U[u] = 0;
      for (u = 0; u < 32; u++) U[u] = o[u];
      for (u = 0; u < 32; u++)
        for (g = 0; g < 32; g++)
          U[u + g] += i[u] * n[g];
      return ft(t.subarray(32), U), G;
    }
    function Nt(t, e) {
      var r = x(), f = x(), n = x(), i = x(), o = x(), u = x(), g = x();
      return uf(t[2], wf), Kf(t[1], e), hf(n, t[1]), D(i, n, xt), df(n, n, t[2]), cf(i, t[2], i), hf(o, i), hf(u, o), D(g, u, o), D(r, g, n), D(r, r, i), vt(r, r), D(r, r, n), D(r, r, i), D(r, r, i), D(t[0], r, i), hf(f, t[0]), D(f, f, i), gt(f, n) && D(t[0], t[0], Pt), hf(f, t[0]), D(f, f, i), gt(f, n) ? -1 : (pt(t[0]) === e[31] >> 7 && df(t[0], of, t[0]), D(t[3], t[0], t[1]), 0);
    }
    function rt(t, e, r, f) {
      var n, i = new Uint8Array(32), o = new Uint8Array(64), u = [x(), x(), x(), x()], g = [x(), x(), x(), x()];
      if (r < 64 || Nt(g, f)) return -1;
      for (n = 0; n < r; n++) t[n] = e[n];
      for (n = 0; n < 32; n++) t[n + 32] = f[n];
      if (yf(o, t, r), tt(o), Xf(u, g, o), mf(g, e.subarray(32)), Pf(u, g), Zf(i, u), r -= 64, Ff(e, 0, i, 0)) {
        for (n = 0; n < r; n++) t[n] = 0;
        return -1;
      }
      for (n = 0; n < r; n++) t[n] = e[n + 64];
      return r;
    }
    var et = 32, Yf = 24, Af = 32, Ef = 16, Tf = 32, kf = 32, Uf = 32, Sf = 32, nt = 32, St = Yf, Dt = Af, Ft = Ef, lf = 64, gf = 32, If = 64, at = 32, it = 64;
    s.lowlevel = {
      crypto_core_hsalsa20: jf,
      crypto_stream_xor: Jf,
      crypto_stream: bt,
      crypto_stream_salsa20_xor: ut,
      crypto_stream_salsa20: lt,
      crypto_onetimeauth: Gf,
      crypto_onetimeauth_verify: yt,
      crypto_verify_16: dt,
      crypto_verify_32: Ff,
      crypto_secretbox: Hf,
      crypto_secretbox_open: Rf,
      crypto_scalarmult: Lf,
      crypto_scalarmult_base: zf,
      crypto_box_beforenm: Of,
      crypto_box_afternm: Et,
      crypto_box: kt,
      crypto_box_open: Wt,
      crypto_box_keypair: _t,
      crypto_hash: yf,
      crypto_sign: Ut,
      crypto_sign_keypair: Vf,
      crypto_sign_open: rt,
      crypto_secretbox_KEYBYTES: et,
      crypto_secretbox_NONCEBYTES: Yf,
      crypto_secretbox_ZEROBYTES: Af,
      crypto_secretbox_BOXZEROBYTES: Ef,
      crypto_scalarmult_BYTES: Tf,
      crypto_scalarmult_SCALARBYTES: kf,
      crypto_box_PUBLICKEYBYTES: Uf,
      crypto_box_SECRETKEYBYTES: Sf,
      crypto_box_BEFORENMBYTES: nt,
      crypto_box_NONCEBYTES: St,
      crypto_box_ZEROBYTES: Dt,
      crypto_box_BOXZEROBYTES: Ft,
      crypto_sign_BYTES: lf,
      crypto_sign_PUBLICKEYBYTES: gf,
      crypto_sign_SECRETKEYBYTES: If,
      crypto_sign_SEEDBYTES: at,
      crypto_hash_BYTES: it,
      gf: x,
      D: xt,
      L: qf,
      pack25519: _f,
      unpack25519: Kf,
      M: D,
      A: cf,
      S: hf,
      Z: df,
      pow2523: vt,
      add: Pf,
      set25519: uf,
      modL: ft,
      scalarmult: Xf,
      scalarbase: mf
    };
    function Bt(t, e) {
      if (t.length !== et) throw new Error("bad key size");
      if (e.length !== Yf) throw new Error("bad nonce size");
    }
    function Jt(t, e) {
      if (t.length !== Uf) throw new Error("bad public key size");
      if (e.length !== Sf) throw new Error("bad secret key size");
    }
    function sf() {
      for (var t = 0; t < arguments.length; t++)
        if (!(arguments[t] instanceof Uint8Array))
          throw new TypeError("unexpected type, use Uint8Array");
    }
    function $t(t) {
      for (var e = 0; e < t.length; e++) t[e] = 0;
    }
    s.randomBytes = function(t) {
      var e = new Uint8Array(t);
      return $(e, t), e;
    }, s.secretbox = function(t, e, r) {
      sf(t, e, r), Bt(r, e);
      for (var f = new Uint8Array(Af + t.length), n = new Uint8Array(f.length), i = 0; i < t.length; i++) f[i + Af] = t[i];
      return Hf(n, f, f.length, e, r), n.subarray(Ef);
    }, s.secretbox.open = function(t, e, r) {
      sf(t, e, r), Bt(r, e);
      for (var f = new Uint8Array(Ef + t.length), n = new Uint8Array(f.length), i = 0; i < t.length; i++) f[i + Ef] = t[i];
      return f.length < 32 || Rf(n, f, f.length, e, r) !== 0 ? null : n.subarray(Af);
    }, s.secretbox.keyLength = et, s.secretbox.nonceLength = Yf, s.secretbox.overheadLength = Ef, s.scalarMult = function(t, e) {
      if (sf(t, e), t.length !== kf) throw new Error("bad n size");
      if (e.length !== Tf) throw new Error("bad p size");
      var r = new Uint8Array(Tf);
      return Lf(r, t, e), r;
    }, s.scalarMult.base = function(t) {
      if (sf(t), t.length !== kf) throw new Error("bad n size");
      var e = new Uint8Array(Tf);
      return zf(e, t), e;
    }, s.scalarMult.scalarLength = kf, s.scalarMult.groupElementLength = Tf, s.box = function(t, e, r, f) {
      var n = s.box.before(r, f);
      return s.secretbox(t, e, n);
    }, s.box.before = function(t, e) {
      sf(t, e), Jt(t, e);
      var r = new Uint8Array(nt);
      return Of(r, t, e), r;
    }, s.box.after = s.secretbox, s.box.open = function(t, e, r, f) {
      var n = s.box.before(r, f);
      return s.secretbox.open(t, e, n);
    }, s.box.open.after = s.secretbox.open, s.box.keyPair = function() {
      var t = new Uint8Array(Uf), e = new Uint8Array(Sf);
      return _t(t, e), { publicKey: t, secretKey: e };
    }, s.box.keyPair.fromSecretKey = function(t) {
      if (sf(t), t.length !== Sf)
        throw new Error("bad secret key size");
      var e = new Uint8Array(Uf);
      return zf(e, t), { publicKey: e, secretKey: new Uint8Array(t) };
    }, s.box.publicKeyLength = Uf, s.box.secretKeyLength = Sf, s.box.sharedKeyLength = nt, s.box.nonceLength = St, s.box.overheadLength = s.secretbox.overheadLength, s.sign = function(t, e) {
      if (sf(t, e), e.length !== If)
        throw new Error("bad secret key size");
      var r = new Uint8Array(lf + t.length);
      return Ut(r, t, t.length, e), r;
    }, s.sign.open = function(t, e) {
      if (sf(t, e), e.length !== gf)
        throw new Error("bad public key size");
      var r = new Uint8Array(t.length), f = rt(r, t, t.length, e);
      if (f < 0) return null;
      for (var n = new Uint8Array(f), i = 0; i < n.length; i++) n[i] = r[i];
      return n;
    }, s.sign.detached = function(t, e) {
      for (var r = s.sign(t, e), f = new Uint8Array(lf), n = 0; n < f.length; n++) f[n] = r[n];
      return f;
    }, s.sign.detached.verify = function(t, e, r) {
      if (sf(t, e, r), e.length !== lf)
        throw new Error("bad signature size");
      if (r.length !== gf)
        throw new Error("bad public key size");
      var f = new Uint8Array(lf + t.length), n = new Uint8Array(lf + t.length), i;
      for (i = 0; i < lf; i++) f[i] = e[i];
      for (i = 0; i < t.length; i++) f[i + lf] = t[i];
      return rt(n, f, f.length, r) >= 0;
    }, s.sign.keyPair = function() {
      var t = new Uint8Array(gf), e = new Uint8Array(If);
      return Vf(t, e), { publicKey: t, secretKey: e };
    }, s.sign.keyPair.fromSecretKey = function(t) {
      if (sf(t), t.length !== If)
        throw new Error("bad secret key size");
      for (var e = new Uint8Array(gf), r = 0; r < e.length; r++) e[r] = t[32 + r];
      return { publicKey: e, secretKey: new Uint8Array(t) };
    }, s.sign.keyPair.fromSeed = function(t) {
      if (sf(t), t.length !== at)
        throw new Error("bad seed size");
      for (var e = new Uint8Array(gf), r = new Uint8Array(If), f = 0; f < 32; f++) r[f] = t[f];
      return Vf(e, r, !0), { publicKey: e, secretKey: r };
    }, s.sign.publicKeyLength = gf, s.sign.secretKeyLength = If, s.sign.seedLength = at, s.sign.signatureLength = lf, s.hash = function(t) {
      sf(t);
      var e = new Uint8Array(it);
      return yf(e, t, t.length), e;
    }, s.hash.hashLength = it, s.verify = function(t, e) {
      return sf(t, e), t.length === 0 || e.length === 0 || t.length !== e.length ? !1 : Df(t, 0, e, 0, t.length) === 0;
    }, s.setPRNG = function(t) {
      $ = t;
    }, function() {
      var t = typeof self < "u" ? self.crypto || self.msCrypto : null;
      if (t && t.getRandomValues) {
        var e = 65536;
        s.setPRNG(function(r, f) {
          var n, i = new Uint8Array(f);
          for (n = 0; n < f; n += e)
            t.getRandomValues(i.subarray(n, n + Math.min(f - n, e)));
          for (n = 0; n < f; n++) r[n] = i[n];
          $t(i);
        });
      } else typeof Vt < "u" && (t = er, t && t.randomBytes && s.setPRNG(function(r, f) {
        var n, i = t.randomBytes(f);
        for (n = 0; n < f; n++) r[n] = i[n];
        $t(i);
      }));
    }();
  })(E.exports ? E.exports : self.nacl = self.nacl || {});
})(fr);
function nr(E, s) {
  const x = $f.encodeBase64(E);
  return s ? encodeURIComponent(x) : x;
}
function ar(E, s) {
  return s && (E = decodeURIComponent(E)), $f.decodeBase64(E);
}
function ir(E, s = !1) {
  let x;
  return E instanceof Uint8Array ? x = E : (typeof E != "string" && (E = JSON.stringify(E)), x = $f.decodeUTF8(E)), nr(x, s);
}
function or(E, s = !1) {
  const x = ar(E, s);
  return {
    toString() {
      return $f.encodeUTF8(x);
    },
    toObject() {
      try {
        return JSON.parse($f.encodeUTF8(x));
      } catch {
        return null;
      }
    },
    toUint8Array() {
      return x;
    }
  };
}
const Wf = {
  encode: ir,
  decode: or
};
new AbortController();
const xr = (E) => {
  var x;
  if (!E) return new Error("JWT Token not found. ");
  const s = Rt(E);
  if ((s == null ? void 0 : s.exp) < Date.now() / 1e3)
    throw new Error("JWT Token expired. Please login again! ");
  if ((x = s == null ? void 0 : s["https://hasura.io/jwt/claims"]) != null && x["x-hasura-user-id"])
    return [s["https://hasura.io/jwt/claims"]["x-hasura-user-id"], E];
  throw new Error("User id not found in JWT Token");
}, sr = af`
  mutation TGLoginMutation($appId: String = "", $initData: String = "") {
    tgLogin(appId: $appId, initData: $initData)
  }
`, hr = af`
  mutation TGLoginMutation($appId: String = "", $initData: String = "", $shortId: String = "") {
    tgLogin(appId: $appId, initData: $initData, shortId: $shortId)
  }
`, cr = af`
  mutation tgWidgetLoginMutation($appId: String = "", $authData: String = "") {
    tgWidgetLogin(appId: $appId, authData: $authData)
  }
`, dr = af`
  mutation tgWidgetLoginMutation(
    $appId: String = ""
    $authData: String = ""
    $shortId: String = ""
  ) {
    tgWidgetLogin(appId: $appId, authData: $authData, shortId: $shortId)
  }
`, ur = af`
  query CheckUserIsExistQueryByTgId {
    telegramUser {
      walletUserId
      tgId
    }
  }
`, jt = af`
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
`, lr = af`
  mutation CreateOrderQuery($appId: String = "", $payload: String = "") {
    createOrder(appId: $appId, payload: $payload, encode: "base64")
  }
`, br = af`
  mutation createSignatureMutation($appId: String = "", $transactionHex: String = "") {
    createSignature(appId: $appId, transactionHex: $transactionHex)
  }
`, yr = af`
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
`, gr = af`
  query simulateOrderQuery($payload: String = "") {
    simulateOrder(payload: $payload, encode: "base64")
  }
`, pr = af`
  mutation confirmOrderQuery($orderId: String = "") {
    confirmOrder(orderId: $orderId)
  }
`, wr = af`
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
af`
  query fetchOrderHashQuery($orderId: String = "") {
    getOrderHash(orderId: $orderId)
  }
`;
const vr = af`
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
`, _r = af`
  mutation bindGoogleQuery($address: String = "", $idToken: String = "") {
    googleBind(address: $address, idToken: $idToken)
  }
`, Er = af`
  mutation createOrderWithCodeMutation(
    $appId: String = ""
    $authCode: String = ""
    $payload: String = ""
  ) {
    createOrderWithCode(appId: $appId, authCode: $authCode, payload: $payload, encode: "base64")
  }
`, ot = (E) => ({
  function: E.function,
  functionArguments: E.functionArguments || E.arguments,
  typeArguments: E.typeArguments || E.type_arguments
});
var Bf = /* @__PURE__ */ ((E) => (E[E.PENDING = 0] = "PENDING", E[E.CONFIRMED = 1] = "CONFIRMED", E[E.EXECUTED = 2] = "EXECUTED", E[E.SUCCESS = 3] = "SUCCESS", E[E.FAIL = 4] = "FAIL", E[E.CANCELED = 5] = "CANCELED", E))(Bf || {});
const Ct = {
  testnet: "https://hasura-wallet.mizu.one/v1/graphql",
  mainnet: "https://api.mz.xyz/v1/graphql/"
}, Ir = "https://mizu.io/keyless_google";
class Nf {
  /**
   * Initialize MizuWallet SDK Core Client
   *
   * @param args.appId - Application ID
   * @param args.network - Network.MAINNET | Network.TESTNET
   */
  constructor(s) {
    pf(this, "appId");
    pf(this, "network");
    pf(this, "graphqlEndPoint", "");
    pf(this, "userId", "");
    pf(this, "jwtToken", "");
    pf(this, "initialized", !1);
    if (!s.appId) throw new Error("appId is required");
    if (!s.network) throw new Error("network is required");
    this.appId = s.appId, this.network = s.network, this.graphqlEndPoint = Ct[this.network], this.initialized = !0;
  }
  /**
   * Check if MizuWallet SDK Core Client is initialized
   */
  checkInitialized() {
    if (!this.initialized) throw new Error("MizuWallet SDK Core Client not initialized");
  }
  /**
   * Check if JWT Token is available
   */
  checkJWTToken() {
    if (!this.jwtToken) throw new Error("JWT Token not found. Please login first.");
  }
  /**
   * Decode JWT Token
   */
  static decodeJWTToken(s) {
    const [x, $] = xr(s);
    return [x, $];
  }
  /**
   * Clone MizuWallet SDK Core Client
   *
   * @param args.appId - Application ID
   * @param args.network - Network.MAINNET | Network.TESTNET
   * @param args.jwtToken - JWT Token
   */
  static clone(s) {
    if (!s.appId) throw new Error("appId is required");
    if (!s.network) throw new Error("network is required");
    if (!s.jwtToken) throw new Error("jwtToken is required");
    const x = new Nf({ appId: s.appId, network: s.network });
    return [x.userId, x.jwtToken] = Nf.decodeJWTToken(s.jwtToken), x;
  }
  /**
   * Update network
   * @param network - Network.MAINNET | Network.TESTNET
   */
  updateNetwork(s) {
    this.checkInitialized(), this.network = s, this.graphqlEndPoint = Ct[this.network];
  }
  /**
   * Get network info
   */
  get networkInfo() {
    return {
      name: this.network,
      chainId: this.network === Mt.MAINNET ? 1 : 2,
      url: this.network === Mt.MAINNET ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.testnet.aptoslabs.com/v1"
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
  async loginInTG(s, x) {
    this.checkInitialized();
    let $ = "";
    x != null && x.isWidget ? $ = (await xf({
      url: this.graphqlEndPoint,
      document: x != null && x.shortID ? dr : cr,
      variables: {
        appId: this.appId,
        authData: Wf.encode(s),
        ...x != null && x.shortID ? { shortId: x.shortID } : {}
      }
    })).tgWidgetLogin : $ = (await xf({
      url: this.graphqlEndPoint,
      document: x != null && x.shortID ? hr : sr,
      variables: {
        appId: this.appId,
        initData: s,
        ...x != null && x.shortID ? { shortId: x.shortID } : {}
      }
    })).tgLogin;
    try {
      [this.userId, this.jwtToken] = Nf.decodeJWTToken($);
    } catch {
      this.logout();
    }
  }
  /**
   * Check if user exist by TG ID
   *
   * @param tgId
   * @returns
   */
  async isUserExistByTgID(s) {
    var $;
    if (this.checkInitialized(), !s) throw new Error("tgId is required");
    const x = await xf({
      url: this.graphqlEndPoint,
      document: ur,
      variables: {},
      requestHeaders: {
        "x-hasura-tg-id": s
      }
    });
    return (($ = x == null ? void 0 : x.telegramUser) == null ? void 0 : $.length) > 0;
  }
  /**
   * fetch user wallet address
   *
   * @returns
   */
  async getUserWalletAddress() {
    return this.checkInitialized(), this.checkJWTToken(), (await xf({
      url: this.graphqlEndPoint,
      document: jt,
      variables: {
        id: this.userId
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    })).walletUserByPk.sub_wallets[0].address;
  }
  /**
   * fetch user wallet address
   *
   * @returns
   */
  async getUserInfo() {
    return this.checkInitialized(), this.checkJWTToken(), (await xf({
      url: this.graphqlEndPoint,
      document: jt,
      variables: {
        id: this.userId
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    })).walletUserByPk;
  }
  /**
   * Logout
   */
  logout() {
    this.userId = "", this.jwtToken = "";
  }
  /**
   *
   * @param args.redirect_uri
   */
  async startBindGoogle(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = new URLSearchParams({
      token: this.jwtToken,
      appId: this.appId,
      ...s
    });
    window.open(`${Ir}?${x.toString()}`, "_blank");
  }
  /**
   *
   * @param args.address keyless address
   * @param args.idToken google jwt
   * @returns
   */
  async bindGoogleAccount(s) {
    return this.checkInitialized(), this.checkJWTToken(), await xf({
      url: this.graphqlEndPoint,
      document: _r,
      variables: {
        ...s
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
  }
  /**
   * Simulate Order
   *
   * @param args.payload TransactionPayload
   */
  async simulateOrder(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: gr,
      variables: {
        payload: Wf.encode(ot(s.payload))
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    return x == null ? void 0 : x.simulateOrder;
  }
  /**
   * Create Order
   *
   * @param args.payload TransactionPayload
   * @returns
   */
  async createOrder(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: lr,
      variables: {
        appId: this.appId,
        payload: Wf.encode(ot(s.payload))
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    return x == null ? void 0 : x.createOrder;
  }
  /**
   * Create Order with Code
   *
   * @param args.payload
   * @param args.code
   * @returns
   */
  async createOrderWithCode(s) {
    this.checkInitialized();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: Er,
      variables: {
        appId: this.appId,
        authCode: s.code,
        payload: Wf.encode(ot(s.payload))
      },
      requestHeaders: {}
    });
    return x == null ? void 0 : x.createOrderWithCode;
  }
  /**
   * Create Signature
   *
   * @param args.transactionHex AnyRawTransaction.bscToHex().toStringWithoutPrefix()
   * @returns
   */
  async createSignature(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: br,
      variables: {
        appId: this.appId,
        transactionHex: s.transactionHex
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    return x == null ? void 0 : x.createSignature;
  }
  /**
   * Sign Message
   *
   * @param args.message message to sign
   * @param args.nonce nonce
   * @returns
   */
  async signMessage(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: yr,
      variables: {
        appId: this.appId,
        ...s
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    return x == null ? void 0 : x.createSignMessage;
  }
  /**
   * User interactive
   *
   * @param args.orderId Order ID
   * return bool
   */
  async confirmOrder(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: pr,
      variables: {
        orderId: s.orderId
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    return x == null ? void 0 : x.confirmOrder;
  }
  /**
   * Fetch Order By ID
   *
   * @param args.id order.id
   * @returns
   */
  async fetchOrder(s) {
    this.checkInitialized(), this.checkJWTToken();
    const x = await xf({
      url: this.graphqlEndPoint,
      document: wr,
      variables: {
        id: s.id
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    if (!x.orderByPk) throw new Error("Order not found");
    return {
      ...x.orderByPk,
      payload: x.orderByPk.decodedPayload
    };
  }
  /**
   * Wait for order
   *
   * @param args.orderId order.id
   * @returns
   */
  async waitForOrder(s) {
    let x = await this.fetchOrder({
      id: s.orderId
    }), $ = 20;
    for (; $-- > 0 && ![Bf.SUCCESS, Bf.FAIL, Bf.CANCELED].includes(x.status); )
      await new Promise((N) => setTimeout(N, 5e3)), x = await this.fetchOrder({
        id: s.orderId
      });
    if (x.status === Bf.FAIL)
      throw new Error("Order failed");
    return x;
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
  async fetchOrderList(s) {
    this.checkInitialized(), this.checkJWTToken();
    const { limit: x = 10, offset: $ = 0 } = s || {}, N = await xf({
      url: this.graphqlEndPoint,
      document: vr,
      variables: {
        walletUserId: this.userId,
        limit: x,
        offset: $
      },
      requestHeaders: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
    return {
      data: N == null ? void 0 : N.order.map((ff) => {
        let of = {};
        try {
          of = ff.decodedPayload;
        } catch (wf) {
          console.error(wf);
        }
        return {
          ...ff,
          payload: of
        };
      }),
      pagination: {
        total: N == null ? void 0 : N.orderAggregate.aggregate.count,
        limit: x,
        offset: $
      }
    };
  }
}
export {
  Nf as Mizu,
  Bf as ORDER_STATUS,
  xr as decodeJWT
};
