const { join, resolve } = require('path');
const { readdirSync } = require('fs');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./base.cfg');
const stylelintCfg = require('../.stylelintrc');


const PAGES = readdirSync('src/')
  .filter(fileName => fileName.endsWith('.html'))
  .map(
    page =>
      new HtmlWebpackPlugin({
        filename: `${page}`,
        template: join(__dirname, `../src/${page}`),
        inject: true
      })
  );

const styleLoaders = (preProcessor, postcss) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    'css-loader'
  ];

  if (postcss === 'postcss-loader') {
    loaders.push({
      loader: postcss,
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

module.exports = merge(baseConfig, {
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
  devtool: 'eval',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    ...PAGES,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.svg$/,
        // exclude: resolve(__dirname, '../src/images/icons/'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7][ext]'
        }
      },
      {
        test: /\.(css)$/,
        use: styleLoaders()
      },
      {
        test: /\.(scss|sass)$/,
        use: styleLoaders('sass-loader')
      }
    ]
  }
});
