/**
 * External dependencies
 */
import { createBlock, registerBlockType } from '@finpress/blocks';
import { Icon, file } from '@finpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/product-category/editor.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-category/block.json';
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '@fincommerce/block-library/assets/js/utils/shared-attributes';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-category/edit';

/**
 * Register and run the "Products by Category" block.
 */
registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ file }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		...sharedAttributes,
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: sharedAttributeBlockTypes.filter(
					( value ) => value !== 'fincommerce/product-category'
				),
				transform: ( attributes ) =>
					createBlock( 'fincommerce/product-category', {
						...attributes,
						editMode: false,
					} ),
			},
		],
	},

	edit: Edit,

	save: () => {
		return null;
	},
} );
