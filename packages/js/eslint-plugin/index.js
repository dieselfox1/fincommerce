module.exports = {
	configs: {
		recommended: require( '@fincommerce/monorepo-utils/node_modules/@fincommerce/eslint-plugin/configs/recommended' ),
	},
	rules: {
		'dependency-group': require( '@fincommerce/monorepo-utils/node_modules/@fincommerce/eslint-plugin/rules/dependency-group' ),
	},
};
