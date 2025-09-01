"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLayoutStyles = exports.withLayoutControls = void 0;
exports.addAttribute = addAttribute;
exports.initializeLayout = initializeLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const compose_1 = require("@wordpress/compose");
const hooks_1 = require("@wordpress/hooks");
const blocks_1 = require("@wordpress/blocks");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const block_editor_1 = require("@wordpress/block-editor");
const layoutBlockSupportKey = '__experimentalEmailFlexLayout';
function hasLayoutBlockSupport(blockName) {
    // @ts-expect-error No types for this exist yet.
    return (0, blocks_1.hasBlockSupport)(blockName, layoutBlockSupportKey);
}
function JustificationControls({ justificationValue, onChange, isToolbar = false, }) {
    const justificationOptions = [
        {
            value: 'left',
            icon: icons_1.justifyLeft,
            label: (0, i18n_1.__)('Justify items left', 'fincommerce'),
        },
        {
            value: 'center',
            icon: icons_1.justifyCenter,
            label: (0, i18n_1.__)('Justify items center', 'fincommerce'),
        },
        {
            value: 'right',
            icon: icons_1.justifyRight,
            label: (0, i18n_1.__)('Justify items right', 'fincommerce'),
        },
    ];
    if (isToolbar) {
        const allowedValues = justificationOptions.map((option) => option.value);
        return ((0, jsx_runtime_1.jsx)(block_editor_1.JustifyContentControl, { value: justificationValue, onChange: onChange, allowedControls: allowedValues, popoverProps: {
                placement: 'bottom-start',
            } }));
    }
    return ((0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControl, { __nextHasNoMarginBottom: true, label: (0, i18n_1.__)('Justification', 'fincommerce'), value: justificationValue, onChange: onChange, className: "block-editor-hooks__flex-layout-justification-controls", children: justificationOptions.map(({ value, icon, label }) => ((0, jsx_runtime_1.jsx)(components_1.__experimentalToggleGroupControlOptionIcon, { value: value, icon: icon, label: label }, value))) }));
}
function LayoutControls({ setAttributes, attributes, name: blockName }) {
    const layoutBlockSupport = (0, blocks_1.getBlockSupport)(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    blockName, 
    // @ts-expect-error No types for this exist yet.
    layoutBlockSupportKey, {});
    if (!layoutBlockSupport) {
        return null;
    }
    const { justifyContent = 'left' } = attributes.layout || {};
    const onJustificationChange = (value) => {
        setAttributes({
            layout: {
                ...attributes.layout,
                justifyContent: value,
            },
        });
    };
    const resetAll = () => {
        const { justifyContent: _discarded, ...restLayout } = attributes.layout || {};
        setAttributes({
            layout: restLayout,
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(block_editor_1.InspectorControls, { children: (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanel, { label: (0, i18n_1.__)('Layout', 'fincommerce'), resetAll: resetAll, children: (0, jsx_runtime_1.jsx)(components_1.__experimentalToolsPanelItem, { isShownByDefault: true, onDeselect: resetAll, hasValue: () => attributes.layout?.justifyContent || false, label: (0, i18n_1.__)('Justification', 'fincommerce'), children: (0, jsx_runtime_1.jsx)(components_1.Flex, { children: (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, jsx_runtime_1.jsx)(JustificationControls, { justificationValue: justifyContent, onChange: onJustificationChange }) }) }) }) }) }), (0, jsx_runtime_1.jsx)(block_editor_1.BlockControls, { group: "block", __experimentalShareWithChildBlocks: true, children: (0, jsx_runtime_1.jsx)(JustificationControls, { justificationValue: justifyContent, onChange: onJustificationChange, isToolbar: true }) })] }));
}
/**
 * Filters registered block settings, extending attributes to include `layout`.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttribute(settings) {
    if (hasLayoutBlockSupport(settings.name)) {
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                layout: {
                    type: 'object',
                },
            },
        };
    }
    return settings;
}
/**
 * Override the default edit UI to include layout controls
 *
 * @param {Function} BlockEdit Original component.
 *
 * @return {Function} Wrapped component.
 */
exports.withLayoutControls = (0, compose_1.createHigherOrderComponent)((BlockEdit) => (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const supportLayout = hasLayoutBlockSupport(props.name);
    return [
        supportLayout && (0, jsx_runtime_1.jsx)(LayoutControls, { ...props }, "layout"),
        (0, jsx_runtime_1.jsx)(BlockEdit, { ...props }, "edit"),
    ];
}, 'withLayoutControls');
function BlockWithLayoutStyles({ block: BlockListBlock, props }) {
    const { attributes } = props;
    const { layout } = attributes;
    const layoutClasses = 'is-layout-email-flex is-layout-flex';
    const justify = layout?.justifyContent || 'left';
    const justificationClass = `is-content-justification-${justify}`;
    const layoutClassNames = (0, clsx_1.default)(justificationClass, layoutClasses);
    return (0, jsx_runtime_1.jsx)(BlockListBlock, { ...props, className: layoutClassNames });
}
/**
 * Override the default block element to add the layout classes.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
exports.withLayoutStyles = (0, compose_1.createHigherOrderComponent)((BlockListBlock) => function maybeWrapWithLayoutStyles(props) {
    const blockSupportsLayout = hasLayoutBlockSupport(props.name);
    if (!blockSupportsLayout) {
        return (0, jsx_runtime_1.jsx)(BlockListBlock, { ...props });
    }
    return ((0, jsx_runtime_1.jsx)(BlockWithLayoutStyles, { block: BlockListBlock, props: props }));
}, 'withLayoutStyles');
function initializeLayout() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/layout/addAttribute', addAttribute);
    (0, hooks_1.addFilter)('editor.BlockListBlock', 'fincommerce-email-editor/with-layout-styles', exports.withLayoutStyles);
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce-email-editor/with-inspector-controls', exports.withLayoutControls);
}
