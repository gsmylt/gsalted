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
            @keyChange="updateKey"
            @next="loadSecret()" />

          <SecretStep
            :isDisabledIfInactive="state.currentStep === 1"
            :isActive="state.currentStep === 2"
            :secret="secret"
            :isDeleted="state.isDeleted"
            @delete="deleteSecret()"
            @new="createNewSecret()" />

        </div>
      </div>
    </div>
  </AppLayout>

  <!--
  <div class="main secret-vue">
    <form class="form" @submit.prevent="loadSecret()">
      <div class="form__group">
        <h2>1. We have a secret for you</h2>
        <p>
          Yeah, someone wants to share a secret with you.
        </p>
      </div>

      <div class="form__group">
        <h2>2. Enter your key</h2>
        <p v-if="!state.isDecrypted">
          Your buddy should have sent you a key.
          Please enter it here so we can find out what the secret is.
        </p>
        <FormField 
          v-model="gsalt.key"
          icon="dripicons-lock"
          fieldLabel="Key"
          fieldPlaceholder="Enter the key"
          :isReadonly="state.isDecrypted"
          :isCopyable="state.isDecrypted"
          :isAlternative="true" />
      </div>

      <div class="form__group">
        <h2>3. Get your secret</h2>
        <div v-if="!state.isDecrypted">
          <p>
            Now it's time to decrypt the secret.
          </p>
          <p class="text-error" v-if="state.isError">
            Uups, we couldn't decrypt the secret.
            Please check the entered key and try it again.
            For security reasons, we'll delete the secret automatically after a few tries.
          </p>
        </div>
        <div v-else>
          <p>
            Yeah, here is your secret:
          </p>
          <FormField 
            v-model="secret"
            icon="dripicons-jewel"
            fieldLabel="Secret"
            :isReadonly="state.isDecrypted"
            :isCopyable="state.isDecrypted"
            :isAlternative="true" />
          <p class="small" v-if="!state.isDeleted">
            We'll automatically delete your secret
            <timeago :datetime="deletionDate"></timeago>. <br />You can
            <a class="text-link" @click="deleteSecret()">delete it right now</a> if you want.
          </p>
          <p class="text-success" v-else>
            We've deleted your secret from our server.
          </p>
        </div>
      </div>

      <div class="form__controls form__controls--columned">
        <BaseButton 
          v-if="!state.isDecrypted"
          :isLoading="state.isLoading"
          :isDisabled="!isSecretDecryptionEnabled"
          :isSubmit="true"
        >
          Decrypt Secret
        </BaseButton>
      </div>
    </form>
  </div>
  -->
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { api } from '@/api';
import { Gsalt } from '@/core/gsalt';
import { Generator } from '@/core/generator';
import AppLayout from './../app/AppLayout.vue';
import AppHeader from './../app/AppHeader.vue';
import AppFooter from './../app/AppFooter.vue';
import KeyStep from './KeyStep.vue';
import SecretStep from './SecretStep.vue';
import { MessageType } from '@/store/types';

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
    isError: false,
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
      this.state.isError = false;
      this.state.isDecrypted = true;
    }).catch(() => {
      this.state.isLoading = false;
      this.state.isError = true;
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
    })
  }
}
</script>

<style lang="scss" scoped>

</style>