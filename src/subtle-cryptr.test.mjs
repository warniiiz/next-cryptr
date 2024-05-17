import { SubtleCryptr } from './subtle-cryptr';

// Test case for key length
test('Key properties', async () => {
  const randomSecret = await SubtleCryptr.generateRandomBase64Secret();
  expect(typeof randomSecret).toBe('string');
  expect(randomSecret.length).toBe(44);
});

// Test case for encrypting and decrypting data
test('Encrypt and decrypt string', async () => {
  const randomSecret = await SubtleCryptr.generateRandomBase64Secret();
  const cryptr = new SubtleCryptr(randomSecret);
  const data = 'Hello, World!';
  const encryptedData = await cryptr.encryptStr(data);
  const decryptedData = await cryptr.decryptStr(encryptedData);
  expect(decryptedData).toBe(data);
});

// Test case for handling missing secret
test('Throw error for missing secret', () => {
  expect(() => new SubtleCryptr()).toThrowError('Subtle-Cryptr needs a base64 secret in order to generate key.');
});

// Test case for handling invalid secret length
test('Throw error for invalid secret length', () => {
  const invalidSecret = 'invalid';
  const uInt8InvalidSecret = new Uint8Array(Buffer.from(invalidSecret, 'base64'))
  expect(() => new SubtleCryptr(invalidSecret)).toThrowError(`Secret must be 32 bytes-long (or 44 characters in base64 encoded string). Provided a ${uInt8InvalidSecret.length} bytes-long secret.`);
});
