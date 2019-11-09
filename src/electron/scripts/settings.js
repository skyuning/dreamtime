const fs = require('fs')
const _ = require('lodash')
const { uuid, api } = require('electron-utils')
const debug = require('debug').default('app:electron:modules:settings')

const tools = require('../tools')

/**
 * User settings.
 * This class is responsible for loading, saving and offering easy access to the user settings.
 *
 * Examples:
 * settings.processing.device -> 'CPU'
 *
 * settings.telemetry.enabled = false
 * settings.save()
 */
const settings = {
  // The user settings.
  // A Proxy will be used to get or set this information easily.
  payload: {},

  /**
   * Initialize the settings
   */
  async setup() {
    this._path = tools.paths.getUserData('settings.json')

    await this._initDefault()

    await this._create()

    this.load()

    await this._upgrade()
  },

  /**
   * Initialize the default settings
   */
  async _initDefault() {
    const graphics = await tools.system.graphics()

    this._default = {
      version: 2,
      welcome: true,
      user: uuid(),

      processing: {
        device: graphics.length > 0 ? 'GPU' : 'CPU',
        gpus: [0],
        usePython: process.env.NODE_ENV === 'development',
      },

      preferences: {
        boobs: {
          size: '1',
          randomize: true,
          progressive: true,
        },
        areola: {
          size: '1',
          randomize: false,
          progressive: true,
        },
        nipple: {
          size: '1',
          randomize: false,
          progressive: true,
        },
        vagina: {
          size: '0.75',
          randomize: true,
          progressive: true,
        },
        pubicHair: {
          size: '1',
          randomize: true,
          progressive: true,
        },

        executions: 1,
        randomizePreferences: false,
        progressivePreferences: false,

        useWaifu: false, // weebs out 😡👉🚪
        useRestoration: true,
        useCustomMask: false,
      },

      notifications: {
        run: false,
        allRuns: true,
        update: true,
      },

      folders: {
        cropped: tools.paths.get('temp'),
        models: tools.paths.get('userData', 'models'),
        masks: tools.paths.get('userData', 'masks'),
        cli: tools.paths.getRoot('cli'),
      },

      telemetry: {
        enabled: true,
      },
    }
  },

  /**
   * Create the settings file if it does not exist
   */
  async _create() {
    if (!fs.existsSync(this._path)) {
      // Check if the file is in the old location and move it.
      // TODO: Remove in the next version.
      const oldPath = tools.paths.getRoot('settings.json')

      if (fs.existsSync(oldPath)) {
        fs.copyFileSync(oldPath, this._path)
      }
    }

    if (fs.existsSync(this._path)) {
      return
    }

    try {
      fs.writeFileSync(this._path, JSON.stringify(this._default, null, 2))
    } catch (err) {
      api.dialog.showErrorBox(
        'A problem has occurred',
        `The settings file could not be created, please make sure that the program has the necessary permissions to write to:\n${this._path}`,
      )

      api.app.exit()
    }
  },

  /**
   * Update the settings file if necessary
   */
  async _upgrade() {
    const version = this.payload.version || 1
    const currentVersion = this._default.version

    if (currentVersion === version) {
      return
    }

    if (version === 1 && currentVersion === 2) {
      const newSettings = _.cloneDeep(this.payload)

      newSettings.version = 2
      newSettings.preferences = this._default.preferences
      newSettings.notifications = this._default.notifications

      const {
        boobsSize,
        areolaSize,
        nippleSize,
        vaginaSize,
        pubicHairSize,
      } = this.payload.preferences

      newSettings.preferences.boobs.size = boobsSize
      newSettings.preferences.areola.size = areolaSize
      newSettings.preferences.nipple.size = nippleSize
      newSettings.preferences.vagina.size = vaginaSize
      newSettings.preferences.pubicHair.size = pubicHairSize

      this.set(newSettings)
    }
  },

  /**
   * Returns the value
   *
   * @param {string} path
   */
  get(path = '') {
    if (path.length === 0) {
      return this.payload
    }

    return _.get(this.payload, path)
  },

  /**
   * Set a new value in the settings
   *
   * @param {any} path
   * @param {any} payload
   */
  set(path, payload) {
    if (_.isPlainObject(path)) {
      this.payload = path
      this.save()
    }

    this.payload = _.set(this.payload, path, payload)
    this.save()
  },

  /**
   * Load the settings file.
   */
  async load() {
    this.payload = JSON.parse(fs.readFileSync(this._path))
    debug('User settings loaded!', this.payload)
  },

  /**
   * Save the settings.
   * This function is called automatically if you set a first level variable.
   */
  async save() {
    const payload = JSON.stringify(this.payload, null, 2)
    fs.writeFileSync(this._path, payload)

    if (window && window.$rollbar) {
      $rollbar.configure({
        payload: {
          settings: this.payload,
        },
      })
    }
  },
}

module.exports = new Proxy(settings, {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop]
    }

    if (prop in obj.payload) {
      // The variable exists in the settings, return its value.
      return obj.payload[prop]
    }

    return undefined
  },

  /* eslint-disable no-param-reassign */
  set: (obj, prop, value) => {
    if (!_.isNil(obj.payload)) {
      if (prop in obj.payload) {
        obj.payload[prop] = value
        obj.save()

        return true
      }
    }

    obj[prop] = value
    return true
  },
  /* eslint-enable no-param-reassign */
})
