/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { ToolbarButton } from '@wordpress/components';
import { _x, isRTL } from '@wordpress/i18n';
import { formatLtr } from '@wordpress/icons';
export function ParagraphRTLControl({ direction, onChange, }) {
    function handleClick() {
        if (typeof onChange === 'function') {
            onChange(direction === 'ltr' ? undefined : 'ltr');
        }
    }
    return (createElement(Fragment, null, isRTL() && (createElement(ToolbarButton, { icon: formatLtr, title: _x('Left to right', 'editor button', 'fincommerce'), isActive: direction === 'ltr', onClick: handleClick }))));
}
