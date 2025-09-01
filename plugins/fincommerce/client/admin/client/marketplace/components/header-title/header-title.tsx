/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

export default function HeaderTitle() {
	return (
		<h1 className="fincommerce-marketplace__header-title">
			{ __( 'The FinCommerce Marketplace', 'fincommerce' ) }
		</h1>
	);
}
