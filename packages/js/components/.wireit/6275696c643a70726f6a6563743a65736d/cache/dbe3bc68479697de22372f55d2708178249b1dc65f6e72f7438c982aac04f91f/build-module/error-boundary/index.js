/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Component } from 'react';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import EmptyContent from '../empty-content';
import { alertIcon } from './constants';
export class ErrorBoundary extends Component {
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
            return (createElement("div", { className: "fincommerce-error-boundary" },
                createElement(EmptyContent, { title: "", actionLabel: "", message: errorMessage ||
                        __('Oops, something went wrong. Please try again', 'fincommerce'), secondaryActionLabel: actionLabel || __('Reload', 'fincommerce'), secondaryActionURL: null, secondaryActionCallback: showActionButton ? this.handleAction : undefined, illustrationWidth: 36, illustrationHeight: 36, illustration: alertIcon })));
        }
        return children;
    }
}
