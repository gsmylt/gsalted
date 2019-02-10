import Vue from 'vue';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import { english } from './english';
import { Localization } from './types';

Vue.use(VueI18n);

export const messages: { [key: string]: Localization } = {
  en: english,
};

export const i18n = new VueI18n({
  locale: 'en',
  messages,
});

// Init moment.js
Object.entries(messages).forEach(([key, message]) => {
  moment.locale(key, message.TIME);
});
moment.locale('en');
