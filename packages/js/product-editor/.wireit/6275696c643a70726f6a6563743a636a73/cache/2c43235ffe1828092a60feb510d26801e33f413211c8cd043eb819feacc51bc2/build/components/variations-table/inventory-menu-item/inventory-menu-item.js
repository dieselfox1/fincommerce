"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMenuItem = InventoryMenuItem;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
const get_product_stock_status_1 = require("../../../utils/get-product-stock-status");
const update_stock_menu_item_1 = require("../update-stock-menu-item");
const handle_prompt_1 = require("../../../utils/handle-prompt");
const variation_actions_menus_1 = require("../variation-actions-menus");
function InventoryMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
    const ids = selection.map(({ id }) => id);
    return ((0, element_1.createElement)(components_1.Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                (0, tracks_1.recordEvent)('product_variations_menu_inventory_click', {
                    source: constants_1.TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: icons_1.chevronRight, iconPosition: "right" }, (0, i18n_1.__)('Inventory', 'fincommerce'))), renderContent: () => ((0, element_1.createElement)("div", { className: "components-dropdown-menu__menu" },
            (0, element_1.createElement)(components_1.MenuGroup, null,
                (0, element_1.createElement)(update_stock_menu_item_1.UpdateStockMenuItem, { selection: selection, onChange: onChange, onClose: onClose }),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_inventory_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'manage_stock_toggle',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id, manage_stock }) => ({
                            id,
                            manage_stock: !manage_stock,
                        })));
                        onClose();
                    } }, (0, i18n_1.__)('Toggle "track quantity"', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_inventory_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'set_status_in_stock',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id }) => ({
                            id,
                            stock_status: get_product_stock_status_1.PRODUCT_STOCK_STATUS_KEYS.instock,
                            manage_stock: false,
                        })));
                        onClose();
                    } }, (0, i18n_1.__)('Set status to In stock', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_inventory_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'set_status_out_of_stock',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id }) => ({
                            id,
                            stock_status: get_product_stock_status_1.PRODUCT_STOCK_STATUS_KEYS.outofstock,
                            manage_stock: false,
                        })));
                        onClose();
                    } }, (0, i18n_1.__)('Set status to Out of stock', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_inventory_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'set_status_on_back_order',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id }) => ({
                            id,
                            stock_status: get_product_stock_status_1.PRODUCT_STOCK_STATUS_KEYS.onbackorder,
                            manage_stock: false,
                        })));
                        onClose();
                    } }, (0, i18n_1.__)('Set status to On back order', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_inventory_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'low_stock_amount_set',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_inventory_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'low_stock_amount_set',
                                    variation_id: ids,
                                });
                                const lowStockAmount = Number(value);
                                if (Number.isNaN(lowStockAmount)) {
                                    return null;
                                }
                                onChange(selection.map(({ id }) => ({
                                    id,
                                    low_stock_amount: lowStockAmount,
                                    manage_stock: true,
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Edit low stock threshold', 'fincommerce'))),
            (0, element_1.createElement)(variation_actions_menus_1.VariationQuickUpdateMenuItem.Slot, { group: 'inventory', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
