"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendedRibbon = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const RecommendedRibbon = ({ isLocalPartner = false, }) => {
    const text = isLocalPartner
        ? (0, i18n_1.__)('Local Partner', 'fincommerce')
        : (0, i18n_1.__)('Recommended', 'fincommerce');
    return ((0, element_1.createElement)("div", { className: 'fincommerce-task-payment__recommended-ribbon' },
        (0, element_1.createElement)("span", null, text)));
};
exports.RecommendedRibbon = RecommendedRibbon;
