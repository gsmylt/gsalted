import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueTimeago from 'vue-timeago';

Vue.config.productionTip = false;

Vue.use(VueTimeago);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
