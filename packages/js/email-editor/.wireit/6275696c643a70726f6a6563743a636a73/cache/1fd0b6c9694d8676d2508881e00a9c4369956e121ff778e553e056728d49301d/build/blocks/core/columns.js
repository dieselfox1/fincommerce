"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateStackOnMobile = deactivateStackOnMobile;
exports.disableColumnsLayoutAndEnhanceColumnsBlock = disableColumnsLayoutAndEnhanceColumnsBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const compose_1 = require("@wordpress/compose");
const hooks_1 = require("@wordpress/hooks");
const columnsEditCallback = (0, compose_1.createHigherOrderComponent)((BlockEdit) => function alterBlocksEdits(props) {
    if (props.name !== 'core/columns') {
        return (0, jsx_runtime_1.jsx)(BlockEdit, { ...props });
    }
    // CSS sets opacity by the class is-disabled by the toggle component from the Gutenberg package
    // To deactivating the input we use CSS pointer-events because we want to avoid JavaScript hacks
    const deactivateToggleCss = `
      .components-panel__body .components-toggle-control .components-form-toggle { opacity: 0.3; }
      .components-panel__body .components-toggle-control .components-form-toggle__input { pointer-events: none; }
      .components-panel__body .components-toggle-control label { pointer-events: none; }
    `;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(BlockEdit, { ...props }), (0, jsx_runtime_1.jsx)(block_editor_1.InspectorControls, { children: (0, jsx_runtime_1.jsx)("style", { children: deactivateToggleCss }) })] }));
}, 'columnsEditCallback');
function deactivateStackOnMobile() {
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce-email-editor/deactivate-stack-on-mobile', columnsEditCallback);
}
const COLUMN_BLOCKS = ['core/column', 'core/columns'];
/**
 * Disables layout support for columns and column blocks because
 * the default layout `flex` add gaps between columns that it is not possible to support in emails.
 *
 * Also, enhances the columns block to support background image.
 */
function disableColumnsLayoutAndEnhanceColumnsBlock() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/disable-columns-layout', (settings, name) => {
        if (COLUMN_BLOCKS.includes(name)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
                ...settings,
                supports: {
                    ...settings.supports,
                    layout: false,
                    background: {
                        backgroundImage: true,
                    },
                },
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return settings;
    });
}
