<template>
  <div class="c-photo-run" :style="previewStyle">
    <div class="run__content">
      <div v-if="run.running" class="content__item">
        <p class="text-white">
          <span><font-awesome-icon icon="running" /></span>
          <span>{{ run.timer.duration }}s</span>
        </p>
      </div>

      <div v-else-if="run.failed" class="content__item">
        <p class="text-danger-500">
          <span><font-awesome-icon icon="exclamation-circle" /></span>
          <span>Error!</span>
        </p>
      </div>

      <div v-else-if="run.finished" class="content__item">
        <p class="text-white">
          <span><font-awesome-icon icon="heart" /></span>
          <span>{{ run.timer.duration }}s</span>
        </p>
      </div>

      <div v-else class="content__item">
        <p class="text-white">
          <span><font-awesome-icon icon="clock" /></span>
        </p>
      </div>

      <div v-show="run.finished && !run.failed" class="content__item">
        <button v-tooltip="'Save photo'" class="button button--success button--sm" @click.prevent="save">
          <font-awesome-icon icon="download" />
        </button>
      </div>

      <div v-show="run.finished" class="content__item">
        <button v-tooltip="'Rerun'" class="button button--danger button--sm" @click.prevent="rerun">
          <font-awesome-icon icon="undo" />
        </button>
      </div>

      <div v-show="run.running" class="content__item">
        <button v-tooltip="'Stop'" class="button button--danger button--sm" @click.prevent="cancel">
          <font-awesome-icon icon="stop" />
        </button>
      </div>

      <div v-show="hasMaskfin" class="content__item">
        <button v-tooltip="'View maskfin'" class="button button--info button--sm" @click.prevent="$refs.maskfinDialog.showModal()">
          <font-awesome-icon icon="mask" />
        </button>
      </div>

      <div v-if="false" class="content__item">
        <button v-tooltip="'View preferences'" class="button button--info button--sm">
          <font-awesome-icon icon="sliders-h" />
        </button>
      </div>

      <div class="content__item">
        <button v-tooltip="'View terminal'" class="button button--sm" @click.prevent="$refs.terminalDialog.showModal()">
          <font-awesome-icon icon="terminal" />
        </button>
      </div>
    </div>

    <!-- Maskfin Dialog -->
    <dialog ref="maskfinDialog">
      <div class="dialog__content dialog__maskfin">
        <div class="maskfin__preview">
          <img :src="run.maskfinFile.dataURL">
        </div>

        <div class="maskfin__description">
          <p>This is the Maskfin, a mask that represents in layers the areas that the algorithm will replace with the fake nude.</p>
          <p>Click on the "Add to queue" button to add it as an additional photo, edit the layers and continue with the nudification. You can also save it to your computer, edit it with an external program and continue the nudification manually.</p>
          <p>For more information please consult the <a :href="manualURL" target="_blank">manual</a>.</p>
        </div>

        <div class="dialog__buttons">
          <button class="button" @click.prevent="addMaskToQueue">
            Add to queue
          </button>

          <button class="button button--success" @click.prevent="saveMask">
            Save
          </button>

          <button class="button button--danger" @click.prevent="$refs.maskfinDialog.close()">
            Close
          </button>
        </div>
      </div>
    </dialog>

    <!-- Terminal Dialog -->
    <dialog ref="terminalDialog">
      <div class="dialog__content">
        <div class="terminal">
          <li v-for="(item, index) in run.cli.lines" :key="index" :class="item.css">
            > {{ item.text }}
          </li>
        </div>

        <div class="dialog__buttons">
          <button class="button button--danger" @click.prevent="$refs.terminalDialog.close()">
            Close
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import { isNil } from 'lodash'
import { Nudify } from '~/modules/nudify'

const { showSaveDialogSync } = $provider.api.dialog
const { nucleus } = $provider.services

export default {
  filters: {
    size(value) {
      return Number.parseFloat(value).toFixed(2)
    },
  },

  props: {
    run: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    outputDataURL: undefined,
  }),

  computed: {
    previewDataURL() {
      return this.run.outputFile.dataURL
    },

    previewStyle() {
      if (!this.previewDataURL) {
        return {}
      }

      return { backgroundImage: `url(${this.previewDataURL})` }
    },

    hasMaskfin() {
      return this.run.maskfinFile.exists
    },

    manualURL() {
      return nucleus.urls?.docs?.manual || 'https://forum.dreamnet.tech/d/32-dreamtime-manual'
    },
  },

  watch: {
    'run.finished'(value) {
      if (value) {
        this.outputDataURL = this.run.outputFile.dataURL
      }
    },
  },

  methods: {
    save() {
      const savePath = showSaveDialogSync({
        defaultPath: this.run.outputName,
        filters: [
          { name: 'PNG', extensions: ['png'] },
          { name: 'JPG', extensions: ['jpg'] },
          { name: 'GIF', extensions: ['gif'] },
        ],
      })

      if (isNil(savePath)) {
        return
      }

      this.run.outputFile.copy(savePath)
    },

    rerun() {
      this.run.photo.rerun(this.run)
    },

    cancel() {
      this.run.photo.cancelRun(this.run)
    },

    addMaskToQueue() {
      Nudify.add(this.run.maskfinFile, { isMaskfin: true })
    },

    saveMask() {
      const savePath = showSaveDialogSync({
        defaultPath: `maskfin-${this.run.outputName}`,
        filters: [
          { name: 'PNG', extensions: ['png'] },
          { name: 'JPG', extensions: ['jpg'] },
          { name: 'GIF', extensions: ['gif'] },
        ],
      })

      if (isNil(savePath)) {
        return
      }

      this.run.maskfinFile.copy(savePath)
    },

    viewPreferences() {

    },

    viewTerminal() {

    },
  },
}
</script>

<style lang="scss">
.c-photo-run {
  @apply bg-cover bg-center border border-dark-500;
  @apply relative;
  background-image: url('~@/assets/images/background.png');
  height: 512px;

  &:hover {
    .run__content {
      @apply opacity-100;
    }
  }
}

.run__content {
  @apply opacity-0 bg-dark-500-90 w-full;
  @apply absolute bottom-0;
  @apply flex;
  transition: all .1s linear;
  height: 100px;

  .content__item {
    @apply flex-1 flex justify-center items-center;

    &:not(:first-child) {
      @apply mr-2;
    }

    .button {
      @apply w-full;
    }

    p {
      @apply font-bold text-center;

      span {
        @apply block;
      }
    }
  }
}

.dialog__maskfin {
  a {
    @apply text-primary-500 underline;
  }

  .maskfin__preview {
    @apply mb-4;
  }

  .maskfin__description {
    @apply text-sm mb-4;

    p {
      @apply mb-2;
    }
  }
}

.dialog__buttons {
  @apply flex;

  .button {
    @apply flex-1;

    &:not(:last-child) {
      @apply mr-2;
    }
  }
}

.section__preferences {
  p {
    @apply text-sm;

    .preference__name {
      @apply inline-block text-generic-300;
      width: 150px;
    }

    .preference__value {
      @apply inline-block font-bold text-generic-100;
    }
  }
}

.terminal {
  @apply p-2 mb-2 bg-black overflow-auto rounded;
  height: 400px;

  li {
    @apply font-mono text-xs text-generic-100 mb-2 block;

    &.text-danger {
      @apply text-danger-500;
    }
  }
}
</style>
