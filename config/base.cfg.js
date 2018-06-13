const path = require('path');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
};

module.exports = {
  // devtool: 'source-map',
  entry: {
    bundle: PATHS.src + '/index.js'
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[hash:7].js'
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'pug': path.resolve(__dirname, '../src/pug'),
      'icons': path.resolve(__dirname, '../src/images/icons'),
      'images': path.resolve(__dirname, '../src/images'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          query: {}
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, '../src/'),
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        // exclude: path.resolve(__dirname, '../src/images/icons/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          'svg-transform-loader'
        ]
      }
    ]
  }
};

