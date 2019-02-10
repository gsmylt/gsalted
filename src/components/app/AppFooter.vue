<template>
  <footer class="footer container">
    <div class="container-content">
      <div class="footer__content">
        <div class="footer__main">
          <div class="footer__logo">
            <AppLogo :gray="true" />
          </div>
          <div class="footer__copyright">
            {{ $t('FOOTER.COPYRIGHT_MADE_WITH') }}
            <span class="heart"><i class="bx bxs-heart"></i></span>
            {{ $t('FOOTER.COPYRIGHT_BY') }}
            <a href="https://gsmylt.com/" target="_blank">gsmylt</a>
            <span> {{ $t('FOOTER.COPYRIGHT_LOCATION') }}</span>
          </div>
        </div>
        <ul class="footer__nav nav">
          <li class="nav__item">
            <a class="nav__link" href="https://gsmylt.com/support" target="_blank"><i class="bx bx-at"></i> {{ $t('FOOTER.CONTACT') }}</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="https://github.com/gsmylt/gsalted/issues" target="_blank"><i class="bx bx-bug"></i> {{ $t('FOOTER.REPORT_BUG') }}</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="http://donate.sandroroth.com" target="_blank"><i class="bx bx-dollar"></i> {{ $t('FOOTER.DONATE') }}</a>
          </li>
        </ul>
      </div>
      <div class="footer__langs">
        <LangSwitcher />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppLogo from './AppLogo.vue';
import LangSwitcher from '@/components/widgets/LangSwitcher.vue';

@Component({
  components: { AppLogo, LangSwitcher },
})
export default class AppFooter extends Vue {
}
</script>

<style lang="scss" scoped>
/* Footer */
.footer {
  padding: space(48) 0;
  background-color: color(neutral, 100);
}

.footer__content {
  display: flex;
  justify-content: space-between;
}

.footer__logo {
  margin-bottom: space();
}

.footer__copyright {
  color: color(neutral, 300);
  font-size: font-size(14);
  font-weight: font-weight(light);

  a:hover {
    text-decoration: underline;
  }
}

.footer__langs {
  margin-top: space(32);
  padding-top: space(32);
  border-top: 1px solid color(neutral, 200);
}

.heart:hover .bx {
  animation: pulse 0.5s infinite;
  animation-direction: alternate;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}



/* Nav */
.nav {
  display: flex;
  align-items: center;
}

.nav__item {
  & + & {
    margin-left: space(48);
  }
}

.nav__link {
  display: flex;
  align-items: center;
  color: color(neutral, 400);
  font-size: font-size(14);
  font-weight: font-weight(medium);
  line-height: 1.7;
  white-space: nowrap;
  letter-spacing: 1px;
  text-transform: uppercase;

  .bx {
    margin-right: space(4);
  }
}

@media only screen and (max-width: 53rem) {
  .footer__content {
    flex-direction: column;
  }

  .footer__nav {
    margin-top: space(48);
  }
}

@media only screen and (max-width: 35rem) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav__item {
    & + & {
      margin-top: space(16);
      margin-left: 0;
    }
  }
}
</style>
