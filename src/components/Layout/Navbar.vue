<template>
  <div class="layout__navbar">
    <div class="layout__navbar__left">
      <nuxt-link v-if="$platform.requirements.all" to="/" class="layout__navbar__item">
        Nudify
      </nuxt-link>

      <nuxt-link class="layout__navbar__item" to="/settings/processing">
        DreamCloud
      </nuxt-link>

      <nuxt-link class="layout__navbar__item" to="/settings/processing">
        DreamShare
      </nuxt-link>
    </div>


    <div class="layout__navbar__right">
      <nuxt-link v-tooltip="{placement: 'bottom', content: 'About'}" class="layout__navbar__icon" to="/about">
        <font-awesome-icon icon="info-circle" />
      </nuxt-link>

      <nuxt-link v-tooltip="{placement: 'bottom', content: 'DreamNet'}" class="layout__navbar__icon" to="/community">
        <font-awesome-icon icon="code" />
      </nuxt-link>

      <nuxt-link v-tooltip="{placement: 'bottom', content: 'Settings'}" class="layout__navbar__icon" to="/settings">
        <font-awesome-icon icon="cog" />
      </nuxt-link>

      <nuxt-link v-tooltip="{placement: 'bottom', content: 'Donate'}" class="layout__navbar__icon" to="/donate">
        <font-awesome-icon icon="donate" />
      </nuxt-link>

      <!--
      <e-link v-tooltip="{placement: 'bottom', content: 'Donate crypto'}" class="layout__navbar__icon" :href="$dream.settings.urls.coinbase">
        <font-awesome-icon :icon="['fab', 'bitcoin']" />
      </e-link>

      <e-link v-tooltip="{placement: 'bottom', content:'Ko-fi: Donate coffee'}" class="layout__navbar__icon" :href="$dream.settings.urls.kofi">
        <font-awesome-icon icon="coffee" />
      </e-link>

      <e-link v-tooltip="{placement: 'bottom', content:'Patreon'}" class="layout__navbar__icon" :href="$dream.settings.urls.patreon">
        <font-awesome-icon :icon="['fab', 'patreon']" />
      </e-link>
      -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.layout__navbar {
  @apply flex bg-darker-500;
  height: 50px;

  .layout__navbar__left,
  .layout__navbar__right {
    @apply flex-1 flex items-center;
  }

  .layout__navbar__right {
    @apply justify-end;
  }

  .layout__navbar__item {
    @apply mx-4 border-b-2 border-transparent;

    &:hover {
      @apply text-primary-500 border-primary-500;
    }
  }

  .layout__navbar__icon {
    @apply mx-4;

    &:hover {
      @apply text-primary-500;
    }
  }
}
</style>
