<template>
  <div class="hero container">
    <div class="hero__content container-content">
      <div class="hero__text">
        <h1>Sending secrets made secure.</h1>
        <p>
          From time to time you need to share a password or some other secret with your buddy. gsalted helps you to transfer secrets in a secure way.
        </p>
        <p>
          We use client-side encryption to ensure that no one else than you and your buddy can read your passwords.
        </p>
        <div>
          <BaseButton @click="goToSecretCreation()" btn-style="secondary" color="light">Let's share</BaseButton>
        </div>
      </div>
      <div class="hero__drawing"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BaseButton from '@/components/base/BaseButton.vue';

@Component({
  components: { BaseButton },
})
export default class HeroScreen extends Vue {
  /**
   * Opens the secret creation page.
   */
  private goToSecretCreation() {
    this.$router.push({ name: 'SecretCreation' });
  }
}
</script>

<style lang="scss" scoped>
.hero {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#1870af+0,1e5799+100 */
  background: #1870af; /* Old browsers */
  background: radial-gradient(ellipse at center 60%, hsl(205,76%,39%) 0%,hsl(212,67%,36%) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1870af', endColorstr='#1e5799',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.hero__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: space(96) 0;
}

.hero__text {
  width: 40%;
  flex: 0 0 auto;
  color: color(contrast);

  h1 {
    margin-bottom: space(32);
    font-size: font-size(30);
    font-weight: font-weight(medium);
  }

  p {
    color: color(primary, 200);
    font-size: font-size(20);
    line-height: 1.5;

    &:last-of-type {
      margin-bottom: space(32);
    }
  }
}

.hero__drawing {
  width: 55%;
  min-height: 500px;
  flex: 0 0 auto;
  align-self: stretch;
  background-image: url('./../../assets/auth.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
