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

const { dreamlink } = require('@dreamnet/dreamlink')
const logger = require('logplease').create('electron:scripts:settings:app')

const { BaseSettings } = require('./base')

class AppSettings extends BaseSettings {
  /**
   * Prepare the settings.
   */
  async setup() {
    if (!dreamlink.started) {
      logger.warn('💔 DreamLink has not been started, it is not possible to get the application settings.')
      return
    }

    const { DreamTime } = dreamlink.databases
    this.payload = DreamTime.settings

    DreamTime.events.on('replicated', () => {
      this.payload = DreamTime.settings
    })
  }
}

export const appSettings = AppSettings.make()
