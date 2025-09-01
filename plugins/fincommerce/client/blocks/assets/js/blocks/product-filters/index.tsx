/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { filterThreeLines } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/block.json';
import { Edit } from '@fincommerce/block-library/assets/js/blocks/product-filters/edit';
import { Save } from '@fincommerce/block-library/assets/js/blocks/product-filters/save';

registerBlockType( metadata, {
	icon: <Icon icon={ filterThreeLines } />,
	edit: Edit,
	save: Save,
} );
