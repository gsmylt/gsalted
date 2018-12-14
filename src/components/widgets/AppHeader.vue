<template>
  <div class="app-header">
    <router-link :to="{ name: 'SecretCreation' }" class="app-logo">
      <div class="app-logo__title">gsalted</div>
      <div class="app-logo__dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 32px;
}

.app-logo {
  display: flex;
  align-items: flex-end;
  margin: -8px -16px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: rgba(255,255,255, 0.9);
  -webkit-backdrop-filter: blur(4px);
  text-decoration: none;
}

.app-logo__dots {
  display: flex;
  align-items: flex-end;
  margin-bottom: 4px;
}

.app-logo__dots div {
  width: 5px;
  height: 5px;
  display: block;
  border-radius: 100%;
}

.app-logo__dots div:nth-child(1) { background-color: #1c7ed6; margin-left: 4px; }
.app-logo__dots div:nth-child(2) { background-color: #f03e3e; margin-left: 4px; }
.app-logo__dots div:nth-child(3) { background-color: #0ca678; margin-left: 4px; }

.app-logo__title {
  color: #495057;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1;
}

@media only screen and (max-width: 850px) {
  .app-header {
    display: flex;
    justify-content: center;
    justify-items: center;
    position: inherit;
  }
}

</style>
