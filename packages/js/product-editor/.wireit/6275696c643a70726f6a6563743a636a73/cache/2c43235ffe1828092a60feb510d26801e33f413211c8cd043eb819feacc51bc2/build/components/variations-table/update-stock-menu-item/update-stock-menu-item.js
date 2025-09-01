"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockMenuItem = UpdateStockMenuItem;
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
const handle_prompt_1 = require("../../../utils/handle-prompt");
function UpdateStockMenuItem({ selection, onChange, onClose, }) {
    return ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
            const ids = selection.map(({ id }) => id);
            (0, tracks_1.recordEvent)('product_variations_menu_inventory_select', {
                source: constants_1.TRACKS_SOURCE,
                action: 'stock_quantity_set',
                variation_id: ids,
            });
            (0, handle_prompt_1.handlePrompt)({
                onOk(value) {
                    const stockQuantity = Number(value);
                    if (Number.isNaN(stockQuantity)) {
                        return;
                    }
                    (0, tracks_1.recordEvent)('product_variations_menu_inventory_update', {
                        source: constants_1.TRACKS_SOURCE,
                        action: 'stock_quantity_set',
                        variation_id: ids,
                    });
                    onChange(selection.map(({ id }) => ({
                        id,
                        stock_quantity: stockQuantity,
                        manage_stock: true,
                    })));
                },
            });
            onClose();
        } }, (0, i18n_1.__)('Update stock', 'fincommerce')));
}
