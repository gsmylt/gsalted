import VueI18n from 'vue-i18n';

export interface Locale {
  key: string;
  name: string;
  messages: Localization;
}

export interface Localization extends VueI18n.LocaleMessages {
  TIME: {
    [name: string]: any;
  };
}
