// DreamTime.
// Copyright (C) DreamNet. All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License 3.0 as published by
// the Free Software Foundation.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
//
// Written by Ivan Bravo Bravo <ivan@dreamnet.tech>, 2019.

const fs = require('fs-extra')
const logger = require('logplease').create('electron:scripts:settings:user')

const { BaseSettings } = require('./base')
const { paths } = require('../../tools')
const { AppError } = require('../error')

class UserSettings extends BaseSettings {
  /**
   * @type {string}
   */
  _path

  /**
   * Prepare the settings.
   */
  async setup() {
    this._path = paths.getUserDataPath('settings.json')

    await this._create()
  }

  /**
   *
   */
  async _defaults() {
    return {
      version: 3,
      welcome: true,

      notifications: {
        update: true,
      },

      telemetry: {
        enabled: true,
      },
    }
  }

  /**
   * Create the settings file if it does not exist
   */
  async _create() {
    const defaults = await this._defaults()

    if (fs.existsSync(this._path)) {
      return
    }

    try {
      fs.writeFileSync(this._path, JSON.stringify(defaults, null, 2))
    } catch (error) {
      throw new AppError(
        'There was a problem creating the application settings file. Please make sure the program has write permissions.',
        { error },
      )
    }
  }

  /**
   * Load the settings file.
   */
  async load() {
    this.payload = JSON.parse(fs.readFileSync(this._path))

    logger.info('🔧 User settings loaded.')
    // logger.debug(this.payload)
  }

  /**
   * Save the settings.
   * This function is called automatically if you set a first level variable.
   */
  async save() {
    const payload = JSON.stringify(this.payload, null, 2)
    fs.writeFileSync(this._path, payload)

    if ($rollbar) {
      $rollbar.configure({
        payload: {
          settings: this.payload,
        },
      })
    }
  }
}

export const userSettings = UserSettings.make()
