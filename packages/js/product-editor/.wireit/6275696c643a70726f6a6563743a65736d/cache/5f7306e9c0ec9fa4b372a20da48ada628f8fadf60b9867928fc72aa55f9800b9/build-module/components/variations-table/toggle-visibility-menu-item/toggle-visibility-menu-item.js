/**
 * External dependencies
 */
import { MenuItem } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../../constants';
export function ToggleVisibilityMenuItem({ selection, onChange, onClose, }) {
    function toggleStatus(currentStatus) {
        return currentStatus === 'private' ? 'publish' : 'private';
    }
    function handleMenuItemClick() {
        const ids = selection.map(({ id }) => id);
        recordEvent('product_variations_menu_toggle_visibility_select', {
            source: TRACKS_SOURCE,
            action: 'status_set',
            variation_id: ids,
        });
        onChange(selection.map(({ id, status }) => ({
            id,
            status: toggleStatus(status),
        })));
        recordEvent('product_variations_toggle_visibility_update', {
            source: TRACKS_SOURCE,
            action: 'status_set',
            variation_id: ids,
        });
        onClose();
    }
    return (createElement(MenuItem, { onClick: handleMenuItemClick }, __('Toggle visibility', 'fincommerce')));
}
