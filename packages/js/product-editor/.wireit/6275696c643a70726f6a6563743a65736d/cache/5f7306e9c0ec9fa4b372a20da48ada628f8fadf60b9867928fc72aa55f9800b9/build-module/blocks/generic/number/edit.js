/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { __, sprintf } from '@wordpress/i18n';
import useProductEntityProp from '../../../hooks/use-product-entity-prop';
import { useValidation } from '../../../contexts/validation-context';
import { NumberControl } from '../../../components/number-control';
import { useProductEdits } from '../../../hooks/use-product-edits';
export function Edit({ attributes, context: { postType }, }) {
    const blockProps = useWooBlockProps(attributes);
    const { label, property, suffix, placeholder, help, min, max, required, tooltip, disabled, step, } = attributes;
    const [value, setValue] = useProductEntityProp(property, {
        postType,
        fallbackValue: '',
    });
    const { hasEdit } = useProductEdits();
    const { error, validate } = useValidation(property, async function validator() {
        if (typeof min === 'number' &&
            value &&
            parseFloat(value) < min) {
            return {
                message: sprintf(
                // translators: %d is the minimum value of the number input.
                __('Value must be greater than or equal to %d', 'fincommerce'), min),
            };
        }
        if (typeof max === 'number' &&
            value &&
            parseFloat(value) > max) {
            return {
                message: sprintf(
                // translators: %d is the minimum value of the number input.
                __('Value must be less than or equal to %d', 'fincommerce'), min),
            };
        }
        if (required && !value) {
            return {
                message: __('This field is required.', 'fincommerce'),
            };
        }
    }, [value]);
    return (createElement("div", { ...blockProps },
        createElement(NumberControl, { label: label, onChange: setValue, value: value || '', help: help, suffix: suffix, placeholder: placeholder, error: error, onBlur: () => {
                if (hasEdit(property)) {
                    validate();
                }
            }, required: required, tooltip: tooltip, disabled: disabled, step: step, min: min, max: max })));
}
