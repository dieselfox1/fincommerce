"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleUpdateMenu = SingleUpdateMenu;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const tracks_1 = require("@fincommerce/tracks");
const constants_1 = require("../../../constants");
const variation_actions_1 = require("./variation-actions");
function SingleUpdateMenu({ selection, onChange, onDelete, }) {
    if (!selection || selection.length !== 1) {
        return null;
    }
    return ((0, element_1.createElement)(components_1.DropdownMenu, { popoverProps: {
            placement: 'left-start',
        }, icon: icons_1.moreVertical, label: (0, i18n_1.__)('Actions', 'fincommerce'), toggleProps: {
            onClick() {
                (0, tracks_1.recordEvent)('product_variations_menu_view', {
                    source: constants_1.TRACKS_SOURCE,
                    variation_id: selection[0].id,
                });
            },
        } }, ({ onClose }) => ((0, element_1.createElement)(variation_actions_1.VariationActions, { selection: selection, onClose: onClose, onChange: onChange, onDelete: onDelete, supportsMultipleSelection: false }))));
}
