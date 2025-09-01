/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { ToolbarButton } from '@wordpress/components';
import { _x, isRTL } from '@wordpress/i18n';
import { formatLtr } from '@wordpress/icons';
export function RTLToolbarButton({ direction, onChange, }) {
    if (!isRTL()) {
        return null;
    }
    return (createElement(ToolbarButton, { icon: formatLtr, title: _x('Left to right', 'editor button', 'fincommerce'), isActive: direction === 'ltr', onClick: () => onChange?.(direction === 'ltr' ? undefined : 'ltr') }));
}
