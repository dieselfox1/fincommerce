/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/breadcrumbs/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/breadcrumbs/edit';
import { queryPaginationIcon } from '@fincommerce/block-library/assets/js/blocks/breadcrumbs/icon';
import '@fincommerce/block-library/assets/js/blocks/breadcrumbs/style.scss';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ queryPaginationIcon }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );
