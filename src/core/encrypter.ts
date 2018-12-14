
import { createCipher, createDecipher } from 'crypto';
const settings = {
  algorithm: 'aes-256-ctr',
};

/**
 * Encrypted class to encrypt and decrypt secrets.
 */
export class Encrypter {
  /**
   * Encrypts the given secret.
   * @param secret The secret to encrypt
   * @param key The key used to encrypt the secret
   * @param randomKey The random key used to encrypt the secret
   * @returns The encrypted secret
   */
  public static encrypt(secret: string, key: string, randomKey: string): string {
    const cipher = createCipher(settings.algorithm, key + randomKey);
    let crypted = cipher.update(secret, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  /**
   * Decrypts the given secret.
   * @param encryptedSecret The encrypted secret to decrypt.
   * @param key The key that was used to encrypt the secret
   * @param randomKey The randomKey that was used to encrypt the secret.
   * @returns The decrypted secret
   */
  public static decrypt(encryptedSecret: string, key: string, randomKey: string): string {
    const decipher = createDecipher(settings.algorithm, key + randomKey);
    let dec = decipher.update(encryptedSecret, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
