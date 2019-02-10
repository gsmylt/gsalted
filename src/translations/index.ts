import Vue from 'vue';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import { english } from './english';
import { Localization, Locale } from './types';
import { initLanguage } from '@/core/localizer';
import { german } from './german';

Vue.use(VueI18n);

export const locales: Locale[] = [
  {
    key: 'en',
    name: 'English',
    messages: english,
  },
  {
    key: 'de',
    name: 'Deutsch',
    messages: german,
  },
];

export const messages: { [key: string]: Localization } = locales.reduce((obj, locale) => {
  return {
    ...obj,
    [locale.key]: locale.messages,
  };
}, {});

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

// Init moment.js
locales.forEach((locale) => {
  moment.locale(locale.key, locale.messages.TIME);
});

// Init language
initLanguage();
