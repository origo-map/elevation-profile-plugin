const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    path: `${__dirname}/../../origo/plugins`,
    publicPath: '/build/js',
    filename: 'elevation-profile.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'ElevationProfile'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader','css-loader','sass-loader']
    }]
  },
  devServer: {
    devMiddleware: {
      publicPath: '/build/js',
      serverSideRender: true,
      writeToDisk: true,
    },
    static: './',
    port: 9009,
    liveReload: true,
    allowedHosts: 'auto',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:9966',
      'Access-Control-Allow-Credentials': 'true',
    },
  }
});
