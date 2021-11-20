const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',

  mode: 'development',

  devServer: {
    historyApiFallback: true,
    static: paths.static,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
})
