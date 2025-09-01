/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	// @ts-expect-error Using experimental features
	__experimentalHStack as HStack,
	// @ts-expect-error Using experimental features
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CoreFilterNames, QueryControlProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { DEFAULT_FILTERS } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import PriceTextField from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-controls/price-range-control/PriceTextField';

const PriceRangeControl = ( props: QueryControlProps ) => {
	const { query, trackInteraction, setQueryAttribute } = props;

	const value = query.priceRange;

	const deselectCallback = () => {
		setQueryAttribute( { priceRange: DEFAULT_FILTERS.priceRange } );
		trackInteraction( CoreFilterNames.PRICE_RANGE );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Price Range', 'fincommerce' ) }
			hasValue={ () => {
				return value?.min !== undefined || value?.max !== undefined;
			} }
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
			className="wc-block-product-price-range-control"
		>
			<BaseControl.VisualLabel>
				{ __( 'PRICE RANGE', 'fincommerce' ) }
			</BaseControl.VisualLabel>

			<HStack spacing="2">
				<PriceTextField
					label={ __( 'MIN', 'fincommerce' ) }
					value={ value?.min as number }
					onChange={ ( val?: number ) => {
						const min = val === 0 ? undefined : val;

						setQueryAttribute( {
							priceRange: {
								min,
								max: value?.max as number,
							},
						} );
						trackInteraction( CoreFilterNames.PRICE_RANGE );
					} }
				/>

				<PriceTextField
					label={ __( 'MAX', 'fincommerce' ) }
					value={ value?.max as number }
					onChange={ ( val?: number ) => {
						const max = val === 0 ? undefined : val;

						setQueryAttribute( {
							priceRange: {
								min: value?.min as number,
								max,
							},
						} );
						trackInteraction( CoreFilterNames.PRICE_RANGE );
					} }
				/>
			</HStack>
		</ToolsPanelItem>
	);
};

export default PriceRangeControl;
