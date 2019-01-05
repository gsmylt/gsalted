<template>
  <footer class="footer container">
    <div class="container-content">
      <div v-if="separator" class="footer__separator"></div>
      <div class="footer__header">
        <AppLogo :gray="true" />
      </div>
      <div class="footer__main">
        <nav class="nav-column">
          <router-link :to="{ name: 'Home' }"><strong>gsalted.</strong></router-link>
          <ul>
            <li><router-link :to="{ name: 'SecretCreation' }">Share a secret</router-link></li>
            <li><router-link :to="{ name: 'SecretView' }">Receive a secret</router-link></li>
            <li><a href="">Security</a></li>
          </ul>
        </nav>
        <nav class="nav-column">
          <strong>Company</strong>
          <ul>
            <li><a href="https://gsmylt.com" target="_blank">About gsmylt</a></li>
            <li><a href="https://gsmylt.com/projects" target="_blank">More products</a></li>
          </ul>
        </nav>
        <nav class="nav-column">
          <strong>Support</strong>
          <ul>
            <li><a href="mailto:hello@gsmylt.com">Get in touch</a></li>
            <li><a href="https://github.com/gsmylt/gsalted/issues">Open an Issue</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer__copyright">
        <div>
          Made with <span class="heart"><i class="bx bxs-heart"></i></span> by <a href="https://gsmylt.com/" target="_blank">gsmylt</a> in Lucerne, Switzerland
        </div>
        <div>
          <a href="http://donate.sandroroth.com" target="_blank">Donate</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AppLogo from './AppLogo.vue';

@Component({
  components: { AppLogo },
})
export default class AppFooter extends Vue {

  /**
   * If a separat should be shown at the top of the footer.
   */
  @Prop({ default: false })
  public separator!: boolean;

}
</script>

<style lang="scss" scoped>
.footer {
  padding: space(48) 0 0;
  background-color: color(neutral, 100);
}

.footer__separator {
  height: 4px;
  margin-bottom: space(48);
  background-color: color(neutral, 200);
}

.footer__header {
  margin-bottom: space(32);
}

.footer__main {
  display: flex;
  color: color(neutral, 400);
}

.nav-column {
  flex-grow: 0;

  & + & {
    margin-left: space(96);
  }

  strong {
    color: color(neutral);
    font-weight: font-weight(medium);
  }
  
  ul li {
    margin-top: space();
  }
}

.footer__copyright {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: space(32);
  padding: space(32) 0;
  border-top: 1px solid color(neutral, 200);
  color: color(neutral, 300);
  font-size: font-size(14);
  font-weight: font-weight(light);
}

.heart:hover .bx {
  animation: pulse 0.5s infinite;
  animation-direction: alternate;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
