
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
export class SubtleCryptr {

  // private key, 
  // generated from provided secret
  #KEY_PROMISE;

  /**
   * Creates a new instance of SubtleCryptr.
   * 
   * @param {Object} options - The options for SubtleCryptr.
   * @param {string} options.secret - The base64 secret used to generate the key.
   * @throws {Error} Throws an error if the secret is missing or not a string.
   * @throws {Error} Throws an error if the secret length is not 44 characters.
   */
  constructor(secret) {
    // check for secret
    if (!secret || typeof secret !== 'string') {
      this.#generateRandomBase64Secrets();
      throw new Error("Subtle-Cryptr needs a base64 secret in order to generate key.");
    }
    // convert to Uint8Array
    const uInt8Secret = new Uint8Array(Buffer.from(secret, 'base64'))
    // check for secret length
    if (uInt8Secret.length !== 32) {
      throw new Error(`Secret must be 32 bytes-long (or 44 characters in base64 encoded string). Provided a ${uInt8Secret.length} bytes-long secret.`);
    }
    // generate key from secret
    this.#KEY_PROMISE = crypto.subtle.importKey('raw', uInt8Secret, {name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
  }

  /**
   * Helper function generating 1 random secret using the AES-GCM algorithm
   * and and returning it as a base64 encoded string.
   */
  static generateRandomBase64Secret = async () => {
    const key = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
    const exportedKey = await crypto.subtle.exportKey('raw', key);
    const base64Key = Buffer.from(exportedKey).toString('base64');
    return base64Key;
  }

  /**
   * Helper function providing 3 random secrets as base64 encoded string using the AES-GCM algorithm.
   * Pushing the generated keys in the console.
   */
  #generateRandomBase64Secrets = async () => {
    if (process.env.NODE_ENV !== 'development') return;
    const randomKeys = await Promise.all((new Array(3)).fill(0).map(() => SubtleCryptr.generateRandomBase64Secret()));
    console.log(
    "\nSubtle-Cryptr needs a base64 secret in order to generate key. " + 
    "You can generate one with command crypto.subtle.generateKey.\n\n" + 
    "For example, if you are using nodejs, you can run the following command in the terminal:\n" +
    `node -e "crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt'])` + 
    `.then(v => crypto.subtle.exportKey('raw', v)).then(v => console.log(Buffer.from(v).toString('base64')))"\n\n` + 
    "Here are 3 randomly generated secrets with the above methods:\n" +
    randomKeys.join("\n") + 
    "\n\n"
    );
  }

  /**
   * Packs the given data by converting it to a base64 string,
   * using Node.js 'Buffer.from()' method.
   *
   * @private
   * @param {Uint8Array} unpacked - The data to be packed.
   * @returns {string} - The packed data as a base64 string.
   */
  #pack = (unpacked) => Buffer.from(unpacked).toString('base64');

  /**
   * Unpacks a base64-encoded string into a Buffer
   * using Node.js 'Buffer.from()' method.
   *
   * @private
   * @param {base64 encoded string} packed - The base64-encoded string to unpack.
   * @returns {Uint8Array} The unpacked Uint8Array.
   */
  #unpack = (packed) => Uint8Array.from(Buffer.from(packed, 'base64'));
  
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
  encrypt = async (serializedData) => {
    // randomize encryption result with random iv
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ivPack = this.#pack(iv);
    // encrypt data
    const cipher = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, await this.#KEY_PROMISE, serializedData);
    const cipherPack = this.#pack(cipher);
    // return string
    return ivPack + cipherPack;
  }

  /**
   * Decrypts the given raw value using AES-GCM encryption.
   * The raw value is expected to be a base64 encoded string.
   * 
   * @param {base64 encoded string} rawValue - The raw value to decrypt.
   * @returns {Promise<Uint8Array>} - The decrypted value as a Uint8Array.
   */
  decrypt = async (rawValue) => {
    if (!rawValue) return {};
    // split & unpack values
    const strRawValue = rawValue.toString();
    const iv = this.#unpack(strRawValue.slice(0, 16));
    const cipher = this.#unpack(strRawValue.slice(16));
    // decrypt
    const serializedData = await crypto.subtle.decrypt({name: 'AES-GCM', iv,}, await this.#KEY_PROMISE, cipher);
    // return as Uint8Array, converted from buffer
    return new Uint8Array(serializedData);
  }

  /**
   * Encrypts a simple string using AES-GCM 256 encryption algorithm, 
   * converting the string to a Uint8Array, and using above encrypt method.
   *
   * @param {string} str - The raw string value to be encrypted.
   * @returns {Promise<Uint8Array>} - A promise that resolves to the encrypted value as an ArrayBuffer.
   */
  encryptStr = async (str) => {
    const strArray = Uint8Array.from(Buffer.from(str.toString()));
    return await this.encrypt(strArray);
  }
  
  /**
   * Decrypts a raw value (string), using above decrypt method, 
   * and returns it as a string.
   * 
   * @param {string} rawValue - The raw value to decrypt.
   * @returns {Promise<string>} - A promise that resolves to the decrypted value as a string.
   */
  decryptStr = async (rawValue) => {
    const strArray = await this.decrypt(rawValue);
    return Buffer.from(strArray).toString();
  }

}