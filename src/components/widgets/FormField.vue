<template>
  <div class="form-field">
    <div class="form-field__input-wrapper">
      <div class="form-field__icon" v-if="icon !== ''">
        <i :class="icon"></i>
      </div>
      <template v-if="isCopyable">
        <div :class="{ 'copy-area': isCopyable,
                       'form-field__input--alternative': isAlternative,
                       'form-field__input--is-outlined': isOutlined }"
              class="form-field__input"
              @click="copyValue()">
          <div>{{fieldValue}}</div>
          <div class="copy-area__message" v-if="copied">
            <i class="icon dripicons-checkmark"></i>Copied
          </div>
        </div>
      </template>
      <template v-else>
        <input :value="fieldValue"
               :class="{ 'form-field__input--alternative': isAlternative }"
               class="form-field__input"
               :placeholder="fieldPlaceholder"
               @keyup="$emit('change', $event.target.value)"
               @change="$emit('change', $event.target.value)" />
        <div class="form-field__actions">
          <a v-for="(action, index) in actionList" :key="index"
             class="action-buton"
             @click="action.click()">
            <i :class="action.icon"></i>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  model: {
    prop: 'fieldValue',
    event: 'change',
  },
})
export default class FormField extends Vue {

  @Prop({ default: '' })
  public icon!: string;

  @Prop({ default: '' })
  public fieldLabel!: string;

  @Prop({ default: '' })
  public fieldValue!: string;

  @Prop({ default: '' })
  public fieldPlaceholder!: string;

  @Prop({ default: false })
  public isCopyable!: boolean;

  @Prop({ default: false })
  public isReadonly!: boolean;

  @Prop({ default: false })
  public isAlternative!: boolean;

  @Prop({ default: false })
  public isOutlined!: boolean;

  @Prop({ default: () => [] })
  public actionList!: any[];

  private copied = false;

  private copyValue() {
    if (this.isCopyable) {
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
}
</script>

<style lang="scss" scoped>
.form-field {

}

.form-field__input {
  width: 100%;
  flex-grow: 1;
  display: block;
  margin: 0;
  padding: 8px 16px;
  outline: none;
  border-radius: 4px;
  border: none;
  color: #495057;
  font: inherit;
}

.form-field__input:focus {
  border-color: #adb5bd;
}

.form-field__input-wrapper {
  display: flex;
  align-items: stretch;
  border-radius: 4px;
  border: 1px solid #ced4da;
}

.form-field__icon {
  width: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-right: 1px solid #ced4da;
  color: #ced4da;
  font-size: 1.4rem;
}

.form-field__actions {
  display: flex;
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
  font-size: 1.4rem;
}

.form-field__input--is-outlined {
  border-color: transparent;
  color: #1c7ed6;
}

.action-buton {
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: #1c7ed6;
  cursor: pointer;
}

.copy-area {
  position: relative;
  cursor: pointer;
}

.copy-area__message {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-left: 16px;
  background-color: #ffffff;
  color: #37b24d;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
}

.copy-area__message .icon {
  display: flex;
  margin-right: 8px;
}
</style>
