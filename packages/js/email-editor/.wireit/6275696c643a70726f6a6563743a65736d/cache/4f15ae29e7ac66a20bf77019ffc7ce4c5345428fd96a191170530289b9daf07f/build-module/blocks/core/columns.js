import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
const columnsEditCallback = createHigherOrderComponent((BlockEdit) => function alterBlocksEdits(props) {
    if (props.name !== 'core/columns') {
        return _jsx(BlockEdit, { ...props });
    }
    // CSS sets opacity by the class is-disabled by the toggle component from the Gutenberg package
    // To deactivating the input we use CSS pointer-events because we want to avoid JavaScript hacks
    const deactivateToggleCss = `
      .components-panel__body .components-toggle-control .components-form-toggle { opacity: 0.3; }
      .components-panel__body .components-toggle-control .components-form-toggle__input { pointer-events: none; }
      .components-panel__body .components-toggle-control label { pointer-events: none; }
    `;
    return (_jsxs(_Fragment, { children: [_jsx(BlockEdit, { ...props }), _jsx(InspectorControls, { children: _jsx("style", { children: deactivateToggleCss }) })] }));
}, 'columnsEditCallback');
function deactivateStackOnMobile() {
    addFilter('editor.BlockEdit', 'fincommerce-email-editor/deactivate-stack-on-mobile', columnsEditCallback);
}
const COLUMN_BLOCKS = ['core/column', 'core/columns'];
/**
 * Disables layout support for columns and column blocks because
 * the default layout `flex` add gaps between columns that it is not possible to support in emails.
 *
 * Also, enhances the columns block to support background image.
 */
function disableColumnsLayoutAndEnhanceColumnsBlock() {
    addFilter('blocks.registerBlockType', 'fincommerce-email-editor/disable-columns-layout', (settings, name) => {
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
export { deactivateStackOnMobile, disableColumnsLayoutAndEnhanceColumnsBlock };
