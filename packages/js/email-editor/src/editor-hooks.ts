/**
 * External dependencies
 */
import { ComponentType } from 'react';
import { MediaUpload } from '@finpress/media-utils';
import { addFilter } from '@finpress/hooks';

export const initHooks = (): void => {
	// see https://github.com/finpress/gutenberg/blob/master/packages/block-editor/src/components/media-upload/README.md
	const replaceMediaUpload = (): ComponentType => MediaUpload;
	addFilter(
		'editor.MediaUpload',
		'fincommerce/email-editor/replace-media-upload',
		replaceMediaUpload
	);
};
