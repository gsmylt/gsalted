<template>
  <AppLayout :has-background="true" class="layout">
    <AppHeader />
    
    <div class="container">
      <div class="container-content">

        <div class="card-container">
          <SecretStep
            :isDisabledIfInactive="state.currentStep === 4 || this.state.isLoading"
            :isActive="state.currentStep === 1"
            :isFinished="state.currentStep > 1"
            :secret="secret"
            @secretChange="updateSecret"
            @activate="activateStep(1)"
            @next="activateStep(2)"/>

          <KeyStep
            :isDisabledIfInactive="[1,4].includes(state.currentStep) || this.state.isLoading"
            :isActive="state.currentStep === 2"
            :isFinished="state.currentStep > 2"
            :encryptionKey="gsalt.key"
            @keyChange="updateKey"
            @activate="activateStep(2)"
            @next="activateStep(3)" />

          <MagicStep
            :isDisabledIfInactive="true"
            :isActive="state.currentStep === 3"
            :isFinished="state.currentStep > 3"
            :isLoading="state.isLoading"
            :validityInSeconds="gsalt.validityInSeconds"
            @changeValidity="updateValidity"
            @activate="activateStep(3)"
            @next="createLink()" />

          <ShareStep
            :isDisabledIfInactive="true"
            :isActive="state.currentStep === 4"
            :isFinished="state.currentStep > 4"
            :secret="secret"
            :encryptionKey="gsalt.key"
            :link="link"
            @activate="activateStep(4)"
            @delete="deleteSecret()"
            @reset="reset()" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { api } from '@/api';
import { Gsalt } from '@/core/gsalt';
import { Generator } from '@/core/generator';
import AppLayout from './../app/AppLayout.vue';
import AppHeader from './../app/AppHeader.vue';
import AppFooter from './../app/AppFooter.vue';
import SecretStep from './SecretStep.vue';
import KeyStep from './KeyStep.vue';
import MagicStep from './MagicStep.vue';
import ShareStep from './ShareStep.vue';
import { Toast, MessageType } from '@/store/types';
import { setTimeout } from 'timers';

@Component({
  components: { AppLayout, AppHeader, AppFooter, SecretStep, KeyStep, MagicStep, ShareStep },
})
export default class SecretCreation extends Vue {

  /**
   * Getter for the link of the gsalt object.
   */
  private get link() {
    return this.gsalt.createLink();
  }

  /**
   * The current secret that should be encrypted.
   */
  private secret = Generator.password();

  /**
   * The gsalt object, containing the key, random key and link.
   */
  private gsalt = new Gsalt(Generator.randomWords());

  /**
   * The current state.
   */
  private state = {
    currentStep: 1,
    isLoading: false,
    isGenerated: false,
    isDeleted: false,
  };

  /**
   * Updates the secret.
   * @param secret The new secret
   */
  private updateSecret(secret: string) {
    this.secret = secret;
  }

  /**
   * Updates the key.
   * @param key The new key
   */
  private updateKey(key: string) {
    this.gsalt.key = key;
  }

  /**
   * Sets the given state as active.
   * @param newStep The number of the new state
   */
  private activateStep(newStep: number) {
    this.state.currentStep = newStep;
  }

  /**
   * Updates the validity of the gsalt.
   */
  private updateValidity(value: number) {
    this.gsalt.validityInSeconds = value;
  }

  /**
   * Resets the current form.
   */
  private reset() {
    this.state.currentStep = 1;
    this.state.isGenerated = false;
    this.state.isLoading = false;
    this.state.isDeleted = false;
    this.gsalt = new Gsalt();
    this.secret = Generator.password();
    this.gsalt.key = Generator.randomWords();
  }

  /**
   * Creates the share link.
   */
  private createLink() {
    this.storeSecret();
  }

  /**
   * Stores the secret and shows the URL
   */
  private storeSecret() {
    this.state.isDeleted = false;
    this.state.isLoading = true;

    const encrypted = this.gsalt.encrypt(this.secret);

    api.secret.store(this.gsalt, encrypted).then((id) => {
      this.gsalt.id = id;
      this.state.isLoading = false;
      this.state.isGenerated = true;
      this.activateStep(4);
    }).catch(() => {
      this.state.isLoading = false;
      this.state.isGenerated = false;
      this.$store.commit('toast', {
        type: MessageType.ERROR,
        message: 'SECRET_CREATION.SAVE_ERROR_MSG',
      });
    });
  }

  /**
   * Deletes the current secret from the server.
   */
  private deleteSecret() {
    api.secret.delete(this.gsalt);
    this.reset();
    setTimeout(() => {
      this.$store.commit('toast', {
        message: 'SECRET_CREATION.DELETE_SUCCESS_MSG',
        type: MessageType.SUCCESS,
      } as Toast);
    }, 500);
  }
}
</script>

<style lang="scss" scoped>

</style>