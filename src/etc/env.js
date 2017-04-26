//

"use strict"

const MODE_ARG_NAME = "NODE_ENV"
const MODE_PRODUCTION = "production"
const MODE_DEVELOPMENT = "development"

export default {
    mode() {
        return process.env[MODE_ARG_NAME] === MODE_PRODUCTION ? MODE_PRODUCTION : MODE_DEVELOPMENT
    },
    isProd() {
        return process.env[MODE_ARG_NAME] === MODE_PRODUCTION
    },
}
