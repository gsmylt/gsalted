<template>
  <a class="action" @click="executeAction()">
    <div class="action__icon"><i class="bx" :class="action.icon"></i></div>
    <div class="action__title">{{ action.title }}</div>
    <transition name="element">
      <div v-if="action.message && hasExecuted" class="action__message message">{{ action.message }}</div>
    </transition>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from './widgets.types';
import { setTimeout } from 'timers';

@Component({
  components: {},
})
export default class ActionButton extends Vue {

  /**
   * The current action.
   */
  @Prop({ required: true })
  public action!: Action;

  /**
   * If the action has been executed recently.
   */
  private hasExecuted = false;

  /**
   * Executes the action handler.
   */
  private executeAction() {
    if (this.hasExecuted) {
      return false;
    }

    this.hasExecuted = true;
    this.action.click();

    setTimeout(() => this.hasExecuted = false, 800);
  }
}
</script>

<style lang="scss" scoped>
/* Action */
.action {
  display: flex;
  align-items: center;
  position: relative;
  color: color(primary);
  font-size: font-size(14);
  user-select: none;

  & + & {
    margin-left: space(24);
  }
}

.action__icon {
  margin-right: space(4);

  .bx {
    display: block;
  }
}



/* Message */
.message {
  position: absolute;
  left: 50%;
  bottom: calc(100% + #{space(8)});
  border-radius: 32px;
  background-color: color(secondary, 300);
  padding: space(4) space(8);
  color: color(secondary, 800);
  font-size: font-size(12);
  font-weight: font-weight(light);
  white-space: nowrap;
  transform: translateX(-50%);

  &.element-enter-active,
  &.element-leave-active {
    transition: all .25s;
  }

  &.element-enter {
    opacity: 0;
    bottom: calc(100%);
  }

  &.element-leave-to {
    bottom: calc(100%);
    opacity: 0;
  }
}
</style>
