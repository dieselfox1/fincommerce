/**
 * External dependencies
 */
import { Icon, list } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-products-table-block/edit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- TypeScript expects some required properties which we already
// registered in PHP.
registerBlockType( 'fincommerce/mini-cart-products-table-block', {
	icon: (
		<Icon icon={ list } className="wc-block-editor-components-block-icon" />
	),
	edit: Edit,
	save: Save,
} );
