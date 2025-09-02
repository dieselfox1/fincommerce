/**
 * External dependencies
 */
import { previewCategories } from '@fincommerce/resource-previews';
import type { Block } from '@finpress/blocks';

type ExampleBlock = Block[ 'example' ] & {
	attributes: {
		categoryId: 'preview' | number;
		previewCategory: ( typeof previewCategories )[ number ];
		editMode: false;
	};
};

export const example: ExampleBlock = {
	attributes: {
		categoryId: 'preview',
		previewCategory: previewCategories[ 0 ],
		editMode: false,
	},
} as const;
