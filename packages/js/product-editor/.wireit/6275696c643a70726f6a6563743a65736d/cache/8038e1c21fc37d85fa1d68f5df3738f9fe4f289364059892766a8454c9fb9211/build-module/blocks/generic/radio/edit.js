/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
/**
 * Internal dependencies
 */
import { RadioField } from '../../../components/radio-field';
import useProductEntityProp from '../../../hooks/use-product-entity-prop';
export function Edit({ attributes, context: { postType }, }) {
    const blockProps = useWooBlockProps(attributes);
    const { description, options, property, title, disabled } = attributes;
    const [value, setValue] = useProductEntityProp(property, {
        postType,
        fallbackValue: '',
    });
    return (createElement("div", { ...blockProps },
        createElement(RadioField, { title: title, description: description, selected: value, options: options, onChange: (selected) => setValue(selected || ''), disabled: disabled })));
}
