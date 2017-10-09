const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const baseConfig = require('./base.cfg');
const config = require('../.stylelintrc');

module.exports = merge(baseConfig, {
  devServer: {
    stats: 'errors-only',
    contentBase: './src',
    hot: true,
    port: 3000,
    quiet: true
  },
  plugins: [
    new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new FriendlyErrorsWebpackPlugin({
			onErrors: (severity, errors) => {
				if (severity !== 'error') {
					return;
				}
				const error = errors[0];
				notifier.notify({
					title: 'Compile error',
					message: severity + ': ' + error.name,
					subtitle: error.file || '',
					icon: path.join(__dirname, '../notify-error.png'),
					sound: false
				});
			}
		}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: 'index',
      template: path.join(__dirname, '../src/index.pug'),
      inject: true
    }),
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
              name: 'images/[name].[hash:7].[ext]',
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
              sourceMap: true,
              plugins: (loader) => [
                require('stylelint')(config),
                // require('autoprefixer')({
                //   'browsers': ['last 2 versions', 'safari >= 7', 'ie >= 9', 'ios >= 6']
                // }),
                require('postcss-browser-reporter')
              ]
            }
          },
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      }
    ]
  }
})
