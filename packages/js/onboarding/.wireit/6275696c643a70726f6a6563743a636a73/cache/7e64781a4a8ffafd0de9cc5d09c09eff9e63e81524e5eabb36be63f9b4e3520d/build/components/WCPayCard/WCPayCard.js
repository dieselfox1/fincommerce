"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCPayCard = exports.WCPayCardFooter = exports.WCPayCardBody = exports.WCPayCardHeader = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const experimental_1 = require("@fincommerce/experimental");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const WCPayAcceptedMethods_1 = require("../WCPayAcceptedMethods");
const wcpay_logo_1 = __importDefault(require("../../images/wcpay-logo"));
const WCPayCardHeader = ({ logoWidth = 196, logoHeight = 41, children, }) => ((0, element_1.createElement)(components_1.CardHeader, { as: "h2" },
    (0, element_1.createElement)(wcpay_logo_1.default, { width: logoWidth, height: logoHeight }),
    children));
exports.WCPayCardHeader = WCPayCardHeader;
const WCPayCardBody = ({ description, heading, onLinkClick = () => { }, }) => ((0, element_1.createElement)(components_1.CardBody, null,
    heading && (0, element_1.createElement)(experimental_1.Text, { as: "h2" }, heading),
    (0, element_1.createElement)(experimental_1.Text, { className: "fincommerce-task-payment-wcpay__description", as: "p", lineHeight: "1.5em" },
        description,
        (0, element_1.createElement)("br", null),
        (0, element_1.createElement)(components_2.Link, { target: "_blank", type: "external", rel: "noreferrer", href: "https://fincommerce.com/payments/?utm_medium=product", onClick: onLinkClick }, (0, i18n_1.__)('Learn more', 'fincommerce'))),
    (0, element_1.createElement)(WCPayAcceptedMethods_1.WCPayAcceptedMethods, null)));
exports.WCPayCardBody = WCPayCardBody;
const WCPayCardFooter = ({ children, }) => (0, element_1.createElement)(components_1.CardFooter, null, children);
exports.WCPayCardFooter = WCPayCardFooter;
const WCPayCard = ({ children }) => {
    return (0, element_1.createElement)(components_1.Card, { className: "fincommerce-task-payment-wcpay" }, children);
};
exports.WCPayCard = WCPayCard;
