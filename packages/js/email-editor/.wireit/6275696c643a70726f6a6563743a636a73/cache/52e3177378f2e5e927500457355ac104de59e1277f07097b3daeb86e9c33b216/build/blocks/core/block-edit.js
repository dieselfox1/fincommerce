"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSetUrlAttribute = filterSetUrlAttribute;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
const element_1 = require("@wordpress/element");
const setUrlAttribute = (BlockEdit) => (props) => {
    const { setAttributes } = props;
    const wrappedSetAttributes = (0, element_1.useCallback)((attributes) => {
        // Remove the `http://` prefix that is being set automatically by the link control.
        if (attributes?.url &&
            attributes.url?.startsWith('http://[')) {
            attributes.url = attributes.url.replace('http://[', '[');
        }
        setAttributes(attributes);
    }, [setAttributes]);
    return ((0, jsx_runtime_1.jsx)(BlockEdit, { ...props, setAttributes: wrappedSetAttributes }));
};
function filterSetUrlAttribute() {
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce-email-editor/filter-set-url-attribute', setUrlAttribute);
}
