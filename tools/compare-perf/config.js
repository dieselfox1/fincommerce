const path = require( 'path' );

const getPnpmPackage = ( sourceDir ) => {
	const packageJson = require( path.join( sourceDir, 'package.json' ) );
	let pnpmPackage = 'pnpm';

	if ( packageJson.engines.pnpm ) {
		pnpmPackage = `pnpm@${ packageJson.engines.pnpm }`;
	}

	return pnpmPackage;
};

const config = {
	gitRepositoryURL: 'https://github.com/dieselfox1/fincommerce.git',
	pluginPath: '/plugins/fincommerce',
	testsPath: '/plugins/fincommerce/tests/metrics/specs',
	getSetupTestRunner: ( sourceDir ) => {
		const pnpmPackage = getPnpmPackage( sourceDir );

		return `npm install -g ${ pnpmPackage } && pnpm install --frozen-lockfile --filter="@fincommerce/plugin-fincommerce" &> /dev/null && cd plugins/fincommerce && pnpm exec playwright install chromium`;
	},
	getSetupCommand: ( sourceDir ) => {
		const pnpmPackage = getPnpmPackage( sourceDir );

		return `npm install -g ${ pnpmPackage } && pnpm install --frozen-lockfile &> /dev/null && pnpm build &> /dev/null`;
	},
	getTestCommand: ( sourceDir ) => {
		const pnpmPackage = getPnpmPackage( sourceDir );
		return `npm install -g ${ pnpmPackage } && cd plugins/fincommerce && pnpm test:metrics`;
	},
};

module.exports = config;
