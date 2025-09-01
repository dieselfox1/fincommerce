"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCPayBanner = exports.WCPayBannerBody = exports.WCPayBannerText = exports.WCPayBannerFooter = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const experimental_1 = require("@fincommerce/experimental");
/**
 * Internal dependencies
 */
const WooPaymentsMethodsLogos_1 = require("../WooPaymentsMethodsLogos");
const WCPayBannerImage_1 = require("./WCPayBannerImage");
const WCPayBannerFooter = ({ isWooPayEligible }) => ((0, element_1.createElement)(components_1.CardFooter, { className: "fincommerce-recommended-payments-banner__footer" },
    (0, element_1.createElement)("div", null,
        (0, element_1.createElement)(experimental_1.Text, { variant: "caption", as: "p", size: "12", lineHeight: "16px" }, (0, i18n_1.__)('WooPayments is pre-integrated with popular payment options:', 'fincommerce'))),
    (0, element_1.createElement)(WooPaymentsMethodsLogos_1.WooPaymentsMethodsLogos, { isWooPayEligible: isWooPayEligible, maxElements: 10 })));
exports.WCPayBannerFooter = WCPayBannerFooter;
const WCPayBannerText = ({ actionButton }) => {
    return ((0, element_1.createElement)("div", { className: "fincommerce-recommended-payments-banner__text_container" },
        (0, element_1.createElement)(experimental_1.Text, { className: "fincommerce-recommended-payments__header-title", variant: "title.small", as: "p", size: "24", lineHeight: "28px", padding: "0 20px 0 0" }, (0, element_1.createInterpolateElement)((0, i18n_1.__)('Payments made simple, designed exclusively<br/>for FinCommerce stores.', 'fincommerce'), {
            br: (0, element_1.createElement)("br", null),
        })),
        actionButton));
};
exports.WCPayBannerText = WCPayBannerText;
const WCPayBannerBody = ({ actionButton, textPosition, bannerImage = (0, element_1.createElement)(WCPayBannerImage_1.WCPayBannerImage, null), isWooPayEligible, }) => {
    return ((0, element_1.createElement)(components_1.CardBody, { className: "fincommerce-recommended-payments-banner__body" }, textPosition === 'left' ? ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(exports.WCPayBannerText, { actionButton: actionButton, isWooPayEligible: isWooPayEligible }),
        (0, element_1.createElement)("div", { className: "fincommerce-recommended-payments-banner__image_container" }, bannerImage))) : ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("div", { className: "fincommerce-recommended-payments-banner__image_container" }, bannerImage),
        (0, element_1.createElement)(exports.WCPayBannerText, { actionButton: actionButton, isWooPayEligible: isWooPayEligible })))));
};
exports.WCPayBannerBody = WCPayBannerBody;
const WCPayBanner = ({ children }) => {
    return ((0, element_1.createElement)(components_1.Card, { size: "medium", className: "fincommerce-recommended-payments-banner" }, children));
};
exports.WCPayBanner = WCPayBanner;
