import { Buffer, TO_BASE64 } from 'next-buffer';


/**
 * Helper function generating 1 random 256 bits-long secret 
 * using the AES-GCM algorithm and returning it as a base64 
 * encoded string.
 * 
 * Use the built-in crypto API, available in any environment.
 */
export async function generateBase64Secret() {
  const key = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const base64Key = Buffer.from(exportedKey).toString(TO_BASE64);
  return base64Key;
}