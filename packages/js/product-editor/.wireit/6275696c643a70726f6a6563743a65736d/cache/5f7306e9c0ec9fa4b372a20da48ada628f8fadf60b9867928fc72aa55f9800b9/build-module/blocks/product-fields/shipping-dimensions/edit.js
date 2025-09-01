/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { optionsStore } from '@fincommerce/data';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { createElement, createInterpolateElement, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ShippingDimensionsImage, } from '../../../components/shipping-dimensions-image';
import { useValidation } from '../../../contexts/validation-context';
import { NumberControl } from '../../../components/number-control';
const SHIPPING_AND_WEIGHT_MIN_VALUE = 0;
const SHIPPING_AND_WEIGHT_MAX_VALUE = 100_000_000_000_000;
export function Edit({ attributes, clientId, context, }) {
    const blockProps = useWooBlockProps(attributes);
    const [dimensions, setDimensions] = useEntityProp('postType', context.postType, 'dimensions');
    const [weight, setWeight] = useEntityProp('postType', context.postType, 'weight');
    const [virtual] = useEntityProp('postType', context.postType, 'virtual');
    const [highlightSide, setHighlightSide] = useState();
    const { dimensionUnit, weightUnit } = useSelect((select) => {
        const { getOption } = select(optionsStore);
        return {
            dimensionUnit: getOption('fincommerce_dimension_unit'),
            weightUnit: getOption('fincommerce_weight_unit'),
        };
    }, []);
    function getDimensionsControlProps(name, side) {
        return {
            name: `dimensions.${name}`,
            value: (dimensions && dimensions[name]) ?? '',
            onChange: (value) => setDimensions({
                ...(dimensions ?? {}),
                [name]: value,
            }),
            onFocus: () => setHighlightSide(side),
            onBlur: () => setHighlightSide(undefined),
            suffix: dimensionUnit,
            disabled: attributes.disabled || virtual,
            min: SHIPPING_AND_WEIGHT_MIN_VALUE,
            max: SHIPPING_AND_WEIGHT_MAX_VALUE,
        };
    }
    const widthFieldId = `dimensions_width-${clientId}`;
    const { ref: dimensionsWidthRef, error: dimensionsWidthValidationError, validate: validateDimensionsWidth, } = useValidation(widthFieldId, async function dimensionsWidthValidator() {
        if (dimensions?.width && +dimensions.width <= 0) {
            return {
                message: __('Width must be greater than zero.', 'fincommerce'),
            };
        }
    }, [dimensions?.width]);
    const lengthFieldId = `dimensions_length-${clientId}`;
    const { ref: dimensionsLengthRef, error: dimensionsLengthValidationError, validate: validateDimensionsLength, } = useValidation(lengthFieldId, async function dimensionsLengthValidator() {
        if (dimensions?.length && +dimensions.length <= 0) {
            return {
                message: __('Length must be greater than zero.', 'fincommerce'),
            };
        }
    }, [dimensions?.length]);
    const heightFieldId = `dimensions_height-${clientId}`;
    const { ref: dimensionsHeightRef, error: dimensionsHeightValidationError, validate: validateDimensionsHeight, } = useValidation(heightFieldId, async function dimensionsHeightValidator() {
        if (dimensions?.height && +dimensions.height <= 0) {
            return {
                message: __('Height must be greater than zero.', 'fincommerce'),
            };
        }
    }, [dimensions?.height]);
    const weightFieldId = `weight-${clientId}`;
    const { ref: weightRef, error: weightValidationError, validate: validateWeight, } = useValidation(weightFieldId, async function weightValidator() {
        if (weight && +weight <= 0) {
            return {
                message: __('Weight must be greater than zero.', 'fincommerce'),
            };
        }
    }, [weight]);
    const dimensionsWidthProps = {
        ...getDimensionsControlProps('width', 'A'),
        ref: dimensionsWidthRef,
        onBlur: validateDimensionsWidth,
        id: widthFieldId,
    };
    const dimensionsLengthProps = {
        ...getDimensionsControlProps('length', 'B'),
        ref: dimensionsLengthRef,
        onBlur: validateDimensionsLength,
        id: lengthFieldId,
    };
    const dimensionsHeightProps = {
        ...getDimensionsControlProps('height', 'C'),
        ref: dimensionsHeightRef,
        onBlur: validateDimensionsHeight,
        id: heightFieldId,
    };
    const weightProps = {
        id: weightFieldId,
        name: 'weight',
        value: weight ?? '',
        onChange: setWeight,
        suffix: weightUnit,
        ref: weightRef,
        onBlur: validateWeight,
        disabled: attributes.disabled || virtual,
        min: SHIPPING_AND_WEIGHT_MIN_VALUE,
        max: SHIPPING_AND_WEIGHT_MAX_VALUE,
    };
    return (createElement("div", { ...blockProps },
        createElement("h4", null, __('Dimensions', 'fincommerce')),
        createElement("div", { className: "wp-block-columns" },
            createElement("div", { className: "wp-block-column" },
                createElement(NumberControl, { label: createInterpolateElement(__('Width <Side />', 'fincommerce'), { Side: createElement("span", null, "A") }), error: dimensionsWidthValidationError, ...dimensionsWidthProps }),
                createElement(NumberControl, { label: createInterpolateElement(__('Length <Side />', 'fincommerce'), { Side: createElement("span", null, "B") }), error: dimensionsLengthValidationError, ...dimensionsLengthProps }),
                createElement(NumberControl, { label: createInterpolateElement(__('Height <Side />', 'fincommerce'), { Side: createElement("span", null, "C") }), error: dimensionsHeightValidationError, ...dimensionsHeightProps }),
                createElement(NumberControl, { label: __('Weight', 'fincommerce'), error: weightValidationError, ...weightProps })),
            createElement("div", { className: "wp-block-column" },
                createElement(ShippingDimensionsImage, { highlight: highlightSide, className: "wp-block-fincommerce-product-shipping-dimensions-fields__dimensions-image", labels: {
                        A: dimensionsWidthProps.value?.length
                            ? dimensionsWidthProps.value
                            : undefined,
                        B: dimensionsLengthProps.value?.length
                            ? dimensionsLengthProps.value
                            : undefined,
                        C: dimensionsHeightProps.value?.length
                            ? dimensionsHeightProps.value
                            : undefined,
                    } })))));
}
