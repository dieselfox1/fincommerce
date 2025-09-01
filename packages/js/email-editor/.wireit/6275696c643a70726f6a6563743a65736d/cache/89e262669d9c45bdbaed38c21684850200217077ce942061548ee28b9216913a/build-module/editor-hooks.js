import { MediaUpload } from '@wordpress/media-utils';
import { addFilter } from '@wordpress/hooks';
export const initHooks = () => {
    // see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/media-upload/README.md
    const replaceMediaUpload = () => MediaUpload;
    addFilter('editor.MediaUpload', 'fincommerce/email-editor/replace-media-upload', replaceMediaUpload);
};
