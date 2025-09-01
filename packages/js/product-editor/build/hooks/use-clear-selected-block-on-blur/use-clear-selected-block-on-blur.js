"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClearSelectedBlockOnBlur = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const block_editor_1 = require("@wordpress/block-editor");
// This is a workaround to hide the toolbar when the block is blurred.
// This is a temporary solution until using Gutenberg 18 with the
// fix from https://github.com/WordPress/gutenberg/pull/59800
const useClearSelectedBlockOnBlur = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore No types for this exist yet.
    const { clearSelectedBlock } = (0, data_1.useDispatch)(block_editor_1.store);
    function handleBlur(event) {
        const isToolbarOrLinkPopover = event?.relatedTarget?.closest('.block-editor-block-contextual-toolbar') || event?.relatedTarget?.closest('.block-editor-link-control');
        if (!isToolbarOrLinkPopover) {
            clearSelectedBlock();
        }
    }
    return {
        handleBlur,
    };
};
exports.useClearSelectedBlockOnBlur = useClearSelectedBlockOnBlur;
