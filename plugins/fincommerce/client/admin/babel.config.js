module.exports = function ( api ) {
	api.cache( true );

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						node: 'current',
					},
				},
			],
			'@babel/preset-typescript',
			'@finpress/babel-preset-default',
		],
		sourceType: 'unambiguous',
		plugins: [],
		ignore: [ 'packages/**/node_modules' ],
		env: {
			production: {},
		},
	};
};
