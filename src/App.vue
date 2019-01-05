<template>
  <div id="app">
    <router-view />
    <Toastr />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toastr from './components/widgets/Toastr.vue';

@Component({
  components: { Toastr },
})
export default class App extends Vue {}
</script>
