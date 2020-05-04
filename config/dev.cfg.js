const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./base.cfg');
const stylelintCfg = require('../.stylelintrc');


const PAGES = fs
  .readdirSync('src/')
  .filter(fileName => fileName.endsWith(".html"))
  .map(
    page =>
      new HtmlWebpackPlugin({
        filename: `${page}`,
        template: path.join(__dirname, `../src/${page}`),
        inject: true
      })
  );

const imagesLoader = () => {
  return [
    {
      loader: 'file-loader',
      options: {
        context: path.resolve(__dirname, '../src/'),
        name: 'images/[name].[hash:7].[ext]'
      }
    }
  ];
};

const styleLoaders = (ext, postcss) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
        publicPath: '../'
      }
    },
    'css-loader'
  ];

  if(postcss) {
    let ldr = {
      loader: postcss,
      options: {
        // sourceMap: true,
        plugins: (loader) => [
          // require('stylelint')(stylelintCfg)
          require('autoprefixer')({
            grid: true
          })
        ]
      }
    }
    loaders.push(ldr);
  }

  if (ext) {
    loaders.push(ext);
  }

  return loaders;
};

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    stats: 'errors-only',
    hot: true,
    port: 3000,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  devtool: 'eval',
  
  plugins: [
    new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true
    }),
    ...PAGES,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       fix: true
      //     }
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/,
        exclude: /(node_modules|bower_components)/,
        use: imagesLoader()
      },
      {
        test: /\.(png)$/,
        include: /(node_modules|bower_components)/,
        use: imagesLoader()
      },
      {
        test: /\.(css)$/,
        use: styleLoaders()
      },
      {
        test: /\.(scss|sass)$/,
        use: styleLoaders('sass-loader', 'postcss-loader')
      }
    ]
  }
})
