import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { hasBlockSupport, getBlockSupport } from '@wordpress/blocks';
import { Fill, Notice } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
export const hasBackgroundImageSupport = (nameOrType) => {
    const backgroundSupport = getBlockSupport(nameOrType, // @ts-expect-error not yet supported in the types
    'background');
    return backgroundSupport && backgroundSupport?.backgroundImage !== false;
};
export function BlockCompatibilityWarnings() {
    // Select the currently selected block
    const selectedBlock = useSelect((sel) => sel('core/block-editor').getSelectedBlock(), []);
    // Check if the selected block has enabled border configuration
    const hasBorderSupport = hasBlockSupport(selectedBlock?.name, 
    // @ts-expect-error Border is not yet supported in the types
    'border', false) ||
        // We can remove the check for __experimentalBorder after we support WordPress 6.8+.
        hasBlockSupport(selectedBlock?.name, 
        // @ts-expect-error Border is not yet supported in the types
        '__experimentalBorder', false);
    return (_jsxs(_Fragment, { children: [hasBorderSupport && (_jsx(Fill, { name: "InspectorControlsBorder", children: _jsxs(Notice, { className: "fincommerce-grid-full-width", status: "warning", isDismissible: false, children: [__('Border display may vary or be unsupported in some email clients.', 'fincommerce'), _jsx("br", {}), __('Units other than pixels (px) lack support in old email clients.', 'fincommerce')] }) })), hasBackgroundImageSupport(selectedBlock?.name) && (_jsx(Fill, { name: "InspectorControlsBackground", children: _jsx(Notice, { className: "fincommerce-grid-full-width", status: "warning", isDismissible: false, children: __('Select a background color for email clients that do not support background images.', 'fincommerce') }) }))] }));
}
