

/**
 * There is no need to use a cryptographically secure random number generator
 * to generate an IV for AES-GCM encryption. But it needs a statistically random
 * number generator.
 * 
 * IV Length shall be 12 bytes.
 * 
 * NIST specifies a limit of of 2^32 (about 4,300,000,000) messages to be encrypted 
 * with the same key using this kind of randomly generated IV. If you reach this number
 * of messages, you have a probability of collision of 2^-32 (1 out of 
 * 4,300,000,000), and it would be preferable to change your key before.
 * See birthday problem for more information.
 * 
 * See NIST specification for more information
 * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
 * 
 * @returns {Uint8Array} - The generated random iv.
 */
export function getRandomIv() {
  // Get a random 12-bytes IV using built-in crypto API
  return crypto.getRandomValues(new Uint8Array(12));
}