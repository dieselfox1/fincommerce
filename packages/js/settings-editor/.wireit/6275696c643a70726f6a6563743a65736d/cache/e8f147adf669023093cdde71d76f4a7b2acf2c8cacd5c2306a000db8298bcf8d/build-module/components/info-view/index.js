/**
 * External dependencies
 */
import { createElement, useEffect, useRef } from '@wordpress/element';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { sanitizeHTML } from '../../utils';
export const InfoView = ({ text, className, css = '' }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.style.cssText = css;
        }
    }, [css]);
    return (createElement("div", { ref: ref, className: clsx('fincommerce-settings-info-view', className), dangerouslySetInnerHTML: {
            __html: sanitizeHTML(text ?? ''),
        } }));
};
