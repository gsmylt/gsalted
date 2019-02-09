<template>
  <div class="radio-field">
    <div class="radio-field__label">{{ label }}</div>
    <div class="radio-field__options">
      <a
        v-for="(option, idx) in options"
        :key="idx"
        @click="optionSelected(option.value)"
        class="radio-field__option option"
        :class="{ 'option--active': (value === option.value) }"
      >
        <span class="option__label">{{ option.label }}</span>
        <span class="option__unit">{{ option.unit }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class RadioField extends Vue {

  /**
   * The label of the field.
   */
  @Prop({ required: true })
  public label!: string;

  /**
   * The current value.
   */
  @Prop({ required: true })
  public value: any;

  /**
   * The list of options
   */
  @Prop({ required: true })
  public options!: Array<{ label: string; unit: string, value: any; }>;

  /**
   * Selected the given option.
   */
  private optionSelected(value: any) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss" scoped>
/* Radio Field */
.radio-field {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 50rem) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.radio-field__label {
  margin-right: space();
  color: color(neutral);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: 50rem) {
    margin-right: 0;
    margin-bottom: space(8);
  }
}

.radio-field__options {
  max-width: 100%;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 0px;
    background: transparent;
  }
}



/* Option */
.option {
  display: flex;
  align-items: center;
  padding: space(8) space(12);
  border-radius: radius();
  color: color(neutral, 300);
  user-select: none;

  &.option--active {
    background-color: color(primary, 100);
    color: color(primary, 500);
  }

   & + & {
     margin-left: space(4);
   }
}

.option__label {
  font-size: font-size(16);
  font-weight: font-weight(medium);
}

.option__unit {
  margin-left: space(4);
  font-size: font-size(14);
  font-weight: font-weight();
}
</style>
