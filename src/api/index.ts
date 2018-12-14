import axios from 'axios';
import { Secret } from '@/core/secret';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000,
});

function storeSecret(secret: Secret, encryptedSecret: any) {
  return instance.post('/secret', {
    secret: encryptedSecret,
    hash: secret.getHash(),
  }).then((response) => response.data);
}

function fetchSecret(secret: Secret) {
  return instance.get(`/secret/${secret.getId()}`, {
    params: {
      hash: secret.getHash(),
    },
  }).then((response) => response.data);
}

function deleteSecret(secret: Secret) {
  return instance.delete(`/secret/${secret.getId()}`, {
    params: {
      hash: secret.getHash(),
    },
  }).then((response) => response.data);
}

export default {
  storeSecret,
  fetchSecret,
  deleteSecret,
};
