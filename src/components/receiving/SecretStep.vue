<template>
  <StepCard
    :stepNumber="2"
    stepTitle="Get the secret"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    :isLast="true"
    @activate="$emit('activate')"
  >
    <p slot="description">
      Yeah! We have successfully decrypted the secret.
    </p>

    <div class="fields" slot="form">
      <div class="field">
        <div class="field__title">Secret</div>
        <div class="field__data">
          <div class="field__value">
            <span v-for="i in secret.length" :key="i" class="dot">&bull;</span>
          </div>
        </div>
        <div class="field__actions">
          <ActionList :actions="actions" />
        </div>
      </div>
    </div>

    <div slot="controls" class="card-controls">
      <div>
        <BaseButton v-if="!isDeleted" @click="$emit('delete')" btnStyle="outline" color="danger">Delete secret</BaseButton>
      </div>
      <div>
        <BaseButton @click="$emit('new')" btnStyle="primary">Share your own secret</BaseButton>
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
import ActionList from '@/components/widgets/ActionList.vue';
import { copyToClipboard } from '@/core/utility';

@Component({
  components: { BaseButton, ActionList, StepCard },
})
export default class ShareStep extends Vue {

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
   * The secret to share.
   */
  @Prop({ required: true })
  public secret!: string;

  /**
   * If the secret was deleted.
   */
  @Prop({ default: false })
  public isDeleted!: boolean;

  /**
   * If the step was already finished.
   */
  @Prop({ default: false })
  public isFinished!: boolean;

  /**
   * The list of actions for the secret.
   */
  private actions: Action[] = [
    {
      icon: 'bx-copy',
      title: 'Copy to clipboard',
      message: 'Copied',
      click: () => { copyToClipboard(this.secret); },
    },
  ];
}
</script>

<style lang="scss" scoped>
.fields {
  margin-top: space(32);
}

.field {
  & + & {
    margin-top: space(32);
  }
}

.field__title {
  margin-bottom: space(8);
  color: color(neutral, 600);
  font-weight: font-weight(medium);
}

.field__data {
  padding: space(8);
  border-radius: radius();
  background-color: color(primary, 100);
}

.field__value {
  color: color(primary, 700);
  line-height: 1.5;
  word-break: break-all;

  .dot {
    display: inline-block;
    font-weight: font-weight(bold);
    user-select: none;

    & + .dot {
      margin-left: space(4);
    }
  }
}

.field__actions {
  margin-top: space(8);
}

.card-controls {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  margin-top: space(16);
}
</style>
