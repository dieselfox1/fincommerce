/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { chevronRight } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../../constants';
import { PRODUCT_STOCK_STATUS_KEYS } from '../../../utils/get-product-stock-status';
import { UpdateStockMenuItem } from '../update-stock-menu-item';
import { handlePrompt } from '../../../utils/handle-prompt';
import { VariationQuickUpdateMenuItem } from '../variation-actions-menus';
export function InventoryMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
    const ids = selection.map(({ id }) => id);
    return (createElement(Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => (createElement(MenuItem, { onClick: () => {
                recordEvent('product_variations_menu_inventory_click', {
                    source: TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: chevronRight, iconPosition: "right" }, __('Inventory', 'fincommerce'))), renderContent: () => (createElement("div", { className: "components-dropdown-menu__menu" },
            createElement(MenuGroup, null,
                createElement(UpdateStockMenuItem, { selection: selection, onChange: onChange, onClose: onClose }),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_inventory_select', {
                            source: TRACKS_SOURCE,
                            action: 'manage_stock_toggle',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id, manage_stock }) => ({
                            id,
                            manage_stock: !manage_stock,
                        })));
                        onClose();
                    } }, __('Toggle "track quantity"', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_inventory_select', {
                            source: TRACKS_SOURCE,
                            action: 'set_status_in_stock',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id }) => ({
                            id,
                            stock_status: PRODUCT_STOCK_STATUS_KEYS.instock,
                            manage_stock: false,
                        })));
                        onClose();
                    } }, __('Set status to In stock', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_inventory_select', {
                            source: TRACKS_SOURCE,
                            action: 'set_status_out_of_stock',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id }) => ({
                            id,
                            stock_status: PRODUCT_STOCK_STATUS_KEYS.outofstock,
                            manage_stock: false,
                        })));
                        onClose();
                    } }, __('Set status to Out of stock', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_inventory_select', {
                            source: TRACKS_SOURCE,
                            action: 'set_status_on_back_order',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id }) => ({
                            id,
                            stock_status: PRODUCT_STOCK_STATUS_KEYS.onbackorder,
                            manage_stock: false,
                        })));
                        onClose();
                    } }, __('Set status to On back order', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_inventory_select', {
                            source: TRACKS_SOURCE,
                            action: 'low_stock_amount_set',
                            variation_id: ids,
                        });
                        handlePrompt({
                            onOk(value) {
                                recordEvent('product_variations_menu_inventory_update', {
                                    source: TRACKS_SOURCE,
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
                    } }, __('Edit low stock threshold', 'fincommerce'))),
            createElement(VariationQuickUpdateMenuItem.Slot, { group: 'inventory', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
