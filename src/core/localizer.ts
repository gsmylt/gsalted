import moment from 'moment';
import { i18n, messages } from '@/translations';
import { loadFromLocalStorage, saveToLocalStorage } from './storage';

const STORAGE_KEY = 'lang';
const DEFAULT_LANG = 'en';

export const initLanguage = () => {
  const lang = loadFromLocalStorage(STORAGE_KEY);
  const langKey = messages[lang] ? lang : DEFAULT_LANG;
  setLangForAllLibs(langKey);
};

export const changeLanguage = (key: string) => {
  const langKey = messages[key] ? key : DEFAULT_LANG;
  setLangForAllLibs(langKey);
  saveToLocalStorage(STORAGE_KEY, langKey);
};

const setLangForAllLibs = (key: string) => {
  i18n.locale = key;
  moment.locale(key);
};
