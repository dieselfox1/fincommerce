/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '~/utils/admin-settings';

const klaviyo = (
	<img
		src={ `${ WC_ASSET_URL }images/marketing/klaviyo.png` }
		alt={ __( 'Klaviyo', 'fincommerce' ) }
	/>
);

export default klaviyo;
