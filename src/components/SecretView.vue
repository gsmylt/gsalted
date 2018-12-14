<template>
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
        <FormField v-model="key"
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
          <FormField v-model="secretText"
              icon="dripicons-jewel"
              fieldLabel="Secret"
              :isReadonly="state.isDecrypted"
              :isCopyable="state.isDecrypted"
              :isAlternative="true" />
          <p class="small" v-if="!state.isDeleted">
            We'll automatically delete your secret after 24 hours. <br />You can
            <a class="text-link" @click="deleteSecret()">delete it right now</a> if you want.
          </p>
          <p class="text-success" v-else>
            We've deleted your secret from our server.
          </p>
        </div>
      </div>

      <div class="form__controls form__controls--columned">
        <BaseButton v-if="!state.isDecrypted"
                     :isLoading="state.isLoading"
                     :isDisabled="!isSecretDecryptionEnabled"
                     :isSubmit="true">
            Decrypt Secret
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import core from '@/core';
import api from '@/api';

import FormField from './widgets/FormField.vue';
import BaseButton from './widgets/BaseButton.vue';

@Component({
  components: { FormField, BaseButton },
})
export default class SecretView extends Vue {

  @Prop({ required: true })
  public id!: string;

  private key: string = '';
  private randomKey: string = window.location.hash.substr(1);
  private secretText: string | null = null;
  private state = {
    isError: false,
    isLoading: false,
    isDeleted: false,
    isDecrypted: false,
  };

  private get isSecretDecryptionEnabled() {
    return (
      !(this.key.length === 0 ||
      this.secretText !== null ||
      this.state.isLoading ||
      this.state.isDeleted)
    );
  }

   private loadSecret() {
    if (!this.isSecretDecryptionEnabled) {
      return;
    }

    this.state.isLoading = true;

    const secret = new core.Secret(this.key, this.randomKey, this.id);
    api.fetchSecret(secret).then((data) => {
      this.secretText = secret.decrypt(data.secret);
      this.state.isLoading = false;
      this.state.isError = false;
      this.state.isDecrypted = true;
    }).catch(() => {
      this.state.isLoading = false;
      this.state.isError = true;
    });
  }

  private deleteSecret() {
    const secret = new core.Secret(this.key, this.randomKey, this.id);
    api.deleteSecret(secret);
    this.state.isDeleted = true;
  }
}
</script>
