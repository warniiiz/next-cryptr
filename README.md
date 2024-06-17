# NextCryptr

![License](https://img.shields.io/npm/l/next-cryptr)
![NPM Downloads](https://img.shields.io/npm/dw/next-cryptr)
![NPM Version](https://img.shields.io/npm/v/next-cryptr)

NextCryptr is a cryptographic utility module for encrypting and decrypting data using the AES-GCM 256 algorithm. It's specifically designed to work with Next.js Edge Runtime and thus has no dependency to Node.js built-in modules like `crypto`. It is also optimized for browser with a reduced total bundle size, thanks to its tree-shaking ready dependencies and import schemas.

AES-GCM algorithm is a symmetric encryption algorithm that provides both confidentiality and integrity. It is based on the Advanced Encryption Standard (AES) and the Galois/Counter Mode (GCM) block cipher mode of operation. It can be use to encrypt messages or documents between two or more parties who share the same secret key. Another usecase is for webservers in procedure like One-Time Password (OTP), or for cookie session encryption.

A proper use of AES-GCM should follow the NIST Special Publication 800-38D recommendations. This includes:
- the correct generation of the Initialization Vector (IV), which here can be fully handle by Next-Cryptr; 
- and the proper generation and handling of the secret key, which is your responsibility (see following sections for more details).

This package is based on the standard web crypto API, specifically the `crypto.subtle.*` methods. You can use this package without any other external cryptographic package. 

NextCryptr is compatible with the following runtime environments (non exhaustive):
- Node
- Next.js Edge Runtime
- Web browsers

NextCryptr is fully optimized and has great performances ([see dedicated section](#performances) for more information):
- 2x faster than native Node.js `node:crypto` module for encrypting and decryptind data up to 4kB;
- 1000x to 6000x faster than the widely used `cryptr` NPM module for encrypting and decrypting data up to 10kB.


## Installation

Install NextCryptr with npm:

```bash
npm install next-cryptr
```


## Usage

### Import

First, import the `NextCryptr` class from the `next-cryptr` package:

```javascript
import { NextCryptr } from 'next-cryptr';
```

### Instanciate

Next, create a new instance of `NextCryptr`, passing your secret as a parameter to the constructor:

```javascript
const cryptr = new NextCryptr({
  secret: 'your-256-bits-secret-base64-encoded',
});
```

Replace `'your-256-bits-secret-base64-encoded'` with your actual secret. Please check the following section to [learn how to generate a secret](#generate-a-secret).

You can also provide some optional parameters:
- `ivGenerator`: A custom IV generator function. By default, NextCryptr uses a random IV generator function. Please check the following section to [learn more about IV generation](#iv-generation).
- `encoding`: The encoding for returning the encrypted data as a string. Default is `TO_BASE64URL`, thus the `encrypt` results in base64url encoded string. But you can also use `TO_HEX`, `TO_BASE64`, or your own Encoder instance. These are encoders from the [`next-buffer` package](#https://www.npmjs.com/package/next-buffer). For convenience, they are also exported by `next-cryptr` package, and you can use them as follow:


```javascript
import { NextCryptr, TO_HEX } from 'next-cryptr';

const cryptr = new NextCryptr({
  secret: 'your-256-bits-secret-base64-encoded',
  encoder: TO_HEX,
});
```


### Encrypt / Decrypt

Now, you can use the `encrypt` and `decrypt` methods to encrypt and decrypt `ArrayBuffer`, `TypedArray` or `DataView` of data, or their respective `encryptString` and `decryptString` methods to encrypt and decrypt `string`. Here's an example with the latest:

```javascript
const clearText = "Hello, Mr Warniiiz 👋"
const encryptedText = await cryptr.encryptString(clearText);
console.log(encryptedText); 
// Expected result (should vary depending on your own secret): 
// 'rZfOpIz3QrUzvXSLODlKs7kZplVfdG82u9LInUQtFTLpOlzro7yEC6N1kux3IEQvXXQP'

const decryptedText = await cryptr.decryptString(encryptedText);
console.log(decryptedText); 
// Expected result: 'Hello, Mr Warniiiz 👋'
```

Also, note that the `encrypt` and `decrypt` methods are asynchronous and return Promises, so you need to use `async/await` or `.then/.catch` to handle them.


## Security considerations

The security of symmetric encryption resides in the secrecy of the key. Any person who knows your key could decrypt your encrypted data. You must [generate a strong secret](#generate-a-secret) on your own device and [keep it secure](#store-your-secret-key). 

Another consideration is the correct use of IV (Initialization Vector). Next-cryptr is handling all the implementation details for you, randomly generating the IV at each encryption, as per the NIST recommandations. But is has some [implications on the maximum message size and maximum number of messages](#iv-generation) that can be encrypted with the same key. 


### Generate a secret

To generate a secret, you can use the included static async method in `NextCryptr` class:

```javascript
import { generateBase64Secret } from 'next-cryptr';
const mySecret = await generateBase64Secret();
console.log(mySecret);
// Expected result (should change on each call): 
// 'BK1jwARaoB1/gK1s1qA6qE7mFbdjV1wgAy1PRfWEvQU='
```

The previous code generates a random 256-bit secret, converts it to base64 encoded string, and logs it to the console. Please check the following section to [learn how to store this secret](#store-your-secret-key).

You can also generate a secret directly in a terminal using node and the following command:

```bash
# Command line interface
node -e "crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']).then(v => crypto.subtle.exportKey('raw', v)).then(v => console.log(Buffer.from(v).toString('base64')))";
```


### Store your secret key

Best practices concerning the storage of your newly created secret key are to store it in an environment variable, like in a `.env` file for example. 

You should never hardcode your secret key in your code and, worst, store it in a public repository. So be sure to add your `.env` file to your `.gitignore` file.

Here is an example of a `.env` file:

```bash
# File: .env
SECRET_KEY="your-256-bits-secret-base64-encoded"
```

And how to use it in Node Runtime environment:

```javascript
import { NextCryptr } from 'next-cryptr';
const cryptr = new NextCryptr(process.env.SECRET_KEY);
```


### Managing your key(s)

Depending on your use cases, you may need to manage multiple keys. NextCryptr does not provide a built-in way to manage multiple keys or key-rotation, but it could be an implementation idea for further development / packages.


### IV generation

Rules concerning the IV (Initialization Vector) for AES-GCM:
- IV shall be 12-bytes long (i.e. 96-bits long)
- IV must be unique for each message encrypted under the same key (AES-GCM IV is actually a _nonce_), else leading to catastrophic failure of the encryption system

IV is not a secret. It is actually shared as a prefix of the encrypted message. In the cas of AES-GCM algorithm, IV does not need to be very different for each message: a simple incremental counter can do the task, as long as it is unique for each message encrypted under the same key.

As per the NIST recommendations, you shall use the same IV generator function for the entire lifespan of the key. By default, NextCryptr uses a random IV generator function, which comes with the following limitations:
- NIST recommends to limit the number of encrypted messages under the same key to a maximum of 2^32 (about 4,300,000,000 encrypted messages). 

_Explanation: Since the IV is 96 bits, the maximum number of messages that can be encrypted under the same key would be 2^96, which is an extremely large number... but considering that the IV is randomly generated, there is a risk of IV collision (same IV for different messages). And considering the "birthday problem", the NIST suggests to limit probability of IV collision to 2^-32 (about 1 out of 4,300,000,000). This probability is reached when number of encryptions under the same key reach 2^32 (about 4,300,000,000 encrypted messages), so NIST recommends to change your key before reaching this number of encryptions._

Please read the [NIST Special Publication 800-38D](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf) for more information.

### Custom IV generator function

_Be sure to understand the implications of using a custom IV generator function. NextCryptr and its contributors disclaim all liaibility in the event of misuse._

NextCryptr allows you to provide your own IV generator function:

```javascript
import { NextCryptr } from 'next-cryptr';
const cryptr = new NextCryptr({
  secret: 'your-256-bits-secret-base64-encoded',
  ivGenerator: yourOwnGeneratorFunction,
});
```

This function shall return an UInt8Array of 12 bytes (96 bits), or the constructor will throw an error. It is called each time the encrypt method is called. No parameters are passed to this function.

For example, since the only specification for AES-GCM IV is to be a nonce, you could use a basic counter (fully deterministic) for an IV generator function. If you manage to implement it in your system (and to guarantee that the IV remains unique even after a crash / restart, for example), it would be the best option. But implementations becomes far more complex in real environments, especially in distributed systems.


### Timestamp-based IV generator function

NextCryptr also comes with a timestamp-based IV generator function. This IV generator has been made for those who don't want to rely only on a random number generator. This generator uses a combination of the current timestamp and some random number to generate a 12-bytes IV, thus guaranteeing a new unique IV prefix each second, on a period of 34 years.

IV is composed of:
- Timestamp in seconds, modulo 34 years, encoded on 30 bits;
- Random numbers are added on the 66 remaining bits.

66 random bits means 2^66 possible values. The probability of collision used in the NIST specification, of 2^-32 (1 out of 4,300,000,000), is then reached when you encode more than 185,000 messages in less than 1 second.

The probability of collision becomes inexistant if you encode no more than 1 message per second and you use the same key no more than 34 years.

```javascript
import { NextCryptr, getTimestampComposedIv } from 'next-cryptr';
const cryptr = new NextCryptr({
  secret: 'your-256-bits-secret-base64-encoded',
  ivGenerator: getTimestampComposedIv,
});
```

_Please note that this implementation does not follow the NIST recommendations. Use it at your own risk._


### Other limitations

Maximum message size: AES-GCM is limited to 64 GBytes of encrypted data for each Key-IV couple. You should consider other cryptographic algorithms if you need to encrypt larger messages.


## API

The `NextCryptr` class has the following methods:

### Constructor `NextCryptr(options)`

Creates a new instance of `NextCryptr`. Options:
- `secret`: The secret key to use for encryption and decryption. This parameter is required and should be a base64 encoded string.
- `ivGenerator` (optional): A custom IV generator function. By default, NextCryptr uses a random IV generator function.
- `encoder` (optional): The encoding for returning the encrypted data as a string. Default is `TO_BASE64URL`, thus the `encrypt` results in base64url encoded string. [More information](#instanciate).

```javascript
const cryptr = new NextCryptr({secret});
```

### `cryptr.encrypt(data)`

Encrypts binary data (Uint8Array), based on AES-GCM algorithm, and encode the result in base64url (or any chosen encoding scheme). 

- `data` (`Uint8Array`): The data to encrypt. This parameter is required and can be an ArrayBuffer, a TypedArray, or a DataView.

Returns a Promise that resolves with the encrypted data as an encoded string. Result is composed of the IV and the encrypted data, both encoded (base64url-encoded by default) in a single string.


### `cryptr.decrypt(encodedEncryptedData)`

Decodes and decrypts the encrypted and encoded data.

- `encodedEncryptedData` (`string`): The encrypted and encoded data to decrypt.

Returns a Promise that resolves with the decrypted data as binary data (Uint8Array).


### `cryptr.encryptString(string)`

Encrypts a simple string, converting the string to a Uint8Array, and using above encrypt method, thus returning an encoded string.

- `string` (`string`): The string to encrypt.

Returns a Promise that resolves with the encrypted data as a base64 encoded string. 


### `cryptr.decryptString(encodedEncryptedString)`

Decode and decrypts the encrypted and encoded string.

- `encodedEncryptedString` (`string`): The encrypted ans encoded string to decrypt.

Returns a Promise that resolves with the decrypted string.


### `generateBase64Secret()`

Generates a random 256-bit secret key with built-in cryptographically secured methods, and returns it as a base64 encoded string.

For tree-shaking purpose, `generateBase64Secret` is neither a static method nor an instance method of `NextCryptr` and shall be imported separately:

```javascript
import { generateBase64Secret } from 'next-cryptr';
const myNewSecret = generateBase64Secret();
```


### `getRandomIv()` and `getTimestampComposedIv()`

Respectively generates a random IV and a timestamp-based IV. 
- `getRandomIv` is the default IV generator used in NextCryptr. It follows the NIST recommendations for IV generation;
- `getTimestampComposedIv` is a custom IV generator function that uses a timestamp-based IV, that you can use if you don't want to rely only on a random number generator. Please read the [related section](#timestamp-based-iv-generator-function) before using it.

For tree-shaking purpose, these methods are neither static method nor instance method of `NextCryptr` and shall be imported separately:

```javascript
import { getRandomIv } from 'next-cryptr';
import { getTimestampComposedIv } from 'next-cryptr';
```


## Tests

To launch the tests using jest:

```javascript
npm run test
```


## Performances

You can check encrypting / decrypting performances, on different string lengths, running the following command:

```javascript
npm run perf
```

Speed of encryption / decryption is measured against the widely used `cryptr` NPM module, and also directly against the Node's crypto API (`node:crypto`). 
- Surprisingly the implementation of NextCryptr (with crypto.subtle API) is 2x faster than the native node:crypto module, especially on short string (less than 4kB), and equivalent for long strings encryption. Is is always 2x faster for decryption.
- Concerning the widely used NPM module cryptr, NextCryptr is 1000x to 6000x faster for strings up to 10 kB. This is because cryptr is doing 100,000 pbkdf2Iterations before each new encryption, since encryption is based on secret phrase, which needs to be derived, and not directly on a 256-bit secret... Concerning decryption, NextCryptr is 6000x faster for strings up to 10 kB. _This should be a real concern, since some of the dependant packages of cryptr are using it for usecase as OTP, or session encryption, which are usecases which do not need to derive a secret from a passphrase, and where the use of a secret key is easy._


## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.


## License

NextCryptr is [ISC licensed](./LICENSE).

