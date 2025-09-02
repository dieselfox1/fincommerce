/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { store as coreStore } from '@finpress/core-data';
import { dispatch, select } from '@finpress/data';
import { useState } from '@finpress/element';
import {
	CoreFilterNames,
	TrackInteraction,
} from '@fincommerce/blocks/product-collection/types';

/**
 * Internal dependencies
 */
import OrderByControl from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-controls/order-by-control/order-by-control';

const orderOptions = [
	{
		label: __( 'Newest to oldest', 'fincommerce' ),
		value: 'date',
	},
	{
		label: __( 'Price, high to low', 'fincommerce' ),
		value: 'price-desc',
	},
	{
		label: __( 'Price, low to high', 'fincommerce' ),
		value: 'price',
	},
	{
		label: __( 'Sales, high to low', 'fincommerce' ),
		value: 'popularity',
	},
	{
		label: __( 'Rating, high to low', 'fincommerce' ),
		value: 'rating',
	},
	{
		// In FinCommerce, "Manual (menu order + name)" refers to a custom ordering set by the store owner.
		// Products can be manually arranged in the desired order in the FinCommerce admin panel.
		value: 'menu_order',
		label: __( 'Manual (menu order + name)', 'fincommerce' ),
	},
];

const DefaultQueryOrderByControl = ( {
	trackInteraction,
}: {
	trackInteraction: TrackInteraction;
} ) => {
	const settings = select( 'core' ).getEditedEntityRecord(
		'root',
		'site'
	) as Record< string, string >;

	const [ value, setValue ] = useState(
		settings.fincommerce_default_catalog_orderby || 'menu_order'
	);

	const onChange = ( newValue: string ) => {
		setValue( newValue );
		dispatch( coreStore ).editEntityRecord( 'root', 'site', undefined, {
			[ `fincommerce_default_catalog_orderby` ]: newValue,
		} );
		trackInteraction( CoreFilterNames.DEFAULT_ORDER );
	};

	return (
		<OrderByControl
			label={ __( 'Default sort by', 'fincommerce' ) }
			selectedValue={ value }
			orderOptions={ orderOptions }
			onChange={ onChange }
			help={ __(
				'All Product Collection blocks using the Default Query will sync to this sort order.',
				'fincommerce'
			) }
		/>
	);
};

export default DefaultQueryOrderByControl;
