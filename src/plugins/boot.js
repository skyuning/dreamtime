import Vue from 'vue'
import moment from 'moment'
import tippy from 'tippy.js'
import BaseMixin from '~/mixins/BaseMixin'
import {
  app, platform, updater, nudify, WebError,
} from '~/modules'


const debug = require('debug').default('app:plugins:boot')

if (process.env.NODE_ENV === 'development') {
  // Development stuff
  localStorage.debug = 'app:*'
}

// Lift off!
debug('Lift off!', {
  env: process.env.NODE_ENV,
  isStatic: $tools.utils.pack.isStatic(),
})

// Base Mixin
Vue.mixin(BaseMixin)

// MomentJS
moment.locale('en')

// TippyJS
tippy.setDefaults({
  delay: 100,
  arrow: true,
  arrowType: 'round',
})

/**
 * Initialize the main modules.
 */
async function init(inject) {
  // User settings
  await $settings.init()
  inject('settings', $settings)

  // App analytics & settings
  await $nucleus.init()
  inject('nucleus', $nucleus)

  // Error reporting
  $rollbar.init()
}

/**
 * Initialize the error handlers.
 * We want to capture any errors and show our own messages.
 */
function initErrorHandlers() {
  // Errors
  window.addEventListener('error', (error) => {
    debug('Error captured', {
      error,
      type: typeof error,
    })

    WebError.handle(error)
    return true
  })

  // Promise rejections
  window.addEventListener('unhandledrejection', (rejection) => {
    debug('Unhandled rejection captured', {
      error: rejection.reason,
      type: typeof rejection.reason,
    })

    WebError.handle(rejection.reason)
    return true
  })

  // Vue errors
  Vue.config.errorHandler = (err) => {
    WebError.handle(err)
    throw err
  }
}

/**
 * Initialize all remaining modules
 */
async function initModules(inject) {
  // Platform information
  await platform.init()
  inject('platform', platform)

  // DreamTime information
  app.init()
  window.$dream = app
  window.$app = app
  inject('dream', app)
  inject('app', app)

  // Updates information
  updater.init()
  inject('updater', updater)

  // Nudify process
  nudify.init()
  inject('nudify', nudify)

  // DreamLinkNetwork
  $engine.network.init()
}

export default async (ctx, inject) => {
  await init(inject)

  initErrorHandlers()

  await initModules(inject)

  // Debug
  debug('Front-end ready!', {
    paths: {
      root: $tools.paths.getRoot(),
      gui: $tools.paths.getGui(),
      cli: $tools.paths.getCli(),
      checkpoints: $tools.paths.getCheckpoints(),
      userData: $tools.paths.getUserData(),
      cropped: $tools.paths.getCropped(),
      models: $tools.paths.getModels(),
      masks: $tools.paths.getMasks(),
      utils: {
        getRootPath: $tools.utils.getRootPath(),
        appPath: $tools.utils.api.app.getAppPath(),
        exePath: $tools.utils.api.app.getPath('exe'),
      },
    },
  })
}
