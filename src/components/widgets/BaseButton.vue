<template>
  <button 
    :type="isSubmit ? 'submit' : 'button'"
    :disabled="isLoading || isDisabled"
    :class="classes"
    class="btn"
    @click="raiseClickEvent()"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class BaseButton extends Vue {

  /**
   * If the button is a submit button.
   */
  @Prop({ default: false })
  private isSubmit!: boolean;

  /**
   * If the button should have the link style.
   */
  @Prop({ default: false })
  private linkStyle!: boolean;

  /**
   * If parent is currently loading (disabled + loading style).
   */
  @Prop({ default: false })
  private isLoading!: boolean;

  /**
   * If the button is currently disabled.
   */
  @Prop({ default: false })
  private isDisabled!: boolean;

  /**
   * Getter for the classes of the button.
   */
  private get classes(): object {
    return {
      'btn--link-style': this.linkStyle,
      'btn--is-loading': this.isLoading,
      'btn--is-disabled': this.isDisabled,
    };
  }

  /**
   * Emits the click event if the button is not disabled.
   */
  private raiseClickEvent() {
    if (!this.isDisabled && !this.isLoading) {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  margin: 0;
  padding: 8px 32px;
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: #1c7ed6;
  color: #ffffff;
  font: inherit;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn.btn--link-style {
  padding-left: 0;
  padding-right: 0;
  background-color: transparent;
  color: #1c7ed6;
}

.btn.btn--is-loading {
  background-color: rgba(28, 126, 214, 0.6);
  cursor: progress;
}

.btn.btn--is-disabled {
  background-color: rgba(28, 126, 214, 0.6);
  cursor: not-allowed;
}
</style>
