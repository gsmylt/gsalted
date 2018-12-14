<template>
  <div id="app">
    <AppHeader />
    <div class="app-container">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppHeader from '@/components/widgets/AppHeader.vue';
import AppFooter from '@/components/widgets/AppFooter.vue';

@Component({
  components: { AppHeader, AppFooter },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './assets/dripicons.css';

* {
  box-sizing: border-box;
  -webkit-appearance: none;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 30px;
}

.main {
  width: 100%;
  max-width: 550px;
}

h2 {
  padding: 0;
  margin: 16px 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.text-link {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}

p {
  color: #495057;
  font-size: 1.2rem;
  line-height: 1.6rem;
}

p.small {
  color: #adb5bd;
  font-size: 1rem;
}

.form {

}

.form__group + .form__group {
  margin-top: 64px;
}

.form__controls {
  display: flex;
  margin-top: 16px;
}


.text-success {
  margin: 16px 0 32px 0;
  line-height: 1.4;
  color: #37b24d;
}

.text-error {
  margin: 16px 0 32px 0;
  line-height: 1.4;
  color: #f03e3e;
}

@media only screen and (max-width: 850px) {
  .app-container {
    padding-top: 30px;
  }
}
</style>
