/**
 * @author   Clément Warneys <https://github.com/warniiiz>
 * @license  ISC
**/

import { Buffer, TO_BASE64URL, FROM_BASE64, FROM_UTF8, TO_UTF8 } from 'next-buffer';
import { getRandomIv } from './iv-generators/random.js';

const IV_LENGTH = 12;

/**
 * Cryptographic utility for encrypting and decrypting data 
 * using AES-GCM 256 algorithm, on Node.js and Next.js Edge Runtime.
 * 
 * Based on standard web crypto API, with crypto.subtle.* methods.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 * 
 * This means that you can use the package without any other
 * cryptographic package. By the way, this module needs
 * no other dependencies at all.
 * 
 * This package is also compatible with Next.js Edge Runtime.
 * 
 * @class
 * @name NextCryptr
 */
export class NextCryptr {

  // private key, 
  // generated from provided secret
  // stored as a promise (limitation of non-async js constructor)
  #KEY_PROMISE;

  // Optional: Encoding for encrypted results as a string
  // Default: TO_BASE64URL
  #ENCODER; 
  
  // Optional: IV generator
  // Default: Random IV generator, as per NIST recommendations
  #IV_GENERATOR; 

  /**
   * Creates a new instance of SubtleCryptr.
   * 
   * @param {Object} options - The options for SubtleCryptr.
   * @param {string} options.secret - The base64 secret used to generate the key.
   * @param {string} options.encoding - The encoding used to encode encrypted value as a string.
   * @throws {Error} Throws an error if the secret is missing or not a string.
   * @throws {Error} Throws an error if the secret length is not 256 bits-long.
   */
  constructor({
    secret,
    encoder=TO_BASE64URL,
    ivGenerator=getRandomIv,
  }={}) {
    // SECRET
    if (!secret || typeof secret !== 'string') {
      throw new Error(
        "Subtle-Cryptr needs a base64 secret in order to generate key. " + 
        "Visit https://www.npmjs.com/package/next-cryptr to discover how to generate one."
      );
    }
    // convert to Uint8Array
    const uInt8Secret = Buffer.from(secret, FROM_BASE64);
    // check for secret length
    if (uInt8Secret.length !== 32) {
      throw new Error(
        "Secret must be 256 bits-long (i.e. 32 bytes-long, or 44 characters in base64 encoded string). " + 
        `Provided a ${uInt8Secret.length} bytes-long secret.`
      );
    }

    // KEY
    this.#KEY_PROMISE = crypto.subtle.importKey('raw', uInt8Secret, {name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);

    // ENCODER
    this.#ENCODER = encoder;
    // Check if encoding is valid
    try {
      Buffer.from('test').toString(this.#ENCODER)
    } catch {
      throw new TypeError(
        "You must provide a valid encoder. " + 
        "For example, you can use TO_BASE64, TO_HEX, TO_UTF8, ... " +
        "from the 'next-buffer' module."
      );
    }

    // IV GENERATOR
    this.#IV_GENERATOR = ivGenerator;
    // check for length
    const ivLengthTest = this.#IV_GENERATOR();
    if (!(ivLengthTest instanceof Uint8Array)) {
      throw new TypeError(
        "IV generator must return a Uint8Array object type."
      );
    }
    if (ivLengthTest.length !== IV_LENGTH) {
      throw new Error(
        `IV generator must return a ${IV_LENGTH} bytes-long Uint8Array. ` + 
        `Provided a ${ivLengthTest.length} bytes-long IV.`
      );
    }
  }

  /**
   * Encrypts data (ArrayBuffer or TypedArray) using AES-GCM 256 encryption algorithm.
   * Returns result as an encoded string (default encoding: base64).
   * 
   * By default, based on AES-GCM recommandations, the IV is randomly generated and 
   * is 12 bytes (96-bits) long. You can choose another IV generator by providing
   * a function as the second parameter. This function must return a 12-bytes length 
   * Uint8Array.
   * 
   * Result is composed of the IV (encoded after the optional encoding, 
   * chosen at instanciation) and the encrypted data (also encoded), 
   * both concatenated in a single string.
   * 
   * @param {ArrayBuffer | TypedArray} data - The data to be encrypted.
   * @param {Function} ivGenerator - The optional IV generator function.
   * @returns {encoded string} - The encrypted data as an encoded string.
   */
  encrypt = async (data) => {
    // get IV
    const iv = this.#IV_GENERATOR();
    // encrypt data
    const cipher = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, await this.#KEY_PROMISE, data);
    const cipherArray = new Uint8Array(cipher);
    // concat iv (Uint8Array) and cipher (ArrayBuffer) in the same typed array
    const ivAndCipher = Buffer.concat([iv, cipherArray])
    // encode the whole in chosen encoding
    return Buffer.from(ivAndCipher).toString(this.#ENCODER);
  }

  /**
   * Decrypts the given raw value using AES-GCM encryption.
   * The raw value is an encoded string (default base64 encoded string),
   * representing the encrypted data.
   * 
   * @param {string} encodedEncryptedData - The encrypted and encoded value to decrypt.
   * @returns {Promise<ArrayBuffer>} decryptedData - The decrypted value as an ArrayBuffer.
   */
  decrypt = async (encodedEncryptedData) => {
    // unpack values
    const ivAndCipher = Buffer.from(encodedEncryptedData, this.#ENCODER);
    // split values
    const iv = ivAndCipher.slice(0, IV_LENGTH);
    const cipher = ivAndCipher.slice(IV_LENGTH);
    // decrypt
    const decryptedData = await crypto.subtle.decrypt({name: 'AES-GCM', iv,}, await this.#KEY_PROMISE, cipher);
    // return as ArrayBuffer
    return decryptedData;
  }

  /**
   * Encrypts a string (UTF-8 encoded by default) using AES-GCM 256 encryption algorithm, 
   * converting the string to a Uint8Array, and using above encrypt method.
   *
   * @param {string} string - The clear string to be encrypted.
   * @returns {Promise<Uint8Array>} - A promise that resolves to the encrypted value as an Uint8Array.
   */
  encryptString = async (string, encoder=FROM_UTF8) => {
    const clearDataBuffer = Buffer.from(string, encoder);
    return await this.encrypt(clearDataBuffer);
  }
  
  /**
   * Decrypts an encrypted value, using above decrypt method, 
   * and returns it as a string.
   * 
   * @param {string} encodedEncryptedString - The encrypted and encoded string to decrypt.
   * @returns {Promise<string>} - A promise that resolves to the clear string.
   */
  decryptString = async (encodedEncryptedString, encoding=TO_UTF8) => {
    const decryptedDataBuffer = await this.decrypt(encodedEncryptedString);
    return Buffer.from(decryptedDataBuffer).toString(encoding);
  }

}