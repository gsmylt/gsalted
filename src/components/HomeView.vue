<template>
  <div>
    <AppHeader />
    <HeroScreen />
    <FeatureArea />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppHeader from './app/AppHeader.vue';
import AppFooter from './app/AppFooter.vue';
import HeroScreen from './widgets/HeroScreen.vue';
import FeatureArea from './widgets/FeatureArea.vue';

@Component({
  components: { AppHeader, AppFooter, HeroScreen, FeatureArea },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>

</style>
