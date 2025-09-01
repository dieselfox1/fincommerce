/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { arrowLeft } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { createElement } from '@wordpress/element';
export function BackButton({ onClick }) {
    return (createElement(Button, { className: "fincommerce-iframe-editor__back-button", icon: arrowLeft, onClick: onClick }, __('Back', 'fincommerce')));
}
