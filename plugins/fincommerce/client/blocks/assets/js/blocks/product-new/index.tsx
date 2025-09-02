/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createBlock, registerBlockType } from '@finpress/blocks';
import { Icon } from '@finpress/icons';
import { sparkles } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '@fincommerce/block-library/assets/js/utils/shared-attributes';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-new/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-new/block.json';

registerBlockType( metadata, {
	title: __( 'Newest Products', 'fincommerce' ),
	icon: {
		src: (
			<Icon
				icon={ sparkles }
				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--sparkles"
			/>
		),
	},
	attributes: {
		...sharedAttributes,
		...metadata.attributes,
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: sharedAttributeBlockTypes.filter(
					( value ) => value !== 'fincommerce/product-new'
				),
				transform: ( attributes ) =>
					createBlock( 'fincommerce/product-new', attributes ),
			},
		],
	},

	/**
	 * Renders and manages the block.
	 *
	 */
	edit: Edit,
	save() {
		return null;
	},
} );
