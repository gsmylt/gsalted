<template>
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Spinner extends Vue {}
</script>

<style lang="scss" scoped>
.lds-ring {
  display: block;
  position: relative;
  width: space(24);
  height: space(24);
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: space(24);
  height: space(24);
  border: 1px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
