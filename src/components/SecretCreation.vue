<template>
  <div class="main secret-creation">
    <p class="text-success" v-if="state.isDeleted">
      We've deleted your secret from our server.
    </p>
    <form class="form" @submit.prevent="createSecret()">
      <div class="form__group">
          <h2>1. Your secret</h2>
        <p v-if="!state.isGenerated">
          Your secret is what you want to share, be it a password or a secret message.
          Enter your own secret or use the randomly generated secret.
        </p>
        <FormField v-model="secretText"
                  icon="dripicons-jewel"
                  :actionList="actions.passwordField"
                  fieldLabel="Secret"
                  fieldPlaceholder="Enter a secret"
                  :isReadonly="state.isGenerated"
                  :isCopyable="state.isGenerated"
                  :isAlternative="true" />
      </div>
      <div class="form__group">
            <h2>2. An easy to remember key</h2>
            <p v-if="!state.isGenerated">
              The key is used to encrypt your secret (along with a generated random key,
              but don't care about that). It should be as long as possible but easy to remember.
              You'll have to send it to your friend.
            </p>
            <FormField v-model="key"
                  icon="dripicons-lock"
                  :actionList="actions.keyField"
                  fieldLabel="Key"
                  fieldPlaceholder="Enter a simple key"
                  :isReadonly="state.isGenerated"
                  :isCopyable="state.isGenerated"
                  :isAlternative="true" />
      </div>
      <div class="form__group">
            <h2>3. Get your link</h2>
            <div v-if="!state.isGenerated">
              <p>
                Ready to share your secret? Let's create a very secure link.
              </p>
              <p class="text-error" v-if="state.isError">
                Uups, there was an error while generating the link. Please try it again.
              </p>
            </div>
            <div v-else>
              <p>
                Yeah! You can now send the link and your key to your buddy.
                Please use two different mediums to send these two information
                (e.g. iMessage and E-mail).
              </p>
              <FormField v-model="link"
                    icon="dripicons-link"
                    v-if="state.isGenerated"
                    fieldLabel="Link"
                    :isCopyable="true" />
              <p class="small">
                We'll automatically delete your secret after 24 hours. <br /> You can
                <a class="text-link" @click="deleteSecret()">delete it right now</a> if you want.
              </p>
            </div>
      </div>

      <div class="form__controls">
        <BaseButton v-if="!state.isGenerated"
                     :isDisabled="!isGenerationEnabled"
                     :isLoading="state.isLoading"
                     :isSubmit="true">Generate Link</BaseButton>
        <BaseButton v-if="state.isGenerated" :linkStyle="true" @click="reset()">
          Share another secret
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import core from '@/core';
import api from '@/api';
import FormField from '@/components/widgets/FormField.vue';
import BaseButton from '@/components/widgets/BaseButton.vue';
import { Secret } from '@/core/secret';

@Component({
  components: { FormField, BaseButton },
})
export default class SecretCreation extends Vue {

  private secretText = core.Generator.password();
  private key = core.Generator.randomWords();
  private link: string | null = null;
  private secret: Secret | null = null;
  private state = {
    isError: false,
    isLoading: false,
    isGenerated: false,
    isDeleted: false,
  };

  private actions = {
    passwordField: [
      {
        icon: 'dripicons-clockwise',
        click: () => { this.createNewSecretText(); },
      },
    ],
    keyField: [
      {
        icon: 'dripicons-clockwise',
        click: () => { this.createNewKey(); },
      },
    ],
  };

  private get isGenerationEnabled() {
    return (
      !(this.secretText.length === 0 ||
      this.key.length === 0 ||
      this.state.isLoading ||
      this.state.isGenerated)
    );
  }

  private createNewSecretText() {
    this.secretText = core.Generator.password();
  }

  private createNewKey() {
    this.key = core.Generator.randomWords();
  }

  private reset() {
    this.link = '';
    this.state.isGenerated = false;
    this.secretText = core.Generator.password();
    this.key = core.Generator.randomWords();
    this.secret = null;
  }

  private createSecret() {
    if (!this.isGenerationEnabled) {
      return;
    }

    this.state.isDeleted = false;
    this.state.isLoading = true;
    this.state.isError = false;

    this.secret = new core.Secret(this.key);
    const encrypted = this.secret!.encrypt(this.secretText);
    api.storeSecret(this.secret!, encrypted).then((data) => {
      this.secret!.setId(data.id);
      this.link = this.secret!.getLink();
      this.state.isLoading = false;
      this.state.isGenerated = true;
      this.state.isError = false;
    }).catch(() => {
      this.state.isLoading = false;
      this.state.isGenerated = false;
      this.state.isError = true;
    });
  }

  private deleteSecret() {
    if (this.secret !== null) {
      api.deleteSecret(this.secret);
      this.state.isDeleted = true;
      this.reset();
    }
  }
}
</script>
