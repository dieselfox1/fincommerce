/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import {
	TProductCollectionOrder,
	TProductCollectionOrderBy,
	QueryControlProps,
	CoreFilterNames,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { DEFAULT_QUERY } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import OrderByControl from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-controls/order-by-control/order-by-control';

const orderOptions = [
	{
		label: __( 'A → Z', 'fincommerce' ),
		value: 'title/asc',
	},
	{
		label: __( 'Z → A', 'fincommerce' ),
		value: 'title/desc',
	},
	{
		label: __( 'Newest to oldest', 'fincommerce' ),
		value: 'date/desc',
	},
	{
		label: __( 'Oldest to newest', 'fincommerce' ),
		value: 'date/asc',
	},
	{
		label: __( 'Price, high to low', 'fincommerce' ),
		value: 'price/desc',
	},
	{
		label: __( 'Price, low to high', 'fincommerce' ),
		value: 'price/asc',
	},
	{
		label: __( 'Sales, high to low', 'fincommerce' ),
		value: 'sales/desc',
	},
	{
		label: __( 'Sales, low to high', 'fincommerce' ),
		value: 'sales/asc',
	},
	{
		value: 'rating/desc',
		label: __( 'Rating, high to low', 'fincommerce' ),
	},
	{
		value: 'rating/asc',
		label: __( 'Rating, low to high', 'fincommerce' ),
	},
	{
		// In FinCommerce, "Manual (menu order + name)" refers to a custom ordering set by the store owner.
		// Products can be manually arranged in the desired order in the FinCommerce admin panel.
		value: 'menu_order/asc',
		label: __( 'Manual (menu order + name)', 'fincommerce' ),
	},
	{
		value: 'random',
		label: __( 'Random', 'fincommerce' ),
	},
];

const CustomQueryOrderByControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;
	const { order, orderBy } = query;

	const deselectCallback = () => {
		setQueryAttribute( { orderBy: DEFAULT_QUERY.orderBy } );
		trackInteraction( CoreFilterNames.ORDER );
	};

	let orderValue = order ? `${ orderBy }/${ order }` : orderBy;

	// This is to provide backward compatibility as we removed the 'popularity' (Best Selling) option from the order options.
	if ( orderBy === 'popularity' ) {
		orderValue = `sales/${ order }`;
	}

	return (
		<OrderByControl
			selectedValue={ orderValue }
			hasValue={ () =>
				order !== DEFAULT_QUERY.order ||
				orderBy !== DEFAULT_QUERY.orderBy
			}
			orderOptions={ orderOptions }
			onChange={ ( value: string ) => {
				const [ newOrderBy, newOrder ] = value.split( '/' );
				setQueryAttribute( {
					orderBy: newOrderBy as TProductCollectionOrderBy,
					order: ( newOrder as TProductCollectionOrder ) || undefined,
				} );
				trackInteraction( CoreFilterNames.ORDER );
			} }
			onDeselect={ deselectCallback }
			help={ __(
				'Set the products order in this collection.',
				'fincommerce'
			) }
		/>
	);
};

export default CustomQueryOrderByControl;
