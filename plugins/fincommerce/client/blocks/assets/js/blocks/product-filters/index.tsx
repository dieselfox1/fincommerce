/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { filterThreeLines } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';

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
