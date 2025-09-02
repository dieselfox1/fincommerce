/**
 * External dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockContextProvider,
} from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { InitialDisabled } from '@fincommerce/block-library/assets/js/blocks/product-filters/components/initial-disabled';
import { EXCLUDED_BLOCKS } from '@fincommerce/block-library/assets/js/blocks/product-filters/constants';
import { getAllowedBlocks } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/get-allowed-blocks';
import { filtersPreview } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/active-filters/constants';

const Edit = () => {
	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		useBlockProps(),
		{
			allowedBlocks: getAllowedBlocks( EXCLUDED_BLOCKS ),
			template: [
				[ 'fincommerce/product-filter-removable-chips' ],
				[ 'fincommerce/product-filter-clear-button' ],
			],
		}
	);

	return (
		<div { ...innerBlocksProps }>
			<InitialDisabled>
				<BlockContextProvider
					value={ {
						filterData: {
							items: filtersPreview,
						},
					} }
				>
					{ children }
				</BlockContextProvider>
			</InitialDisabled>
		</div>
	);
};

export default Edit;
