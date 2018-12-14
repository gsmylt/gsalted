import Generator from './generator';
import Encrypter from './encrypter';

export class Secret {
  private id: string | undefined = '';
  private key: string = '';
  private randomKey: string = '';

  constructor(key = '', randomKey = Generator.randomKey(), id?: string) {
    this.id = id;
    this.key = key;
    this.randomKey = randomKey;
  }

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public setKey(key: string) {
    this.key = key;
    return this;
  }

  public getRandomKey() {
    return this.randomKey;
  }

  public getHash() {
    return Generator.hash(this.key, this.randomKey);
  }

  public getLink() {
    return `${window.location.origin}/${this.id}#${this.randomKey}`;
  }

  public encrypt(secret: string) {
    return Encrypter.encrypt(secret, this.key, this.randomKey);
  }

  public decrypt(encryptedSecret: string) {
    return Encrypter.decrypt(encryptedSecret, this.key, this.randomKey);
  }
}
