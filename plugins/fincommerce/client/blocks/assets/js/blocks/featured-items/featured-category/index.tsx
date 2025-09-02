/**
 * External dependencies
 */
import { folderStarred } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/featured-items/featured-category/style.scss';
import '@fincommerce/block-library/assets/js/blocks/featured-items/featured-category/editor.scss';
import Block from '@fincommerce/block-library/assets/js/blocks/featured-items/featured-category/block';
import metadata from '@fincommerce/block-library/assets/js/blocks/featured-items/featured-category/block.json';
import { register } from '@fincommerce/block-library/assets/js/blocks/featured-items/register';
import { example } from '@fincommerce/block-library/assets/js/blocks/featured-items/featured-category/example';

register( Block, example, metadata, {
	icon: {
		src: (
			<Icon
				icon={ folderStarred }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
} );
