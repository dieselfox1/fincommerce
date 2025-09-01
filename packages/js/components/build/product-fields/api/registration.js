"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProductField = registerProductField;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
/**
 * Registers a new product field provided a unique name and an object defining its
 * behavior. Once registered, the field is made available to use with the product form API.
 *
 * @param {string|Object} fieldName Field name.
 * @param {Object}        settings  Field settings.
 *
 * @example
 * ```js
 * import { registerProductField } from '@fincommerce/components'
 *
 * registerProductFieldType( 'attributes-field', {
 * } );
 * ```
 */
function registerProductField(fieldName, settings) {
    if ((0, data_1.select)(store_1.store).getProductField(fieldName)) {
        // eslint-disable-next-line no-console
        console.error('Product Field "' + fieldName + '" is already registered.');
        return;
    }
    (0, data_1.dispatch)(store_1.store).registerProductField({
        attributes: {},
        ...settings,
    });
    return (0, data_1.select)(store_1.store).getProductField(fieldName);
}
