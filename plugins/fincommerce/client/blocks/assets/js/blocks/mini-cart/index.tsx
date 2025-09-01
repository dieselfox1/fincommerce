/**
 * External dependencies
 */
import { miniCartAlt } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/mini-cart/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/mini-cart/edit';
import '@fincommerce/block-library/assets/js/blocks/mini-cart/style.scss';

const featurePluginSupport = {
	...metadata.supports,
	typography: {
		...metadata.supports.typography,
		__experimentalFontFamily: true,
		__experimentalFontWeight: true,
	},
};

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ miniCartAlt }
				className="wc-block-editor-components-block-icon wc-block-editor-mini-cart__icon"
			/>
		),
	},
	supports: {
		...featurePluginSupport,
	},
	example: {
		...metadata.example,
	},
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );

// Remove the Mini Cart template part from the block inserter.
addFilter(
	'blocks.registerBlockType',
	'fincommerce/area_mini-cart',
	function ( blockSettings, blockName ) {
		if ( blockName === 'core/template-part' ) {
			return {
				...blockSettings,
				variations: blockSettings.variations.map(
					( variation: { name: string } ) => {
						if ( variation.name === 'area_mini-cart' ) {
							return {
								...variation,
								scope: [],
							};
						}
						return variation;
					}
				),
			};
		}
		return blockSettings;
	}
);
