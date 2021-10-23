const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { readdirSync } = require('fs')
const { NoEmitOnErrorsPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const baseConfig = require('./base.cfg');
const PATHS = require('./paths.js');


const plugins = [
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
	new NoEmitOnErrorsPlugin(),
	new ForkTsCheckerWebpackPlugin({
		typescript: {
			configFile: PATHS.root + '/tsconfig.json',
		},
		eslint: {
			files: PATHS.src + '/**/*.{ts,tsx,js,jsx}',
		},
		async: true,
		logger: { infrastructure: 'silent', issues: 'silent', devServer: false }
	}),
]

function checkEnvFiles() {
	const filesOnRoot = readdirSync(PATHS.root)
	let env = null;
	let envDevelopment = null;
	filesOnRoot.forEach(file => {
		if(file === '.env.development') {
			envDevelopment = file
		}
		if(file === '.env') {
			env = file
		}
	})
	return envDevelopment || env
}

const envFile = checkEnvFiles()

if(envFile) {
	plugins.push(new Dotenv({
		path: PATHS.root + '/' + envFile
	}))
}

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
	plugins,
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
				include: PATHS.public,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[contenthash][ext]',
				},
			},
			{
				test: /\.svg$/,
				exclude: PATHS.packagesExcludePath,
				issuer: /\.(s?css|sass)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[contenthash][ext]',
				},
			},
			{
				test: /\.svg$/,
				exclude: [PATHS.packagesExcludePath, PATHS.public],
				issuer: /\.(js|ts)x?$/,
				use: '@svgr/webpack',
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
