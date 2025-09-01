/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Text } from '@fincommerce/experimental';
import { Flex } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { PaymentCardIcon, InternationalMarketIcon, EarnManageIcon, WooPayIcon, } from './icons';
export const WCPayBenefits = ({ isWooPayEligible = false }) => {
    return (createElement(Flex, { className: "fincommerce-wcpay-benefits", align: "top" },
        createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                createElement(PaymentCardIcon, null)),
            createElement(Text, { as: "p" }, __('Offer your customers card payments, iDeal, and the ability to sell in-person with Woo mobile app.', 'fincommerce'))),
        createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                createElement(InternationalMarketIcon, null)),
            createElement(Text, { as: "p" }, __('Sell to international markets and accept more than 135 currencies with local payment methods.', 'fincommerce'))),
        createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                createElement(EarnManageIcon, null)),
            createElement(Text, { as: "p" }, __('Earn and manage recurring revenue and get automatic deposits into your nominated bank account.', 'fincommerce'))),
        isWooPayEligible && (createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit" },
            createElement(Flex, { className: "fincommerce-wcpay-benefits-benefit-icon-container" },
                createElement(WooPayIcon, null)),
            createElement(Text, { as: "p" }, __('Boost conversions with WooPay, a new express checkout feature included in WooPayments.', 'fincommerce'))))));
};
