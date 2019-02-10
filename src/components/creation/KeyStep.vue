<template>
  <StepCard
    :stepNumber="2"
    :stepTitle="$t('SECRET_CREATION.KEY_STEP.TITLE')"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    @activate="$emit('activate')"
  >
    <p slot="description">{{ $t('SECRET_CREATION.KEY_STEP.DESCRIPTION') }}</p>
    <FormField 
      slot="form"
      :fieldValue="encryptionKey"
      @change="updateKey"
      icon="bx-key"
      :actionList="actions"
      fieldLabel="Key"
      :fieldPlaceholder="$t('SECRET_CREATION.KEY_STEP.FIELDS.KEY_PLACEHOLDER')"
      :isAlternative="true"
    />
    <BaseButton @click="$emit('next')" slot="controls" :isDisabled="!isNextEnabled" iconAfter="bx-chevron-right">
      {{ $t('SECRET_CREATION.KEY_STEP.NEXT') }}
    </BaseButton>
  </StepCard>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '@/components/widgets/widgets.types';
import { Generator } from '@/core/generator';
import BaseButton from '@/components/base/BaseButton.vue';
import StepCard from '@/components/widgets/StepCard.vue';
import FormField from '@/components/widgets/FormField.vue';

@Component({
  components: { BaseButton, FormField, StepCard },
})
export default class KeyStep extends Vue {

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
   * The current key.
   */
  @Prop({ required: true })
  public encryptionKey!: string;

  /**
   * If the step was already finished.
   */
  @Prop({ default: false })
  public isFinished!: boolean;

  /**
   * The list of actions for the key input.
   */
  private actions: Action[] = [
    {
      icon: 'bx-sync',
      title: 'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY',
      message: [
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_1',
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_2',
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_3',
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_4',
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_5',
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_6',
        'SECRET_CREATION.KEY_STEP.ACTIONS.GENERATE_NEW_KEY_MSG_7',
      ],
      click: () => { this.createNewKey(); },
    },
  ];

  /**
   * If the next button is enabled
   */
  private get isNextEnabled() {
    return this.encryptionKey.length > 0;
  }

  /**
   * Emits a change event for the given key.
   */
  private updateKey(secret: string) {
    this.$emit('keyChange', secret);
  }

  /**
   * Creates a new randomized key.
   */
  private createNewKey() {
    this.updateKey(Generator.randomWords());
  }
}
</script>

<style lang="scss" scoped>

</style>
