/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
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

const OnSaleControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;

	const deselectCallback = () => {
		setQueryAttribute( {
			fincommerceOnSale: DEFAULT_FILTERS.fincommerceOnSale,
		} );
		trackInteraction( CoreFilterNames.ON_SALE );
	};

	return (
		<ToolsPanelItem
			label={ __( 'On Sale', 'fincommerce' ) }
			hasValue={ () => query.fincommerceOnSale === true }
			isShownByDefault
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
		>
			<ToggleControl
				label={ __( 'Show only products on sale', 'fincommerce' ) }
				checked={ query.fincommerceOnSale || false }
				onChange={ ( fincommerceOnSale ) => {
					setQueryAttribute( {
						fincommerceOnSale,
					} );
					trackInteraction( CoreFilterNames.ON_SALE );
				} }
			/>
		</ToolsPanelItem>
	);
};

export default OnSaleControl;
