"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCPayAcceptedMethods = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const experimental_1 = require("@fincommerce/experimental");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const visa_js_1 = __importDefault(require("../images/cards/visa.js"));
const mastercard_js_1 = __importDefault(require("../images/cards/mastercard.js"));
const maestro_js_1 = __importDefault(require("../images/cards/maestro.js"));
const amex_js_1 = __importDefault(require("../images/cards/amex.js"));
const applepay_js_1 = __importDefault(require("../images/cards/applepay.js"));
const cb_js_1 = __importDefault(require("../images/cards/cb.js"));
const diners_js_1 = __importDefault(require("../images/cards/diners.js"));
const discover_js_1 = __importDefault(require("../images/cards/discover.js"));
const jcb_js_1 = __importDefault(require("../images/cards/jcb.js"));
const unionpay_js_1 = __importDefault(require("../images/cards/unionpay.js"));
const WCPayAcceptedMethods = () => ((0, element_1.createElement)(element_1.Fragment, null,
    (0, element_1.createElement)(experimental_1.Text, { as: "h3", variant: "label", weight: "600", size: "12", lineHeight: "16px" }, (0, i18n_1.__)('Accepted payment methods', 'fincommerce')),
    (0, element_1.createElement)("div", { className: "fincommerce-task-payment-wcpay__accepted" },
        (0, element_1.createElement)(visa_js_1.default, null),
        (0, element_1.createElement)(mastercard_js_1.default, null),
        (0, element_1.createElement)(maestro_js_1.default, null),
        (0, element_1.createElement)(amex_js_1.default, null),
        (0, element_1.createElement)(diners_js_1.default, null),
        (0, element_1.createElement)(cb_js_1.default, null),
        (0, element_1.createElement)(discover_js_1.default, null),
        (0, element_1.createElement)(unionpay_js_1.default, null),
        (0, element_1.createElement)(jcb_js_1.default, null),
        (0, element_1.createElement)(applepay_js_1.default, null))));
exports.WCPayAcceptedMethods = WCPayAcceptedMethods;
