const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const baseConfig = require('./base.cfg');

const pages = glob.sync('*.pug', {
  cwd: path.join(__dirname, '../src/'),
  root: '/'
}).map(page => new HtmlWebpackPlugin({
  filename: page.replace('pug', 'html'),
  template: path.join(__dirname, `../src/${page}`),
  inject: true
}));

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

const styleLoaders = ext => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true,
        publicPath: '../'
      }
    },
    'css-loader'
    // {
    //   loader: 'postcss-loader',
    //   options: {
    //     // sourceMap: true,
    //     plugins: (loader) => [
    //       require('stylelint')(stylelintCfg),
    //       require('autoprefixer')({
    //         grid:true
    //       })
    //     ]
    //   }
    // }
  ];

  if (ext) {
    loaders.push(ext);
  }

  return loaders;
};

const lintStylesOptions = {
  context: path.resolve(__dirname, '../src/sass/'),
  syntax: 'sass'
  // fix: true,
}

module.exports = merge(baseConfig, {
  devServer: {
    stats: 'errors-only',
    // contentBase: path.resolve(__dirname, '../src'),
    // watchContentBase: true,
    hot: true,
    port: 3000,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true
    },
  },
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },
  mode: 'development',
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
    ...pages,
    // new webpack.WatchIgnorePlugin([
    //   path.join(__dirname, 'node_modules'),
    //   path.join(__dirname, 'config'),
    //   path.join(__dirname, 'dist')
    // ]),
    new webpack.HotModuleReplacementPlugin(),
    // new StylelintPlugin(lintStylesOptions),
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
        use: styleLoaders('sass-loader')
      }
    ]
  }
});
