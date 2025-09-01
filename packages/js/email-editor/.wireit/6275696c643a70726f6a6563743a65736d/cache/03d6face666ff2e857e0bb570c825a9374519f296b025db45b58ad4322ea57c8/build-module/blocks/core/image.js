import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
const imageEditCallback = createHigherOrderComponent((BlockEdit) => function alterBlocksEdits(props) {
    if (props.name !== 'core/image') {
        return _jsx(BlockEdit, { ...props });
    }
    // Because we cannot support displaying the modal with image after clicking in the email we have to hide the toggle
    const deactivateToggleCss = `
        .components-tools-panel .components-toggle-control { display: none; }
      `;
    return (_jsxs(_Fragment, { children: [_jsx(BlockEdit, { ...props }), _jsx(InspectorControls, { children: _jsx("style", { children: deactivateToggleCss }) })] }));
}, 'imageEditCallback');
/**
 * Because CSS property filter is not supported in almost 50% of email clients we have to disable it
 */
function disableImageFilter() {
    addFilter('blocks.registerBlockType', 'fincommerce-email-editor/deactivate-image-filter', (settings, name) => {
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
    addFilter('editor.BlockEdit', 'fincommerce-email-editor/hide-expand-on-click', imageEditCallback);
}
export { hideExpandOnClick, disableImageFilter };
