/**
 * Same methods than next-cryptr but with native node:crypto module,
 * for performance comparison
 */
import crypto from 'node:crypto';
import { Buffer, FROM_BASE64, TO_BASE64URL, FROM_BASE64URL} from 'next-buffer';

let KEY;

export function setKey(base64Key) {
  KEY = Buffer.from(base64Key, FROM_BASE64);
}

export function cryptoEncrypt(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const encoded = cipher.update(value);
  const final = cipher.final();
  const auth = cipher.getAuthTag();
  const b = Buffer.concat([iv, encoded, final, auth]);
  return b.toString(TO_BASE64URL);
};

export function cryptoDecrypt(value) {
  const ivAndCipher = Buffer.from(value, FROM_BASE64URL);
  const iv = ivAndCipher.slice(0, 12);
  const cipher = ivAndCipher.slice(12, ivAndCipher.length - 16);
  const auth = ivAndCipher.slice(ivAndCipher.length - 16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(auth);
  const decrypted = decipher.update(cipher)
  const final = decipher.final()
  const b = Buffer.concat([decrypted, final]);
  return b.toString();
};
