/**
 * External dependencies
 */
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './profile-spinner.scss';

export const ProfileSpinner = () => {
	return (
		<>
			<div
				className={ `fincommerce-profile-wizard__spinner` }
				data-testid="core-profiler-loading-screen"
			>
				<Spinner />
			</div>
		</>
	);
};
