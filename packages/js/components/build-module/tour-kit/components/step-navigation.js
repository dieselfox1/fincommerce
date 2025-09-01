/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { createElement } from '@wordpress/element';
const StepNavigation = ({ currentStepIndex, onNextStep, onPreviousStep, onDismiss, steps, }) => {
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;
    const { primaryButton = { text: '', isDisabled: false, isHidden: false } } = steps[currentStepIndex].meta;
    const { secondaryButton = { text: '' } } = steps[currentStepIndex].meta;
    const { skipButton = { text: '', isVisible: false } } = steps[currentStepIndex].meta;
    const SkipButton = (createElement(Button, { className: "fincommerce-tour-kit-step-navigation__skip-btn", variant: "tertiary", onClick: onDismiss('skip-btn') }, skipButton.text || __('Skip', 'fincommerce')));
    const NextButton = (createElement(Button, { className: "fincommerce-tour-kit-step-navigation__next-btn", variant: "primary", disabled: primaryButton.isDisabled, onClick: onNextStep }, primaryButton.text || __('Next', 'fincommerce')));
    const BackButton = (createElement(Button, { className: "fincommerce-tour-kit-step-navigation__back-btn", variant: "secondary", onClick: onPreviousStep }, secondaryButton.text || __('Back', 'fincommerce')));
    const renderButtons = () => {
        if (isLastStep) {
            return (createElement("div", null,
                skipButton.isVisible ? SkipButton : null,
                !isFirstStep ? BackButton : null // For 1 step tours, isFirstStep and isLastStep can be true simultaneously.
            ,
                createElement(Button, { variant: "primary", disabled: primaryButton.isDisabled, className: "fincommerce-tour-kit-step-navigation__done-btn", onClick: onDismiss('done-btn') }, primaryButton.text || __('Done', 'fincommerce'))));
        }
        if (isFirstStep) {
            return (createElement("div", null,
                skipButton.isVisible ? SkipButton : null,
                NextButton));
        }
        return (createElement("div", null,
            skipButton.isVisible ? SkipButton : null,
            BackButton,
            NextButton));
    };
    if (primaryButton.isHidden) {
        return null;
    }
    return (createElement("div", { className: "fincommerce-tour-kit-step-navigation" },
        createElement("div", { className: "fincommerce-tour-kit-step-navigation__step" }, steps.length > 1
            ? sprintf(
            /* translators: current progress in tour, eg: "Step 2 of 4" */
            __('Step %1$d of %2$d', 'fincommerce'), currentStepIndex + 1, steps.length)
            : null),
        renderButtons()));
};
export default StepNavigation;
