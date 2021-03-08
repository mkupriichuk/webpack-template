const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./base.cfg');
// const stylelintCfg = require('../.stylelintrc');
const PATHS = require('./paths.js');

module.exports = merge(baseConfig, {
  target: 'web',
  devServer: {
    stats: 'errors-only',
    // contentBase: resolve(__dirname, '../src'),
    // watchContentBase: true,
    hot: true,
    port: 3000,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  mode: 'development',
  // devtool: 'cheap-module-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.static +  '/index.html',
      inject: true
    }),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        exclude: PATHS.nodeModules,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7][ext]'
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: styleLoaders('sass-loader')
        // use: styleLoaders('sass-loader', {autoprefixer: true}) // uncomment to enable autoprefixer (on dev mode)
      }
    ]
  }
});


function styleLoaders(preProcessor, options = {}) {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: arguments.length
      }
    }
    
  ];

  if (options.autoprefixer) {
    loaders.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'autoprefixer',
              {
                grid: true
              }
            ]
          ]
        }
      }
    });
  }

  if (preProcessor === 'sass-loader') {
    loaders.push('sass-loader');
  }

  return loaders;
};