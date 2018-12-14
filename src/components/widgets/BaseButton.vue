<template>
  <button :type="isSubmit ? 'submit' : 'button'"
          :class="{ 'btn--link-style': linkStyle,
                    'btn--is-loading': isLoading,
                    'btn--is-disabled': isDisabled }" class="btn"
          @click="raiseClickEvent()">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class BaseButton extends Vue {

  @Prop({ default: false })
  public isSubmit!: boolean;

  @Prop({ default: false })
  public linkStyle!: boolean;

  @Prop({ default: false })
  public isLoading!: boolean;

  @Prop({ default: false })
  public isDisabled!: boolean;

  private raiseClickEvent() {
    if (!this.isDisabled && !this.isLoading) {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  margin: 0;
  padding: 8px 32px;
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: #1c7ed6;
  color: #ffffff;
  font: inherit;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn.btn--link-style {
  padding-left: 0;
  padding-right: 0;
  background-color: transparent;
  color: #1c7ed6;
}

.btn.btn--is-loading {
  background-color: rgba(28, 126, 214, 0.6);
  cursor: progress;
}

.btn.btn--is-disabled {
  background-color: rgba(28, 126, 214, 0.6);
  cursor: not-allowed;
}
</style>
