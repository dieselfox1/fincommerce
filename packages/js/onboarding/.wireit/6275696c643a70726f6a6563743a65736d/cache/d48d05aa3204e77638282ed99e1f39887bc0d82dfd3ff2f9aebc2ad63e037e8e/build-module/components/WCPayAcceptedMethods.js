/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { Text } from '@fincommerce/experimental';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Visa from '../images/cards/visa.js';
import MasterCard from '../images/cards/mastercard.js';
import Maestro from '../images/cards/maestro.js';
import Amex from '../images/cards/amex.js';
import ApplePay from '../images/cards/applepay.js';
import CB from '../images/cards/cb.js';
import DinersClub from '../images/cards/diners.js';
import Discover from '../images/cards/discover.js';
import JCB from '../images/cards/jcb.js';
import UnionPay from '../images/cards/unionpay.js';
export const WCPayAcceptedMethods = () => (createElement(Fragment, null,
    createElement(Text, { as: "h3", variant: "label", weight: "600", size: "12", lineHeight: "16px" }, __('Accepted payment methods', 'fincommerce')),
    createElement("div", { className: "fincommerce-task-payment-wcpay__accepted" },
        createElement(Visa, null),
        createElement(MasterCard, null),
        createElement(Maestro, null),
        createElement(Amex, null),
        createElement(DinersClub, null),
        createElement(CB, null),
        createElement(Discover, null),
        createElement(UnionPay, null),
        createElement(JCB, null),
        createElement(ApplePay, null))));
