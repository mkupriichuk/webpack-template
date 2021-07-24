const PATHS = require('./paths.js');

module.exports = {
  context: PATHS.src,
  entry: {
    bundle: PATHS.src + '/index.tsx'
  },

  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'src': PATHS.src,
      'public': PATHS.public,
      'icons': PATHS.public + '/images/icons',
      'images': PATHS.public + '/images',
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: PATHS.packagesExcludePath,
        use: {
          loader: 'babel-loader'
        }
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

