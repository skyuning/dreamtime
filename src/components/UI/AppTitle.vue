<template>
  <div class="app-title">
    <slot />
  </div>
</template>

<style lang="scss">
.app-title {
  @apply px-4 bg-darklight-500 shadow flex items-center;
  position: sticky;
  top: 0;
  height: 40px;

  .title {
    @apply text-base text-white pr-3 mr-3;
    @apply border-r border-darklight-400;

    sup {
      @apply text-white;
    }
  }

  .subtitle {
    @apply text-gray-400;
  }

  a {
    @apply underline;
  }
}
</style>
