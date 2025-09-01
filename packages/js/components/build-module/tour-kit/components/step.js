/**
 * External dependencies
 */
import { withViewportMatch } from '@wordpress/viewport';
import { Card, CardBody, CardFooter, CardHeader } from '@wordpress/components';
import { createElement, useEffect, useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */
import StepNavigation from './step-navigation';
import StepControls from './step-controls';
const getFocusElement = (focusElementSelector, iframeSelector) => {
    if (!focusElementSelector) {
        return null;
    }
    if (iframeSelector) {
        const iframeElement = document.querySelector(iframeSelector);
        if (!iframeElement) {
            return null;
        }
        const innerDoc = iframeElement.contentDocument ||
            (iframeElement.contentWindow &&
                iframeElement.contentWindow.document);
        if (!innerDoc) {
            return null;
        }
        return innerDoc.querySelector(focusElementSelector);
    }
    return document.querySelector(focusElementSelector);
};
const Step = ({ steps, currentStepIndex, onDismiss, onNextStep, onPreviousStep, setInitialFocusedElement, onGoToStep, isViewportMobile, }) => {
    const { descriptions, heading } = steps[currentStepIndex].meta;
    const description = descriptions[isViewportMobile ? 'mobile' : 'desktop'] ??
        descriptions.desktop;
    const stepRef = useRef();
    const focusElementSelector = steps[currentStepIndex].focusElement?.[isViewportMobile ? 'mobile' : 'desktop'] || null;
    const iframeSelector = steps[currentStepIndex].focusElement?.iframe || null;
    const focusElement = getFocusElement(focusElementSelector, iframeSelector);
    /*
     * Focus the element when step renders.
     */
    useEffect(() => {
        if (focusElement) {
            setInitialFocusedElement(focusElement);
        }
        else {
            // If no focus element is found, focus the last button in the step so that the user can navigate using keyboard.
            const buttons = stepRef.current?.querySelectorAll('button');
            if (buttons && buttons.length) {
                setInitialFocusedElement(buttons[buttons.length - 1]);
            }
        }
    }, [focusElement, setInitialFocusedElement]);
    return (createElement(Card, { ref: stepRef, className: "fincommerce-tour-kit-step", elevation: 2 },
        createElement(CardHeader, { isBorderless: true, size: "small" },
            createElement(StepControls, { onDismiss: onDismiss })),
        createElement(CardBody, { className: "fincommerce-tour-kit-step__body", size: "small" },
            createElement("h2", { className: "fincommerce-tour-kit-step__heading" }, heading),
            createElement("p", { className: "fincommerce-tour-kit-step__description" }, description)),
        createElement(CardFooter, { isBorderless: true, size: "small" },
            createElement(StepNavigation, { currentStepIndex: currentStepIndex, onGoToStep: onGoToStep, onNextStep: onNextStep, onPreviousStep: onPreviousStep, onDismiss: onDismiss, steps: steps }))));
};
export default withViewportMatch({
    isViewportMobile: '< medium',
})(Step);
