"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubtleCryptr = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _KEY_PROMISE = /*#__PURE__*/new WeakMap();
var _generateRandomBase64Secrets = /*#__PURE__*/new WeakMap();
var _pack = /*#__PURE__*/new WeakMap();
var _unpack = /*#__PURE__*/new WeakMap();
/**
 * Cryptographic utility for encrypting and decrypting data 
 * using AES-GCM 256 algorithm, on Node.js and Next.js Edge Runtime.
 * 
 * Based on standard web crypto API, with crypto.subtle.*
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 * 
 * This means that you can use the package without any other
 * cryptographic package. By the way, this module needs
 * no other dependencies at all.
 * 
 * This package is also compatible with Next.js Edge Runtime.
 * 
 * @class
 * @name SubtleCryptr
 */
var SubtleCryptr = exports.SubtleCryptr = /*#__PURE__*/_createClass(
/**
 * Creates a new instance of SubtleCryptr.
 * 
 * @param {Object} options - The options for SubtleCryptr.
 * @param {string} options.secret - The base64 secret used to generate the key.
 * @throws {Error} Throws an error if the secret is missing or not a string.
 * @throws {Error} Throws an error if the secret length is not 44 characters.
 */
function SubtleCryptr(secret) {
  var _this = this;
  _classCallCheck(this, SubtleCryptr);
  // private key, 
  // generated from provided secret
  _classPrivateFieldInitSpec(this, _KEY_PROMISE, void 0);
  /**
   * Helper function providing 3 random secrets as base64 encoded string using the AES-GCM algorithm.
   * Pushing the generated keys in the console.
   */
  _classPrivateFieldInitSpec(this, _generateRandomBase64Secrets, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var randomKeys;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(process.env.NODE_ENV !== 'development')) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          _context.next = 4;
          return Promise.all(new Array(3).fill(0).map(function () {
            return SubtleCryptr.generateRandomBase64Secret();
          }));
        case 4:
          randomKeys = _context.sent;
          console.log("\nSubtle-Cryptr needs a base64 secret in order to generate key. " + "You can generate one with command crypto.subtle.generateKey.\n\n" + "For example, if you are using nodejs, you can run the following command in the terminal:\n" + "node -e \"crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt'])" + ".then(v => crypto.subtle.exportKey('raw', v)).then(v => console.log(Buffer.from(v).toString('base64')))\"\n\n" + "Here are 3 randomly generated secrets with the above methods:\n" + randomKeys.join("\n") + "\n\n");
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  /**
   * Packs the given data by converting it to a base64 string,
   * using Node.js 'Buffer.from()' method.
   *
   * @private
   * @param {Uint8Array} unpacked - The data to be packed.
   * @returns {string} - The packed data as a base64 string.
   */
  _classPrivateFieldInitSpec(this, _pack, function (unpacked) {
    return Buffer.from(unpacked).toString('base64');
  });
  /**
   * Unpacks a base64-encoded string into a Buffer
   * using Node.js 'Buffer.from()' method.
   *
   * @private
   * @param {base64 encoded string} packed - The base64-encoded string to unpack.
   * @returns {Uint8Array} The unpacked Uint8Array.
   */
  _classPrivateFieldInitSpec(this, _unpack, function (packed) {
    return Uint8Array.from(Buffer.from(packed, 'base64'));
  });
  /**
   * Encrypts serialized data (Uint8Array) using AES-GCM 256 encryption algorithm.
   * Returns result as a base64 encoded string.
   * 
   * Based on AES-GCM recommandations, the IV is randomly generated and 
   * is 12 bytes (96-bits) long.
   * Result is composed of the IV (16 characters, base64 encoded)
   * and the encrypted data (also base64 encoded), both concatenated 
   * in a single string.
   * 
   * @param {Uint8Array} serializedData - The data to be encrypted.
   * @returns {base64 encoded string} - The encrypted data as a base64 encoded string.
   */
  _defineProperty(this, "encrypt", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(serializedData) {
      var iv, ivPack, cipher, cipherPack;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            // randomize encryption result with random iv
            iv = crypto.getRandomValues(new Uint8Array(12));
            ivPack = _classPrivateFieldGet(_pack, _this).call(_this, iv); // encrypt data
            _context2.t0 = crypto.subtle;
            _context2.t1 = {
              name: 'AES-GCM',
              iv: iv
            };
            _context2.next = 6;
            return _classPrivateFieldGet(_KEY_PROMISE, _this);
          case 6:
            _context2.t2 = _context2.sent;
            _context2.t3 = serializedData;
            _context2.next = 10;
            return _context2.t0.encrypt.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3);
          case 10:
            cipher = _context2.sent;
            cipherPack = _classPrivateFieldGet(_pack, _this).call(_this, cipher); // return string
            return _context2.abrupt("return", ivPack + cipherPack);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  /**
   * Decrypts the given raw value using AES-GCM encryption.
   * The raw value is expected to be a base64 encoded string.
   * 
   * @param {base64 encoded string} rawValue - The raw value to decrypt.
   * @returns {Promise<Uint8Array>} - The decrypted value as a Uint8Array.
   */
  _defineProperty(this, "decrypt", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(rawValue) {
      var strRawValue, iv, cipher, serializedData;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (rawValue) {
              _context3.next = 2;
              break;
            }
            return _context3.abrupt("return", {});
          case 2:
            // split & unpack values
            strRawValue = rawValue.toString();
            iv = _classPrivateFieldGet(_unpack, _this).call(_this, strRawValue.slice(0, 16));
            cipher = _classPrivateFieldGet(_unpack, _this).call(_this, strRawValue.slice(16)); // decrypt
            _context3.t0 = crypto.subtle;
            _context3.t1 = {
              name: 'AES-GCM',
              iv: iv
            };
            _context3.next = 9;
            return _classPrivateFieldGet(_KEY_PROMISE, _this);
          case 9:
            _context3.t2 = _context3.sent;
            _context3.t3 = cipher;
            _context3.next = 13;
            return _context3.t0.decrypt.call(_context3.t0, _context3.t1, _context3.t2, _context3.t3);
          case 13:
            serializedData = _context3.sent;
            return _context3.abrupt("return", new Uint8Array(serializedData));
          case 15:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
  /**
   * Encrypts a simple string using AES-GCM 256 encryption algorithm, 
   * converting the string to a Uint8Array, and using above encrypt method.
   *
   * @param {string} str - The raw string value to be encrypted.
   * @returns {Promise<Uint8Array>} - A promise that resolves to the encrypted value as an ArrayBuffer.
   */
  _defineProperty(this, "encryptStr", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(str) {
      var strArray;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            strArray = Uint8Array.from(Buffer.from(str.toString()));
            _context4.next = 3;
            return _this.encrypt(strArray);
          case 3:
            return _context4.abrupt("return", _context4.sent);
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());
  /**
   * Decrypts a raw value (string), using above decrypt method, 
   * and returns it as a string.
   * 
   * @param {string} rawValue - The raw value to decrypt.
   * @returns {Promise<string>} - A promise that resolves to the decrypted value as a string.
   */
  _defineProperty(this, "decryptStr", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(rawValue) {
      var strArray;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _this.decrypt(rawValue);
          case 2:
            strArray = _context5.sent;
            return _context5.abrupt("return", Buffer.from(strArray).toString());
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }());
  // check for secret
  if (!secret || typeof secret !== 'string') {
    _classPrivateFieldGet(_generateRandomBase64Secrets, this).call(this);
    throw new Error("Subtle-Cryptr needs a base64 secret in order to generate key.");
  }
  // convert to Uint8Array
  var uInt8Secret = new Uint8Array(Buffer.from(secret, 'base64'));
  // check for secret length
  if (uInt8Secret.length !== 32) {
    throw new Error("Secret must be 32 bytes-long (or 44 characters in base64 encoded string). Provided a ".concat(uInt8Secret.length, " bytes-long secret."));
  }
  // generate key from secret
  _classPrivateFieldSet(_KEY_PROMISE, this, crypto.subtle.importKey('raw', uInt8Secret, {
    name: 'AES-GCM',
    length: 256
  }, true, ['encrypt', 'decrypt']));
}

/**
 * Helper function generating 1 random secret using the AES-GCM algorithm
 * and and returning it as a base64 encoded string.
 */);
_defineProperty(SubtleCryptr, "generateRandomBase64Secret", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
  var key, exportedKey, base64Key;
  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        _context6.next = 2;
        return crypto.subtle.generateKey({
          name: 'AES-GCM',
          length: 256
        }, true, ['encrypt', 'decrypt']);
      case 2:
        key = _context6.sent;
        _context6.next = 5;
        return crypto.subtle.exportKey('raw', key);
      case 5:
        exportedKey = _context6.sent;
        base64Key = Buffer.from(exportedKey).toString('base64');
        return _context6.abrupt("return", base64Key);
      case 8:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));