<template>
  <div class="layout__topbar">
    <div class="topbar__left">
      <div class="topbar__logo">
        {{ $dream.name }} {{ $dream.version }}
      </div>

      <div class="topbar__greetings">
        {{ greetings }}
      </div>
    </div>

    <div class="topbar__buttons">
      <button type="button" @click="minimize">
        <font-awesome-icon icon="minus" />
      </button>

      <button type="button" @click="maximize">
        <font-awesome-icon :icon="['far', 'square']" />
      </button>

      <button type="button" class="close" @click="close">
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const { activeWindow, api } = $provider.util

export default {
  computed: {
    greetings() {
      const hours = moment().hours()

      if (hours >= 6 && hours <= 11) {
        return '☕ Good morning'
      }

      if (hours >= 12 && hours <= 19) {
        return '🌞 Good afternoon'
      }

      if (hours >= 0 && hours <= 5) {
        return '🐏 Sweet dreams'
      }

      return '🌛 Good night'
    },
  },

  methods: {
    minimize() {
      activeWindow().minimize()
    },

    maximize() {
      activeWindow().maximize()
    },

    close() {
      api.app.quit()
    },
  },
}
</script>

<style lang="scss" scoped>
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

.layout__topbar {
  @apply flex bg-black text-white;
  height: 30px;
  z-index: 9999999;

  .topbar__left {
    @apply flex-1 flex;
    @apply text-sm;
    -webkit-app-region: drag;
  }

  .topbar__logo {
    @apply flex flex-col items-center justify-center;
    @apply font-bold px-4;
    background: rgb(99, 66, 245);

    background: linear-gradient(
      40deg,
      rgba(99, 66, 245, 1) 0%,
      rgba(239, 125, 199, 1) 100%
    );

    background-size: 200% 100%;
  }

  .topbar__greetings {
    @apply flex flex-col items-center justify-center;
    @apply font-light px-4;
  }

  .topbar__buttons {
    @apply flex;

    button {
      @apply flex items-center justify-center outline-none;
      @apply text-xs;
      width: 50px;
      height: 30px;

      &:hover {
        @apply bg-gray-700;

        &.close {
          @apply bg-danger-500;
        }
      }
    }
  }
}
</style>
