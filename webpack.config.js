const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  devtool: 'inline-source-map',
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        resolve: {
          modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: true,
      }),
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
}
