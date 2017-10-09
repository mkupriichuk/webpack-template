const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./base.cfg');
const config = require('../.stylelintrc');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: 'index',
      template: path.join(__dirname, '../src/index.pug'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle.[hash:7].css',
      disable: false,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { 
        safe: true,
        discardComments: { removeAll: true }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/images/favicons'),
        to: path.resolve(__dirname, '../dist/images/favicons')
      },
      {
        from: path.resolve(__dirname, '../src/.htaccess'),
        to: path.resolve(__dirname, '../dist/')
      }
    ], {
      ignore: [
        '*.svg',
        '.gitkeep'
      ],
      copyUnmodified: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, '../src/'),
              name: '[path][name].[hash:7].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      },
      {
        test: /\.(png)$/,
        include: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:7].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap',
            {
              loader: 'postcss-loader',
              options: {
                // sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')({
                    'browsers': ['last 2 versions', 'safari >= 7', 'ie >= 9', 'ios >= 6']
                  }),
                  require('css-mqpacker')({
                    sort: sortMediaQueries
                  })
                ]
              }
            },
            // 'resolve-url-loader',
            'sass-loader' // sass-loader?sourceMap  when 'resolve-url-loader' enabled
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
	A = a.replace(/\D/g, '');
	B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }
  return 1;
}
