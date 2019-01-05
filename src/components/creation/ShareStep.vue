<template>
  <StepCard
    :stepNumber="4"
    stepTitle="Share your secret"
    :isOpen="isActive"
    :isDisabledIfInactive="isDisabledIfInactive"
    :isLast="true"
    @activate="$emit('activate')"
  >
    <p slot="description">
      Yeah! We have encrypted your secret. Send the share link and your encryption key to your buddy.
      Please use two different mediums (e.g. e-mail and iMessage) to send them.
    </p>

    <div class="fields" slot="form">
      <div class="field">
        <div class="field__title">Sharing Link</div>
        <div class="field__data">
          <div class="field__value">{{ link }}</div>
        </div>
        <div class="field__actions">
          <ActionList :actions="actions.link" />
        </div>
      </div>

      <div class="field">
        <div class="field__title">Encryption Key</div>
        <div class="field__data">
          <div class="field__value">{{ encryptionKey }}</div>
        </div>
        <div class="field__actions">
          <ActionList :actions="actions.key" />
        </div>
      </div>

      <div class="field">
        <div class="field__title">Secret</div>
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
        <BaseButton @click="$emit('delete')" btnStyle="outline" color="danger">Delete secret</BaseButton>
      </div>
      <div>
        <BaseButton @click="$emit('reset')" btnStyle="primary">Share a new secret</BaseButton>
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
   * The list of actions for secret, key, ...
   */
  private actions: { [name: string]: Action[]} = {
    key: [
      {
        icon: 'bx-copy',
        title: 'Copy to clipboard',
        click: () => { copyToClipboard(this.encryptionKey); },
      },
    ],
    link: [
      {
        icon: 'bx-copy',
        title: 'Copy to clipboard',
        click: () => { copyToClipboard(this.link); },
      },
      {
        icon: 'bx-at',
        title: 'Send by mail',
        click: () => this.sendByMail(),
      },
    ],
    secret: [
      {
        icon: 'bx-copy',
        title: 'Copy to clipboard',
        click: () => { copyToClipboard(this.secret); },
      },
    ],
  };

  /**
   * Opens the mail client including the link to send it by e-mail.
   */
  private sendByMail() {
    /* tslint:disable-next-line max-line-length */
    const mailTo = `mailto:?subject=gsalted&body=Hi%2C%0A%0AI%20want%20to%20share%20a%20secret%20with%20you%3A%0A${this.link}`;
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
}

</style>
