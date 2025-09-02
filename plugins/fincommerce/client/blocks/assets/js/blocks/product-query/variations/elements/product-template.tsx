/**
 * External dependencies
 */
import { Icon } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { layout } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { registerElementVariation } from '@fincommerce/block-library/assets/js/blocks/product-query/variations/elements/utils';

export const CORE_NAME = 'core/post-template';
export const VARIATION_NAME = 'fincommerce/product-query/product-template';

registerElementVariation( CORE_NAME, {
	blockDescription: __(
		'Contains the block elements used to render a product, like its name, featured image, rating, and more.',
		'fincommerce'
	),
	blockIcon: <Icon icon={ layout } />,
	blockTitle: __( 'Product template', 'fincommerce' ),
	variationName: VARIATION_NAME,
	scope: [ 'block', 'inserter' ],
} );
