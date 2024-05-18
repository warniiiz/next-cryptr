# SubtleCryptr

SubtleCryptr is a cryptographic utility for encrypting and decrypting data using the AES-GCM 256 algorithm. It's designed to work with Node.js and Next.js Edge Runtime.

This package is based on the standard web crypto API, specifically the `crypto.subtle.*` methods. You can use this package without any other cryptographic package. Actually, this module has no dependencies at all.

SubtleCryptr is compatible with the following runtime environments:
- Node
- Next.js Edge Runtime
- Web browsers

## Installation

Install SubtleCryptr with npm:

```bash
npm install subtle-cryptr
```

Note that there is no dependencies for this package.

## Usage

First, import the `SubtleCryptr` class from the `subtle-cryptr` package:

```javascript
import { SubtleCryptr } from 'subtle-cryptr';
```

Or in old javascript style...

```javascript
const SubtleCryptr = require('subtle-cryptr').SubtleCryptr;
```

Next, create a new instance of `SubtleCryptr`, passing your secret as a parameter to the constructor:

```javascript
const cryptr = new SubtleCryptr('your-256-bits-secret-base64-encoded');
```

Replace `'your-256-bits-secret-base64-encoded'` with your actual secret. Please check the following section to [learn how to generate a secret](#generate-a-secret).

Now, you can use the `encrypt` and `decrypt` methods to encrypt and decrypt `ArrayBuffer` of data, or their respective `encryptStr` and `decryptStr` methods to encrypt and decrypt `string`. Here's an example with the latest:

```javascript
const str = "Hello, world!"

const encryptedData = await cryptr.encryptStr(str);
console.log(encryptedData); 
// Expected result: 'Mj9c5tc3Inl7bctDyst+o4DFGHtWKbCnAmSifYXtfsyMpelVsNwPq1M='

const decryptedData = await cryptr.decryptStr(encryptedData);
console.log(decryptedData); 
// Expected result: 'Hello, world!'
```

Also, note that the `encrypt` and `decrypt` methods are asynchronous and return Promises, so you need to use `async/await` or `.then/.catch` to handle them.

## Security considerations

The security of symmetric encryption resides in the secrecy of the key. Any person who knows your key could decrypt your encrypted data.

You must generate a strong secret on your own device and keep it secure. 

### Generate a secret

To generate a secret, you can use the included static method in `SubtleCryptr` class:

```javascript
import { SubtleCryptr } from 'subtle-cryptr';
const mySecret = SubtleCryptr.generateRandomBase64Secret();
console.log(mySecret);
```

The previous code generates a random 256-bit secret, converts it to base64 encoded string, and logs it to the console. Please check the following section to [learn how to store this secret](#store-your-secret-key).

You can also generate a secret directly in a terminal using node and the following command:

```bash
node -e "crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']).then(v => crypto.subtle.exportKey('raw', v)).then(v => console.log(Buffer.from(v).toString('base64')))";
```

### Store your secret key

Best practices concerning the storage of your newly created secret key are to store it in an environment variable, like in a .env file for example. 

You should never hardcode your secret key in your code or store it in a public repository, so be sure to add your .env file to your .gitignore file.

Here is an example of a .env file:

```
SECRET_KEY="your-256-bits-secret-base64-encoded"
```

And how to use it in Node Runtime environment:

```javascript
import { SubtleCryptr } from 'subtle-cryptr';
const cryptr = new SubtleCryptr(process.env.SECRET_KEY);
```

### Managing your key(s)

For any given key, one of the limitations of the AES-GCM algorithm used in SubtleCryptr is to encrypt a maximum 2^39 − 256 bits of plain text, which is about 64 GiB. 

Depending on your use cases, you may need to manage multiple keys. SubtleCryptr does not provide a built-in way to manage multiple keys or key-rotation, but it could be an implementation idea for further development / packages.

## API

The `SubtleCryptr` class has the following methods:

### `encrypt(data)`

Encrypts serialized data (Uint8Array). Based on AES-GCM recommandations, the IV is randomly generated at each call and on 12 bytes-long (96-bits). 

- `serializedData` (Uint8Array): The data to encrypt. This parameter is required and can be a string, an ArrayBuffer, or an ArrayBufferView.

Returns a Promise that resolves with the encrypted data as a base64 encoded string. Result is composed of the IV (16 characters, base64 encoded) and the encrypted data (also base64 encoded), both concatenated in a single string.

### `decrypt(encryptedData)`

Decrypts the encrypted data.

- `encryptedData` (base64 encoded string): The encrypted data to decrypt. Expected to be a base64 encoded string.

Returns a Promise that resolves with the decrypted data as serialized data (Uint8Array).

### `encryptStr(str)`

Encrypts a simple string, converting the string to a Uint8Array, and using above encrypt method.

- `str` (string): The string to encrypt.

Returns a Promise that resolves with the encrypted data as a base64 encoded string. 

### `decryptStr(encryptedStr)`

Decrypts the encrypted string.

- `encryptedStr` (base64 encoded string): The encrypted data to decrypt. Expected to be a base64 encoded string.

Returns a Promise that resolves with the decrypted data as a string.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

SubtleCryptr is [ISC licensed](./LICENSE).