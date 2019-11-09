<template>
  <div class="layout">
    <layout-topbar />

    <layout-navbar />

    <div class="layout__body">
      <layout-navigation />

      <div class="layout__content">
        <nuxt />
      </div>

      <layout-jobs v-if="false" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['checks'],
}
</script>


<style lang="scss">
.layout {
  @apply flex flex-col h-full;

  .layout__body {
    @apply flex-1 flex;
  }

  .layout__content {
    @apply flex-1 relative overflow-hidden overflow-y-auto;
    height: 90vh;
  }
}
</style>
