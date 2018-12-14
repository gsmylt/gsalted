import Vue from 'vue';
import Router from 'vue-router';
import SecretCreation from '@/components/SecretCreation.vue';
import SecretView from '@/components/SecretView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'SecretCreation',
      component: SecretCreation,
    },
    {
      path: '/:id',
      name: 'SecretView',
      component: SecretView,
      props: true,
    },
  ],
});
