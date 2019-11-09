<template>
  <div class="donate">
    <div class="donate__header">
      <video src="/assets/videos/dreamnet.mp4" autoplay muted loop />

      <div class="donate__header__content">
        <h1>Donate to DreamNet</h1>
        <h2>Thanks to donations we can continue to offer our applications and content for free.</h2>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="donate__content">
        <div class="donate__option">
          <div class="box">
            <div class="box__photo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.donate {
  .donate__header {
    @apply relative overflow-hidden;
    height: 200px;

    video {
      @apply absolute right-0 bottom-0;
      @apply h-full w-full overflow-hidden object-none;
    }

    .donate__header__content {
      @apply absolute h-full w-full;
      @apply px-6 bg-black-70;
      @apply flex flex-col justify-center items-center;

      h1 {
        @apply text-4xl font-bold;
      }

      h2 {
        @apply text-xl;
      }
    }
  }
}
</style>
