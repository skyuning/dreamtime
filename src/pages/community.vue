<template>
  <div class="community">
    <div class="community__header">
      <video src="/assets/videos/dreamnet.mp4" autoplay muted loop />

      <div ref="intro" class="community__header__content">
        <div class="community__header__content__logo">
          <img src="/assets/images/dreamnet.png">
        </div>

        <div class="community__header__content__body">
          <h1>DreamNet</h1>
          <h2>Applications for adult entertainment and decentralized applications.</h2>
        </div>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="community__content">
        <div class="community__content__left">
          <nuxt-link to="/donate" class="button button--filled community__donate-button">
            <font-awesome-icon icon="donate" class="icon" />
            <span>Support us</span>
          </nuxt-link>

          <div
            v-for="(section, index) in left"
            :key="index"
            class="box box--items">
            <div class="box__header">
              <p class="font-bold">
                {{ section.title }}
              </p>
            </div>

            <div v-if="typeof section.content === 'object'" class="box__content">
              <box-item
                v-for="(item, iindex) in section.content"
                :key="iindex"
                :label="item.label"
                :description="item.description"
                :icon="item.icon"
                :href="item.href"
                :version="item.version" />
            </div>
          </div>
        </div>

        <div class="community__content__right">
          <!-- Blog Posts -->
          <app-news />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { tween, styler } from 'popmotion'

export default {
  computed: {
    left() {
      return this.$app.settings.community?.left || []
    },
  },

  created() {
    $nucleus.track('PAGE_COMMUNITY')
  },

  mounted() {
    setTimeout(() => {
      if (_.isNil(this.$refs.intro)) {
        return
      }

      const intro = styler(this.$refs.intro)

      tween({
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 1000,
      }).start(v => intro.set(v))
    }, 1500)
  },
}
</script>

<style lang="scss">
.community {
  .community__header {
    @apply relative overflow-hidden;
    height: 200px;

    video {
      @apply absolute right-0 bottom-0 h-full w-full overflow-hidden;
      object-fit: none;
    }

    .container {
      @apply flex items-center;
    }

    .community__header__content {
      @apply absolute h-full w-full;
      @apply flex items-center;
      @apply px-6 bg-black-70 opacity-0;

      .community__header__content__logo {
        @apply mr-6;

        img {
          height: 100px;
        }
      }

      .community__header__content__body {
        h1 {
          @apply text-4xl font-bold;
        }

        h2 {
          @apply text-xl;
        }
      }
    }
  }

  .community__content {
    @apply flex-1 flex p-5;

    .community__content__left {
      @apply w-1/4 mr-4;
    }

    .community__content__right {
      @apply flex-1;
    }

    .community__donate-button {
      @apply w-full mb-5;
    }
  }
}
</style>
