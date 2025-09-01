"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerFeedbackSimple = CustomerFeedbackSimple;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const experimental_1 = require("@fincommerce/experimental");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Provides a modal requesting customer feedback.
 *
 * A label is displayed in the modal asking the customer to score the
 * difficulty completing a task. A group of radio buttons, styled with
 * emoji facial expressions, are used to provide a score between 1 and 5.
 *
 * A low score triggers a comments field to appear.
 *
 * Upon completion, the score and comments is sent to a callback function.
 *
 * @param {Object}      props                 Component props.
 * @param {Function}    props.onSelect        Function to call when the results are sent.
 * @param {string}      props.label           Question to ask the customer.
 * @param {number|null} [props.selectedValue] The default selected value.
 */
function CustomerFeedbackSimple({ onSelect, label, selectedValue, }) {
    const options = [
        {
            tooltip: (0, i18n_1.__)('Very difficult', 'fincommerce'),
            value: 1,
            emoji: '😞',
        },
        {
            tooltip: (0, i18n_1.__)('Difficult', 'fincommerce'),
            value: 2,
            emoji: '🙁',
        },
        {
            tooltip: (0, i18n_1.__)('Neutral', 'fincommerce'),
            value: 3,
            emoji: '😑',
        },
        {
            tooltip: (0, i18n_1.__)('Good', 'fincommerce'),
            value: 4,
            emoji: '🙂',
        },
        {
            tooltip: (0, i18n_1.__)('Very good', 'fincommerce'),
            value: 5,
            emoji: '😍',
        },
    ];
    return ((0, element_1.createElement)("div", { className: "customer-feedback-simple__container" },
        (0, element_1.createElement)(experimental_1.Text, { variant: "subtitle.small", as: "p", size: "13", lineHeight: "16px" }, label),
        (0, element_1.createElement)("div", { className: "customer-feedback-simple__selection" }, options.map((option) => ((0, element_1.createElement)(components_1.Tooltip, { text: option.tooltip, key: option.value, position: "top center" },
            (0, element_1.createElement)(components_1.Button, { onClick: () => {
                    onSelect(option.value);
                }, className: (0, clsx_1.default)({
                    'is-selected': selectedValue === option.value,
                }) }, option.emoji)))))));
}
