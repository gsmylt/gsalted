<template>
  <div class="actions">
    <ActionButton
      v-for="(action, index) in actions"
      :key="index"
      :action="action"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from './widgets.types';
import ActionButton from './ActionButton.vue';

@Component({
  components: { ActionButton },
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
</style>
