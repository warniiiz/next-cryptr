import { getTimestampComposedIv } from '../src/iv-generators/timestamp.js';
import { Buffer } from 'next-buffer';

describe('Timestamp IV generator', () => {
    
  const ivUnicityTestQty = 1000000;

  test(`Check unicity by generating ${ivUnicityTestQty} IV`, () => {
    const s = new Set();
    let i;
    for (i = 0; i < ivUnicityTestQty; i++) {
      const iv = getTimestampComposedIv();
      const strIv = Buffer.from(iv).toString('base64url');
      if (s.has(strIv)) break;
      s.add(strIv);
    }
    expect(i).toBe(ivUnicityTestQty);
  });

});
