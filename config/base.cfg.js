const PATHS = require('./paths.js');

module.exports = {
  context: PATHS.src,
  entry: {
    bundle: PATHS.src + '/index.js'
  },

  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'src': PATHS.src,
      'static': PATHS.static,
      'icons': PATHS.static + '/images/icons',
      'images': PATHS.static + '/images',
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: PATHS.nodeModules,
        use: {
          loader: 'babel-loader'
        }
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
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  }
};

