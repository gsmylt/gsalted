import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import './assets/styling/styling.scss';
import store from './store/index';
import { i18n } from './translations';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

