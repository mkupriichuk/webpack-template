const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { NoEmitOnErrorsPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const baseConfig = require('./base.cfg');
const PATHS = require('./paths.js');

module.exports = merge(baseConfig, {
	target: 'web',
	stats: 'errors-only',
	devServer: {
		client: {
			overlay: {
				warnings: true,
				errors: true,
			},
		},
		historyApiFallback: true,
		hot: true,
		port: 3000,
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
		new ReactRefreshWebpackPlugin(),
		new Dotenv({
			path: PATHS.root + '/.env.development',
		}),
		new NoEmitOnErrorsPlugin(),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: PATHS.root + '/tsconfig.json',
			},
			eslint: {
				files: PATHS.src + '/**/*.{ts,tsx,js,jsx}',
			},
			async: true,
			logger: { infrastructure: 'silent', issues: 'silent', devServer: false },
		}),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|ico)$/,
				exclude: PATHS.packagesExcludePath,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[contenthash][ext]',
				},
			},
			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /url/,
						issuer: /\.(js|ts)x?$/,
						type: 'asset/resource',
						generator: {
							filename: 'images/[name].[contenthash][ext]',
						},
					},
					{
						type: 'asset/resource',
						issuer: /\.(s?css|sass)$/,
						generator: {
							filename: 'images/[name].[contenthash][ext]',
						},
					},
					{
						issuer: /\.(js|ts)x?$/,
						use: '@svgr/webpack',
					}
				]
			},
			{
				test: /\.(css|scss|sass)$/,
				exclude: /\.module\.(css|scss|sass)$/,
				use: styleLoaders(
					{
						importLoaders: 3,
					}
					// 'autoprefixer' // uncommit if u want to use autoprefixer on dev-mode
				),
			},
			{
				test: /\.module\.(css|scss|sass)$/,
				use: styleLoaders(
					{
						importLoaders: 3,
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
		{
			loader: 'sass-resources-loader',
			options: {
				resources: [
					`${PATHS.src}/styles/_helpers/_mixins.scss`,
					`${PATHS.src}/styles/_helpers/_vars.scss`,
				],
			},
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
