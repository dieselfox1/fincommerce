"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdviceCard = AdviceCard;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const data_1 = require("@fincommerce/data");
const clsx_1 = __importDefault(require("clsx"));
function AdviceCard({ tip, isDismissible = true, dismissPreferenceId, className, children, onDismiss, ...props }) {
    const [isDismissed, setIsDismissed] = (0, element_1.useState)(false);
    const { updateUserPreferences, product_advice_card_dismissed } = (0, data_1.useUserPreferences)();
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
    return ((0, element_1.createElement)("div", { role: "group", ...props, className: (0, clsx_1.default)(className, 'fincommerce-advice-card', {
            'is-dismissible': isDismissible,
        }) },
        isDismissible && ((0, element_1.createElement)("div", { className: "fincommerce-advice-card__header" },
            (0, element_1.createElement)(components_1.Button, { className: "fincommerce-advice-card__dismiss-button", onClick: handleDismissButtonClick, icon: icons_1.close, label: (0, i18n_1.__)('Dismiss', 'fincommerce'), isSmall: true }))),
        (0, element_1.createElement)("div", { className: "fincommerce-advice-card__body" }, children),
        tip && tip.length > 0 && ((0, element_1.createElement)("div", { className: "fincommerce-advice-card__footer" }, tip))));
}
