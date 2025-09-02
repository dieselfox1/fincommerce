/**
 * External dependencies
 */
import ServerSideRender from '@finpress/server-side-render';
import { gridBlockPreview } from '@fincommerce/resource-previews';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/types';

export const ProductsByAttributeBlock = ( props: Props ): JSX.Element => {
	const { attributes, name } = props;

	if ( attributes.isPreview ) {
		return gridBlockPreview;
	}

	return <ServerSideRender block={ name } attributes={ attributes } />;
};
