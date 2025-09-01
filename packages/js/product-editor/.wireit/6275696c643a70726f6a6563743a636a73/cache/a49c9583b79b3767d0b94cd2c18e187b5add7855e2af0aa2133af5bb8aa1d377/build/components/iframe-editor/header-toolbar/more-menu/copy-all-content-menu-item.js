"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyAllContentMenuItem = void 0;
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const blocks_1 = require("@wordpress/blocks");
const components_1 = require("@wordpress/components");
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const CopyAllContentMenuItem = () => {
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const { blocks } = (0, data_1.useSelect)((select) => {
        const { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        getBlocks, } = select(block_editor_1.store);
        return {
            blocks: getBlocks(),
        };
    }, []);
    const getText = () => {
        return (0, blocks_1.serialize)(blocks);
    };
    const recordClick = () => {
        (0, tracks_1.recordEvent)('product_iframe_editor_copy_all_content_menu_item_click');
    };
    const onCopySuccess = () => {
        createNotice('success', (0, i18n_1.__)('All content copied.', 'fincommerce'));
    };
    const ref = (0, compose_1.useCopyToClipboard)(getText, onCopySuccess);
    return ((0, element_1.createElement)(components_1.MenuItem
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ref is okay here
    , { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore ref is okay here
        ref: ref, role: "menuitem", onClick: recordClick, disabled: !blocks.length }, (0, i18n_1.__)('Copy all content', 'fincommerce')));
};
exports.CopyAllContentMenuItem = CopyAllContentMenuItem;
