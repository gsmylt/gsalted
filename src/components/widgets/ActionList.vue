<template>
  <div class="actions">
    <a
      v-for="(action, index) in actions"
      :key="index"
      class="action"
      @click="action.click()"
    >
      <div class="action__icon"><i class="bx" :class="action.icon"></i></div>
      <div class="action__title">{{ action.title }}</div>
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from './widgets.types';
import BaseButton from './../base/BaseButton.vue';

@Component({
  components: { BaseButton },
})
export default class ActionList extends Vue {

  /**
   * The list of actions.
   */
  @Prop({ required: true })
  public actions!: Action[];
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
}

.action {
  display: flex;
  align-items: center;
  color: color(primary);
  font-size: font-size(14);
  user-select: none;

  & + & {
    margin-left: space(24);
  }
}

.action__icon {
  margin-right: space(4);

  .bx {
    display: block;
  }
}

</style>
