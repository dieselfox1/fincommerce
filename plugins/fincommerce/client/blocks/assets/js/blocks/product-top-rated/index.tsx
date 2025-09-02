/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createBlock, registerBlockType } from '@finpress/blocks';
import { thumbUp } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-top-rated/block.json';
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '@fincommerce/block-library/assets/js/utils/shared-attributes';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-top-rated/edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ thumbUp }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	category: 'fincommerce',
	keywords: [ __( 'FinCommerce', 'fincommerce' ) ],
	description: __(
		'Display a grid of your top rated products.',
		'fincommerce'
	),
	attributes: {
		...sharedAttributes,
		...metadata.attributes,
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: sharedAttributeBlockTypes.filter(
					( value ) => value !== 'fincommerce/product-top-rated'
				),
				transform: ( attributes ) =>
					createBlock( 'fincommerce/product-top-rated', attributes ),
			},
		],
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit: Edit,

	save() {
		return null;
	},
} );
