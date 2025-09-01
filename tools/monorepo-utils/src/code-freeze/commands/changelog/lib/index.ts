/**
 * External dependencies
 */
import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { readFileSync } from 'fs';

/**
 * Internal dependencies
 */
import { Logger } from '../../../../core/logger';
import { checkoutRemoteBranch } from '../../../../core/git';
import {
	addLabelsToIssue,
	createPullRequest,
} from '../../../../core/github/repo';
import { Options } from '../types';
import { getToday } from '../../get-version/lib';

/**
 * Perform changelog adjustments after Jetpack Changelogger has run.
 *
 * @param {string}  version         The original plugin version in the branch.
 * @param {string}  override        Time override.
 * @param {boolean} appendChangelog Whether to append the changelog or replace it.
 * @param {string}  tmpRepoPath     Path where the temporary repo is cloned.
 */
const updateReleaseChangelogs = async (
	version: string,
	override: string,
	appendChangelog: boolean,
	tmpRepoPath: string
) => {
	const today = getToday( override );
	const releaseDate = today.toISODate();

	const readmeFile = path.join(
		tmpRepoPath,
		'plugins',
		'fincommerce',
		'readme.txt'
	);
	const nextLogFile = path.join(
		tmpRepoPath,
		'plugins',
		'fincommerce',
		'NEXT_CHANGELOG.md'
	);

	let readme = await readFile( readmeFile, 'utf-8' );
	let nextLog = await readFile( nextLogFile, 'utf-8' );

	nextLog = nextLog.replace(
		/= (\d+\.\d+\.\d+) YYYY-mm-dd =/,
		`= ${ version } ${ releaseDate } =`
	);

	// Convert PR number to markdown link.
	nextLog = nextLog.replace(
		/\[#(\d+)\](?!\()/g,
		'[#$1](https://github.com/dieselfox1/fincommerce/pull/$1)'
	);

	if ( appendChangelog ) {
		// Append: Insert new changelog after "== Changelog ==" but before existing entries
		const changelogEntries = nextLog
			.replace(
				/^= \d+\.\d+\.\d+(-.*?)? \d{4}-\d{2}-\d{2} =\n\n\*\*FinCommerce\*\*\n\n/,
				''
			)
			.trim();
		readme = readme.replace(
			/\n+(\[See changelog for all versions\])/,
			`\n${ changelogEntries }\n\n\n$1`
		);
	} else {
		// Replace: Replace all existing changelog content with the new changelog
		readme = readme.replace(
			/== Changelog ==\n(.*?)\[See changelog for all versions\]/s,
			`== Changelog ==\n\n${ nextLog }\n\n[See changelog for all versions]`
		);
	}

	// Ensure there are exactly two empty lines between entries and 'See changelog for all versions'.
	readme = readme
		.trim()
		.replace( /\n+(\[See changelog for all versions\])/, `\n\n\n$1` );

	await writeFile( readmeFile, readme );
};

/**
 * Perform changelog operations on the release branch by submitting a pull request. The release branch is a remote branch.
 *
 * @param {Object} options       CLI options
 * @param {string} tmpRepoPath   temp repo path
 * @param {string} releaseBranch release branch name. The release branch is a remote branch on Github.
 * @return {Object} update data
 */
export const updateReleaseBranchChangelogs = async (
	options: Options,
	tmpRepoPath: string,
	releaseBranch: string
): Promise< { deletionCommitHash: string; prNumber: number } > => {
	const { owner, name, version, commitDirectToBase } = options;
	const mainVersion = version.replace( /\.\d+(-.*)?$/, '' ); // For compatibility with Jetpack changelogger which expects X.Y as version.

	try {
		// Do a full checkout so that we can find the correct PR numbers for changelog entries.
		await checkoutRemoteBranch( tmpRepoPath, releaseBranch, false );
	} catch ( e ) {
		if ( e.message.includes( "couldn't find remote ref" ) ) {
			Logger.error(
				`${ releaseBranch } does not exist on ${ owner }/${ name }.`
			);
		}
		Logger.error( e );
	}

	const git = simpleGit( {
		baseDir: tmpRepoPath,
		config: [ 'core.hooksPath=/dev/null' ],
	} );

	const branch = `update/${ version }-changelog`;

	try {
		if ( ! commitDirectToBase ) {
			await git.checkout( {
				'-b': null,
				[ branch ]: null,
			} );
		}

		Logger.notice( `Running the changelog script in ${ tmpRepoPath }` );

		execSync(
			`pnpm --filter=@fincommerce/plugin-fincommerce changelog write --add-pr-num -n -vvv --use-version ${ mainVersion }`,
			{
				cwd: tmpRepoPath,
				stdio: 'inherit',
			}
		);
		Logger.notice( `Committing deleted files in ${ tmpRepoPath }` );
		//Checkout pnpm-lock.yaml to prevent issues in case of an out of date lockfile.
		await git.checkout( 'pnpm-lock.yaml' );
		await git.add( 'plugins/fincommerce/changelog/' );
		await git.commit( `Delete changelog files from ${ version } release` );
		const deletionCommitHash = await git.raw( [ 'rev-parse', 'HEAD' ] );
		Logger.notice( `git deletion hash: ${ deletionCommitHash }` );

		Logger.notice( `Updating readme.txt in ${ tmpRepoPath }` );
		await updateReleaseChangelogs(
			version,
			options.override,
			options.appendChangelog,
			tmpRepoPath
		);

		Logger.notice(
			`Committing readme.txt changes in ${ branch } on ${ tmpRepoPath }`
		);
		await git.add( 'plugins/fincommerce/readme.txt' );
		await git.commit(
			`Update the readme files for the ${ version } release`
		);
		await git.push(
			'origin',
			commitDirectToBase ? releaseBranch : branch,
			commitDirectToBase ? [] : [ '--force' ]
		);
		await git.checkout( '.' );

		if ( commitDirectToBase ) {
			Logger.notice(
				`Changelog update was committed directly to ${ releaseBranch }`
			);
			return {
				deletionCommitHash: deletionCommitHash.trim(),
				prNumber: -1,
			};
		}
		Logger.notice( `Creating PR for ${ branch }` );
		const pullRequest = await createPullRequest( {
			owner,
			name,
			title: `Release: Prepare the changelog for ${ version }`,
			body: `This pull request was automatically generated to prepare the changelog for ${ version }`,
			head: branch,
			base: releaseBranch,
		} );
		Logger.notice( `Pull request created: ${ pullRequest.html_url }` );

		try {
			await addLabelsToIssue( options, pullRequest.number, [
				'Release',
			] );
		} catch {
			Logger.warn(
				`Could not add label "Release" to PR ${ pullRequest.number }`
			);
		}

		return {
			deletionCommitHash: deletionCommitHash.trim(),
			prNumber: pullRequest.number,
		};
	} catch ( e ) {
		Logger.error( e );
	}
};

/**
 * Perform changelog operations on a given branch by submitting a pull request.
 *
 * @param {Object} options                                 CLI options
 * @param {string} tmpRepoPath                             temp repo path
 * @param {string} releaseBranch                           release branch name
 * @param {Object} releaseBranchChanges                    update data from updateReleaseBranchChangelogs
 * @param {Object} releaseBranchChanges.deletionCommitHash commit from the changelog deletions in updateReleaseBranchChangelogs
 * @param {Object} releaseBranchChanges.prNumber           pr number created in updateReleaseBranchChangelogs
 * @return {number} Update PR number.
 */
export const updateBranchChangelog = async (
	options: Options,
	tmpRepoPath: string,
	releaseBranch: string,
	releaseBranchChanges: { deletionCommitHash: string; prNumber: number }
): Promise< number > => {
	const { owner, name, version } = options;
	const { deletionCommitHash, prNumber } = releaseBranchChanges;
	Logger.notice( `Deleting changelogs from trunk ${ tmpRepoPath }` );
	const git = simpleGit( {
		baseDir: tmpRepoPath,
		config: [ 'core.hooksPath=/dev/null' ],
	} );

	try {
		await git.checkout( releaseBranch );
		const branch = `delete/${ releaseBranch }-changelog-from-${ version }`;
		Logger.notice(
			`Committing deletions in ${ branch } on ${ tmpRepoPath }`
		);
		await git.checkout( {
			'-b': null,
			[ branch ]: null,
		} );

		try {
			await git.raw( [ 'cherry-pick', deletionCommitHash ] );
		} catch ( e ) {
			if (
				e.message.includes( 'nothing to commit, working tree clean' )
			) {
				Logger.notice(
					'Cherry-pick resulted in no changes, continuing without error.'
				);
				// No need to skip, just continue
			} else {
				throw e; // Re-throw if it's a different error
			}
		}

		await git.push( 'origin', branch, [ '--force' ] );
		Logger.notice( `Creating PR for ${ branch }` );
		const pullRequest = await createPullRequest( {
			owner,
			name,
			title: `Release: Remove ${ version } change files from ${ releaseBranch }`,
			body: `This pull request was automatically generated to remove the changefiles from ${ version } that are compiled into the \`${ releaseBranch }\` ${
				prNumber > 0 ? `branch via #${ prNumber }` : ''
			}`,
			head: branch,
			base: releaseBranch,
		} );
		Logger.notice( `Pull request created: ${ pullRequest.html_url }` );

		try {
			await addLabelsToIssue( options, pullRequest.number, [
				'Release',
			] );
		} catch {
			Logger.warn(
				`Could not add label "Release" to PR ${ pullRequest.number }`
			);
		}

		return pullRequest.number;
	} catch ( e ) {
		if ( e.message.includes( `No commits between ${ releaseBranch }` ) ) {
			Logger.notice(
				`No commits between ${ releaseBranch } and the branch, skipping the PR.`
			);
		} else if (
			e.message.includes( 'did not match any file(s) known to git' )
		) {
			Logger.notice(
				`Branch ${ releaseBranch } does not exist, skipping the PR.`
			);
		} else {
			Logger.error( e );
		}
	}
};

/**
 * Perform changelog operations on trunk by submitting a pull request.
 *
 * @param {Object} options                                 CLI options
 * @param {string} tmpRepoPath                             temp repo path
 * @param {Object} releaseBranchChanges                    update data from updateReleaseBranchChangelogs
 * @param {Object} releaseBranchChanges.deletionCommitHash commit from the changelog deletions in updateReleaseBranchChangelogs
 * @param {Object} releaseBranchChanges.prNumber           pr number created in updateReleaseBranchChangelogs
 */
export const updateTrunkChangelog = async (
	options: Options,
	tmpRepoPath: string,
	releaseBranchChanges: { deletionCommitHash: string; prNumber: number }
): Promise< number > => {
	return await updateBranchChangelog(
		options,
		tmpRepoPath,
		'trunk',
		releaseBranchChanges
	);
};

/**
 * Retrieves the FinCommerce version from the trunk branch
 *
 * @param tmpRepoPath cloned repo path
 * @return the FinCommerce version string if found, or `null` if not found.
 */
async function getTrunkfincommerceVersion(
	tmpRepoPath: string
): Promise< string | null > {
	const git = simpleGit( {
		baseDir: tmpRepoPath,
		config: [ 'core.hooksPath=/dev/null' ],
	} );

	await git.checkout( 'trunk' );

	const fincommercePhpPath = path.join(
		tmpRepoPath,
		'plugins/fincommerce/fincommerce.php'
	);
	const fileContent = readFileSync( fincommercePhpPath, 'utf8' );

	const versionMatch = fileContent.match( /\*\s+Version:\s+(\d+\.\d+)/ );
	const version = versionMatch ? versionMatch[ 1 ] : null;

	Logger.notice( `FinCommerce trunk version is ${ version }` );

	return version;
}

function getNextVersion( currentVersion: string ) {
	const parts = currentVersion.split( '.' ).map( Number );
	let major = parts[ 0 ];
	let minor = parts[ 1 ];

	minor++;

	// If minor exceeds 9, reset to 0 and increment major
	if ( minor > 9 ) {
		major++;
		minor = 0;
	}

	return `${ major }.${ minor }`;
}

/**
 * Generates a list of release branch names between the target version and the trunk version.
 * Each branch name follows the format `release/{major}.{minor}`.
 *
 * @param targetVersion the target version in the "major.minor" format (e.g., "9.5").
 * @param trunkVersion  the current trunk version in the "major.minor" format (e.g., "8.7").
 * @return An array of branch names representing all release branches between the target and trunk versions.
 */
function getTargetBranches(
	targetVersion: string,
	trunkVersion: string
): string[] {
	const [ currentMajor, currentMinor ] = trunkVersion
		.split( '.' )
		.map( Number );
	const [ targetMajor, targetMinor ] = targetVersion
		.split( '.' )
		.map( Number );

	if (
		targetMajor > currentMajor ||
		( targetMajor === currentMajor && targetMinor >= currentMinor )
	) {
		Logger.notice(
			`Target version ${ targetVersion } is greater than or equal to trunk version ${ trunkVersion }. Skipping intermediate branches.`
		);
		return [];
	}

	const branches = [];
	let version = getNextVersion( targetVersion );

	while ( version !== trunkVersion ) {
		Logger.notice( `Adding intermediate branch for version ${ version }` );
		branches.push( `release/${ version }` );
		version = getNextVersion( version );
	}

	return branches;
}

/**
 * Updates the changelogs for all intermediate branches between the trunk and the target release version.
 *
 * @param          options                                 a list of options
 * @param          tmpRepoPath                             cloned repo path
 * @param {Object} releaseBranchChanges                    update data from updateReleaseBranchChangelogs
 * @param {Object} releaseBranchChanges.deletionCommitHash commit from the changelog deletions in updateReleaseBranchChangelogs
 * @param {Object} releaseBranchChanges.prNumber           pr number created in updateReleaseBranchChangelogs
 */
export const updateIntermediateBranches = async (
	options: Options,
	tmpRepoPath: string,
	releaseBranchChanges: { deletionCommitHash: string; prNumber: number }
): Promise< void > => {
	Logger.notice(
		`Starting intermediate branches update for version ${ options.version }`
	);

	const trunkVersion = await getTrunkfincommerceVersion( tmpRepoPath );
	if ( ! trunkVersion ) {
		Logger.error( 'Could not determine FinCommerce trunk version.' );
		return;
	}

	const targetBranches = getTargetBranches( options.version, trunkVersion );
	Logger.notice(
		`Target branches to update: ${ targetBranches.join( ', ' ) }`
	);

	for ( const targetBranch of targetBranches ) {
		try {
			await updateBranchChangelog(
				options,
				tmpRepoPath,
				targetBranch,
				releaseBranchChanges
			);
		} catch ( error ) {
			Logger.error(
				`Failed to update ${ targetBranch }: ${ error.message }`
			);
		}
	}
};
