module.exports = {
	images: {
		domains: ['courses-top.ru']
	},
	staticPageGenerationTimeout: 1000,
	webpack(config) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [{
						name: 'preset-default',
						params: {
							override: {
								removeViewBox: false
							}
						}
					}]
				},
				titleProp: true
			},
			test: /\.svg$/
		});

		return config;
	}
};