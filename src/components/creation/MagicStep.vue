<template>
  <StepCard
    :stepNumber="3"
    stepTitle="Do the magic"
    :isOpen="isActive"
    :isDisabledIfInactive="isDisabledIfInactive"
    @activate="$emit('activate')"
  >
    <p slot="description">
      Are you ready to share your secret? We'll encrypt your secret and upload it into the cloud <i class="bx bx-cloud"></i>.
      We then provide you a unique link that you can share with your buddy.
    </p>
    <BaseButton 
      slot="controls"
      iconAfter="bx-chevron-right"
      :isLoading="isLoading "
      @click="$emit('next')"
    >
      Generate link
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
   * If the assistant is currently loading.
   */
  @Prop({ default: false })
  public isLoading!: boolean;
}
</script>

<style lang="scss" scoped>
</style>
