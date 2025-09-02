/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import { percent, Icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/edit';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/block.json';
import deprecated from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/deprecated';

const blockConfig = {
	...metadata,
	icon: (
		<Icon
			icon={ percent }
			className="wc-block-editor-components-block-icon"
		/>
	),
	edit,
	save: () => null,
	deprecated,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
