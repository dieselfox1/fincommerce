"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideExpandOnClick = hideExpandOnClick;
exports.disableImageFilter = disableImageFilter;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const compose_1 = require("@wordpress/compose");
const hooks_1 = require("@wordpress/hooks");
const imageEditCallback = (0, compose_1.createHigherOrderComponent)((BlockEdit) => function alterBlocksEdits(props) {
    if (props.name !== 'core/image') {
        return (0, jsx_runtime_1.jsx)(BlockEdit, { ...props });
    }
    // Because we cannot support displaying the modal with image after clicking in the email we have to hide the toggle
    const deactivateToggleCss = `
        .components-tools-panel .components-toggle-control { display: none; }
      `;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(BlockEdit, { ...props }), (0, jsx_runtime_1.jsx)(block_editor_1.InspectorControls, { children: (0, jsx_runtime_1.jsx)("style", { children: deactivateToggleCss }) })] }));
}, 'imageEditCallback');
/**
 * Because CSS property filter is not supported in almost 50% of email clients we have to disable it
 */
function disableImageFilter() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/deactivate-image-filter', (settings, name) => {
        if (name === 'core/image') {
            return {
                ...settings,
                supports: {
                    ...settings.supports,
                    filter: {
                        duetone: false,
                    },
                },
            };
        }
        return settings;
    });
}
function hideExpandOnClick() {
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce-email-editor/hide-expand-on-click', imageEditCallback);
}
