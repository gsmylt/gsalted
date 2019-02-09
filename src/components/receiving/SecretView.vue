<template>
  <AppLayout :has-background="true" class="layout">
    <AppHeader />
    <div class="container">
      <div class="container-content">
        <div class="card-container">
          
          <KeyStep
            :isDisabledIfInactive="state.currentStep === 2"
            :isActive="state.currentStep === 1"
            :decryptionKey="gsalt.key"
            :isLoading="state.isLoading"
            @keyChange="updateKey"
            @next="loadSecret()" />

          <SecretStep
            :isDisabledIfInactive="state.currentStep === 1"
            :isActive="state.currentStep === 2"
            :secret="secret"
            :validityInSeconds="encrypted.validityInSeconds"
            :isDeleted="state.isDeleted"
            @delete="deleteSecret()"
            @new="createNewSecret()" />

        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { api } from '@/api';
import { Gsalt } from '@/core/gsalt';
import { Generator } from '@/core/generator';
import { MessageType } from '@/store/types';
import AppLayout from './../app/AppLayout.vue';
import AppHeader from './../app/AppHeader.vue';
import AppFooter from './../app/AppFooter.vue';
import KeyStep from './KeyStep.vue';
import SecretStep from './SecretStep.vue';

@Component({
  components: { AppLayout, AppHeader, AppFooter, KeyStep, SecretStep },
})
export default class SecretView extends Vue {

  /**
   * The id of the secret.
   */
  @Prop({ required: true })
  public id!: string;

  /**
   * The gsalt object.
   */
  private gsalt = new Gsalt();

  /**
   * The encrypted secret object, after it has been fetched from the backend.
   */
  private encrypted = {
    secret: '',
    validityInSeconds: 0,
  };

  /**
   * The current state.
   */
  private state = {
    currentStep: 1,
    isLoading: false,
    isDeleted: false,
    isDecrypted: false,
  };

  /**
   * The date when the secret gets deleted.
   */
  private get deletionDate() {
    const now = new Date();
    now.setSeconds(now.getSeconds() + this.encrypted.validityInSeconds);
    return now;
  }

  /**
   * Getter for the decrypted secret.
   * @returns The encrypted secret or null if it's not available
   */
  private get secret(): string | null {
    if (this.encrypted) {
      return this.gsalt.decrypt(this.encrypted.secret);
    }
    return null;
  }

  /**
   * Checks if the description is possible.
   */
  private get isSecretDecryptionEnabled() {
    return (
      this.gsalt.key &&
      this.gsalt.id &&
      this.state.isLoading === false &&
      this.state.isDeleted === false
    );
  }

  /**
   * Mounted Hook of Vue.
   */
  private mounted() {
    const randomKey = window.location.hash.substr(1);
    this.gsalt = new Gsalt('', randomKey, this.id);
  }

  /**
   * Updates the key.
   * @param key The new key
   */
  private updateKey(key: string) {
    this.gsalt.key = key;
  }

  /**
   * Opens the secret creation page.
   */
  private createNewSecret() {
    this.$router.push({ name: 'SecretCreation' });
  }

  /**
   * Loads the encrypted secret from the API.
   */
   private loadSecret() {
    this.state.isLoading = true;
    api.secret.fetch(this.gsalt).then((data) => {
      this.state.currentStep = 2;
      this.encrypted = data;
      this.state.isLoading = false;
      this.state.isDecrypted = true;
    }).catch(() => {
      this.state.isLoading = false;
      this.$store.commit('toast', {
        type: MessageType.ERROR,
        message: 'Oh no, decryption failed. Please check your key!',
      });
    });
  }

  /**
   * Deletes the secret from the server.
   */
  private deleteSecret() {
    api.secret.delete(this.gsalt).then(() => {
      this.state.isDeleted = true;
    });

    this.$store.commit('toast', {
      type: MessageType.SUCCESS,
      message: 'We deleted your secret!',
    });
  }
}
</script>

<style lang="scss" scoped>

</style>