import moment from 'moment';
import { i18n, messages } from '@/translations';
import { loadFromLocalStorage, saveToLocalStorage } from './storage';

const STORAGE_KEY = 'lang';
const DEFAULT_LANG = 'en';

export const initLanguage = () => {
  const langKey = getCurrentLang();
  setLangForAllLibs(langKey);
};

export const getCurrentLang = () => {
  const storedLang = loadFromLocalStorage(STORAGE_KEY);
  const browserLang = navigator.language ? navigator.language.substr(0, 2) : null;
  let langKey = DEFAULT_LANG;

  if (storedLang && messages[storedLang]) {
    langKey = storedLang;
  } else if (browserLang && messages[browserLang]) {
    langKey = browserLang;
  }

  return langKey;
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
