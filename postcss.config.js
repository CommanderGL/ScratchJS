const cssnano = require('cssnano');
const presetEnv = require('postcss-preset-env');
const postcssModules = require('postcss-modules');

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        cssnano({
            preset: "default"
        }),
        presetEnv({
            stage: 2
        })
    ]
}

module.exports = config;