
// 34 years in seconds
const NUMBER_OF_SECONDS_IN_34_YEARS = 2 ** 30;

/**
 * This IV generator has been made for those who don't want to rely only on 
 * a random number generator. This generator uses a combination of the current timestamp 
 * and some random number to generate a 12-bytes IV, thus garanteeing
 * a new unique IV prefix each second, on a period of 34 years.
 * 
 * - Timestamp in seconds, modulo 34 years, is encoded on 30 bits;
 * - Random numbers are added on the 66 remaining bits.
 * 
 * 66 random bits represent a pool of 2^66 possible values. The probability 
 * of collision * of 2^-32 (1 out of 4,300,000,000), the same as the NIST specification,
 * is then reached when you encode more than 185,000 different messages in less than 1 second.
 * 
 * The probability of colision is null if you encode no more than 1 message per second and
 * you use the same key no more than 34 years.
 * 
 * Please note that this implementation does not follow the NIST recommendations.
 * 
 * See NIST specification for more information
 * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
 * 
 * @returns {Uint8Array} - The generated random iv.
 */
export function getTimestampComposedIv() {
  // Get a random 12-bytes IV using built-in crypto API
  const iv = crypto.getRandomValues(new Uint8Array(12));
  // Get timestamp in milliseconds
  const ts = new Date().getTime();
  // 30-bits rotating timestamp in seconds
  const ts30bits = (ts / 1000) % NUMBER_OF_SECONDS_IN_34_YEARS; 
  // Including timestamp in the random IV, begining on the 3rd bit of random iv.
  iv[0] = (iv[0] & 0b11000000) | (ts30bits & 0b00111111);
  iv[1] = (ts30bits >>  6) & 0xFF;
  iv[2] = (ts30bits >> 14) & 0xFF;
  iv[3] = (ts30bits >> 22) & 0xFF;
  // Return the composed IV
  return iv;
}