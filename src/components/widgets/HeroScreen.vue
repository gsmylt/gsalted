<template>
  <div class="hero container">
    <div class="hero__content container-content">
      <div class="hero__text">
        <h1 class="hero__title desktop">Sending secrets made secure.</h1>
        <p class="desktop">
          From time to time you need to share a password or some other secret with your buddy. gsalted helps you to transfer secrets in a secure way.
        </p>
        <p class="desktop">
          We use client-side encryption to ensure that no one else than you and your buddy can read your passwords.
        </p>
        <div>
          <BaseButton @click="goToSecretCreation()" btn-style="secondary" color="light">Let's share</BaseButton>
        </div>
      </div>
      <div class="hero__drawing"></div>
      <h1 class="hero__title mobile">Sending secrets made secure.</h1>
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

.hero__title {
  margin-bottom: space(32);
  color: color(contrast);
  font-size: font-size(30);
  font-weight: font-weight(medium);
  line-height: 1.2;
}

.hero__text {
  width: 40%;
  flex: 0 0 auto;
  color: color(contrast);

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

.mobile {
  display: none;
}

.desktop {
  display: block;
}

@media only screen and (max-width: 72rem) {
  .hero__text {
    width: 50%;
  }

  .hero__drawing {
    width: 45%;
  }
}

@media only screen and (max-width: 62rem) {
  .mobile { display: block; }
  .desktop { display: none; }

  .hero__content {
    flex-direction: column-reverse;
    justify-content: center;
  }

  .hero__title,
  .hero__text {
    width: auto;
  }

  .hero__drawing {
    width: 100%;
    max-width: 38rem;
    min-height: 400px;
    align-self: initial;
    margin-bottom: space(32);
    background-position: 100% center;
  }
}

@media only screen and (max-width: 38rem) {
  .hero__drawing {
    min-height: 300px;
    background-position: center;
  }
}

@media only screen and (max-width: 30rem) {
  .hero__drawing {
    min-height: 200px;
  }
}
</style>
