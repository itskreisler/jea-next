// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: ,
  captureUncaught: true,
  captureUnhandledRejections: true
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
