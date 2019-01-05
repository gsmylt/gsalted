<template>
  <div class="layout" :class="{ 'layout--with-background': hasBackground}">
    <div class="layout__main">
      <slot name="default" />
    </div>
    <div class="layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppLayout extends Vue {

  /**
   * If the layout container has an alternative background color.
   */
  @Prop({ default: false })
  public hasBackground!: boolean;

}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.layout--with-background {
    background-color: color(neutral, 100);
  }
}
</style>
