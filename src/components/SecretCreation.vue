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
        <h2>3. Period of Validity</h2>
        <p v-if="!state.isGenerated">
          You can choose when your secret should automatically be deleted.
        </p>
        <p v-if="state.isGenerated">
          Your secret will automatically be deleted after {{autoDeleteTime}}.
        </p>
        <div v-if="!state.isGenerated" class="toggle-group">
          <a 
            v-for="(toggle, index) of timeToggles"
            :key="index"
            :class="{ 'toggle-group__toggle--active': gsalt.validityInSeconds === toggle.value }"
            class="toggle-group__toggle"
            @click="gsalt.validityInSeconds = toggle.value"
          >
            <span class="value">{{ toggle.displayValue }}</span>
            <span class="unit">{{ toggle.displayUnit }}</span>
          </a>
        </div>
      </div>

      <div class="form__group">
        <h2>4. Get your link</h2>
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
            We'll automatically delete your secret in {{autoDeleteTime}}. <br /> You can
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
   * The list of validity options.
   */
  private timeToggles = [
    { value: (2 * 60 * 60), displayValue: 2, displayUnit: 'hours' },
    { value: (24 * 60 * 60), displayValue: 1, displayUnit: 'day' },
    { value: (48 * 60 * 60), displayValue: 2, displayUnit: 'days' },
    { value: (7 * 24 * 60 * 60), displayValue: 7, displayUnit: 'days' },
    { value: (30 * 24 * 60 * 60), displayValue: 30, displayUnit: 'days' },
  ];

  /**
   * Getter for the selected time toggle.
   */
  private get autoDeleteTime() {
    const toggle = this.timeToggles.find((t) => t.value === this.gsalt.validityInSeconds);

    if (toggle) {
      return `${toggle.displayValue} ${toggle.displayUnit}`;
    }

    return 'some time';
  }

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

<style lang="scss" scoped>
.toggle-group {
  display: flex;
  margin: 16px 0;
}

.toggle-group__toggle {
  flex-grow: 1;
  flex-basis: 0;
  border: {
    color: #1c7ed6;
    style: solid;
    width: 1px;
  };
  padding: 8px 0;
  color: #1c7ed6;
  text-align: center;
  user-select: none;
  cursor: pointer;

  .value {
    margin-right: 6px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .unit {
    font-size: 1rem;
  }

  &.toggle-group__toggle--active {
    background-color: #1c7ed6;
    color: #ffffff;
  }

  &:not(:first-of-type) {
    border-left-width: 0;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }

  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }

  @media only screen and (max-width: 460px) {
    padding: 4px 8px;
    text-align: right;

    .value {
      display: block;
      font-size: 1.4rem;
    }

    .unit {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }
  }
}
</style>