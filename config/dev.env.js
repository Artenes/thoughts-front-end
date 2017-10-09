var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: '"http://api.thought.dev/v1/"',
    FACEBOOK_APP_ID: '"104558173634417"'
})
