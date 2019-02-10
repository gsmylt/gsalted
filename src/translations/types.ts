import VueI18n from 'vue-i18n';

export interface Localization extends VueI18n.LocaleMessages {
  TIME: {
    [name: string]: any;
  };
}
