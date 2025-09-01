/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const ShipmentProviders: ShipmentProvider[] = [
	...Object.values( window.wcFulfillmentSettings.providers ?? {} ),
	{
		label: __( 'Other', 'fincommerce' ),
		icon: null,
		value: 'other',
	},
];
export default ShipmentProviders;
