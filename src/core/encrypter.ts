
import { createCipher, createDecipher } from 'crypto';

const settings = {
  algorithm: 'aes-256-ctr',
};

export default class Encrypter {
  public static encrypt(secret: string, key: string, randomKey: string) {
    const cipher = createCipher(settings.algorithm, key + randomKey);
    let crypted = cipher.update(secret, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  public static decrypt(encryptedSecret: string, key: string, randomKey: string) {
    const decipher = createDecipher(settings.algorithm, key + randomKey);
    let dec = decipher.update(encryptedSecret, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
