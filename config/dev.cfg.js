const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const baseConfig = require('./base.cfg');
// const stylelintCfg = require('../.stylelintrc');
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
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: styleLoaders(
					{
						importLoaders: 1,
					}
					// 'autoprefixer' // add 'autoprefixer' to enable autoprefixer on dev
				),
			},
			{
				test: /\.module\.css$/,
				use: styleLoaders(
					{
						importLoaders: 1,
						modules: {
							localIdentName: '[local]__[sha1:hash:hex:7]',
						},
					}
					// 'autoprefixer' // add 'autoprefixer' to enable autoprefixer on dev
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
