import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import clsx from 'clsx';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { getBlockSupport, hasBlockSupport } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { justifyLeft, justifyCenter, justifyRight } from '@wordpress/icons';
import { Flex, FlexItem, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, } from '@wordpress/components';
import { BlockControls, InspectorControls, 
// @ts-expect-error No types for this exist yet.
JustifyContentControl, } from '@wordpress/block-editor';
const layoutBlockSupportKey = '__experimentalEmailFlexLayout';
function hasLayoutBlockSupport(blockName) {
    // @ts-expect-error No types for this exist yet.
    return hasBlockSupport(blockName, layoutBlockSupportKey);
}
function JustificationControls({ justificationValue, onChange, isToolbar = false, }) {
    const justificationOptions = [
        {
            value: 'left',
            icon: justifyLeft,
            label: __('Justify items left', 'fincommerce'),
        },
        {
            value: 'center',
            icon: justifyCenter,
            label: __('Justify items center', 'fincommerce'),
        },
        {
            value: 'right',
            icon: justifyRight,
            label: __('Justify items right', 'fincommerce'),
        },
    ];
    if (isToolbar) {
        const allowedValues = justificationOptions.map((option) => option.value);
        return (_jsx(JustifyContentControl, { value: justificationValue, onChange: onChange, allowedControls: allowedValues, popoverProps: {
                placement: 'bottom-start',
            } }));
    }
    return (_jsx(ToggleGroupControl, { __nextHasNoMarginBottom: true, label: __('Justification', 'fincommerce'), value: justificationValue, onChange: onChange, className: "block-editor-hooks__flex-layout-justification-controls", children: justificationOptions.map(({ value, icon, label }) => (_jsx(ToggleGroupControlOptionIcon, { value: value, icon: icon, label: label }, value))) }));
}
function LayoutControls({ setAttributes, attributes, name: blockName }) {
    const layoutBlockSupport = getBlockSupport(
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
    return (_jsxs(_Fragment, { children: [_jsx(InspectorControls, { children: _jsx(ToolsPanel, { label: __('Layout', 'fincommerce'), resetAll: resetAll, children: _jsx(ToolsPanelItem, { isShownByDefault: true, onDeselect: resetAll, hasValue: () => attributes.layout?.justifyContent || false, label: __('Justification', 'fincommerce'), children: _jsx(Flex, { children: _jsx(FlexItem, { children: _jsx(JustificationControls, { justificationValue: justifyContent, onChange: onJustificationChange }) }) }) }) }) }), _jsx(BlockControls, { group: "block", __experimentalShareWithChildBlocks: true, children: _jsx(JustificationControls, { justificationValue: justifyContent, onChange: onJustificationChange, isToolbar: true }) })] }));
}
/**
 * Filters registered block settings, extending attributes to include `layout`.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute(settings) {
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
export const withLayoutControls = createHigherOrderComponent((BlockEdit) => (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const supportLayout = hasLayoutBlockSupport(props.name);
    return [
        supportLayout && _jsx(LayoutControls, { ...props }, "layout"),
        _jsx(BlockEdit, { ...props }, "edit"),
    ];
}, 'withLayoutControls');
function BlockWithLayoutStyles({ block: BlockListBlock, props }) {
    const { attributes } = props;
    const { layout } = attributes;
    const layoutClasses = 'is-layout-email-flex is-layout-flex';
    const justify = layout?.justifyContent || 'left';
    const justificationClass = `is-content-justification-${justify}`;
    const layoutClassNames = clsx(justificationClass, layoutClasses);
    return _jsx(BlockListBlock, { ...props, className: layoutClassNames });
}
/**
 * Override the default block element to add the layout classes.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withLayoutStyles = createHigherOrderComponent((BlockListBlock) => function maybeWrapWithLayoutStyles(props) {
    const blockSupportsLayout = hasLayoutBlockSupport(props.name);
    if (!blockSupportsLayout) {
        return _jsx(BlockListBlock, { ...props });
    }
    return (_jsx(BlockWithLayoutStyles, { block: BlockListBlock, props: props }));
}, 'withLayoutStyles');
export function initializeLayout() {
    addFilter('blocks.registerBlockType', 'fincommerce-email-editor/layout/addAttribute', addAttribute);
    addFilter('editor.BlockListBlock', 'fincommerce-email-editor/with-layout-styles', withLayoutStyles);
    addFilter('editor.BlockEdit', 'fincommerce-email-editor/with-inspector-controls', withLayoutControls);
}
