<template>
  <header class="header container">
    <div class="header__content container-content">
      <router-link :to="{ name: 'Home' }" class="header__logo">
        <AppLogo />
      </router-link>
      <div class="header__nav">
        <AppHeaderNav />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppLogo from './AppLogo.vue';
import AppHeaderNav from './AppHeaderNav.vue';

@Component({
  components: { AppLogo, AppHeaderNav },
})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid color(neutral, 200);
  background-color: color(neutral, 100);
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  display: block;
  padding: space() 0;
  text-decoration: none;
}
</style>
