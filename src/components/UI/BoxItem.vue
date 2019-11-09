<template>
  <div v-if="isVisible" class="box__item" :class="cssClass" @click="click">
    <div v-if="icon" class="box__item__icon">
      <img v-if="isImageIcon" :src="icon">
      <font-awesome-icon v-else :icon="icon" />
    </div>

    <div class="box__item__content">
      <span class="box__item__label" v-html="label" />
      <span v-if="description" class="box__item__description" v-html="description" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    icon: {
      type: [String, Array],
      default: undefined,
    },

    label: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: undefined,
    },

    version: {
      type: String,
      default: undefined,
    },

    href: {
      type: String,
      default: undefined,
    },

    isLink: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isVisible() {
      return _.isNil(this.version) || this.version === this.app.version
    },

    isImageIcon() {
      return this.isURL(this.icon)
    },

    cssClass() {
      return {
        'is-link': !_.isNil(this.href) || this.isLink,
      }
    },
  },

  methods: {
    click() {
      this.$emit('click')

      if (!_.isNil(this.href)) {
        $nucleus.track('EXTERNAL_LINK', { href: this.href })
        $tools.shell.openExternal(this.href)
      }
    },

    isURL(str) {
      if (_.isNil(str)) {
        return false
      }

      if (_.startsWith(str, '~')) {
        return true
      }

      const pattern = new RegExp(
        '^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ) // fragment locator
      return !!pattern.test(str)
    },
  },
}
</script>

<style lang="scss">
.box.box--items {
  .box__content {
    @apply px-0;
  }

  .box__item {
    @apply flex p-3;

    &.is-link {
      @apply cursor-pointer;
      transition: all .1s ease-in-out;

      &:hover {
        @apply bg-darker-600;
      }
    }

    &:not(:last-child) {
      @apply border-b border-darker-400;
    }

    .box__item__icon {
      @apply mr-4 flex items-center justify-center text-2xl;
      width: 42px;
    }

    .box__item__content {
      @apply flex-1 flex flex-col justify-center;

      .box__item__label {
        @apply font-semibold;
      }

      .box__item__description {
        @apply text-sm;
      }
    }
  }
}
</style>
