"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const prop_types_1 = __importDefault(require("prop-types"));
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const empty_content_1 = __importDefault(require("../../empty-content"));
/**
 * Component to render when there is an error in an analytics component due to data
 * not being loaded or being invalid.
 *
 * @param {Object} props             React props.
 * @param {string} [props.className] Additional class name to style the component.
 */
function AnalyticsError({ className }) {
    const title = (0, i18n_1.__)('There was an error getting your stats. Please try again.', 'fincommerce');
    const actionLabel = (0, i18n_1.__)('Reload', 'fincommerce');
    const actionCallback = () => {
        // @todo Add tracking for how often an error is displayed, and the reload action is clicked.
        window.location.reload();
    };
    return ((0, element_1.createElement)(empty_content_1.default, { className: className, title: title, actionLabel: actionLabel, actionCallback: actionCallback }));
}
AnalyticsError.propTypes = {
    /**
     * Additional class name to style the component.
     */
    className: prop_types_1.default.string,
};
exports.default = AnalyticsError;
