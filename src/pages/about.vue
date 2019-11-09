<template>
  <div class="about">
    <app-title>
      <h1 class="title">
        About.
      </h1>

      <h3 class="subtitle">
        Important information about {{ $app.name }} and DreamPower.
      </h3>
    </app-title>

    <div class="container mx-auto">
      <div class="about__content">
        <!-- DreamTime -->
        <div class="about__column">
          <about-dream-time />
        </div>

        <!-- DreamPower -->
        <div class="about__column">
          <about-dream-power />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import AboutDreamTime from '~/components/About/DreamTime'
import AboutDreamPower from '~/components/About/DreamPower'

export default {
  components: {
    AboutDreamTime,
    AboutDreamPower,
  },

  computed: {
    alert() {
      return this.$app.settings.alerts?.about
    },
  },

  created() {
    $nucleus.track('PAGE_ABOUT')
  },

  methods: {
  },
}
</script>

<style lang="scss">
.about {
  .about__content {
    @apply flex p-5;

    .about__column {
      @apply w-1/2;

      &:first-child {
        @apply mr-4;
      }
    }

    .box {
      .box__header {
        @apply flex items-center;
        @apply pb-3 border-b border-darker-400;

        .box__header__logo {
          @apply mr-6;

          img {
            max-width: inherit;
            height: 80px;
          }
        }

        .box__header__content {
          h1 {
            @apply text-2xl font-bold;
          }

          h2 {
            @apply text-gray-400;
          }
        }
      }
    }
  }
}
</style>
