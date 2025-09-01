/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';
import { useUserPreferences } from '@fincommerce/data';
import clsx from 'clsx';
export function AdviceCard({ tip, isDismissible = true, dismissPreferenceId, className, children, onDismiss, ...props }) {
    const [isDismissed, setIsDismissed] = useState(false);
    const { updateUserPreferences, product_advice_card_dismissed } = useUserPreferences();
    function handleDismissButtonClick() {
        if (dismissPreferenceId) {
            updateUserPreferences({
                product_advice_card_dismissed: {
                    ...product_advice_card_dismissed,
                    [dismissPreferenceId]: 'yes',
                },
            });
        }
        else {
            setIsDismissed((current) => !current);
        }
        if (onDismiss) {
            onDismiss();
        }
    }
    // Check if the advice card has been dismissed.
    if (isDismissible) {
        if (dismissPreferenceId &&
            product_advice_card_dismissed &&
            product_advice_card_dismissed?.[dismissPreferenceId] === 'yes') {
            return null;
        }
        if (isDismissed) {
            return null;
        }
    }
    return (createElement("div", { role: "group", ...props, className: clsx(className, 'fincommerce-advice-card', {
            'is-dismissible': isDismissible,
        }) },
        isDismissible && (createElement("div", { className: "fincommerce-advice-card__header" },
            createElement(Button, { className: "fincommerce-advice-card__dismiss-button", onClick: handleDismissButtonClick, icon: close, label: __('Dismiss', 'fincommerce'), isSmall: true }))),
        createElement("div", { className: "fincommerce-advice-card__body" }, children),
        tip && tip.length > 0 && (createElement("div", { className: "fincommerce-advice-card__footer" }, tip))));
}
