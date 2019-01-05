<template>
  <footer class="footer container">
    <div class="container-content">
      <div class="footer__content">
        <div class="footer__main">
          <div class="footer__logo">
            <AppLogo :gray="true" />
          </div>
          <div class="footer__copyright">
            Made with <span class="heart"><i class="bx bxs-heart"></i></span> by <a href="https://gsmylt.com/" target="_blank">gsmylt</a> in Lucerne, Switzerland
          </div>
        </div>
        <ul class="footer__nav">
          <li><a href="mailto:hello@gsmylt.com"><i class="bx bx-at"></i> Contact</a></li>
          <li><a href="https://github.com/gsmylt/gsalted/issues" target="_blank"><i class="bx bx-bug"></i> Report a Bug</a></li>
          <li><a href="http://donate.sandroroth.com" target="_blank"><i class="bx bx-dollar"></i> Donate</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppLogo from './AppLogo.vue';

@Component({
  components: { AppLogo },
})
export default class AppFooter extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  padding: space(48) 0;
  background-color: color(neutral, 100);
}

.footer__content {
  display: flex;
  justify-content: space-between;
}

.footer__nav {
  display: flex;

  li + li {
    margin-left: space(48);
  }

  a {
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

.heart:hover .bx {
  animation: pulse 0.5s infinite;
  animation-direction: alternate;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
