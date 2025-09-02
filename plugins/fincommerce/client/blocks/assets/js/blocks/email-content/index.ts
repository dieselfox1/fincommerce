/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import Edit from '@fincommerce/block-library/assets/js/blocks/email-content/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/email-content/save';
import metadata from '@fincommerce/block-library/assets/js/blocks/email-content/block.json';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save: Save,
} );
