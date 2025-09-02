/**
 * External dependencies
 */
import { CustomSelectControl, PanelBody } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { ProductQueryBlock, ProductQueryBlockQuery } from '@fincommerce/block-library/assets/js/blocks/product-query/types';
import { setQueryAttribute } from '@fincommerce/block-library/assets/js/blocks/product-query/utils';

const PRESETS = [
	{
		key: 'title/asc',
		name: __( 'Sorted by title', 'fincommerce' ),
	},
	{ key: 'date/desc', name: __( 'Newest', 'fincommerce' ) },
	{
		key: 'popularity/desc',
		name: __( 'Best Selling', 'fincommerce' ),
	},
	{
		key: 'rating/desc',
		name: __( 'Top Rated', 'fincommerce' ),
	},
];

export function PopularPresets( props: ProductQueryBlock ) {
	const { query } = props.attributes;

	return (
		<PanelBody
			className="fincommerce-product-query-panel__sort"
			title={ __( 'Popular Filters', 'fincommerce' ) }
			initialOpen={ true }
		>
			<p>
				{ __( 'Arrange products by popular pre-sets.', 'fincommerce' ) }
			</p>
			<CustomSelectControl
				hideLabelFromVision={ true }
				label={ __( 'Choose among these pre-sets', 'fincommerce' ) }
				onChange={ ( option ) => {
					if ( ! option.selectedItem?.key ) return;

					const [ orderBy, order ] = option.selectedItem?.key?.split(
						'/'
					) as [
						ProductQueryBlockQuery[ 'orderBy' ],
						ProductQueryBlockQuery[ 'order' ]
					];

					setQueryAttribute( props, { order, orderBy } );
				} }
				options={ PRESETS }
				value={ PRESETS.find(
					( option ) =>
						option.key === `${ query.orderBy }/${ query.order }`
				) }
			/>
		</PanelBody>
	);
}
