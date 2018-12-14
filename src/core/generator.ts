import crypto from 'crypto';
import { wordList } from './words';

const charsets = {
  full: 'abcdefghijklmnopqrstuvwxyz#°*%&/|()=?_:.-!£§<>+;ABCDEFGHIJKLMNOP1234567890',
  limited: 'abcdefghijklmnopqrstuvwxyz_+-ABCDEFGHIJKLMNOP1234567890',
};

function createRandomValue(charset: string, length: number) {
  let randomValue = '';
  while (randomValue.length < length) {
    const randIdx = Math.floor(Math.random() * charset.length);
    randomValue += charset.charAt(randIdx);
  }

  return randomValue;
}

export default class Generator {
  public static password(length = 16) {
    return createRandomValue(charsets.full, length);
  }

  public static randomKey(length = 48) {
    return createRandomValue(charsets.limited, length);
  }

  public static randomWords(count = 3) {
    const list = [];

    while (list.length < count) {
      const randIdx = Math.floor(Math.random() * wordList.length);
      list.push(wordList[randIdx]);
    }

    return list.join(' ').toLowerCase();
  }

  public static hash(key: string, randomKey: string) {
    const hash = crypto.createHmac('sha512', randomKey);
    hash.update(key);
    return hash.digest('hex');
  }
}
