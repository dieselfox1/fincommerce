import { jsx as _jsx } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { useCallback } from '@wordpress/element';
const setUrlAttribute = (BlockEdit) => (props) => {
    const { setAttributes } = props;
    const wrappedSetAttributes = useCallback((attributes) => {
        // Remove the `http://` prefix that is being set automatically by the link control.
        if (attributes?.url &&
            attributes.url?.startsWith('http://[')) {
            attributes.url = attributes.url.replace('http://[', '[');
        }
        setAttributes(attributes);
    }, [setAttributes]);
    return (_jsx(BlockEdit, { ...props, setAttributes: wrappedSetAttributes }));
};
function filterSetUrlAttribute() {
    addFilter('editor.BlockEdit', 'fincommerce-email-editor/filter-set-url-attribute', setUrlAttribute);
}
export { filterSetUrlAttribute };
