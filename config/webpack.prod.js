const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: false,

  output: {
    path: paths.build,
    publicPath: '/',
    filename: '[name]/bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/styles.css',
      chunkFilename: '[id].css',
    }),
  ],

  optimization: {
    minimize: true,
  },
})
