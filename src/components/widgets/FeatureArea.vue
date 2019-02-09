<template>
  <div class="area container">
    <div class="area__content container-content">
      <h1 class="area__title">Why we love gsalted and you'll too</h1>
      <div class="area__features">
        <div v-for="(feature,idx) of features" :key="idx" class="feature">
          <div class="feature__icon">
            <i :class="feature.icon" class="bx"></i>
          </div>
          <div class="feature__content">
            <div class="feature__title">
              <span>{{ feature.title }}</span>
              <span v-if="feature.badge" class="feature__badge">{{ feature.badge }}</span>
            </div>
            <div class="feature__text">{{ feature.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FeatureArea extends Vue {

  private features = [
    {
      icon: 'bx-lock',
      title: 'Always encrypted',
      text: 'Your secret gets encrypted on client-side before we send it to the cloud.',
    },
    {
      icon: 'bx-file',
      title: 'Send files',
      text: 'You can now even send files with gsalted in the same secure way.',
      badge: 'Coming soon',
    },
    {
      icon: 'bx-trash',
      title: 'We clean up for you',
      text: 'Your secret will be deleted after 24 hours (we keep it up to 30 days if you really want).',
    },
    {
      icon: 'bx-like',
      title: 'Simple. Fun. Secure. Free.',
      text: 'There are a lot of things you will like about gsalted - just try it out, it’s free.',
    },
  ];

}
</script>

<style lang="scss" scoped>
.area {
  background-color: color(background);
}

.area__content {
  padding: space(96) 0;
}

.area__title {
  margin-bottom: space(48);
  font-size: font-size(30);
  font-weight: font-weight(medium);
  text-align: center;
  line-height: 1.2;
}

.area__features {
  display: flex;
  justify-content: space-between;
}

.feature {
  width: 22%;
  display: flex;
}

.feature__icon {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: space(12);
  border-radius: 100%;
  background-color: color(primary, 200);
  color: color(primary, 600);
  font-size: font-size(18);
}

.feature__title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: color(neutral, 600);
  line-height: 32px;
  font-size: font-size(18);
  font-weight: font-weight(medium);
}

.feature__badge {
  display: inline-block;
  margin-left: space(8);
  padding: space(4) space(8);
  border-radius: 34px;
  background-color: color(secondary, 300);
  color: color(secondary, 600);
  font-size: font-size(12);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}

.feature__text {
  color: color(neutral, 600);
  line-height: 1.5;
}

@media only screen and (max-width: 80rem) {
  .area__features {
    max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
  }

  .feature {
    width: 40%;
    
    &:nth-child(n+3) {
      margin-top: space(48);
    }
  }
}

@media only screen and (max-width: 50rem) {
  .area__features {
    max-width: none;
  }

  .feature {
    width: 45%;
  }
}

@media only screen and (max-width: 41rem) {
  .area__title {
    text-align: left;
  }

  .area__features {
    flex-direction: columN
  }

  .feature {
    width: 100%;
    
    & + & {
      margin-top: space(32);
    }
  }
}
</style>
