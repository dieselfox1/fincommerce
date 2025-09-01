"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const StepNavigation = ({ currentStepIndex, onNextStep, onPreviousStep, onDismiss, steps, }) => {
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;
    const { primaryButton = { text: '', isDisabled: false, isHidden: false } } = steps[currentStepIndex].meta;
    const { secondaryButton = { text: '' } } = steps[currentStepIndex].meta;
    const { skipButton = { text: '', isVisible: false } } = steps[currentStepIndex].meta;
    const SkipButton = ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-tour-kit-step-navigation__skip-btn", variant: "tertiary", onClick: onDismiss('skip-btn') }, skipButton.text || (0, i18n_1.__)('Skip', 'fincommerce')));
    const NextButton = ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-tour-kit-step-navigation__next-btn", variant: "primary", disabled: primaryButton.isDisabled, onClick: onNextStep }, primaryButton.text || (0, i18n_1.__)('Next', 'fincommerce')));
    const BackButton = ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-tour-kit-step-navigation__back-btn", variant: "secondary", onClick: onPreviousStep }, secondaryButton.text || (0, i18n_1.__)('Back', 'fincommerce')));
    const renderButtons = () => {
        if (isLastStep) {
            return ((0, element_1.createElement)("div", null,
                skipButton.isVisible ? SkipButton : null,
                !isFirstStep ? BackButton : null // For 1 step tours, isFirstStep and isLastStep can be true simultaneously.
            ,
                (0, element_1.createElement)(components_1.Button, { variant: "primary", disabled: primaryButton.isDisabled, className: "fincommerce-tour-kit-step-navigation__done-btn", onClick: onDismiss('done-btn') }, primaryButton.text || (0, i18n_1.__)('Done', 'fincommerce'))));
        }
        if (isFirstStep) {
            return ((0, element_1.createElement)("div", null,
                skipButton.isVisible ? SkipButton : null,
                NextButton));
        }
        return ((0, element_1.createElement)("div", null,
            skipButton.isVisible ? SkipButton : null,
            BackButton,
            NextButton));
    };
    if (primaryButton.isHidden) {
        return null;
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-tour-kit-step-navigation" },
        (0, element_1.createElement)("div", { className: "fincommerce-tour-kit-step-navigation__step" }, steps.length > 1
            ? (0, i18n_1.sprintf)(
            /* translators: current progress in tour, eg: "Step 2 of 4" */
            (0, i18n_1.__)('Step %1$d of %2$d', 'fincommerce'), currentStepIndex + 1, steps.length)
            : null),
        renderButtons()));
};
exports.default = StepNavigation;
