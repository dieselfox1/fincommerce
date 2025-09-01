"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyOrErrorTableState = EmptyOrErrorTableState;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const error_variations_image_1 = require("../../../images/error-variations-image");
const empty_variations_image_1 = require("../../../images/empty-variations-image");
function EmptyOrErrorTableState({ message, actionText, isError, onActionClick, }) {
    return ((0, element_1.createElement)("div", { className: "fincommerce-variations-table-error-or-empty-state" },
        isError ? (0, element_1.createElement)(error_variations_image_1.ErrorVariationsImage, null) : (0, element_1.createElement)(empty_variations_image_1.EmptyVariationsImage, null),
        (0, element_1.createElement)("p", { className: "fincommerce-variations-table-error-or-empty-state__message" }, isError
            ? (0, i18n_1.__)('We couldn’t load the variations', 'fincommerce')
            : message ?? (0, i18n_1.__)('No variations yet', 'fincommerce')),
        (0, element_1.createElement)("div", { className: "fincommerce-variations-table-error-or-empty-state__actions" },
            (0, element_1.createElement)(components_1.Button, { variant: "link", onClick: onActionClick }, isError
                ? (0, i18n_1.__)('Try again', 'fincommerce')
                : actionText ??
                    (0, i18n_1.__)('Generate from options', 'fincommerce')))));
}
