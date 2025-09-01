/**
 * External dependencies
 */
import { createElement } from 'react';
import { Icon } from '@wordpress/icons';
import clsx from 'clsx';
export const SuffixIcon = ({ className = '', icon }) => {
    return (createElement("div", { className: clsx('fincommerce-experimental-select-control__suffix-icon', className) },
        createElement(Icon, { icon: icon, size: 24 })));
};
