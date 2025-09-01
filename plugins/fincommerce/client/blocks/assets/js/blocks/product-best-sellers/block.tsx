/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { gridBlockPreview } from '@fincommerce/resource-previews';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/types';
import { ProductBestSellersInspectorControls } from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/inspector-controls';

export const ProductBestSellersBlock = ( props: Props ): JSX.Element => {
	const { attributes, name } = props;

	if ( attributes.isPreview ) {
		return gridBlockPreview;
	}

	return (
		<div className="wc-block-product-best-sellers">
			<ProductBestSellersInspectorControls { ...props } />
			<Disabled>
				<ServerSideRender block={ name } attributes={ attributes } />
			</Disabled>
		</div>
	);
};
