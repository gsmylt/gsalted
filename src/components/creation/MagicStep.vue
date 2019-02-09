<template>
  <StepCard
    :stepNumber="3"
    stepTitle="Do the magic"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    @activate="$emit('activate')"
  >
    <p slot="description">
      Are you ready to share your secret? We'll encrypt your secret and upload it into the cloud <i class="bx bx-cloud"></i>.
      We then provide you a unique link that you can share with your buddy.
    </p>

    <div v-if="showAdvancedOptions" class="advanced-options" slot="form">
      <RadioField
        label="Delete automatically"
        :options="validityOptions"
        :value="validityInSeconds"
        @change="changeValidity" />
    </div>

    <div slot="controls" class="card-controls">
      <div>
        <BaseButton 
          v-show="!showAdvancedOptions"
          btnStyle="outline"
          @click="showAdvancedOptions = true"
        >
          Advanced options
        </BaseButton>
      </div>
      <div>
        <BaseButton 
          iconAfter="bx-chevron-right"
          :isLoading="isLoading"
          @click="$emit('next')"
        >
          Generate link
        </BaseButton>
      </div>
    </div>
  </StepCard>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '@/components/widgets/widgets.types';
import { Generator } from '@/core/generator';
import BaseButton from '@/components/base/BaseButton.vue';
import StepCard from '@/components/widgets/StepCard.vue';
import FormField from '@/components/widgets/FormField.vue';
import RadioField from '@/components/widgets/RadioField.vue';

@Component({
  components: { BaseButton, FormField, StepCard, RadioField },
})
export default class MagicStep extends Vue {

  /**
   * If the step if disabled (not clickable).
   * Will only affect the component if isActive is false.
   */
  @Prop({ default: false })
  public isDisabledIfInactive!: boolean;

  /**
   * If the step is active or not.
   */
  @Prop({ default: false })
  public isActive!: boolean;

  /**
   * If the step was already finished.
   */
  @Prop({ default: false })
  public isFinished!: boolean;

  /**
   * If the assistant is currently loading.
   */
  @Prop({ default: false })
  public isLoading!: boolean;

  /**
   * The validity of the secret in seconds.
   */
  @Prop({ required: true })
  public validityInSeconds!: number;

  /**
   * If the advanced options should be shown.
   */
  private showAdvancedOptions = false;

  /**
   * The list of options for the validity of the secret.
   */
  private validityOptions = [
    { label: '2', unit: 'hours', value: 2 * 60 * 60 },
    { label: '24', unit: 'hours', value: 24 * 60 * 60 },
    { label: '2', unit: 'days', value: 2 * 24 * 60 * 60 },
    { label: '1', unit: 'week', value: 7 * 24 * 60 * 60 },
    { label: '1', unit: 'month', value: 30 * 24 * 60 * 60 },
  ];

  /**
   * Emits an event to update the validity.
   */
  private changeValidity(value: number) {
    this.$emit('changeValidity', value);
  }
}
</script>

<style lang="scss" scoped>
.advanced-options {
  margin: space(32) 0;
}

.card-controls {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 28rem) {
    flex-direction: column;
    align-items: flex-end;

    div + div {
      margin-top: space();
    }
  }
}

</style>
