const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    target: 'web',
    output: {
        filename: '[name].js',
    },
});
