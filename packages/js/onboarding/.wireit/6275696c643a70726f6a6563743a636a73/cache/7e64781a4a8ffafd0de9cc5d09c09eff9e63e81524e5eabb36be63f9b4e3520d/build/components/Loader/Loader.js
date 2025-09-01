"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const ProgressBar_1 = __importDefault(require("./ProgressBar"));
const Loader = ({ children, className, }) => {
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-onboarding-loader', className) }, children));
};
exports.Loader = Loader;
exports.Loader.Layout = ({ children, className, }) => {
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-onboarding-loader-wrapper', className) },
        (0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-onboarding-loader-container', className) }, children)));
};
exports.Loader.Illustration = ({ children }) => {
    return (0, element_1.createElement)(element_1.Fragment, null, children);
};
exports.Loader.Title = ({ children, className, }) => {
    return ((0, element_1.createElement)("h1", { className: (0, clsx_1.default)('fincommerce-onboarding-loader__title', className) }, children));
};
exports.Loader.ProgressBar = ({ progress, className, }) => {
    return ((0, element_1.createElement)(ProgressBar_1.default, { className: (0, clsx_1.default)('progress-bar', className), percent: progress ?? 0, color: 'var(--wp-admin-theme-color)', bgcolor: '#E0E0E0' }));
};
exports.Loader.Subtext = ({ children, className, }) => {
    return ((0, element_1.createElement)("p", { className: (0, clsx_1.default)('fincommerce-onboarding-loader__paragraph', className) }, children));
};
const LoaderSequence = ({ interval, shouldLoop = true, children, onChange = () => { }, }) => {
    const [index, setIndex] = (0, element_1.useState)(0);
    const childCount = element_1.Children.count(children);
    (0, element_1.useEffect)(() => {
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
    const childToDisplay = element_1.Children.toArray(children)[index];
    return (0, element_1.createElement)(element_1.Fragment, null, childToDisplay);
};
exports.Loader.Sequence = LoaderSequence; // eslint rule-of-hooks can't handle the compound component definition directly
