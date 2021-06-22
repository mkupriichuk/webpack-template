const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const baseConfig = require('./base.cfg');
const PATHS = require('./paths.js');

module.exports = merge(baseConfig, {
	target: 'web',
	devServer: {
		stats: 'errors-only',
		// contentBase: resolve(__dirname, '../src'),
		// watchContentBase: true,
		historyApiFallback: true,
		hot: true,
		port: 3000,
		quiet: true,
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	mode: 'development',
	// devtool: 'cheap-module-source-map',
	plugins: [
		new FriendlyErrorsWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			favicon: PATHS.public + '/favicons/favicon.ico',
			template: PATHS.public + '/index.html',
			inject: true,
		}),
		new HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
		new Dotenv({
			path: PATHS.root + '/.env.development'
		}),
		new NoEmitOnErrorsPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|ico)$/,
				exclude: PATHS.packagesExcludePath,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[hash:7][ext]',
				},
			},
			{
				test: /\.svg$/,
				exclude: PATHS.packagesExcludePath,
				issuer: /\.(css|scss|sass)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[hash:7][ext]',
				},
			},
			{
				test: /\.svg$/,
				exclude: PATHS.packagesExcludePath,
				issuer: /\.jsx?$/,
				use: '@svgr/webpack'
			},
			{
				test: /\.(css|scss|sass)$/,
				exclude: /\.module\.(css|scss|sass)$/,
				use: styleLoaders(
					{
						importLoaders: 2,
					}
					// 'autoprefixer' // uncommit if u want to use autoprefixer on dev-mode
				),
			},
			{
				test: /\.module\.(css|scss|sass)$/,
				use: styleLoaders(
					{
						importLoaders: 2,
						modules: {
							localIdentName: '[local]__[sha1:hash:hex:7]',
						},
					}
					// 'autoprefixer' // uncommit if u want to use autoprefixer on dev-mode
				),
			},
		],
	},
});

function styleLoaders(options = {}, autoprefixer) {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: '../',
			},
		},
		{
			loader: 'css-loader',
			options,
		},
		'sass-loader',
	];

	if (autoprefixer) {
		loaders.push({
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: [
						[
							'autoprefixer',
							{
								grid: true,
							},
						],
					],
				},
			},
		});
	}

	return loaders;
}
