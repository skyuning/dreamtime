<template>
  <div class="layout__menu">
    <!-- App Navigation -->
    <section class="layout__menu__section">
      <nav class="layout__menu__nav">
        <nuxt-link to="/system/about" class="layout__menu__nav__item">
          Mariana
        </nuxt-link>

        <nuxt-link to="/system/settings/processing" class="layout__menu__nav__item">
          Andrea
        </nuxt-link>

        <nuxt-link to="/system/settings/processing" class="layout__menu__nav__item">
          Jennifer
        </nuxt-link>

        <nuxt-link to="/system/settings/processing" class="button">
          <!--<font-awesome-icon icon="plus-circle" />-->
          Add Model
        </nuxt-link>
      </nav>
    </section>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  computed: {
    greetings() {
      const hours = moment().hours()

      if (hours >= 6 && hours <= 11) {
        return 'Good morning ☕'
      }

      if (hours >= 12 && hours <= 19) {
        return 'Good afternoon 🌞'
      }

      if (hours >= 0 && hours <= 5) {
        return 'Sweet dreams 🐏'
      }

      return 'Good night 🌛'
    },

    isDev() {
      return process.env.NODE_ENV === 'development'
    },

    isActive() {
      return $settings.payload.welcome !== true
    },
  },

  methods: {
    testBug() {
      $tools.testError()
      throw new Error('wow much error')
    },
  },
}
</script>

<style lang="scss">
@keyframes bgAnim {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

@keyframes navShowAnim {
  0% {
    left: -200px;
  }

  100% {
    left: 0;
  }
}

.layout__menu {
  @apply py-3 shadow bg-dark-500 relative;
  width: 200px;

  .navbar-header {
    @apply mb-5 text-gray-300 flex flex-col items-center justify-center;
    animation: 20s ease-in-out infinite bgAnim;
    height: 90px;

    background: rgb(99, 66, 245);

    background: linear-gradient(
      40deg,
      rgba(99, 66, 245, 1) 0%,
      rgba(239, 125, 199, 1) 100%
    );

    background-size: 200% 100%;

    /*
    clip-path: polygon(
      50% 0%,
      100% 0,
      100% 85%,
      75% 100%,
      25% 100%,
      0 85%,
      0 0
    );
    */

    .header-title {
      @apply text-white text-xl font-bold;
    }

    .header-greetings {
      @apply text-sm;
    }
  }

  .layout__menu__section {
    @apply mb-5;
  }

  .section-title {
    @apply text-center font-bold;
  }

  .layout__menu__nav {
    .layout__menu__nav__item {
      @apply border-r-4 border-transparent pl-4 font-semibold flex items-center;
      height: 50px;
      transition: all 0.1s ease-in-out;

      .icon {
        @apply text-center mr-2;
        filter: grayscale(100%);
        width: 22px;
        transition: all 0.1s ease-in-out;
      }

      &:hover,
      &.nuxt-link-exact-active {
        @apply text-primary border-primary;

        .icon {
          filter: unset;
        }
      }
    }
  }
}
</style>
