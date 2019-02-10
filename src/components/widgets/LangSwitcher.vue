<template>
  <div class="switcher">
    <a
      v-for="locale in locales"
      :key="locale.key"
      @click="switchLang(locale)"
      :class="{ 'switcher__lang--active': currentLangKey === locale.key }"
      class="switcher__lang">
      {{ locale.name }}
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from './widgets.types';
import ActionButton from './ActionButton.vue';
import { locales } from '@/translations';
import { Locale } from '@/translations/types';
import { changeLanguage, getCurrentLang } from '@/core/localizer';
import { scrollToTop } from '@/core/utility';
import { setTimeout } from 'timers';

@Component({
  components: { ActionButton },
})
export default class LangSwitcher extends Vue {

  /**
   * The list of locales
   */
  private locales: Locale[] = locales;

  /**
   * The current language.
   */
  private currentLangKey: string = 'en';

  public mounted() {
    this.currentLangKey = getCurrentLang();
  }

  /**
   * Switches the active language.
   */
  private switchLang(locale: Locale) {
    changeLanguage(locale.key);
    this.currentLangKey = getCurrentLang();
    setTimeout(() => scrollToTop(), 300);
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.switcher__lang {
  display: block;
  color: color(neutral, 300);
  font-size: font-size(14);
  letter-spacing: 1px;
  text-transform: uppercase;

  & + & {
    margin-left: space(32);
  }

  &.switcher__lang--active {
    color: color(secondary, 500);
    font-weight: font-weight(medium);
  }
}
</style>
