<template>
  <div class="logo" :class="{ 'logo--gray': gray }">
    <span class="logo__name">gsalted</span>
    <span class="logo__dot"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppLogo extends Vue {

  /**
   * If the logo should be grayscale.
   */
  @Prop({ default: false })
  public gray!: boolean;

}
</script>

<style lang="scss" scoped>
.logo {
  font-size: font-size(24);
}

.logo__name {
  color: color(primary);
  font-weight: font-weight(bold);

  .logo.logo--gray & {
    color: color(neutral, 600);
  }
}

.logo__dot {
  &::after {
    width: 4px;
    height: 4px;
    content: ' ';
    display: inline-block;
    margin-left: space(4)/2;
    border-radius: 100%;
    background-color: color(secondary);

    .logo.logo--gray & {
      background-color: color(neutral, 500);
    }
  }
}
</style>
