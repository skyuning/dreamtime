/* eslint-disable-next-line */
const debug = require('debug').default('app:modules:app')

export default {
  name: process.env.APP_NAME,

  version: process.env.APP_VERSION,

  status: process.env.APP_STATUS,

  settings: {},

  /**
   *
   */
  init() {
    this.settings = $nucleus
  },
}
