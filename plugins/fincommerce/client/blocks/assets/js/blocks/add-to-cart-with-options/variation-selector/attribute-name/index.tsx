/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, heading } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute-name/block.json';
import AttributeNameEdit from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/variation-selector/attribute-name/edit';

registerBlockType( metadata, {
	edit: AttributeNameEdit,
	attributes: metadata.attributes,
	icon: {
		src: <Icon icon={ heading } />,
	},
	save: () => null,
} );
