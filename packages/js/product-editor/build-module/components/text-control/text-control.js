import { createElement, forwardRef } from '@wordpress/element';
import clsx from 'clsx';
import { __experimentalInputControl as InputControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { Label } from '../label/label';
export const TextControl = forwardRef(function ForwardedTextControl({ label, help, error, tooltip, className, required, onChange, onBlur, ...props }, ref) {
    return (createElement(InputControl, { ...props, ref: ref, className: clsx('fincommerce-product-text-control', className, {
            'has-error': error,
        }), label: createElement(Label, { label: label, required: required, tooltip: tooltip }), required: required, help: error || help, onChange: (value) => {
            onChange(value ?? '');
        }, onBlur: onBlur }));
});
