const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const paths = require('./paths')

const config = [{ site: 'mshrms' }]

const entryHtmlPlugins = config.map(({ site }) => {
  return new HtmlWebPackPlugin({
    filename: `${site}/index.html`,
    template: path.join(paths.src, site, 'template.html'),
    favicon: path.join(paths.src, site, 'favicon.png'),
    chunks: [site],
  })
})

const entry = config.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.site]: {
      import: path.join(paths.src, cur.site, 'index.ts'),
    },
  }),
  {},
)

module.exports = {
  entry,

  output: {
    path: paths.build,
    filename: '[name]/bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
      ...entryHtmlPlugins
  ],

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
}
