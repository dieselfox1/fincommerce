/**
 * External dependencies
 */
import clsx from 'clsx';
import { createElement, Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Spinner from '../spinner';
import CheckIcon from './check-icon';
/**
 * A stepper component to indicate progress in a set number of steps.
 */
export const Stepper = ({ className, currentStep, steps, isVertical = false, isPending = false, }) => {
    const renderCurrentStepContent = () => {
        const step = steps.find((s) => currentStep === s.key);
        if (!step || !step.content) {
            return null;
        }
        return (createElement("div", { className: "fincommerce-stepper_content" }, step.content));
    };
    const currentIndex = steps.findIndex((s) => currentStep === s.key);
    const stepperClassName = clsx('fincommerce-stepper', className, {
        'is-vertical': isVertical,
    });
    return (createElement("div", { className: stepperClassName },
        createElement("div", { className: "fincommerce-stepper__steps" }, steps.map((step, i) => {
            const { key, label, description, isComplete, onClick } = step;
            const isCurrentStep = key === currentStep;
            const stepClassName = clsx('fincommerce-stepper__step', {
                'is-active': isCurrentStep,
                'is-complete': typeof isComplete !== 'undefined'
                    ? isComplete
                    : currentIndex > i,
            });
            const icon = isCurrentStep && isPending ? (createElement(Spinner, null)) : (createElement("div", { className: "fincommerce-stepper__step-icon" },
                createElement("span", { className: "fincommerce-stepper__step-number" }, i + 1),
                createElement(CheckIcon, null)));
            const LabelWrapper = typeof onClick === 'function' ? 'button' : 'div';
            return (createElement(Fragment, { key: key },
                createElement("div", { className: stepClassName },
                    createElement(LabelWrapper, { className: "fincommerce-stepper__step-label-wrapper", onClick: typeof onClick === 'function'
                            ? () => onClick(key)
                            : undefined },
                        icon,
                        createElement("div", { className: "fincommerce-stepper__step-text" },
                            createElement("span", { className: "fincommerce-stepper__step-label" }, label),
                            description && (createElement("span", { className: "fincommerce-stepper__step-description" }, description)))),
                    isCurrentStep &&
                        isVertical &&
                        renderCurrentStepContent()),
                !isVertical && (createElement("div", { className: "fincommerce-stepper__step-divider" }))));
        })),
        !isVertical && renderCurrentStepContent()));
};
export default Stepper;
