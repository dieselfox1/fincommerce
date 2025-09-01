"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const core_data_1 = require("@wordpress/core-data");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
/**
 * React custom hook to bind a source to a block.
 *
 * @param {BlockProps}                         blockProps - The block props.
 * @param {fincommerceEntityProductSourceArgs} sourceArgs - The source args.
 * @return {BindingUseSourceProps} The source value and setter.
 */
const useSource = (blockProps, sourceArgs) => {
    if (typeof sourceArgs === 'undefined') {
        throw new Error('The "args" argument is required.');
    }
    if (!sourceArgs?.prop) {
        throw new Error('The "prop" argument is required.');
    }
    const { prop, id } = sourceArgs;
    const [value, updateValue] = (0, core_data_1.useEntityProp)('postType', 'product', prop, id);
    const updateValueHandler = (0, element_1.useCallback)((nextEntityPropValue) => {
        updateValue(nextEntityPropValue);
    }, [updateValue]);
    return {
        placeholder: null,
        value,
        updateValue: updateValueHandler,
    };
};
/*
 * Create the product-entity
 * block binding source handler.
 *
 * source ID: `fincommerce/entity-product`
 * args:
 * - prop: The name of the entity property to bind.
 *
 * In the example below,
 * the `content` attribute is bound to the `short_description` property.
 * `product` entity and `postType` kind are defined by the context.
 *
 * ```
 * metadata: {
 *   bindings: {
 *     content: {
 *       source: 'fincommerce/entity-product',
 *       args: {
 *         prop: 'short_description',
 *       },
 *    },
 * },
 * ```
 */
exports.default = {
    name: 'fincommerce/entity-product',
    label: (0, i18n_1.__)('Product Entity', 'fincommerce'),
    useSource,
    lockAttributesEditing: true,
};
