/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	BaseControl,
	ToggleControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { CoreFilterNames, QueryControlProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { DEFAULT_FILTERS } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';

const FeaturedProductsControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;

	const deselectCallback = () => {
		setQueryAttribute( {
			featured: DEFAULT_FILTERS.featured,
		} );
		trackInteraction( CoreFilterNames.FEATURED );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Featured', 'fincommerce' ) }
			hasValue={ () => query.featured === true }
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
		>
			<BaseControl
				id="product-collection-featured-products-control"
				label={ __( 'Featured', 'fincommerce' ) }
			>
				<ToggleControl
					label={ __( 'Show only featured products', 'fincommerce' ) }
					checked={ query.featured || false }
					onChange={ ( featured ) => {
						setQueryAttribute( {
							featured,
						} );
						trackInteraction( CoreFilterNames.FEATURED );
					} }
				/>
			</BaseControl>
		</ToolsPanelItem>
	);
};

export default FeaturedProductsControl;
