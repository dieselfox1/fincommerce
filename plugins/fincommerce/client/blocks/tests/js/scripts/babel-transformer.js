const babelOptions = {
	presets: [ '@babel/preset-typescript', '@finpress/babel-preset-default' ],
	plugins: [],
};

module.exports =
	require( 'babel-jest' ).default.createTransformer( babelOptions );
