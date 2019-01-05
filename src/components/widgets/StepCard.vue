<template>
  <div
    ref="card"
    class="step"
    :class="{ 'step--is-first': isFirst, 'step--is-last': isLast, 'step--is-open': isOpen, 'step--is-disabled': !isOpen && isDisabledIfInactive }">

    <div class="step__line"></div>
    <div class="step__card card">
      <a @click="!isOpen && !isDisabledIfInactive && $emit('activate')" class="card__header">
        <div class="card__number step-number" :class="{ 'step-number--is-active': isOpen }">{{ stepNumber }}</div>
        <div class="card__title">{{ stepTitle }}</div>
      </a>
      <div class="card__content">
        <div ref="main" class="card__main">
          <div class="card__description"><slot name="description" /></div>
          <div class="card__form"><slot name="form" /></div>
          <div class="card__controls"><slot name="controls" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { setTimeout } from 'timers';

@Component({
  components: {  },
})
export default class StepCard extends Vue {

  /**
   * If the step if disabled (not clickable).
   * Will only affect the component if isOpen is false.
   */
  @Prop({ default: false })
  public isDisabledIfInactive!: boolean;

  /**
   * If it's the first step of the wizard.
   */
  @Prop({ default: false })
  public isFirst!: number;

  /**
   * If it's the last step of the wizard.
   */
  @Prop({ default: false })
  public isLast!: number;

  /**
   * The number of this step.
   */
  @Prop({ required: true })
  public stepNumber!: number;

  /**
   * The title of the step
   */
  @Prop({ required: true })
  public stepTitle!: string;

  /**
   * If the card is currently open or not.
   */
  @Prop({ default: false })
  public isOpen!: boolean;

  @Watch('isOpen')
  public handleScroll(isOpen: boolean) {
    if (isOpen) {
      setTimeout(() => {
        const card = this.$refs.card as HTMLDivElement;
        card.scrollIntoView({ block: 'start',  behavior: 'smooth' });
      }, 200);
    }
  }

  /**
   * Mounted hook of Vue.
   */
  public mounted() {
    this.updateMaxHeight();
  }

  /**
   * Updated hook of Vue.
   */
  public updated() {
    this.updateMaxHeight();
  }

  /**
   * Updates the max height of the main div depending on the content.
   */
  private updateMaxHeight() {
    const mainDiv = this.$refs.main as HTMLDivElement;
    const elHeight = mainDiv.scrollHeight;
    mainDiv.style.maxHeight = this.isOpen ? `${elHeight}px` : '';
  }
}
</script>

<style lang="scss" scoped>
$duration: 300ms;

/* Step */
.step {
  position: relative;
}

.step__line {
  width: 0;
  height: calc((2 * #{space(32)}) + 10px);
  position: absolute;
  top: -1 * space(32);
  bottom: 0;
  left: space(32) + space(16);
  border-right: 1px dashed color(neutral, 400);
  z-index: 0;

  .step.step--is-first & {
    display: none;
  }

  .step.step--is-disabled & {
    border-color: color(neutral, 300);
  }
}



/* Card */
.card {
  position: relative;
  z-index: 2;
  margin: 0;
  padding: space(32);
  border-radius: radius();
  transition: all $duration ease;
  
  .step:not(.step--is-open) & {
    padding-bottom: calc(#{space(32)} - #{space(16)}); // Subtract the margin-top of .card__main
  }

  .step.step--is-open & {
    box-shadow: shadow(2);
    background-color: color(background);
  }
}

.card__header {
  display: flex;
  align-items: center;

  .step.step--is-disabled &,
  .step.step--is-open & {
    cursor: default;
  }
}

.card__number {
  flex: 0 0 auto;
  margin-right: space(12);
}

.card__details {
  flex: 0 0 auto;
}

.card__title {
  color: color(neutral, 600);
  font-size: font-size(24);
  font-weight: font-weight(medium);
  line-height: 32px;

  .step.step--is-open & {
    color: color(primary);
  }

  .step.step--is-disabled & {
    color: color(neutral, 300);
  }
}

.card__main {
  max-height: 0;
  opacity: 0;
  margin-top: space(16);
  margin-left: space(32) + space(12);
  overflow: hidden;
  // transform: scaleY(0);
  transform-origin: top center;
  transition: transform $duration ease, max-height $duration ease, opacity $duration ease;

  .step.step--is-open & {
    opacity: 1;
    transform: scaleY(1);
  }
}

.card__description {
  color: color(neutral, 500);
  line-height: 1.5;
}

.card__form {
  margin-top: space();
}

.card__controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: space();

  .btn + .btn {
    margin-left: space(12);
  }
}



/* Step Number */
.step-number {
  width: space(32);
  height: space(32);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: color(neutral, 600);
  color: color(contrast);
  font-size: font-size(21);
  font-weight: font-weight(medium);
  transition: all 200ms ease;

  .step.step--is-disabled &:not(.step-number--is-active) {
    background-color: color(neutral, 300);
  }

  &.step-number--is-active {
    background-color: color(primary);
  }
}
</style>
