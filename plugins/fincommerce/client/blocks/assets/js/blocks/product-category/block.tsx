/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import ServerSideRender from '@finpress/server-side-render';
import { Placeholder } from '@finpress/components';
import { Icon, file } from '@finpress/icons';
import { gridBlockPreview } from '@fincommerce/resource-previews';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/product-category/types';

const EmptyPlaceholder = () => (
	<Placeholder
		icon={ <Icon icon={ file } /> }
		label={ __( 'Products by Category', 'fincommerce' ) }
		className="wc-block-products-grid wc-block-products-category"
	>
		{ __(
			'No products were found that matched your selection.',
			'fincommerce'
		) }
	</Placeholder>
);

export const ProductByCategoryBlock = ( props: Props ): JSX.Element => {
	const { name, attributes } = props;
	const hasCategories = attributes.categories.length;

	if ( attributes.isPreview ) {
		return gridBlockPreview;
	}

	return hasCategories ? (
		<ServerSideRender
			block={ name }
			attributes={ attributes }
			EmptyResponsePlaceholder={ EmptyPlaceholder }
		/>
	) : (
		<>
			{ __(
				'Select at least one category to display its products.',
				'fincommerce'
			) }
		</>
	);
};
