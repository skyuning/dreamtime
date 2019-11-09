<template>
  <div class="news">
    <p class="title">
      Latest news
    </p>

    <div class="news__articles">
      <div v-for="post in posts" :key="post.id" class="news__article">
        <e-link :href="post.url" class="box">
          <div class="box__content">
            <p class="news__article__title">
              {{ post.title }}
            </p>

            <p class="news__article__excerpt">
              {{ post.excerpt | excerpt }}
            </p>
          </div>

          <div class="box__footer">
            <p class="news__article__date">
              {{ post.created_at | humandate }}
            </p>
          </div>
        </e-link>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
  filters: {
    excerpt(value) {
      return _.truncate(value, { length: 100 })
    },

    humandate(value) {
      const date = moment(value)
      const now = moment()
      const duration = moment.duration(date.diff(now))

      return duration.humanize(true)
    },
  },

  data: () => ({
    posts: [],
  }),

  async created() {
    this.posts = await this.getPosts()
  },

  methods: {
    getPosts() {
      return this.$ghostApi.posts.browse({ limit: 6 })
    },
  },
}
</script>

<style lang="scss">
.news {
  .title {
    @apply mb-3;
  }

  .news__articles {
    @apply flex flex-wrap;

    .news__article {
      @apply w-1/2;

      &:nth-child(odd) {
        @apply pr-3;
      }

      .box {
        @apply block;
        transition: all .2s ease-in-out;

        &:hover {
          @apply bg-darker-700 shadow;
          transform: translateY(-2px);
        }
      }

      .news__article__title {
        @apply font-bold;
      }

      .news__article__excerpt {
        @apply text-gray-400 text-sm;
      }

      .news__article__date {
        @apply text-gray-600;
      }
    }
  }
}
</style>
