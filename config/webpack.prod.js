const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: false,

  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },

  optimization: {
    minimize: true,
  },
})
