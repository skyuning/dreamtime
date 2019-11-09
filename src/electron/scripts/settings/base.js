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

export class Settings {
  /**
   * The settings.
   * A Proxy will be used to get or set this information.
   *
   * @type {Object}
   */
  payload = {}

  /**
   * Create a new instance with a Proxy.
   *
   * @return {BaseSettings}
   */
  static make() {
    return new Proxy(new this(), {
      get: (obj, prop) => {
        if (prop in obj) {
          return obj[prop]
        }

        if (prop in obj.payload) {
          // The variable exists in the settings
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
  }

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
  }

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
  }
}
