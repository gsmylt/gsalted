import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/components/HomeView.vue';
import SecretCreation from '@/components/creation/SecretCreation.vue';
import SecretView from '@/components/receiving/SecretView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/share',
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
