const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const notifier = require('node-notifier');
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
    overlay: true,
    watchOptions: {
      aggregateTimeout: 100
    }
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
    // new FriendlyErrorsWebpackPlugin({
    //   onErrors: (severity, errors) => {
    //     if (severity !== 'error') {
    //       return;
    //     }
    //     const error = errors[0];
    //     notifier.notify({
    //       title: 'Compile error',
    //       message: severity + ': ' + error.name,
    //       subtitle: error.file || '',
    //       icon: path.join(__dirname, '../notify-error.png'),
    //       sound: false
    //     });
    //   }
    // }),
    ...pages,
    // new webpack.WatchIgnorePlugin([
    //   path.join(__dirname, 'node_modules'),
    //   path.join(__dirname, 'config'),
    //   path.join(__dirname, 'dist')
    // ]),
    new webpack.HotModuleReplacementPlugin(),
    new StylelintPlugin(lintStylesOptions),
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
        test: /\.(png|jpe?g|gif|ico)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, '../src/'),
              name: '[path][name].[hash:7].[ext]'
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
              name: 'images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')({
                  'browsers': ['last 2 versions', 'safari >= 7', 'ie >= 9', 'ios >= 6']
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
});
