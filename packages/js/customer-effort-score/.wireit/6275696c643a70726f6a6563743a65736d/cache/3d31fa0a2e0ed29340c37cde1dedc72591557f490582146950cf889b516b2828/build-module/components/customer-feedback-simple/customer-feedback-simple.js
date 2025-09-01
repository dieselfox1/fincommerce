/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Button, Tooltip } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
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
export function CustomerFeedbackSimple({ onSelect, label, selectedValue, }) {
    const options = [
        {
            tooltip: __('Very difficult', 'fincommerce'),
            value: 1,
            emoji: '😞',
        },
        {
            tooltip: __('Difficult', 'fincommerce'),
            value: 2,
            emoji: '🙁',
        },
        {
            tooltip: __('Neutral', 'fincommerce'),
            value: 3,
            emoji: '😑',
        },
        {
            tooltip: __('Good', 'fincommerce'),
            value: 4,
            emoji: '🙂',
        },
        {
            tooltip: __('Very good', 'fincommerce'),
            value: 5,
            emoji: '😍',
        },
    ];
    return (createElement("div", { className: "customer-feedback-simple__container" },
        createElement(Text, { variant: "subtitle.small", as: "p", size: "13", lineHeight: "16px" }, label),
        createElement("div", { className: "customer-feedback-simple__selection" }, options.map((option) => (createElement(Tooltip, { text: option.tooltip, key: option.value, position: "top center" },
            createElement(Button, { onClick: () => {
                    onSelect(option.value);
                }, className: clsx({
                    'is-selected': selectedValue === option.value,
                }) }, option.emoji)))))));
}
