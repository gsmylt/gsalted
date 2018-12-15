import axios from 'axios';
import { Gsalt } from '@/core/gsalt';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000,
});

/**
 * Stores the given secret.
 * @param gsalt The gsalt object to use
 * @param encryptedSecret The encrypted string to use
 * @returns The id of the created secret
 */
function storeSecret(gsalt: Gsalt, encryptedSecret: any): Promise<string> {
  return instance.post('/secret', {
    secret: encryptedSecret,
    validityInSeconds: gsalt.validityInSeconds,
    hash: gsalt.getHash(),
  }).then((response) => response.data.id);
}

/**
 * Fetches the given secret.
 * @param gsalt The gsalt object
 * @returns
 */
function fetchSecret(gsalt: Gsalt): Promise<{ secret: string, validityInSeconds: number }> {
  return instance.get(`/secret/${gsalt.id}`, {
    params: {
      hash: gsalt.getHash(),
    },
  }).then((response) => ({
    secret: response.data.secret,
    validityInSeconds: response.data.validityInSeconds,
  }));
}

/**
 * Deletes the given secret.
 * @param gsalt The gsalt object
 * @returns A promise without any data
 */
function deleteSecret(gsalt: Gsalt): Promise<void> {
  return instance.delete(`/secret/${gsalt.id}`, {
    params: {
      hash: gsalt.getHash(),
    },
  }).then(() => undefined);
}

export const api = {
  secret: {
    store: storeSecret,
    fetch: fetchSecret,
    delete: deleteSecret,
  },
};
