<template>
  <div>
    <div class="box box--items">
      <div class="box__header">
        <div class="box__header__logo">
          <img src="/assets/images/dreamtime.png">
        </div>

        <div class="box__header__content">
          <h1>{{ $app.name }}</h1>
          <h2>{{ description }}</h2>
        </div>
      </div>

      <div class="box__content">
        <!-- Open Installation -->
        <box-item icon="folder-open" label="Install Location" is-link @click="openDir" />

        <!-- Updater -->
        <app-update project="dreamtime" :project-title="$app.name" />
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
      return this.$app.settings.projects?.dreamtime?.navigation || []
    },

    description() {
      return this.$app.settings.projects?.dreamtime?.description || 'DreamPower friendly user interface.'
    },
  },

  methods: {
    openDir() {
      $tools.shell.openItem($tools.paths.getGui())
    },
  },
}
</script>
