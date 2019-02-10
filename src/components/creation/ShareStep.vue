<template>
  <StepCard
    :stepNumber="4"
    :stepTitle="$t('SECRET_CREATION.SHARE_STEP.TITLE')"
    :isOpen="isActive"
    :isFinished="isFinished"
    :isDisabledIfInactive="isDisabledIfInactive"
    :isLast="true"
    @activate="$emit('activate')"
  >
    <p slot="description">{{ $t('SECRET_CREATION.SHARE_STEP.DESCRIPTION') }}</p>

    <div class="fields" slot="form">
      <div class="field">
        <div class="field__title">
          {{ $t('SECRET_CREATION.SHARE_STEP.FIELDS.SHARING_LINK_LABEL') }}
        </div>
        <div class="field__data">
          <div class="field__value">{{ link }}</div>
        </div>
        <div class="field__actions">
          <ActionList :actions="actions.link" />
        </div>
      </div>

      <div class="field">
        <div class="field__title">
          {{ $t('SECRET_CREATION.SHARE_STEP.FIELDS.ENCRYPTION_LINK_LABEL') }}
        </div>
        <div class="field__data">
          <div class="field__value">{{ encryptionKey }}</div>
        </div>
        <div class="field__actions">
          <ActionList :actions="actions.key" />
        </div>
      </div>

      <div class="field">
        <div class="field__title">
          {{ $t('SECRET_CREATION.SHARE_STEP.FIELDS.SECRET_LABEL') }}
        </div>
        <div class="field__data">
          <div class="field__value">
            <span v-for="i in secret.length" :key="i" class="dot">&bull;</span>
          </div>
        </div>
        <div class="field__actions">
          <ActionList :actions="actions.secret" />
        </div>
      </div>
    </div>

    <div slot="controls" class="card-controls">
      <div>
        <BaseButton @click="$emit('delete')" btnStyle="outline" color="danger">
          {{ $t('SECRET_CREATION.SHARE_STEP.DELETE') }}
        </BaseButton>
      </div>
      <div>
        <BaseButton @click="$emit('reset')" btnStyle="primary">
          {{ $t('SECRET_CREATION.SHARE_STEP.SHARE_NEW') }}
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
   * The key used to encrypt the secret.
   */
  @Prop({ required: true })
  public encryptionKey!: string;

  /**
   * The link to share the secret.
   */
  @Prop({ default: '' })
  public link!: string;

  /**
   * If the step was already finished.
   */
  @Prop({ default: false })
  public isFinished!: boolean;

  /**
   * The list of actions for secret, key, ...
   */
  private actions: { [name: string]: Action[]} = {
    key: [
      {
        icon: 'bx-copy',
        title: 'SECRET_CREATION.SHARE_STEP.ACTIONS.COPY_TO_CLIPBOARD',
        message: 'SECRET_CREATION.SHARE_STEP.ACTIONS.COPY_TO_CLIPBOARD_MSG',
        click: () => { copyToClipboard(this.encryptionKey); },
      },
    ],
    link: [
      {
        icon: 'bx-copy',
        title: 'SECRET_CREATION.SHARE_STEP.ACTIONS.COPY_TO_CLIPBOARD',
        message: 'SECRET_CREATION.SHARE_STEP.ACTIONS.COPY_TO_CLIPBOARD_MSG',
        click: () => { copyToClipboard(this.link); },
      },
      {
        icon: 'bx-at',
        title: 'SECRET_CREATION.SHARE_STEP.ACTIONS.SEND_BY_MAIL',
        message: 'SECRET_CREATION.SHARE_STEP.ACTIONS.SEND_BY_MAIL_MSG',
        click: () => this.sendByMail(),
      },
    ],
    secret: [
      {
        icon: 'bx-copy',
        title: 'SECRET_CREATION.SHARE_STEP.ACTIONS.COPY_TO_CLIPBOARD',
        message: 'SECRET_CREATION.SHARE_STEP.ACTIONS.COPY_TO_CLIPBOARD_MSG',
        click: () => { copyToClipboard(this.secret); },
      },
    ],
  };

  /**
   * Opens the mail client including the link to send it by e-mail.
   */
  private sendByMail() {
    const mailTo = this.$t('SECRET_CREATION.SHARE_STEP.ACTIONS.MAILTO_LINK', {
      link: this.link,
    }).toString();
    window.location.href = mailTo;
  }
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

  @media only screen and (max-width: 28rem) {
    flex-direction: column-reverse;
    align-items: flex-end;

    div {
      margin-bottom: space();
    }
  }
}
</style>
