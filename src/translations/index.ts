import Vue from 'vue';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import { english } from './english';
import { Localization } from './types';
import { initLanguage } from '@/core/localizer';
import { german } from './german';

Vue.use(VueI18n);

export const messages: { [key: string]: Localization } = {
  en: english,
  de: german,
};

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

// Init moment.js
Object.entries(messages).forEach(([key, message]) => {
  moment.locale(key, message.TIME);
});

// Init language
initLanguage();
