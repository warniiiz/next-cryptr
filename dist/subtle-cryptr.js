"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubtleCryptr = void 0;
function _regeneratorRuntime() { "use strict"; _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
var _KEY_PROMISE = new WeakMap();
var _generateRandomBase64Secrets = new WeakMap();
var _pack = new WeakMap();
var _unpack = new WeakMap();
var SubtleCryptr = exports.SubtleCryptr = _createClass(function SubtleCryptr(secret) {
  var _this = this;
  _classCallCheck(this, SubtleCryptr);
  _classPrivateFieldInitSpec(this, _KEY_PROMISE, void 0);
  _classPrivateFieldInitSpec(this, _generateRandomBase64Secrets, _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
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
  _classPrivateFieldInitSpec(this, _pack, function (unpacked) {
    return Buffer.from(unpacked).toString('base64');
  });
  _classPrivateFieldInitSpec(this, _unpack, function (packed) {
    return Uint8Array.from(Buffer.from(packed, 'base64'));
  });
  _defineProperty(this, "encrypt", function () {
    var _ref2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee2(serializedData) {
      var iv, ivPack, cipher, cipherPack;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            iv = crypto.getRandomValues(new Uint8Array(12));
            ivPack = _classPrivateFieldGet(_pack, _this).call(_this, iv);
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
            cipherPack = _classPrivateFieldGet(_pack, _this).call(_this, cipher);
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
  _defineProperty(this, "decrypt", function () {
    var _ref3 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee3(rawValue) {
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
            strRawValue = rawValue.toString();
            iv = _classPrivateFieldGet(_unpack, _this).call(_this, strRawValue.slice(0, 16));
            cipher = _classPrivateFieldGet(_unpack, _this).call(_this, strRawValue.slice(16));
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
  _defineProperty(this, "encryptStr", function () {
    var _ref4 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee4(str) {
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
  _defineProperty(this, "decryptStr", function () {
    var _ref5 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee5(rawValue) {
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
  if (!secret || typeof secret !== 'string') {
    _classPrivateFieldGet(_generateRandomBase64Secrets, this).call(this);
    throw new Error("Subtle-Cryptr needs a base64 secret in order to generate key.");
  }
  var uInt8Secret = new Uint8Array(Buffer.from(secret, 'base64'));
  if (uInt8Secret.length !== 32) {
    throw new Error("Secret must be 32 bytes-long (or 44 characters in base64 encoded string). Provided a ".concat(uInt8Secret.length, " bytes-long secret."));
  }
  _classPrivateFieldSet(_KEY_PROMISE, this, crypto.subtle.importKey('raw', uInt8Secret, {
    name: 'AES-GCM',
    length: 256
  }, true, ['encrypt', 'decrypt']));
});
_defineProperty(SubtleCryptr, "generateRandomBase64Secret", _asyncToGenerator(_regeneratorRuntime().mark(function _callee6() {
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