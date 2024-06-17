import { NextCryptr, generateBase64Secret } from '../src/index.js';

describe('NextCryptr', () => {
    
    // Test case for key length
  test('Key properties', async () => {
    const randomSecret = await generateBase64Secret();
    expect(typeof randomSecret).toBe('string');
    expect(randomSecret.length).toBe(44);
  });

  // Test case for encrypting and decrypting data
  test('Encrypt and decrypt string', async () => {
    const randomSecret = await generateBase64Secret();
    const nextCryptr = new NextCryptr({secret: randomSecret});
    const data = 'Hello, World!';
    const encryptedData = await nextCryptr.encryptString(data);
    const decryptedData = await nextCryptr.decryptString(encryptedData);
    expect(decryptedData).toBe(data);
  });

  // Test case for handling missing secret
  test('Throw error for missing secret', () => {
    expect(() => new NextCryptr()).toThrowError();
  });

  // Test case for handling invalid secret length
  test('Throw error for invalid secret encoding', () => {
    const invalidSecret = 'invalid';
    expect(() => new NextCryptr({secret: invalidSecret})).toThrow();
  });

  // Test case for handling invalid secret length
  test('Throw error for invalid secret length', () => {
    const invalidSecret = 'AAAA';
    const uInt8InvalidSecret = new Uint8Array(Buffer.from(invalidSecret, 'base64'))
    expect(() => new NextCryptr({secret: invalidSecret})).toThrowError(`Secret must be 256 bits-long (i.e. 32 bytes-long, or 44 characters in base64 encoded string). Provided a ${uInt8InvalidSecret.length} bytes-long secret.`);
  });
  
  // Test case for handling invalid IV generator
  test('Throw error for invalid IV generator (incorrect type)', async () => {
    const invalidIVGenerator = () => 1;
    const randomSecret = await generateBase64Secret();
    expect(() => new NextCryptr({secret: randomSecret, ivGenerator: invalidIVGenerator})).toThrow("IV generator must return a Uint8Array object type.");
  });
  
  // Test case for handling invalid IV generator
  test('Throw error for invalid IV generator (incorrect length)', async () => {
    const invalidIVGenerator = () => new Uint8Array([1]);
    const randomSecret = await generateBase64Secret();
    expect(() => new NextCryptr({secret: randomSecret, ivGenerator: invalidIVGenerator})).toThrow("IV generator must return a 12 bytes-long Uint8Array. Provided a 1 bytes-long IV.");
  });
  
  // Test case for handling invalid encoder
  test('Throw error for invalid encoder', async () => {
    const randomSecret = await generateBase64Secret();
    expect(() => new NextCryptr({secret: randomSecret, encoder: 'test-encoder'})).toThrow("You must provide a valid encoder. For example, you can use TO_BASE64, TO_HEX, TO_UTF8, ... from the 'next-buffer' module.");
  });



});
