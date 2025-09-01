/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { SelectControl } from '@wordpress/components';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import useProductEntityProp from '../../../hooks/use-product-entity-prop';
import { sanitizeHTML } from '../../../utils/sanitize-html';
import { Label } from '../../../components/label/label';
export function Edit({ attributes, context: { postType }, }) {
    const blockProps = useWooBlockProps(attributes);
    const { property, label, note, help, tooltip, disabled, options, multiple, } = attributes;
    const [value, setValue] = useProductEntityProp(property, {
        postType,
        fallbackValue: '',
    });
    function renderHelp() {
        if (help) {
            return createElement("span", { dangerouslySetInnerHTML: sanitizeHTML(help) });
        }
    }
    // This check is necessary to fix the issue with the SelectControl component types.
    // The SelectControl component does not handle the value prop correctly when it is an array or a string.
    if (Array.isArray(value)) {
        return (createElement("div", { ...blockProps },
            createElement(SelectControl, { value: value, disabled: disabled, label: createElement(Label, { label: label, note: note, tooltip: tooltip }), onChange: setValue, help: renderHelp(), options: options, multiple: multiple })));
    }
    return (createElement("div", { ...blockProps },
        createElement(SelectControl, { value: value, disabled: disabled, label: createElement(Label, { label: label, note: note, tooltip: tooltip }), onChange: setValue, help: renderHelp(), options: options, multiple: multiple })));
}
