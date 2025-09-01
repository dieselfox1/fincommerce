"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const react_1 = require("react");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const empty_content_1 = __importDefault(require("../empty-content"));
const constants_1 = require("./constants");
class ErrorBoundary extends react_1.Component {
    static defaultProps = {
        showActionButton: true,
        resetErrorAfterAction: true,
    };
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(_error, errorInfo) {
        this.setState({ errorInfo });
        if (this.props.onError) {
            this.props.onError(_error, errorInfo);
        }
        // TODO: Log error to error tracking service
    }
    handleReload = () => {
        window.location.reload();
    };
    handleAction = () => {
        const { actionCallback, resetErrorAfterAction } = this.props;
        if (actionCallback) {
            actionCallback(this.state.error);
        }
        else {
            this.handleReload();
        }
        if (resetErrorAfterAction) {
            this.setState({ hasError: false, error: null, errorInfo: null });
        }
    };
    render() {
        const { children, errorMessage, showActionButton, actionLabel } = this.props;
        if (this.state.hasError) {
            return ((0, element_1.createElement)("div", { className: "fincommerce-error-boundary" },
                (0, element_1.createElement)(empty_content_1.default, { title: "", actionLabel: "", message: errorMessage ||
                        (0, i18n_1.__)('Oops, something went wrong. Please try again', 'fincommerce'), secondaryActionLabel: actionLabel || (0, i18n_1.__)('Reload', 'fincommerce'), secondaryActionURL: null, secondaryActionCallback: showActionButton ? this.handleAction : undefined, illustrationWidth: 36, illustrationHeight: 36, illustration: constants_1.alertIcon })));
        }
        return children;
    }
}
exports.ErrorBoundary = ErrorBoundary;
