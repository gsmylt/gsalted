<template>
  <div class="form-field">
    <div class="form-field__input-wrapper">
      <div class="form-field__icon" v-if="icon !== ''">
        <i class="bx" :class="icon"></i>
      </div>
      <input 
        :type="isPassword && !isFocused ? 'password' : 'text'"
        :value="fieldValue"
        :class="{ 'form-field__input--alternative': isAlternative }"
        class="form-field__input"
        :placeholder="fieldPlaceholder"
        :readonly="isReadonly"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keyup="$emit('change', $event.target.value)"
        @change="$emit('change', $event.target.value)" />
    </div>
    <div class="form-field__actions">
      <ActionList :actions="actionList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ActionList from './ActionList.vue';

@Component({
  components: { ActionList },
  model: {
    prop: 'fieldValue',
    event: 'change',
  },
})
export default class FormField extends Vue {

  /**
   * The name of the icon.
   */
  @Prop({ default: '' })
  public icon!: string;

  /**
   * The label of the field.
   */
  @Prop({ default: '' })
  public fieldLabel!: string;

  /**
   * The current input value.
   */
  @Prop({ default: '' })
  public fieldValue!: string;

  /**
   * The placeholder of the field.
   */
  @Prop({ default: '' })
  public fieldPlaceholder!: string;

  /**
   * If the field value can be copied by clicking on the field.
   */
  @Prop({ default: false })
  public isCopyable!: boolean;

  /**
   * If the field is readonly.
   */
  @Prop({ default: false })
  public isReadonly!: boolean;

  /**
   * If the alternative style should be used.
   */
  @Prop({ default: false })
  public isAlternative!: boolean;

  /**
   * If the field is a password and the content should be hidden if not active.
   */
  @Prop({ default: false })
  public isPassword!: boolean;

  /**
   * The list of action buttons.
   */
  @Prop({ default: () => [] })
  public actionList!: any[];

  /**
   * If the field value was recently copied to the clipboard.
   */
  private copied = false;

  /**
   * If the input field is currently focused.
   */
  private isFocused = false;

  /**
   * Copies the value to the clipboard
   */
  private copyValue() {
    const el = document.createElement('textarea');
    el.value = this.fieldValue;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copied = true;
    setTimeout(() => this.copied = false, 1000);
  }
}
</script>

<style lang="scss" scoped>
.form-field {
  & + & {
    margin-top: space(24);
  }
}

.form-field__input {
  width: 100%;
  flex-grow: 1;
  display: block;
  margin: 0;
  padding: space(8) space();
  outline: none;
  border-radius: radius();
  border: none;
  color: color(neutral, 700);
  font: inherit;
}

.form-field__input:focus {
  border-color: #adb5bd;
}

.form-field__input-wrapper {
  display: flex;
  align-items: stretch;
  border-radius: 4px;
  border: 1px solid color(neutral, 200);
}

.form-field__icon {
  width: space(48);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-right: 1px solid color(neutral, 200);
  color: #ced4da;
  font-size: 1.4rem;
}

.form-field__actions {
  display: flex;
  // justify-content: flex-end;
  margin-top: space(12);
}

.form-field__icon i {
  display: flex;
}

div.form-field__input {
  line-height: 1.6;
  word-break: break-all;
  word-break: break-word;
}

.form-field__input--alternative {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: font-size(18);
}

</style>
