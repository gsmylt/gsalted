<template>
  <div class="toasts">
    <transition-group name="list" tag="div">
      <div
        v-for="toast of toasts"
        :key="toast.id"
        class="toast"
        :class="{
          'toast--info': toast.type == messageTypes.INFO,
          'toast--success': toast.type == messageTypes.SUCCESS,
          'toast--warning': toast.type == messageTypes.WARNING,
          'toast--error': toast.type == messageTypes.ERROR,
        }"
      >
        {{ $t(toast.message) }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Toast, MessageType } from '@/store/types';

@Component
export default class Toastr extends Vue {

  /**
   * The list of possible message types.
   */
  private messageTypes = MessageType;

  /**
   * The list of active toast messages.
   */
  private get toasts(): Toast[] {
    return this.$store.state.toasts;
  }
}
</script>

<style lang="scss" scoped>
.toasts {
  position: fixed;
  top: space(32);
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
}

.toast {
  padding: 0 space(12);
  box-shadow: shadow(3);
  border-radius: radius();
  font-size: font-size(14);
  font-weight: font-weight(medium);
  line-height: 2rem;
  overflow: hidden;
  white-space: nowrap;

  & + & {
    margin-top: space(16);
  }

  &.toast--info {
    background-color: color(primary, 800);
    color: color(primary, 200);
  }

  &.toast--success {
    background-color: color(accent_cyon, 400);
    color: color(accent_cyon, 100);
  }

  &.toast--warning {
    background-color: color(secondary, 500);
    color: color(secondary, 100);
  }

  &.toast--error {
    background-color: color(accent_red, 300);
    color: color(accent_red, 100);
  }
}

.list-enter-active,
.list-leave-active {
  max-height: 2rem;
  transition: all .5s;
}

.list-enter,
.list-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-1rem) scale(0.1);
}
</style>
