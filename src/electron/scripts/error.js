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

const _ = require('lodash')
const { api } = require('electron-utils')
const logger = require('logplease').create('electron:scripts:error')

export class AppError extends Error {
  constructor(message, options = {}) {
    super(message)

    this.options = {
      title: 'A problem has occurred.',
      error: undefined,
      level: 'error',
      extra: {},
      ...options,
    }
  }

  report() {
    logger.error(this.message)

    if ($rollbar.enabled) {
      const { title, level, extra } = this.options
      const error = this.options.error || Error(this.message)

      try {
        const response = $rollbar[level](error, {
          title,
          message: this.message,
          ...extra,
        })

        if (response.uuid) {
          this.message += `\nFor more information please report the following:\nhttps://rollbar.com/occurrence/uuid/?uuid=${response.uuid}`
        }
      } catch (err) {
        logger.warn('😵 There was a problem trying to report the error!')
        logger.warn(err)
      }
    }

    this.show()

    api.app.exit()
  }

  show() {
    api.dialog.showErrorBox(
      this.options.title,
      this.message,
    )
  }

  static handle(error) {
    if (!(error instanceof AppError)) {
      error = new AppError(
        _.isError(error) ? error.message : 'The program has detected an unknown error. Sorry!',
        {
          error: _.isError(error) ? error : new Error(error),
        },
      )
    }

    error.report()
  }
}
