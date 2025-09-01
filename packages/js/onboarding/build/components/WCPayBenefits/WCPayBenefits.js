"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCPayBenefits = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const experimental_1 = require("@fincommerce/experimental");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const icons_1 = require("./icons");
const WCPayBenefits = ({ isWooPayEligible = false }) => {
    return ((0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits", align: "top" },
        (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                (0, element_1.createElement)(icons_1.PaymentCardIcon, null)),
            (0, element_1.createElement)(experimental_1.Text, { as: "p" }, (0, i18n_1.__)('Offer your customers card payments, iDeal, and the ability to sell in-person with Woo mobile app.', 'fincommerce'))),
        (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                (0, element_1.createElement)(icons_1.InternationalMarketIcon, null)),
            (0, element_1.createElement)(experimental_1.Text, { as: "p" }, (0, i18n_1.__)('Sell to international markets and accept more than 135 currencies with local payment methods.', 'fincommerce'))),
        (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                (0, element_1.createElement)(icons_1.EarnManageIcon, null)),
            (0, element_1.createElement)(experimental_1.Text, { as: "p" }, (0, i18n_1.__)('Earn and manage recurring revenue and get automatic deposits into your nominated bank account.', 'fincommerce'))),
        isWooPayEligible && ((0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            (0, element_1.createElement)(components_1.Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                (0, element_1.createElement)(icons_1.WooPayIcon, null)),
            (0, element_1.createElement)(experimental_1.Text, { as: "p" }, (0, i18n_1.__)('Boost conversions with WooPay, a new express checkout feature included in WooPayments.', 'fincommerce'))))));
};
exports.WCPayBenefits = WCPayBenefits;
