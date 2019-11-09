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


const fs = require('fs')
const path = require('path')
const utils = require('electron-utils')

/**
 * Returns an absolute path depending on the parameters.
 *
 * @param {string} name Name of the base path: https://electronjs.org/docs/all#appgetpathname
 * @param {string} args Series of path segments to join into one path
 */
export const getPath = (name, ...args) => {
  const { app } = utils.api
  let folderPath

  if (name === 'app') {
    if (utils.is.development) {
      folderPath = utils.getRootPath()
    } else {
      folderPath = path.resolve(app.getPath('exe'), '../')
    }
  } else {
    folderPath = app.getPath(name)
  }

  return path.join(folderPath, ...args)
}

/**
 * Returns an absolute path based on the user data location.
 *
 * @param {string} args Series of path segments to join into one path
 */
export const getUserDataPath = (...args) => this.get('userData', ...args)

/**
 * Alias for `get('app', ...args)`
 *
 * @param {string} args Series of path segments to join into one path
 */
export const getAppPath = (...args) => this.get('app', ...args)

/**
 * Returns an absolute path based on the DreamPower location.
 *
 * @param {string} args Series of path segments to join into one path
 */
export const getDreamPowerPath = (...args) => {
  const folder = $settings.folders.cli

  if (!fs.existsSync(folder)) {
    return undefined
  }

  return path.join(folder, ...args)
}

/**
 * Returns an absolute path based on the DreamPower Checkpoints location.
 *
 * @param {string} args Series of path segments to join into one path
 */
export const getDreamPowerCheckpointsPath = (...args) => this.getDreamPowerPath('checkpoints', ...args)

/**
 *
 * @param {string} args Series of path segments to join into one path
*/
export const getCropped = (...args) => {
  let folder = $settings.folders.cropped

  if (!fs.existsSync(folder)) {
    folder = this.get('temp')
  }

  return path.join(folder, ...args)
}

export const getModels = (...args) => {
  let folder = $settings.folders.models

  if (!fs.existsSync(folder)) {
    folder = this.get('userData', 'models')
  }

  if (!fs.existsSync(folder)) {
    folder = this.get('temp')
  }

  return path.join(folder, ...args)
}

export const getMasks = (...args) => {
  let folder = $settings.folders.masks

  if (!fs.existsSync(folder)) {
    folder = this.get('userData', 'masks')
  }

  if (!fs.existsSync(folder)) {
    folder = this.get('temp')
  }

  return path.join(folder, ...args)
}
