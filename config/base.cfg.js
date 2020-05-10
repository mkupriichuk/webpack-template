const { join, resolve } = require('path');
const PATHS = {
  src: join(__dirname, '../src'),
  dist: join(__dirname, '../dist')
};

const fileLoader = (output, name) => {
  return [{
    loader: 'file-loader',
    options: {
      context: resolve(__dirname, '../src/'),
      name: name,
      outputPath: output
    }
  }];
};

module.exports = {
  // devtool: 'source-map',
  context: PATHS.src,
  entry: {
    bundle: PATHS.src + '/index.js'
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[hash:7].js'
  },
  resolve: {
    alias: {
      'src': resolve(__dirname, '../src'),
      'pug': resolve(__dirname, '../src/pug'),
      'icons': resolve(__dirname, '../src/images/icons'),
      'images': resolve(__dirname, '../src/images')
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
        test: /\.(mp4|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: fileLoader('media/', '[hash].[ext]')
      },
      {
        test: /\.(woff|woff2)$/,
        use: fileLoader('fonts/', '[name].[ext]')
      }
    ]
  }
};

