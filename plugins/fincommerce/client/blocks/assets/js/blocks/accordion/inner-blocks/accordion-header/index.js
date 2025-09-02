/**
 * External dependencies
 */
import { SVG, Path } from '@finpress/components';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/accordion/inner-blocks/accordion-header/edit';
import save from '@fincommerce/block-library/assets/js/blocks/accordion/inner-blocks/accordion-header/save';
import metadata from '@fincommerce/block-library/assets/js/blocks/accordion/inner-blocks/accordion-header/block.json';

const icon = (
	<SVG
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.5 12.75L9.5 12.75L9.5 11.25L19.5 11.25L19.5 12.75Z"
			fill="currentColor"
		/>
		<Path d="M4.5 9.5L8.5 12L4.5 14.5L4.5 9.5Z" fill="currentColor" />
	</SVG>
);

const { name } = metadata;

export { metadata, name };

export const settings = {
	apiVersion: 3,
	icon,
	example: {},
	edit,
	save,
};

registerBlockType( metadata, settings );
