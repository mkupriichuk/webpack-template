const { join, resolve } = require('path');
const PATHS = {
  src: join(__dirname, '../src'),
  dist: join(__dirname, '../dist')
};
module.exports = {
	context: PATHS.src,
  target: 'web',
  entry: {
    bundle: PATHS.src + '/index.js'
  },

  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'js/[name].[fullhash].js'
  },
  resolve: {
    alias: {
      'src': resolve(__dirname, '../src'),
      'icons': resolve(__dirname, '../src/images/icons'),
      'images': resolve(__dirname, '../src/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(mp4|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[hash:7][ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:7][ext]'
        }
      }
    ]
  }
};

