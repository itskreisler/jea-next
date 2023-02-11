// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '5e06466851f849e5be58e2af6252e9f9',
  captureUncaught: true,
  captureUnhandledRejections: true
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
