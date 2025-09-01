/**
 * External dependencies
 */
import { createElement } from 'react';
export const ProgressBar = ({ className = '', percent = 0, color = '#674399', bgcolor = 'var(--wp-admin-theme-color)', }) => {
    const containerStyles = {
        backgroundColor: bgcolor,
    };
    const fillerStyles = {
        backgroundColor: color,
        width: `${percent}%`,
        display: percent === 0 ? 'none' : 'inherit',
    };
    return (createElement("div", { className: `fincommerce-progress-bar ${className}` },
        createElement("div", { className: "fincommerce-progress-bar__container", style: containerStyles },
            createElement("div", { className: "fincommerce-progress-bar__filler", style: fillerStyles }))));
};
