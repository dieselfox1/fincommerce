/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, buttons } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute-options/block.json';
import AttributeOptionsEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute-options/edit';
import '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute-options/style.scss';

registerBlockType( metadata, {
	edit: AttributeOptionsEdit,
	attributes: metadata.attributes,
	icon: {
		src: <Icon icon={ buttons } />,
	},
	save: () => null,
} );
