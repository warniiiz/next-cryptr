// Measure and compare performance between different base64 encoding librairies.

// This module
import { NextCryptr } from '../src/index.js';

// cryptr NPM module
import Cryptr from 'cryptr';

// node:crypto API
import { setKey, cryptoEncrypt, cryptoDecrypt } from './node-crypto.js';


// Evaluation function
function evaluate({name, input, testsQty, testsFct, }) {

  const results = {};

  console.log("\n########################################################\n" + name)
  testsQty.forEach((iterationsQuantity, strLength) => {
    console.log("\n", iterationsQuantity, "iterations of", strLength, "bytes length:");
    const groupName = `${iterationsQuantity} iterations of ${strLength} bytes length`
    results[groupName] = {}
    const commonInput = typeof input === "function" ? input({strLength, iterationsQuantity}) : input;
    const iterationsArray = Array(iterationsQuantity).fill(0);
    testsFct.forEach(({test, prepare=(byteArray) => byteArray}, name) => {
      const prepared = prepare(commonInput);
      const start = Date.now();
      console.time(name);
      iterationsArray.forEach(async () => { 
        await test(prepared);
      });
      console.timeEnd(name);
      const end = Date.now();
      results[groupName][name] = (end - start) / 1000;
    });
  })

  return results;

}

export function evaluateBatch(name, testsQty, testsFct, lightEval=1) {

  const updatedTestsQty = new Map (
    Array.from(testsQty).map(([key, value]) => [key, Math.max(1, Math.floor(value / lightEval))]),
  );

  const results = {};

  results["encrypt-string"] = evaluate({
    name,
    testsQty: updatedTestsQty,
    testsFct,
    input: encryptInput,
  })

  return results;

}

function encryptInput({strLength}) {
  const generatedArray = new Array(strLength).fill(0).map((_, i) => i % 256);
  const typedArray = new Uint8Array(generatedArray); 
  return Buffer.from(typedArray).toString();
};

function prepareDecrypt(clearInput) {
  return cryptoEncrypt(clearInput);
};

function prepareDecryptCryptr(clearInput) {
  return cryptr.encrypt(clearInput);
};



// Avoid top level await for middleware...
const BASE64_TEST_KEY = "stf9gkNk111111d9UpbR/ZqpqKstA7L1lAAAAAaQ6+E=";

// configure this module
const nextCryptr = new NextCryptr({ secret: BASE64_TEST_KEY });

// configure cryptr module
const cryptr = new Cryptr(BASE64_TEST_KEY, {encoding: 'base64url'});

// configure node:crypto
setKey(BASE64_TEST_KEY)



// [[length of string or array, quantity of conversions], ]
const encryptTestsQty1 = new Map([
  [1024, 100000],
  [1048576, 200],
])

const encryptTestsFct1 = new Map([
  ["next-cryptr (built-in crypto.subtle API)", {test: nextCryptr.encryptString}],
  ["node:crypto (Node.js crypto API)        ", {test: cryptoEncrypt}],
])

const encryptTestsQty2 = new Map([
  [1024, 100],
  [10000, 10],
])

const encryptTestsFct2 = new Map([
  ["next-cryptr (built-in crypto.subtle API)", {test: nextCryptr.encryptString}],
  ["cryptr (default)                        ", {test: cryptr.encrypt}],
])

// [[length of string or array, quantity of conversions], ]
const decryptTestsQty1 = new Map([
  [1024, 100000],
  [1048576, 200],
])


const decryptTestsFct1 = new Map([
  ["next-cryptr (built-in crypto.subtle API)", {test: nextCryptr.decryptString, prepare: prepareDecrypt}],
  ["node:crypto (Node.js crypto API)        ", {test: cryptoDecrypt, prepare: prepareDecrypt}],
])


const decryptTestsQty2 = new Map([
  [1024, 100],
  [10000, 100],
])

const decryptTestsFct2 = new Map([
  ["next-cryptr (built-in crypto.subtle API)", {test: nextCryptr.decryptString, prepare: prepareDecrypt}],
  ["cryptr (default)                        ", {test: cryptr.decrypt, prepare: prepareDecryptCryptr}],
])


evaluateBatch("NextCryptr vs node:crypto: Encrypt string", encryptTestsQty1, encryptTestsFct1);
evaluateBatch("NextCryptr vs cryptr: Encrypt string", encryptTestsQty2, encryptTestsFct2);
evaluateBatch("NextCryptr vs node:crypto: Decrypt string", decryptTestsQty1, decryptTestsFct1);
evaluateBatch("NextCryptr vs cryptr: Decrypt string", decryptTestsQty2, decryptTestsFct2);


/**
 * RESULTS
 * - 2x faster than node:crypto API for encrypting small string (less than 4 kB)
 * - 2x to 4x faster than node:crypto API for decrypting (whatever the size)
 * - 1000x to 6000x faster than cryptr for strings up to 10 kB (because cryptr is doing 100 000 pbkdf2Iterations for each new encryption)...
 * - 6000x faster than cryptr for strings up to 10 kB (because cryptr is doing 100 000 pbkdf2Iterations for each new encryption)...
 * 
 * https://medium.com/@thomas_40553/how-to-secure-encrypt-and-decrypt-data-within-the-browser-with-aes-gcm-and-pbkdf2-057b839c96b6
 * PBKDF2 for Password-Based Key Derivation Function 2...
 * which is dedicated for encryption based on a password, which is not our case (since we ask for a 256-bits secrets directly)... 
 */
