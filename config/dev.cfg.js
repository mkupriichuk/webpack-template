const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./base.cfg');
const PATHS = require('./paths.js');

module.exports = merge(baseConfig, {
	target: 'web',
	devServer: {
		stats: 'errors-only',
		// contentBase: resolve(__dirname, '../public'),
		// watchContentBase: true,
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
		...pageGenerator(['index.html'], { inject: true }), // inject must be set on true || 'head' || 'body' || false. See more on https://github.com/jantimon/html-webpack-plugin#options
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|ico|svg)$/,
				exclude: PATHS.packagesExcludePath,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[hash:7][ext]',
				},
			},
			{
				test: /\.(css|scss|sass)$/,
				use: styleLoaders('sass-loader'),
				// use: styleLoaders('sass-loader', {autoprefixer: true}) // uncomment to enable autoprefixer (on dev mode)
			},
		],
	},
});

function pageGenerator(pages, options = {}) {
	return pages.map(
		(page) =>
			new HtmlWebpackPlugin({
				filename: `${page}`,
				template: PATHS.src + `/${page}`,
				inject: options.inject || false,
			})
	);
}

function styleLoaders(preProcessor, options = {}) {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: '../',
			},
		},
		{
			loader: 'css-loader',
			options: {
				importLoaders: arguments.length,
			},
		},
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
								grid: true,
							},
						],
					],
				},
			},
		});
	}

	if (preProcessor === 'sass-loader') {
		loaders.push('sass-loader');
	}

	return loaders;
}
