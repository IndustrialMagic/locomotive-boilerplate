const env = process.env.NODE_ENV

export default config = Object.freeze({
    // Environments
    ENV: env,
    IS_PROD: env === 'production',
    IS_DEV: env === 'development',

    // CSS class names
    CLASS_NAME: {
        LOADING: 'is-loading',
        READY: 'is-ready',
        LOADED: 'is-loaded',
    },
})
