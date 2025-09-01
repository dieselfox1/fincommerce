"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBackgroundImageSupport = void 0;
exports.BlockCompatibilityWarnings = BlockCompatibilityWarnings;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const blocks_1 = require("@wordpress/blocks");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
const hasBackgroundImageSupport = (nameOrType) => {
    const backgroundSupport = (0, blocks_1.getBlockSupport)(nameOrType, // @ts-expect-error not yet supported in the types
    'background');
    return backgroundSupport && backgroundSupport?.backgroundImage !== false;
};
exports.hasBackgroundImageSupport = hasBackgroundImageSupport;
function BlockCompatibilityWarnings() {
    // Select the currently selected block
    const selectedBlock = (0, data_1.useSelect)((sel) => sel('core/block-editor').getSelectedBlock(), []);
    // Check if the selected block has enabled border configuration
    const hasBorderSupport = (0, blocks_1.hasBlockSupport)(selectedBlock?.name, 
    // @ts-expect-error Border is not yet supported in the types
    'border', false) ||
        // We can remove the check for __experimentalBorder after we support WordPress 6.8+.
        (0, blocks_1.hasBlockSupport)(selectedBlock?.name, 
        // @ts-expect-error Border is not yet supported in the types
        '__experimentalBorder', false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hasBorderSupport && ((0, jsx_runtime_1.jsx)(components_1.Fill, { name: "InspectorControlsBorder", children: (0, jsx_runtime_1.jsxs)(components_1.Notice, { className: "fincommerce-grid-full-width", status: "warning", isDismissible: false, children: [(0, i18n_1.__)('Border display may vary or be unsupported in some email clients.', 'fincommerce'), (0, jsx_runtime_1.jsx)("br", {}), (0, i18n_1.__)('Units other than pixels (px) lack support in old email clients.', 'fincommerce')] }) })), (0, exports.hasBackgroundImageSupport)(selectedBlock?.name) && ((0, jsx_runtime_1.jsx)(components_1.Fill, { name: "InspectorControlsBackground", children: (0, jsx_runtime_1.jsx)(components_1.Notice, { className: "fincommerce-grid-full-width", status: "warning", isDismissible: false, children: (0, i18n_1.__)('Select a background color for email clients that do not support background images.', 'fincommerce') }) }))] }));
}
