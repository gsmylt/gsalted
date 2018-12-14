<template>
  <div class="app-footer">
    <div>
      Made with <i class="dripicons-heart"></i> in Lucerne, Switzerland &middot;
      <a href="https://gsmylt.com" target="_blank" class="text-link">gsmylt</a> &middot;
      <a href="https://gsmylt.com/gsalted" target="_blank" class="text-link">About</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {}
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  color: #78838e;
  font-size: 0.875rem;
}
</style>
