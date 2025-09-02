/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '~/utils/admin-settings';

const trustpilot = (
	<img
		src={ `${ WC_ASSET_URL }images/marketing/trustpilot.png` }
		alt={ __( 'Trustpilot', 'fincommerce' ) }
	/>
);

export default trustpilot;
