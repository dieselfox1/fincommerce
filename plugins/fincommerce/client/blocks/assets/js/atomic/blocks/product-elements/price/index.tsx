/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import { currencyDollar, Icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import save from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/save';
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price/edit';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price/block.json';

const blockConfig = {
	...metadata,
	icon: (
		<Icon
			icon={ currencyDollar }
			className="wc-block-editor-components-block-icon"
		/>
	),
	edit,
	save,
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
