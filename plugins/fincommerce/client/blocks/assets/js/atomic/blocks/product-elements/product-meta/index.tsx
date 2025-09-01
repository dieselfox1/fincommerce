/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import { Icon } from '@wordpress/icons';
import { productMeta } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-meta/edit';
import save from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-meta/save';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-meta/block.json';

const blockConfig = {
	...metadata,
	icon: {
		src: (
			<Icon
				icon={ productMeta }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
	save,
	ancestor: [ 'fincommerce/single-product' ],
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
