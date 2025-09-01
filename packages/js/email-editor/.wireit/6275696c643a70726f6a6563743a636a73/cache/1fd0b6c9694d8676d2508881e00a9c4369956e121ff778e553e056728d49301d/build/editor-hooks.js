"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHooks = void 0;
const media_utils_1 = require("@wordpress/media-utils");
const hooks_1 = require("@wordpress/hooks");
const initHooks = () => {
    // see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/media-upload/README.md
    const replaceMediaUpload = () => media_utils_1.MediaUpload;
    (0, hooks_1.addFilter)('editor.MediaUpload', 'fincommerce/email-editor/replace-media-upload', replaceMediaUpload);
};
exports.initHooks = initHooks;
