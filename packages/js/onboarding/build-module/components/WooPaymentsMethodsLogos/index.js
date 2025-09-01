/**
 * External dependencies
 */
import { useState, useEffect, useRef } from 'react';
import { createElement } from '@wordpress/element';
import { Popover } from '@wordpress/components';
/**
 * Internal dependencies
 */
import Visa from '../../images/cards/visa';
import MasterCard from '../../images/cards/mastercard';
import Amex from '../../images/cards/amex';
import Discover from '../../images/cards/discover';
import ApplePay from '../../images/cards/applepay';
import GooglePay from '../../images/cards/googlepay';
import JCB from '../../images/cards/jcb';
import WooPay from '../../images/payment-methods/woopay';
import AfterPay from '../../images/payment-methods/afterpay';
import Affirm from '../../images/payment-methods/affirm';
import Klarna from '../../images/payment-methods/klarna';
import Cartebancaire from '../../images/cards/cb';
import UnionPay from '../../images/cards/unionpay';
import Diners from '../../images/cards/diners';
import Eftpos from '../../images/cards/eftpos';
import Ideal from '../../images/payment-methods/ideal';
import Bancontact from '../../images/payment-methods/bancontact';
import Eps from '../../images/payment-methods/eps';
import Becs from '../../images/payment-methods/becs';
import Przelewy24 from '../../images/payment-methods/przelewy24';
import GrabPay from '../../images/payment-methods/grabpay';
/**
 * Payment methods list.
 */
const PaymentMethods = [
    {
        name: 'visa',
        component: createElement(Visa, { key: "visa" }),
    },
    {
        name: 'mastercard',
        component: createElement(MasterCard, { key: "mastercard" }),
    },
    {
        name: 'amex',
        component: createElement(Amex, { key: "amex" }),
    },
    {
        name: 'discover',
        component: createElement(Discover, { key: "discover" }),
    },
    {
        name: 'woopay',
        component: createElement(WooPay, { key: "woopay" }),
    },
    {
        name: 'applepay',
        component: createElement(ApplePay, { key: "applepay" }),
    },
    {
        name: 'googlepay',
        component: createElement(GooglePay, { key: "googlepay" }),
    },
    {
        name: 'afterpay',
        component: createElement(AfterPay, { key: "afterpay" }),
    },
    {
        name: 'affirm',
        component: createElement(Affirm, { key: "affirm" }),
    },
    {
        name: 'klarna',
        component: createElement(Klarna, { key: "klarna" }),
    },
    {
        name: 'cartebancaire',
        component: createElement(Cartebancaire, { key: "cartebancaire" }),
    },
    {
        name: 'unionpay',
        component: createElement(UnionPay, { key: "unionpay" }),
    },
    {
        name: 'diners',
        component: createElement(Diners, { key: "diners" }),
    },
    {
        name: 'eftpos',
        component: createElement(Eftpos, { key: "eftpos" }),
    },
    {
        name: 'jcb',
        component: createElement(JCB, { key: "jcb" }),
    },
    {
        name: 'bancontact',
        component: createElement(Bancontact, { key: "bancontact" }),
    },
    {
        name: 'becs',
        component: createElement(Becs, { key: "becs" }),
    },
    {
        name: 'eps',
        component: createElement(Eps, { key: "eps" }),
    },
    {
        name: 'ideal',
        component: createElement(Ideal, { key: "ideal" }),
    },
    {
        name: 'przelewy24',
        component: createElement(Przelewy24, { key: "przelewy24" }),
    },
    {
        name: 'grabpay',
        component: createElement(GrabPay, { key: "grabpay" }),
    },
];
export const WooPaymentsMethodsLogos = ({ 
/**
 * Whether the store (location) is eligible for WooPay.
 * Based on this we will include or not the WooPay logo in the list.
 */
isWooPayEligible = false, 
/**
 * Maximum number of logos to be displayed (on a desktop screen).
 */
maxElements = 10, 
/**
 * Breakpoint at which the number of logos to display changes to the tablet layout.
 */
tabletWidthBreakpoint = 768, 
/**
 * Maximum number of logos to be displayed on a tablet screen.
 */
maxElementsTablet = 7, 
/**
 * Breakpoint at which the number of logos to display changes to the mobile layout.
 */
mobileWidthBreakpoint = 480, 
/**
 * Maximum number of logos to be displayed on a mobile screen.
 */
maxElementsMobile = 5, 
/**
 * Total number of payment methods that WooPayments supports.
 * The default is set according to https://fincommerce.com/document/woopayments/payment-methods.
 * If not eligible for WooPay, the total number of payment methods is reduced by one.
 */
totalPaymentMethods = 21, }) => {
    const [maxShownElements, setMaxShownElements] = useState(maxElements);
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const buttonRef = useRef(null);
    const handleClick = (event) => {
        const clickedElement = event.target;
        const parentDiv = clickedElement.closest('.fincommerce-woopayments-payment-methods-logos-count');
        if (buttonRef.current && parentDiv !== buttonRef.current) {
            return;
        }
        setPopoverVisible((prev) => !prev);
    };
    const handleFocusOutside = () => {
        setPopoverVisible(false);
    };
    // Reduce the total number of payment methods by one if the store is not eligible for WooPay.
    const maxSupportedPaymentMethods = isWooPayEligible
        ? totalPaymentMethods
        : totalPaymentMethods - 1;
    /**
     * Determine the maximum number of logos to display, taking into account WooPay’s eligibility.
     */
    const getMaxShownElements = (maxElementsNumber) => {
        if (!isWooPayEligible) {
            return maxElementsNumber + 1;
        }
        return maxElementsNumber;
    };
    useEffect(() => {
        const updateMaxElements = () => {
            if (window.innerWidth <= mobileWidthBreakpoint) {
                setMaxShownElements(maxElementsMobile);
            }
            else if (window.innerWidth <= tabletWidthBreakpoint) {
                setMaxShownElements(maxElementsTablet);
            }
            else {
                setMaxShownElements(maxElements);
            }
        };
        updateMaxElements();
        // Update the number of logos to display when the window is resized.
        window.addEventListener('resize', updateMaxElements);
        // Cleanup on unmount.
        return () => {
            window.removeEventListener('resize', updateMaxElements);
        };
    }, [
        maxElements,
        maxElementsMobile,
        maxElementsTablet,
        tabletWidthBreakpoint,
        mobileWidthBreakpoint,
    ]);
    const visiblePaymentMethods = PaymentMethods.slice(0, getMaxShownElements(maxShownElements)).filter((pm) => isWooPayEligible || pm.name !== 'woopay');
    const hiddenPaymentMethods = PaymentMethods.slice(getMaxShownElements(maxShownElements)).filter((pm) => isWooPayEligible || pm.name !== 'woopay');
    return (createElement("div", { className: "fincommerce-woopayments-payment-methods-logos" },
        visiblePaymentMethods.map((pm) => pm.component),
        maxShownElements < maxSupportedPaymentMethods && (createElement("div", { className: "fincommerce-woopayments-payment-methods-logos-count", role: "button", tabIndex: 0, ref: buttonRef, onClick: handleClick, onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleClick(event);
                }
            } },
            "+ ",
            maxSupportedPaymentMethods - maxShownElements,
            isPopoverVisible && (createElement(Popover, { className: "fincommerce-woopayments-payment-methods-logos-popover", placement: "top-start", offset: 4, variant: "unstyled", focusOnMount: true, noArrow: true, shift: true, onFocusOutside: handleFocusOutside },
                createElement("div", { className: "fincommerce-woopayments-payment-methods-logos" }, hiddenPaymentMethods.map((pm) => pm.component))))))));
};
