/**
 * External dependencies
 */
import { Spinner } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import './CenteredSpinner.scss';

export const CenteredSpinner = () => {
	return (
		<div className="fincommerce-centered-spinner">
			<Spinner />
		</div>
	);
};
