const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const { merge } = require('webpack-merge')

module.exports = ({ mode = "production", presets = [] }) => merge({
  mode,
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProgressPlugin()
  ]
}, 
  modeConfig(mode)
)
