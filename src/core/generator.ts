import crypto from 'crypto';
import { wordList } from './words';

const charsets = {
  full: 'abcdefghijklmnopqrstuvwxyz#°*%&/|()=?_:.-!£§<>+;ABCDEFGHIJKLMNOP1234567890',
  limited: 'abcdefghijklmnopqrstuvwxyz_+-ABCDEFGHIJKLMNOP1234567890',
};

/**
 * Generates a random value of the given length from the charset.
 * @param charset The possible characters
 * @param length The length of the value
 * @returns The generated random value
 */
function createRandomValue(charset: string, length: number): string {
  let randomValue = '';
  while (randomValue.length < length) {
    const randIdx = Math.floor(Math.random() * charset.length);
    randomValue += charset.charAt(randIdx);
  }

  return randomValue;
}

/**
 * Class to generate random strings.
 */
export class Generator {

  /**
   * Creates a random password of the given length.
   * @param length The length of the password
   * @returns The random password
   */
  public static password(length = 16): string {
    return createRandomValue(charsets.full, length);
  }

  /**
   * Creates a random key of the given length
   * @param length The length of the random key
   * @returns The random key
   */
  public static randomKey(length = 128) {
    return createRandomValue(charsets.limited, length);
  }

  /**
   * Creates a string of random words, separated by a whitespace.
   * @param count The number of words to generate
   * @returns The string of random words
   */
  public static randomWords(count = 3) {
    const list = [];

    while (list.length < count) {
      const randIdx = Math.floor(Math.random() * wordList.length);
      list.push(wordList[randIdx]);
    }

    return list.join(' ').toLowerCase();
  }

  /**
   * Creates a hash of the key + random key.
   * @param key The key
   * @param randomKey The random key
   * @returns The generated hash
   */
  public static hash(key: string, randomKey: string): string {
    const hash = crypto.createHmac('sha512', randomKey);
    hash.update(key);
    return hash.digest('hex');
  }
}
