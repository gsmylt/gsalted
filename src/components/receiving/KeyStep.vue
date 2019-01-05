<template>
  <StepCard
    :stepNumber="1"
    stepTitle="The key for decryption"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    :isFirst="true"
    @activate="$emit('activate')"
  >
    <p slot="description">
      The key will be needed to decrypt the secret.
      Please ask your friend if you have not received the key.
      The secret cannot be decrypted without the key.
    </p>
    <FormField 
      slot="form"
      :fieldValue="decryptionKey"
      @change="updateKey"
      icon="bx-key"
      fieldLabel="Key"
      fieldPlaceholder="Enter the key"
      :isAlternative="true"
    />
    <BaseButton
      @click="$emit('next')"
      slot="controls"
      :isDisabled="!isNextEnabled"
      :isLoading="isLoading"
      iconAfter="bx-chevron-right"
    >
      Decrypt secret
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
   * The current key to decrypt the secret.
   */
  @Prop({ required: true })
  public decryptionKey!: string;

  /**
   * If the step was already finished.
   */
  @Prop({ default: false })
  public isFinished!: boolean;

  /**
   * If the secrets get currently loaded from the backend.
   */
  @Prop({ default: false })
  public isLoading = false;

  /**
   * If the next button is enabled
   */
  private get isNextEnabled() {
    return this.decryptionKey.length > 0;
  }

  /**
   * Emits a change event for the given key.
   */
  private updateKey(secret: string) {
    this.$emit('keyChange', secret);
  }
}
</script>

<style lang="scss" scoped>

</style>
