<template>
  <div class="c-news">
    <a
      class="twitter-timeline"
      data-lang="en"
      data-height="1200"
      data-dnt="true"
      data-theme="dark"
      data-link-color="#D67411"
      :href="`${twitterUrl}?ref_src=twsrc%5Etfw`">Tweets by DreamNetTechno</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
  </div>
</template>

<script>
const { nucleus } = $provider.services

export default {
  computed: {
    twitterUrl() {
      return nucleus.urls?.social?.twitter || 'https://twitter.com/DreamNetTechno'
    },
  },
}
</script>

<style lang="scss" scoped>
.c-news {
  width: 100%;
  max-width: 1200px;
}
</style>
