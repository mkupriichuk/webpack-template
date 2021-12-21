module.exports = (api) => {
	api.cache.using(() => process.env.NODE_ENV);
	return {
		presets: [
			'@babel/preset-env',
			['@babel/preset-react', { runtime: 'automatic' }],
			'@babel/preset-typescript',
		],
		...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
		...(api.env('production') && {
			plugins: ['lodash', ['@babel/plugin-transform-runtime', { regenerator: true }]],
		}),
	};
};
