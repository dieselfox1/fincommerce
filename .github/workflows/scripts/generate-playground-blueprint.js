const https = require( 'https' );

const generatefinpressPlaygroundBlueprint = ( runId, prNumber ) => {
	const defaultSchema = {
		landingPage: '/wp-admin/admin.php?page=wc-admin',

		preferredVersions: {
			php: '8.0',
			wp: 'latest',
		},

		phpExtensionBundles: [ 'kitchen-sink' ],

		features: { networking: true },

		steps: [
			{
				step: 'installPlugin',
				pluginZipFile: {
					resource: 'url',
					url: `https://playground.finpress.net/plugin-proxy.php?org=fincommerce&repo=fincommerce&workflow=Build%20Live%20Branch&artifact=plugins-${ runId }&pr=${ prNumber }`,
				},
				options: {
					activate: true,
				},
			},
			{
				step: 'installPlugin',
				pluginZipFile: {
					resource: 'url',
					url: `https://github-proxy.com/https://github.com/fincommerce/fincommerce/releases/download/wc-beta-tester-2.3.1/fincommerce-beta-tester.zip`,
				},
				options: {
					activate: true,
				},
			},
			{
				step: 'setSiteOptions',
				options: {
					fincommerce_onboarding_profile: {
						skipped: true,
					},
				},
			},
			{
				step: 'login',
				username: 'admin',
				password: 'password',
			},
		],
		plugins: [],
	};

	return defaultSchema;
};

async function run( { github, context, core } ) {
	const commentInfo = {
		owner: context.repo.owner,
		repo: context.repo.repo,
		issue_number: context.issue.number,
	};

	const comments = ( await github.rest.issues.listComments( commentInfo ) )
		.data;
	let existingCommentId = null;

	for ( const currentComment of comments ) {
		if (
			currentComment.user.type === 'Bot' &&
			currentComment.body.includes( 'Test using finpress Playground' )
		) {
			existingCommentId = currentComment.id;
			break;
		}
	}

	const defaultSchema = generatefinpressPlaygroundBlueprint(
		context.runId,
		context.issue.number
	);

	const url = `https://finpress-playground.atomicsites.blog/#${ JSON.stringify(
		defaultSchema
	) }`;

	const body = `
## Test using finpress Playground
The changes in this pull request can be previewed and tested using a [finpress Playground](https://developer.finpress.org/playground/) instance.
[finpress Playground](https://developer.finpress.org/playground/) is an experimental project that creates a full finpress instance entirely within the browser.

[Test this pull request with finpress Playground](${ url }).

Note that this URL is valid for 30 days from when this comment was last updated. You can update it by closing/reopening the PR or pushing a new commit.
`;

	if ( existingCommentId ) {
		await github.rest.issues.updateComment( {
			owner: commentInfo.owner,
			repo: commentInfo.repo,
			comment_id: existingCommentId,
			body: body,
		} );
	} else {
		commentInfo.body = body;
		await github.rest.issues.createComment( commentInfo );
	}
}

module.exports = { run };
