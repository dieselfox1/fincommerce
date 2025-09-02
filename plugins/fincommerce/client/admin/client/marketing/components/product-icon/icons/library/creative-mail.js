/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '~/utils/admin-settings';

const creativeMail = (
	<img
		src={ `${ WC_ASSET_URL }images/marketing/creative-mail-by-constant-contact.png` }
		alt={ __( 'Creative Mail by Constant Contact', 'fincommerce' ) }
	/>
);

export default creativeMail;
