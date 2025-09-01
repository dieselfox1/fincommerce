/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
export const Badge = ({ count, className = '', ...props }) => {
    return (createElement("span", { className: `fincommerce-badge ${className}`, ...props }, count));
};
