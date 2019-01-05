<template>
  <StepCard
    :stepNumber="2"
    stepTitle="The key for encryption"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    @activate="$emit('activate')"
  >
    <p slot="description">
      The key is used to encrypt your secret (along with a generated random key, but don't care about that).
      It should be as long as possible but easy to remember. You'll have to send it to your friend.
    </p>
    <FormField 
      slot="form"
      :fieldValue="encryptionKey"
      @change="updateKey"
      icon="bx-key"
      :actionList="actions"
      fieldLabel="Key"
      fieldPlaceholder="Enter a key"
      :isAlternative="true"
    />
    <BaseButton @click="$emit('next')" slot="controls" :isDisabled="!isNextEnabled" iconAfter="bx-chevron-right">Next</BaseButton>
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
      title: 'Generate new',
      message: 'Boom!',
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
