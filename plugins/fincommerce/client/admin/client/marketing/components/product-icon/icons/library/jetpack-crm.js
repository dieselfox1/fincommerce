/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '~/utils/admin-settings';

const jetpackCrm = (
	<img
		src={ `${ WC_ASSET_URL }images/marketing/jetpack-crm.svg` }
		alt={ __( 'Jetpack CRM', 'fincommerce' ) }
	/>
);

export default jetpackCrm;
