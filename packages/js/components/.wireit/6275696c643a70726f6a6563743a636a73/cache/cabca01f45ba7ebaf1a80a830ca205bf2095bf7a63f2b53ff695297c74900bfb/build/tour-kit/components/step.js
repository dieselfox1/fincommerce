"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const viewport_1 = require("@wordpress/viewport");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const step_navigation_1 = __importDefault(require("./step-navigation"));
const step_controls_1 = __importDefault(require("./step-controls"));
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
    const stepRef = (0, element_1.useRef)();
    const focusElementSelector = steps[currentStepIndex].focusElement?.[isViewportMobile ? 'mobile' : 'desktop'] || null;
    const iframeSelector = steps[currentStepIndex].focusElement?.iframe || null;
    const focusElement = getFocusElement(focusElementSelector, iframeSelector);
    /*
     * Focus the element when step renders.
     */
    (0, element_1.useEffect)(() => {
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
    return ((0, element_1.createElement)(components_1.Card, { ref: stepRef, className: "fincommerce-tour-kit-step", elevation: 2 },
        (0, element_1.createElement)(components_1.CardHeader, { isBorderless: true, size: "small" },
            (0, element_1.createElement)(step_controls_1.default, { onDismiss: onDismiss })),
        (0, element_1.createElement)(components_1.CardBody, { className: "fincommerce-tour-kit-step__body", size: "small" },
            (0, element_1.createElement)("h2", { className: "fincommerce-tour-kit-step__heading" }, heading),
            (0, element_1.createElement)("p", { className: "fincommerce-tour-kit-step__description" }, description)),
        (0, element_1.createElement)(components_1.CardFooter, { isBorderless: true, size: "small" },
            (0, element_1.createElement)(step_navigation_1.default, { currentStepIndex: currentStepIndex, onGoToStep: onGoToStep, onNextStep: onNextStep, onPreviousStep: onPreviousStep, onDismiss: onDismiss, steps: steps }))));
};
exports.default = (0, viewport_1.withViewportMatch)({
    isViewportMobile: '< medium',
})(Step);
