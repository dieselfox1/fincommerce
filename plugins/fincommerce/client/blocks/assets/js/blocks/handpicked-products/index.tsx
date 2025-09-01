/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { getSetting } from '@fincommerce/settings';
import { Icon, stack } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/handpicked-products/editor.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/handpicked-products/block.json';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ stack }
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
	},

	edit: Edit,

	save: () => {
		return null;
	},
} );
