var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: [
    'webpack-dev-server/client?//' + process.env.API_SERVER_NAME + ':' + process.env.API_PORT + '/webpack/sockjs-node',
    'webpack/hot/only-dev-server',
    'expose?main!./src/main.js'
  ],

  output: {
    path: 'dist/',
    publicPath: '/webpack/dist/',
    filename: 'build.js'
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules/'),
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ]
  },

  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
    },
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new AssetsPlugin({filename: 'tmp/webpack-assets.json'}),
    new BundleTracker({filename: 'tmp/webpack-stats.json'}),
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },

  devtool: '#eval-source-map',

  watchOptions: {
    poll: true,
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
