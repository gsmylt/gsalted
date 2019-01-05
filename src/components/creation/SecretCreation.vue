<template>
  <AppLayout :has-background="true" class="layout">
    <AppHeader />
    
    <div class="container">
      <div class="container-content">

        <div class="secret-creation">
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

@Component({
  components: { AppLayout, AppHeader, AppFooter, SecretStep, KeyStep, MagicStep, ShareStep },
})
export default class SecretCreation extends Vue {

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
    isError: false,
    isLoading: false,
    isGenerated: false,
    isDeleted: false,
  };

  /**
   * Getter for the link of the gsalt object.
   */
  private get link() {
    return this.gsalt.createLink();
  }

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
   * Resets the current form.
   */
  private reset() {
    this.state.currentStep = 1;
    this.state.isGenerated = false;
    this.state.isError = false;
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
    this.state.isError = false;

    const encrypted = this.gsalt.encrypt(this.secret);

    api.secret.store(this.gsalt, encrypted).then((id) => {
      this.gsalt.id = id;
      this.state.isLoading = false;
      this.state.isGenerated = true;
      this.state.isError = false;
      this.activateStep(4);
    }).catch(() => {
      this.state.isLoading = false;
      this.state.isGenerated = false;
      this.state.isError = true;
    });
  }

  /**
   * Deletes the current secret from the server.
   */
  private deleteSecret() {
    api.secret.delete(this.gsalt);
    this.state.isDeleted = true;
    this.reset();
  }
}
</script>

<style lang="scss" scoped>
.secret-creation {
  width: 100%;
  max-width: 790px;
  margin: 0 auto;
  padding: space(96) 0;
}
</style>