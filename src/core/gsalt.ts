import { Generator } from './generator';
import { Encrypter } from './encrypter';

export class Gsalt {
  /**
   * The unique id of the gsalt.
   */
  public id: string | undefined = '';

  /**
   * The key of the gsalt.
   */
  public key: string = '';

  /**
   * The random key of the gsalt.
   */
  public randomKey: string = '';

  /**
   * How long the gsalt is valid.
   */
  public validityInSeconds: number = 24 * 60 * 60;

  /**
   * Constructor.
   * @param key The key of the gsalt
   * @param randomKey The random key of the gsalt, will automatically be created if omitted
   * @param id The unique id of the gsalt
   */
  constructor(key = '', randomKey = Generator.randomKey(), id?: string) {
    this.id = id;
    this.key = key;
    this.randomKey = randomKey;
  }

  /**
   * Creates the hash of the key + random key.
   * @returns The created hash value
   */
  public getHash(): string {
    return Generator.hash(this.key, this.randomKey);
  }

  /**
   * Creates the absolute link to the gsalt object.
   * The current origin will be reused.
   * The id must be set to use this method.
   * @returns The URL to the gsalt object or an empty string if the id was not set.
   */
  public createLink(): string {
    return this.id ? `${window.location.origin}/${this.id}#${this.randomKey}` : '';
  }

  /**
   * Encrypts the given secret.
   * @param secret The secret to encrypt
   */
  public encrypt(secret: string): string {
    return Encrypter.encrypt(secret, this.key, this.randomKey);
  }

  /**
   * Decrypts the given secret.
   * @param encryptedSecret The encrypted secret to decrypt.
   */
  public decrypt(encryptedSecret: string) {
    return Encrypter.decrypt(encryptedSecret, this.key, this.randomKey);
  }
}
