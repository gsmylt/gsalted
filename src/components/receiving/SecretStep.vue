<template>
  <StepCard
    :stepNumber="2"
    :stepTitle="$t('SECRET_RECEIVING.SECRET_STEP.TITLE')"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    :isLast="true"
    @activate="$emit('activate')"
  >
    <p slot="description">
      {{ $t('SECRET_RECEIVING.SECRET_STEP.DESCRIPTION') }}
    </p>

    <div slot="form">
      <div class="fields">
        <div class="field">
          <div class="field__title">
            {{ $t('SECRET_RECEIVING.SECRET_STEP.FIELDS.SECRET_LABEL') }}
          </div>
          <div class="field__data">
            <div v-if="showSecret" class="field__value">
              {{ secret }}
            </div>
            <div v-else class="field__value">
              <span v-for="i in secret.length" :key="i" class="dot">&bull;</span>
            </div>
          </div>
          <div class="field__actions">
            <ActionList :actions="actions" />
          </div>
        </div>
      </div>
      <div v-if="!isDeleted" class="details">
        <p>
          {{ $t('SECRET_RECEIVING.SECRET_STEP.DELETE_INFO', { validity: validity }) }}
        </p>
      </div>
    </div>

    <div slot="controls" class="card-controls">
      <div>
        <BaseButton v-if="!isDeleted" @click="$emit('delete')" btnStyle="outline" color="danger">
          {{ $t('SECRET_RECEIVING.SECRET_STEP.DELETE_SECRET') }}
        </BaseButton>
      </div>
      <div>
        <BaseButton @click="$emit('new')" btnStyle="primary">
          {{ $t('SECRET_RECEIVING.SECRET_STEP.SHARE_NEW_SECRET') }}
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
import ActionList from '@/components/widgets/ActionList.vue';
import { copyToClipboard } from '@/core/utility';
import moment from 'moment';

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
   * The validity of the secret in seconds.
   */
  @Prop({ default: 0 })
  public validityInSeconds!: number;

  /**
   * If the secret is shown (instead of dots).
   */
  private showSecret = false;

  /**
   * The list of actions for the secret.
   */
  private actions: Action[] = [
    {
      icon: 'bx-copy',
      title: 'SECRET_RECEIVING.SECRET_STEP.ACTIONS.COPY_TO_CLIPBOARD',
      message: 'SECRET_RECEIVING.SECRET_STEP.ACTIONS.COPY_TO_CLIPBOARD_MSG',
      click: () => copyToClipboard(this.secret),
    },
    {
      icon: 'bx-show',
      title: 'SECRET_RECEIVING.SECRET_STEP.ACTIONS.TOGGLE_VISIBILITY',
      click: () => this.toggleSecretVisibility(),
    },
  ];

  /**
   * Gets the validity as a string, e.g. "in 1 hour".
   */
  private get validity() {
    return moment.duration(this.validityInSeconds, 'seconds').humanize();
  }

  /**
   * Toggles the visibility of the secret.
   */
  private toggleSecretVisibility() {
    this.showSecret = !this.showSecret;
  }
}
</script>

<style lang="scss" scoped>
/* Fields */
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
  font-family: font(mono);
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

/* Details */
.details {
  margin-top: space(32);
  color: color(neutral, 400);
  font-size: font-size(14);
}


/* Card Controls */
.card-controls {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  margin-top: space(16);
}
</style>
