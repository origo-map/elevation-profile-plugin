const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false
      })]
  },
  performance: {
    hints: false
  },
  output: {
    path: `${__dirname}/../build/js`,
    filename: 'elevation-profile.min.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'ElevationProfile'
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [{
      test: /\.(sc|c)ss$/,
      use: ['css-loader','sass-loader','postcss-loader']
    }]
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/lmsearch.css'
    })
  ]
});
