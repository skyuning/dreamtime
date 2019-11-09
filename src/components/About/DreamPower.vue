<template>
  <div>
    <div class="box box--items">
      <div class="box__header">
        <div class="box__header__logo">
          <img src="/assets/images/dreampower.png">
        </div>

        <div class="box__header__content">
          <h1>{{ title }}</h1>
          <h2>{{ description }}</h2>
        </div>
      </div>

      <div class="box__content">
        <!-- Open Installation -->
        <box-item icon="times-circle" label="Not installed" />
      </div>
    </div>

    <!-- Useful links -->
    <div class="box box--items">
      <div class="box__content">
        <box-item
          v-for="(item, index) in navigation"
          :key="index"
          :label="item.label"
          :description="item.description"
          :icon="item.icon"
          :href="item.href"
          :version="item.version" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    navigation() {
      return this.$app.settings.projects?.dreampower?.navigation || []
    },

    title() {
      return this.$app.settings.projects?.dreampower?.title || 'DreamPower'
    },

    description() {
      return this.$app.settings.projects?.dreampower?.description || 'Deep learning algorithm capable of nudify people photos.'
    },
  },

  methods: {
    openDir() {
      $tools.shell.openItem($tools.paths.getCli())
    },
  },
}
</script>
