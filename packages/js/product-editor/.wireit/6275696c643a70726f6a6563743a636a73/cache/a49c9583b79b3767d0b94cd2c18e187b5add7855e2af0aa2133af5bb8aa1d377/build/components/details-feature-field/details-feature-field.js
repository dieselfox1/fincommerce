"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsFeatureField = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const components_2 = require("@fincommerce/components");
const tracks_1 = require("@fincommerce/tracks");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const DetailsFeatureField = () => {
    const { getCheckboxControlProps } = (0, components_2.useFormContext)();
    return ((0, element_1.createElement)(components_1.CheckboxControl
    // @ts-expect-error label type is wrong
    , { 
        // @ts-expect-error label type is wrong
        label: (0, element_1.createElement)(element_1.Fragment, null,
            (0, i18n_1.__)('Feature this product', 'fincommerce'),
            (0, element_1.createElement)(components_2.__experimentalTooltip, { text: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Include this product in a featured section on your website with a widget or shortcode. <moreLink />', 'fincommerce'), {
                    moreLink: ((0, element_1.createElement)(components_2.Link, { href: "https://fincommerce.com/document/fincommerce-shortcodes/#products", target: "_blank", type: "external", onClick: () => (0, tracks_1.recordEvent)('add_product_learn_more', {
                            category: constants_1.PRODUCT_DETAILS_SLUG,
                        }) }, (0, i18n_1.__)('Learn more', 'fincommerce'))),
                }) })), ...getCheckboxControlProps('featured', (0, utils_1.getCheckboxTracks)('featured')) }));
};
exports.DetailsFeatureField = DetailsFeatureField;
