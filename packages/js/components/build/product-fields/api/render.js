"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderField = renderField;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const store_1 = require("../store");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderField(name, props) {
    const fieldConfig = (0, data_1.select)(store_1.store).getProductField(name);
    if (fieldConfig.render) {
        return (0, element_1.createElement)(fieldConfig.render, { ...props });
    }
    if (fieldConfig.type) {
        return (0, element_1.createElement)(components_1.__experimentalInputControl, { type: fieldConfig.type, ...props });
    }
    return null;
}
