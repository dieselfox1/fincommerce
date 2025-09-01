/**
 * External dependencies
 */
import { Icon, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/featured-items/featured-product/style.scss';
import '@fincommerce/block-library/assets/js/blocks/featured-items/featured-product/editor.scss';
import Block from '@fincommerce/block-library/assets/js/blocks/featured-items/featured-product/block';
import { register } from '@fincommerce/block-library/assets/js/blocks/featured-items/register';
import { example } from '@fincommerce/block-library/assets/js/blocks/featured-items/featured-product/example';
import metadata from '@fincommerce/block-library/assets/js/blocks/featured-items/featured-product/block.json';

register( Block, example, metadata, {
	icon: {
		src: (
			<Icon
				icon={ starEmpty }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
} );
