<template>
  <span v-tooltip="tooltip" class="help">{{ label }}</span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '?',
    },
  },

  computed: {
    tooltip() {
      return {
        content: this.$slots.default[0]?.text,
      }
    },
  },
}
</script>
