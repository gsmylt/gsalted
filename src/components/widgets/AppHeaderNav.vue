<template>
  <nav class="navigation">
    <BaseButton btn-style="secondary" color="secondary" class="btn">Receive a secret</BaseButton>
    <BaseButton @click="goToSecretCreation()" btn-style="primary" color="secondary" class="btn">Share a secret</BaseButton>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BaseButton from './../base/BaseButton.vue';

@Component({
  components: { BaseButton },
})
export default class AppHeaderNav extends Vue {
  /**
   * Opens the secret creation page.
   */
  private goToSecretCreation() {
    this.$router.push({ name: 'SecretCreation' });
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  
  & + & {
    margin-left: space();
  }
}

</style>
