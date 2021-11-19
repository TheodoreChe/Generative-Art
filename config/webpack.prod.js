const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
    mode: 'production',
    target: 'browserslist',
    output: {
        filename: '[name].[contenthash].js',
    },
});