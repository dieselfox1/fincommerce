"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooPaymentGatewaySetup = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * FinCommerce Payment Gateway setup.
 *
 * @slotFill WooPaymentGatewaySetup
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id Setup id.
 */
const WooPaymentGatewaySetup = ({ id, ...props }) => ((0, element_1.createElement)(components_1.Fill, { name: 'fincommerce_payment_gateway_setup_' + id, ...props }));
exports.WooPaymentGatewaySetup = WooPaymentGatewaySetup;
exports.WooPaymentGatewaySetup.Slot = ({ id, fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: 'fincommerce_payment_gateway_setup_' + id, fillProps: fillProps }));
