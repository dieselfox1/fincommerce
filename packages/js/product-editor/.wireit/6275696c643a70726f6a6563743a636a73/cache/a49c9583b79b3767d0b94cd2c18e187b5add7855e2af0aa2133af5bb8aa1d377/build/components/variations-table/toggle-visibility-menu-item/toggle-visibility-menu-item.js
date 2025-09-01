"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleVisibilityMenuItem = ToggleVisibilityMenuItem;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
function ToggleVisibilityMenuItem({ selection, onChange, onClose, }) {
    function toggleStatus(currentStatus) {
        return currentStatus === 'private' ? 'publish' : 'private';
    }
    function handleMenuItemClick() {
        const ids = selection.map(({ id }) => id);
        (0, tracks_1.recordEvent)('product_variations_menu_toggle_visibility_select', {
            source: constants_1.TRACKS_SOURCE,
            action: 'status_set',
            variation_id: ids,
        });
        onChange(selection.map(({ id, status }) => ({
            id,
            status: toggleStatus(status),
        })));
        (0, tracks_1.recordEvent)('product_variations_toggle_visibility_update', {
            source: constants_1.TRACKS_SOURCE,
            action: 'status_set',
            variation_id: ids,
        });
        onClose();
    }
    return ((0, element_1.createElement)(components_1.MenuItem, { onClick: handleMenuItemClick }, (0, i18n_1.__)('Toggle visibility', 'fincommerce')));
}
