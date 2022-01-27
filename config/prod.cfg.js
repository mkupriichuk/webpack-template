const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMQPackerPlugin = require('./helpers/CssMQPackerPlugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin');
const PATHS = require('./paths.js');
const baseConfig = require('./base.cfg');

module.exports = merge(baseConfig, {
	target: 'browserslist',
	output: {
		publicPath: '',
		clean: true,
	},
	mode: 'production',
	// devtool: 'source-map',
	optimization: {
		minimize: true,
		runtimeChunk: false,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				default: {
					minChunks: 1,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)[1];
						return `npm.${packageName.replace(/@/g, '')}`;
					},
					priority: -10,
				},
			},
		},
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					format: {
						comments: false,
					},
					compress: {
						pure_getters: true,
						unsafe_proto: true,
						passes: 3,
						join_vars: true,
						sequences: true,
					},
					mangle: true,
				},
				extractComments: false,
				parallel: true,
			}),
			new CssMinimizerPlugin(),
		],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: PATHS.public + '/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
		// new ESLintPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: PATHS.public + '/favicons',
					to: PATHS.dist,
					context: PATHS.public,
					noErrorOnMissing: true
				},
				{
					from: PATHS.public + '/locales',
					to: PATHS.dist + '/locales',
					context: PATHS.public,
					noErrorOnMissing: true
				},
			],
		}),
		new CssMQPackerPlugin({
			cssPath: PATHS.dist + '/css',
			printResult: true,
			// blackList: ['npm']
			/* add a css files in you dont wont CssMQPackerPlugin to pack media qu.
      Expample:
        blackList: ['bundle.5e13f9fac51ff1f4e194.css']
        or ['npm'] for exclude all files with 'npm' in name (npm.bootstrap.32ccae4211943.css)
      */
		}),
		new Dotenv({
			path: PATHS.root + '/.env.production',
		}),
		new LodashModuleReplacementPlugin,
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: PATHS.root + '/tsconfig.json',
			},
			eslint: {
				files: PATHS.src + '/**/*.{ts,tsx,js,jsx}',
			},
			async: false,
			// logger: { infrastructure: 'silent', issues: 'silent', devServer: false }
		})
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|ico|webp)$/,
				exclude: PATHS.packagesExcludePath,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name].[contenthash][ext]',
				},
				use: imageLoader(),
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
						use: svgoLoader()
					},
					{
						type: 'asset/resource',
						issuer: /\.(s?css|sass)$/,
						generator: {
							filename: 'images/[name].[contenthash][ext]',
						},
						use: svgoLoader()
					},
					{
						issuer: /\.(js|ts)x?$/,
						use: ['@svgr/webpack', svgoLoader()],
					}
				]
			},
			{
				test: /\.(css|scss|sass)$/,
				exclude: /\.module\.(css|scss|sass)$/,
				use: styleLoaders(
					{
						importLoaders: 4,
					}
					// 'autoprefixer' // uncommit if u want to use autoprefixer on dev-mode
				),
			},
			{
				test: /\.module\.(css|scss|sass)$/,
				use: styleLoaders(
					{
						importLoaders: 4,
						modules: {
							localIdentName: '[hash:base64]',
						},
					}
					// 'autoprefixer' // uncommit if u want to use autoprefixer on dev-mode
				),
			},
		],
	},
});

function styleLoaders(options = {}) {
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
		{
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

	return loaders;
}

function imageLoader() {
	return [
		{
			loader: 'image-webpack-loader',
			options: {
				gifsicle: {
					interlaced: false,
				},
				optipng: {
					optimizationLevel: 7,
				},
				pngquant: {
					quality: [0.65, 0.9],
					speed: 4,
				},
				mozjpeg: {
					progressive: true,
					quality: 65,
				},
				webp: {
					quality: 75,
				},
			},
		},
	];
}

function svgoLoader() {
	return {
		loader: 'svgo-loader',
		options: {
			name: 'preset-default',
			overrides: {
				'convertPathData': false,
				'removeUselessDefs': false,
				'cleanupIDs': false,
				'convertColors': {
					params: {
						shorthex: false,
					}
				},
				'removeTitle': true
			}
		},
	};
}
