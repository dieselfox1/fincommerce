/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { getSetting } from '@fincommerce/settings';
import { Icon, tag } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-tag/block.json';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-tag/edit';
import '@fincommerce/block-library/assets/js/blocks/product-tag/editor.scss';

/**
 * Register and run the "Products by Tag" block.
 */
registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ tag }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		columns: {
			type: 'number',
			default: getSetting( 'defaultColumns', 3 ),
		},
		rows: {
			type: 'number',
			default: getSetting( 'defaultRows', 3 ),
		},
		tags: {
			type: 'array',
			default: [],
		},
		stockStatus: {
			type: 'array',
			default: Object.keys( getSetting( 'stockStatusOptions', [] ) ),
		},
	},

	edit: Edit,

	save: () => {
		return null;
	},
} );
