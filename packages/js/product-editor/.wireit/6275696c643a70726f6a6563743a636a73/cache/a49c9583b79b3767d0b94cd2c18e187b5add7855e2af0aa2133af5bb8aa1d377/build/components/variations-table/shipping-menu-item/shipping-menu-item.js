"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingMenuItem = ShippingMenuItem;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
const handle_prompt_1 = require("../../../utils/handle-prompt");
const variation_quick_update_menu_item_1 = require("../variation-actions-menus/variation-quick-update-menu-item");
function ShippingMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
    const ids = selection.map(({ id }) => id);
    function handleDimensionsChange(value) {
        onChange(selection.map(({ id, dimensions }) => ({
            id,
            dimensions: {
                ...dimensions,
                ...value,
            },
        })));
    }
    return ((0, element_1.createElement)(components_1.Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                (0, tracks_1.recordEvent)('product_variations_menu_shipping_click', {
                    source: constants_1.TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: icons_1.chevronRight, iconPosition: "right" }, (0, i18n_1.__)('Shipping', 'fincommerce'))), renderContent: () => ((0, element_1.createElement)("div", { className: "components-dropdown-menu__menu" },
            (0, element_1.createElement)(components_1.MenuGroup, null,
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_shipping_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'toggle_shipping',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id, virtual }) => ({
                            id,
                            virtual: !virtual,
                        })));
                        (0, tracks_1.recordEvent)('product_variations_menu_shipping_update', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'toggle_shipping',
                            variation_id: ids,
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Toggle shipping', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_shipping_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'dimensions_length_set',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_shipping_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'dimensions_length_set',
                                    variation_id: ids,
                                });
                                handleDimensionsChange({
                                    length: value,
                                });
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Set length', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_shipping_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'dimensions_width_set',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_shipping_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'dimensions_width_set',
                                    variation_id: ids,
                                });
                                handleDimensionsChange({
                                    width: value,
                                });
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Set width', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_shipping_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'dimensions_height_set',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_shipping_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'dimensions_height_set',
                                    variation_id: ids,
                                });
                                handleDimensionsChange({
                                    height: value,
                                });
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Set height', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_shipping_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'weight_set',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_shipping_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'weight_set',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id }) => ({
                                    id,
                                    weight: value,
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Set weight', 'fincommerce'))),
            (0, element_1.createElement)(variation_quick_update_menu_item_1.VariationQuickUpdateMenuItem.Slot, { group: 'shipping', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
