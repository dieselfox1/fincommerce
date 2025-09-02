/**
 * External dependencies
 */
import { createRoot } from '@finpress/element';
import { decodeEntities } from '@finpress/html-entities';

/**
 * Internal dependencies
 */
import { RegionPicker } from './region-picker';
import { recursivelyTransformLabels } from './utils';

const shippingZoneRegionPickerRoot = document.getElementById(
	'wc-shipping-zone-region-picker-root'
);

const options =
	recursivelyTransformLabels(
		window.shippingZoneMethodsLocalizeScript?.region_options,
		decodeEntities
	) ?? [];
const initialValues = window.shippingZoneMethodsLocalizeScript?.locations ?? [];

const ShippingApp = () => {
	return (
		<div>
			<RegionPicker options={ options } initialValues={ initialValues } />
		</div>
	);
};

if ( shippingZoneRegionPickerRoot ) {
	createRoot( shippingZoneRegionPickerRoot ).render( <ShippingApp /> );
}
