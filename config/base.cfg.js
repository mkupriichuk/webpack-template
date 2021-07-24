const PATHS = require('./paths.js');

module.exports = {
  context: PATHS.src,
  entry: {
    bundle: PATHS.src + '/index.js'
  },

  output: {
    path: PATHS.dist,
    publicPath: '',
    filename: 'js/[name].[contenthash].js'
  },
  resolve: {
    alias: {
      'src': PATHS.src,
      'icons': PATHS.public + '/images/icons',
      'images': PATHS.public + '/images',
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
          filename: 'media/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  }
};

