"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooPaymentsMethodsLogos = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const visa_1 = __importDefault(require("../../images/cards/visa"));
const mastercard_1 = __importDefault(require("../../images/cards/mastercard"));
const amex_1 = __importDefault(require("../../images/cards/amex"));
const discover_1 = __importDefault(require("../../images/cards/discover"));
const applepay_1 = __importDefault(require("../../images/cards/applepay"));
const googlepay_1 = __importDefault(require("../../images/cards/googlepay"));
const jcb_1 = __importDefault(require("../../images/cards/jcb"));
const woopay_1 = __importDefault(require("../../images/payment-methods/woopay"));
const afterpay_1 = __importDefault(require("../../images/payment-methods/afterpay"));
const affirm_1 = __importDefault(require("../../images/payment-methods/affirm"));
const klarna_1 = __importDefault(require("../../images/payment-methods/klarna"));
const cb_1 = __importDefault(require("../../images/cards/cb"));
const unionpay_1 = __importDefault(require("../../images/cards/unionpay"));
const diners_1 = __importDefault(require("../../images/cards/diners"));
const eftpos_1 = __importDefault(require("../../images/cards/eftpos"));
const ideal_1 = __importDefault(require("../../images/payment-methods/ideal"));
const bancontact_1 = __importDefault(require("../../images/payment-methods/bancontact"));
const eps_1 = __importDefault(require("../../images/payment-methods/eps"));
const becs_1 = __importDefault(require("../../images/payment-methods/becs"));
const przelewy24_1 = __importDefault(require("../../images/payment-methods/przelewy24"));
const grabpay_1 = __importDefault(require("../../images/payment-methods/grabpay"));
/**
 * Payment methods list.
 */
const PaymentMethods = [
    {
        name: 'visa',
        component: (0, element_1.createElement)(visa_1.default, { key: "visa" }),
    },
    {
        name: 'mastercard',
        component: (0, element_1.createElement)(mastercard_1.default, { key: "mastercard" }),
    },
    {
        name: 'amex',
        component: (0, element_1.createElement)(amex_1.default, { key: "amex" }),
    },
    {
        name: 'discover',
        component: (0, element_1.createElement)(discover_1.default, { key: "discover" }),
    },
    {
        name: 'woopay',
        component: (0, element_1.createElement)(woopay_1.default, { key: "woopay" }),
    },
    {
        name: 'applepay',
        component: (0, element_1.createElement)(applepay_1.default, { key: "applepay" }),
    },
    {
        name: 'googlepay',
        component: (0, element_1.createElement)(googlepay_1.default, { key: "googlepay" }),
    },
    {
        name: 'afterpay',
        component: (0, element_1.createElement)(afterpay_1.default, { key: "afterpay" }),
    },
    {
        name: 'affirm',
        component: (0, element_1.createElement)(affirm_1.default, { key: "affirm" }),
    },
    {
        name: 'klarna',
        component: (0, element_1.createElement)(klarna_1.default, { key: "klarna" }),
    },
    {
        name: 'cartebancaire',
        component: (0, element_1.createElement)(cb_1.default, { key: "cartebancaire" }),
    },
    {
        name: 'unionpay',
        component: (0, element_1.createElement)(unionpay_1.default, { key: "unionpay" }),
    },
    {
        name: 'diners',
        component: (0, element_1.createElement)(diners_1.default, { key: "diners" }),
    },
    {
        name: 'eftpos',
        component: (0, element_1.createElement)(eftpos_1.default, { key: "eftpos" }),
    },
    {
        name: 'jcb',
        component: (0, element_1.createElement)(jcb_1.default, { key: "jcb" }),
    },
    {
        name: 'bancontact',
        component: (0, element_1.createElement)(bancontact_1.default, { key: "bancontact" }),
    },
    {
        name: 'becs',
        component: (0, element_1.createElement)(becs_1.default, { key: "becs" }),
    },
    {
        name: 'eps',
        component: (0, element_1.createElement)(eps_1.default, { key: "eps" }),
    },
    {
        name: 'ideal',
        component: (0, element_1.createElement)(ideal_1.default, { key: "ideal" }),
    },
    {
        name: 'przelewy24',
        component: (0, element_1.createElement)(przelewy24_1.default, { key: "przelewy24" }),
    },
    {
        name: 'grabpay',
        component: (0, element_1.createElement)(grabpay_1.default, { key: "grabpay" }),
    },
];
const WooPaymentsMethodsLogos = ({ 
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
    const [maxShownElements, setMaxShownElements] = (0, react_1.useState)(maxElements);
    const [isPopoverVisible, setPopoverVisible] = (0, react_1.useState)(false);
    const buttonRef = (0, react_1.useRef)(null);
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
    (0, react_1.useEffect)(() => {
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
    return ((0, element_1.createElement)("div", { className: "fincommerce-woopayments-payment-methods-logos" },
        visiblePaymentMethods.map((pm) => pm.component),
        maxShownElements < maxSupportedPaymentMethods && ((0, element_1.createElement)("div", { className: "fincommerce-woopayments-payment-methods-logos-count", role: "button", tabIndex: 0, ref: buttonRef, onClick: handleClick, onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleClick(event);
                }
            } },
            "+ ",
            maxSupportedPaymentMethods - maxShownElements,
            isPopoverVisible && ((0, element_1.createElement)(components_1.Popover, { className: "fincommerce-woopayments-payment-methods-logos-popover", placement: "top-start", offset: 4, variant: "unstyled", focusOnMount: true, noArrow: true, shift: true, onFocusOutside: handleFocusOutside },
                (0, element_1.createElement)("div", { className: "fincommerce-woopayments-payment-methods-logos" }, hiddenPaymentMethods.map((pm) => pm.component))))))));
};
exports.WooPaymentsMethodsLogos = WooPaymentsMethodsLogos;
