<template>
  <StepCard
    :stepNumber="3"
    :stepTitle="$t('SECRET_CREATION.MAGIC_STEP.TITLE')"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    @activate="$emit('activate')"
  >
    <p slot="description" v-html="$t('SECRET_CREATION.MAGIC_STEP.DESCRIPTION')"></p>

    <div v-if="showAdvancedOptions" class="advanced-options" slot="form">
      <RadioField
        :label="$t('SECRET_CREATION.MAGIC_STEP.DELETE_AUTOMATICALLY_LABEL')"
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
          {{ $t('SECRET_CREATION.MAGIC_STEP.ADVANCED_OPTIONS') }}
        </BaseButton>
      </div>
      <div>
        <BaseButton 
          iconAfter="bx-chevron-right"
          :isLoading="isLoading"
          @click="$emit('next')"
        >
          {{ $t('SECRET_CREATION.MAGIC_STEP.GENERATE_LINK') }}
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
    { label: 2, unit: 'SECRET_CREATION.MAGIC_STEP.VALIDITY.HOURS', value: 2 * 60 * 60 },
    { label: 24, unit: 'SECRET_CREATION.MAGIC_STEP.VALIDITY.HOURS', value: 24 * 60 * 60 },
    { label: 2, unit: 'SECRET_CREATION.MAGIC_STEP.VALIDITY.DAYS', value: 2 * 24 * 60 * 60 },
    { label: 1, unit: 'SECRET_CREATION.MAGIC_STEP.VALIDITY.WEEK', value: 7 * 24 * 60 * 60 },
    { label: 1, unit: 'SECRET_CREATION.MAGIC_STEP.VALIDITY.MONTH', value: 30 * 24 * 60 * 60 },
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
