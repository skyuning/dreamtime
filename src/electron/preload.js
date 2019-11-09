const {
  AppError, settings, nucleus, rollbar,
} = require('./modules')
const DreamLinkNetwork = require('./dln')
const tools = require('./tools')

// Custom Error
window.AppError = AppError

// User settings
window.$settings = settings

// Analytics & App settings
// https://nucleus.sh/docs/gettingstarted
window.$nucleus = nucleus

// Error reporting
// https://docs.rollbar.com/docs/nodejs
window.$rollbar = rollbar

window.$engine = {
  network: DreamLinkNetwork,
}

// Tools
window.$tools = tools

// Tools (Legacy)
window.deepTools = window.$tools
