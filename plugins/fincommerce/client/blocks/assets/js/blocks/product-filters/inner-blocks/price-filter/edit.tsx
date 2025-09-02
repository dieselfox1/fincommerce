/**
 * External dependencies
 */
import {
	BlockContextProvider,
	useBlockProps,
	InnerBlocks,
} from '@finpress/block-editor';
import { useCollectionData } from '@fincommerce/base-context/hooks';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { getAllowedBlocks } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/get-allowed-blocks';
import { getPriceFilterData } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-filter/utils';
import { InitialDisabled } from '@fincommerce/block-library/assets/js/blocks/product-filters/components/initial-disabled';

const Edit = () => {
	const blockProps = useBlockProps();

	const { data, isLoading } = useCollectionData( {
		queryPrices: true,
		queryState: {},
		isEditor: true,
	} );

	return (
		<div { ...blockProps }>
			<InitialDisabled>
				<BlockContextProvider
					value={ {
						filterData: {
							price: getPriceFilterData( data ),
							isLoading,
						},
					} }
				>
					<InnerBlocks
						allowedBlocks={ getAllowedBlocks() }
						template={ [
							[
								'core/heading',
								{
									level: 3,
									content: __( 'Price', 'fincommerce' ),
									style: {
										spacing: {
											margin: {
												bottom: '0.625rem',
												top: '0',
											},
										},
									},
								},
							],
							[ 'fincommerce/product-filter-price-slider', {} ],
						] }
					/>
				</BlockContextProvider>
			</InitialDisabled>
		</div>
	);
};

export default Edit;
