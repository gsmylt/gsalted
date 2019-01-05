<template>
  <button 
    :type="isSubmit ? 'submit' : 'button'"
    :disabled="isLoading || isDisabled"
    :class="classes"
    class="btn"
    @click="raiseClickEvent()"
  >
    <span v-if="iconBefore" class="btn__icon btn__icon--before">
      <i class="bx" :class="iconBefore"></i>
    </span>
    <span class="btn__text">
      <slot></slot>
    </span>
    <span v-if="iconAfter" class="btn__icon btn__icon--after">
      <i class="bx" :class="iconAfter"></i>
    </span>
    <div v-if="isLoading" class="btn__spinner">
      <Spinner />
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import Spinner from '@/components/widgets/Spinner.vue';

@Component({
  components: { Spinner },
})
export default class BaseButton extends Vue {

  /**
   * If the button is a submit button.
   */
  @Prop({ default: false })
  private isSubmit!: boolean;

  /**
   * The style of the button: primary, secondary, outline, link.
   */
  @Prop({ default: 'primary' })
  private btnStyle!: string;

  /**
   * The color of the button: primary, secondary, danger, light.
   */
  @Prop({ default: 'primary' })
  private color!: string;

  /**
   * The icon that should be shown before the text (default slot).
   */
  @Prop({ default: null })
  private iconBefore!: string;

  /**
   * The icon that should be shown after the text (default slot).
   */
  @Prop({ default: null })
  private iconAfter!: string;

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
  private get classes(): Array<(string|object)> {
    return [
      `btn--style-${this.btnStyle}`,
      `btn--color-${this.color}`,
      {
      'btn--is-loading': this.isLoading,
      'btn--is-disabled': this.isDisabled,
    }];
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
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: space(12) space(16);
  border: 1px solid transparent;
  outline: none;
  border-radius: radius();
  font: inherit;
  font-size: font-size();
  text-decoration: none;
  cursor: pointer;
  transition: all 180ms ease;
  white-space: nowrap;

  &.btn--is-loading {
    position: relative;
  }
}

.btn__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn__icon {
  display: flex;
  font-size: font-size(18);
  
  &.btn__icon--after {
    margin-left: space(4);
  }

  &.btn__icon--before {
    margin-right: space(4);
  }

  .btn.btn--is-loading & {
    visibility: hidden;
  }
}

.btn__text {
  .btn.btn--is-loading & {
    visibility: hidden;
  }
}

.btn--style-primary {
  &.btn--color-primary {
    border-color: color(primary);
    background-color: color(primary);
    color: color(contrast);
  }

  &.btn--color-secondary {
    border-color: color(secondary);
    background-color: color(secondary);
    color: color(contrast);
  }
}

.btn--style-secondary {
  background-color: transparent;

  &.btn--color-primary {
    border-color: color(primary);
    color: color(primary);
  }

  &.btn--color-secondary {
    border-color: color(secondary);
    color: color(secondary);
  }

  &.btn--color-light {
    border-color: color(primary, 100);
    color: color(primary, 100);
  }
}

.btn--style-outline {
  padding-left: 0;
  padding-right: 0;
  background-color: transparent;

  &.btn--color-primary {
    color: color(primary);
  }

  &.btn--color-secondary {
    color: color(secondary);
  }

  &.btn--color-light {
    color: color(primary, 100);
  }

  &.btn--color-danger {
    color: color(accent_red);
  }
}

.btn.btn--is-disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.btn.btn--is-loading {
  cursor: wait;
  opacity: 0.75;
}
</style>
