/**
 * External dependencies
 */
import clsx from 'clsx';
import { useState, useEffect, Children, createElement, Fragment, } from '@wordpress/element';
/**
 * Internal dependencies
 */
import ProgressBar from './ProgressBar';
export const Loader = ({ children, className, }) => {
    return (createElement("div", { className: clsx('fincommerce-onboarding-loader', className) }, children));
};
Loader.Layout = ({ children, className, }) => {
    return (createElement("div", { className: clsx('fincommerce-onboarding-loader-wrapper', className) },
        createElement("div", { className: clsx('fincommerce-onboarding-loader-container', className) }, children)));
};
Loader.Illustration = ({ children }) => {
    return createElement(Fragment, null, children);
};
Loader.Title = ({ children, className, }) => {
    return (createElement("h1", { className: clsx('fincommerce-onboarding-loader__title', className) }, children));
};
Loader.ProgressBar = ({ progress, className, }) => {
    return (createElement(ProgressBar, { className: clsx('progress-bar', className), percent: progress ?? 0, color: 'var(--wp-admin-theme-color)', bgcolor: '#E0E0E0' }));
};
Loader.Subtext = ({ children, className, }) => {
    return (createElement("p", { className: clsx('fincommerce-onboarding-loader__paragraph', className) }, children));
};
const LoaderSequence = ({ interval, shouldLoop = true, children, onChange = () => { }, }) => {
    const [index, setIndex] = useState(0);
    const childCount = Children.count(children);
    useEffect(() => {
        const rotateInterval = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (shouldLoop) {
                    const updatedIndex = nextIndex % childCount;
                    onChange(updatedIndex);
                    return updatedIndex;
                }
                if (nextIndex < childCount) {
                    onChange(nextIndex);
                    return nextIndex;
                }
                clearInterval(rotateInterval);
                return prevIndex;
            });
        }, interval);
        return () => clearInterval(rotateInterval);
    }, [interval, children, shouldLoop, childCount]);
    const childToDisplay = Children.toArray(children)[index];
    return createElement(Fragment, null, childToDisplay);
};
Loader.Sequence = LoaderSequence; // eslint rule-of-hooks can't handle the compound component definition directly
