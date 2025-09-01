"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const Header = ({ pageTitle = '', hasTabs = false, }) => {
    return ((0, element_1.createElement)(components_1.__experimentalVStack, { className: (0, clsx_1.default)('fincommerce-settings-header fincommerce-site-page-header', {
            'fincommerce-settings-header--has-tabs': hasTabs,
        }), as: "header", spacing: 0 },
        (0, element_1.createElement)(components_1.__experimentalHStack, { className: "fincommerce-site-page-header__page-title" },
            (0, element_1.createElement)(components_1.__experimentalHeading, { as: "h2", level: 3, weight: 500, className: "fincommerce-site-page-header__title", truncate: true }, pageTitle))));
};
exports.Header = Header;
