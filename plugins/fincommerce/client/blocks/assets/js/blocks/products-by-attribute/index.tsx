/**
 * External dependencies
 */
import { Icon, category } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/products-by-attribute/editor.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/block.json';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ category }
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
