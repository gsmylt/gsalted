<template>
  <div class="main secret-creation">
    <p class="text-success" v-if="state.isDeleted">
      We've deleted your secret from our server.
    </p>
    <form class="form" @submit.prevent="storeSecret()">
      <div class="form__group">
        <h2>1. Your secret</h2>
        <p v-if="!state.isGenerated">
          Your secret is what you want to share, be it a password or a secret message.
          Enter your own secret or use the randomly generated secret.
        </p>
        <FormField 
          v-model="secret"
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
        <FormField
          v-model="gsalt.key"
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
          <FormField
            v-model="link"
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
        <BaseButton 
          v-if="!state.isGenerated"
          :isDisabled="!isGenerationEnabled"
          :isLoading="state.isLoading"
          :isSubmit="true"
        >
          Generate Link
        </BaseButton>
        <BaseButton
          v-if="state.isGenerated"
          :linkStyle="true"
          @click="reset()"
        >
          Share another secret
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { api } from '@/api';
import { Gsalt } from '@/core/gsalt';
import { Generator } from '@/core/generator';
import FormField from '@/components/widgets/FormField.vue';
import BaseButton from '@/components/widgets/BaseButton.vue';

@Component({
  components: { FormField, BaseButton },
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
    isError: false,
    isLoading: false,
    isGenerated: false,
    isDeleted: false,
  };

  /**
   * The list of actions for each input field.
   */
  private actions = {
    passwordField: [
      {
        icon: 'dripicons-clockwise',
        click: () => { this.createNewSecret(); },
      },
    ],
    keyField: [
      {
        icon: 'dripicons-clockwise',
        click: () => { this.createNewKey(); },
      },
    ],
  };

  /**
   * Getter for the link of the gsalt object.
   */
  private get link() {
    return this.gsalt.createLink();
  }

  /**
   * Checks if the generation is enabled.
   */
  private get isGenerationEnabled(): boolean {
    return (
      this.secret.length > 0 &&
      this.gsalt.key.length > 0 &&
      this.state.isLoading === false &&
      this.state.isGenerated === false
    );
  }

  /**
   * Creates a random password and overrides the current secret.
   */
  private createNewSecret() {
    this.secret = Generator.password();
  }

  /**
   * Creates a new random key.
   */
  private createNewKey() {
    this.gsalt.key = Generator.randomWords();
  }

  /**
   * Resets the current form.
   */
  private reset() {
    this.state.isGenerated = false;
    this.gsalt = new Gsalt();
    this.createNewSecret();
    this.createNewKey();
  }

  /**
   * Stores the secret and shows the URL
   */
  private storeSecret() {
    if (!this.isGenerationEnabled) {
      return;
    }

    this.state.isDeleted = false;
    this.state.isLoading = true;
    this.state.isError = false;

    const encrypted = this.gsalt.encrypt(this.secret);
    api.secret.store(this.gsalt, encrypted).then((id) => {
      this.gsalt.id = id;
      this.state.isLoading = false;
      this.state.isGenerated = true;
      this.state.isError = false;
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
