/**
 * External dependencies
 */
import { createElement, createInterpolateElement, Fragment, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Card, CardFooter, CardBody } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';
/**
 * Internal dependencies
 */
import { WooPaymentsMethodsLogos } from '../WooPaymentsMethodsLogos';
import { WCPayBannerImage } from './WCPayBannerImage';
export const WCPayBannerFooter = ({ isWooPayEligible }) => (createElement(CardFooter, { className: "fincommerce-recommended-payments-banner__footer" },
    createElement("div", null,
        createElement(Text, { variant: "caption", as: "p", size: "12", lineHeight: "16px" }, __('WooPayments is pre-integrated with popular payment options:', 'fincommerce'))),
    createElement(WooPaymentsMethodsLogos, { isWooPayEligible: isWooPayEligible, maxElements: 10 })));
export const WCPayBannerText = ({ actionButton }) => {
    return (createElement("div", { className: "fincommerce-recommended-payments-banner__text_container" },
        createElement(Text, { className: "fincommerce-recommended-payments__header-title", variant: "title.small", as: "p", size: "24", lineHeight: "28px", padding: "0 20px 0 0" }, createInterpolateElement(__('Payments made simple, designed exclusively<br/>for FinCommerce stores.', 'fincommerce'), {
            br: createElement("br", null),
        })),
        actionButton));
};
export const WCPayBannerBody = ({ actionButton, textPosition, bannerImage = createElement(WCPayBannerImage, null), isWooPayEligible, }) => {
    return (createElement(CardBody, { className: "fincommerce-recommended-payments-banner__body" }, textPosition === 'left' ? (createElement(Fragment, null,
        createElement(WCPayBannerText, { actionButton: actionButton, isWooPayEligible: isWooPayEligible }),
        createElement("div", { className: "fincommerce-recommended-payments-banner__image_container" }, bannerImage))) : (createElement(Fragment, null,
        createElement("div", { className: "fincommerce-recommended-payments-banner__image_container" }, bannerImage),
        createElement(WCPayBannerText, { actionButton: actionButton, isWooPayEligible: isWooPayEligible })))));
};
export const WCPayBanner = ({ children }) => {
    return (createElement(Card, { size: "medium", className: "fincommerce-recommended-payments-banner" }, children));
};
