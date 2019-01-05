<template>
  <StepCard
    :stepNumber="1"
    stepTitle="Your secret"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    :isFirst="true"
    @activate="$emit('activate')"
  >
    <p slot="description">
      The secret is what you want to share with your buddy,
      be it a password or something else. Use the password we generated for you or enter your own.
    </p>
    <FormField 
      slot="form"
      :fieldValue="secret"
      @change="updateSecret"
      icon="bx-lock"
      :actionList="actions"
      fieldLabel="Secret"
      fieldPlaceholder="Enter a secret"
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
export default class SecretStep extends Vue {

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
   * The current secret.
   */
  @Prop({ required: true })
  public secret!: string;

  /**
   * If the step was already finished.
   */
  @Prop({ default: false })
  public isFinished!: boolean;

  /**
   * The list of actions for the secret input.
   */
  private actions: Action[] = [
    {
      icon: 'bx-sync',
      title: 'Generate new',
      message: 'Boom!',
      click: () => { this.createNewSecret(); },
    },
    /* TODO: Implement multiline secrets
      {
      icon: 'bx-align-middle',
      title: 'Switch the multiline',
      click: () => { },
    },*/
  ];

  /**
   * If the next button is enabled
   */
  private get isNextEnabled() {
    return this.secret.length > 0;
  }

  /**
   * Emits an event to the parent to update the secret.
   */
  private updateSecret(secret: string) {
    this.$emit('secretChange', secret);
  }

  /**
   * Creates a new random secret.
   */
  private createNewSecret() {
    this.updateSecret(Generator.password());
  }
}
</script>

<style lang="scss" scoped>


</style>
