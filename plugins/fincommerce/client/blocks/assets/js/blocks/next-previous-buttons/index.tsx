/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit } from '@fincommerce/block-library/assets/js/blocks/next-previous-buttons/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/next-previous-buttons/block.json';
import { Save } from '@fincommerce/block-library/assets/js/blocks/next-previous-buttons/save';
import { Icon } from '@fincommerce/block-library/assets/js/blocks/next-previous-buttons/icons';

// @ts-expect-error: `metadata` currently does not have a type definition in finpress core
registerBlockType( metadata, {
	icon: Icon,
	edit: Edit,
	save: Save,
} );
