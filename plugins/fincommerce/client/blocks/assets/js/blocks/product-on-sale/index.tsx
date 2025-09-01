/**
 * External dependencies
 */
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { Icon, percent } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/product-on-sale/block';
import '@fincommerce/block-library/assets/js/blocks/product-on-sale/editor.scss';
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '@fincommerce/block-library/assets/js/utils/shared-attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-on-sale/block.json';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ percent }
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
					( value ) => value !== 'fincommerce/product-on-sale'
				),
				transform: ( attributes ) =>
					createBlock( 'fincommerce/product-on-sale', attributes ),
			},
		],
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit( props ) {
		return <Block { ...props } />;
	},

	save() {
		return null;
	},
} );
