/**
 * External dependencies
 */
import { Icon, trendingUp } from '@wordpress/icons';
import { createBlock, registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/block.json';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/edit';
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '@fincommerce/block-library/assets/js/utils/shared-attributes';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ trendingUp }
				className="wc-block-editor-components-block-icon"
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
					( value ) => value !== 'fincommerce/product-best-sellers'
				),
				transform: ( attributes ) =>
					createBlock(
						'fincommerce/product-best-sellers',
						attributes
					),
			},
		],
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit: Edit,

	save: () => {
		return null;
	},
} );
