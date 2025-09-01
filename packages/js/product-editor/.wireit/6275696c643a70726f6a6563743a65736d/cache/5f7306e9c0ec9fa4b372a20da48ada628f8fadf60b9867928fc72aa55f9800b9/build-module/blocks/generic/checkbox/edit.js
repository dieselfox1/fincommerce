/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import useProductEntityProp from '../../../hooks/use-product-entity-prop';
import { Checkbox } from '../../../components/checkbox-control';
export function Edit({ attributes, context: { postType }, }) {
    const { property, title, label, tooltip, checkedValue, uncheckedValue, disabled, } = attributes;
    const blockProps = useWooBlockProps(attributes);
    const [value, setValue] = useProductEntityProp(property, {
        postType,
        fallbackValue: false,
    });
    return (createElement("div", { ...blockProps },
        createElement(Checkbox, { value: value || false, onChange: setValue, label: label || '', title: title, tooltip: tooltip, checkedValue: checkedValue, uncheckedValue: uncheckedValue, disabled: disabled })));
}
