"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingMenuItem = PricingMenuItem;
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
const handle_prompt_1 = require("../../../utils/handle-prompt");
const set_list_price_menu_item_1 = require("../set-list-price-menu-item");
const variation_actions_menus_1 = require("../variation-actions-menus");
function isPercentage(value) {
    return value.endsWith('%');
}
function parsePercentage(value) {
    const stringNumber = value.substring(0, value.length - 1);
    if (Number.isNaN(Number(stringNumber))) {
        return undefined;
    }
    return Number(stringNumber);
}
function addFixedOrPercentage(value, fixedOrPercentage, increaseOrDecrease = 1) {
    if (isPercentage(fixedOrPercentage)) {
        if (Number.isNaN(Number(value))) {
            return 0;
        }
        const percentage = parsePercentage(fixedOrPercentage);
        if (percentage === undefined) {
            return Number(value);
        }
        return (Number(value) +
            Number(value) * (percentage / 100) * increaseOrDecrease);
    }
    if (Number.isNaN(Number(value))) {
        if (Number.isNaN(Number(fixedOrPercentage))) {
            return undefined;
        }
        return Number(fixedOrPercentage);
    }
    return Number(value) + Number(fixedOrPercentage) * increaseOrDecrease;
}
function PricingMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
    const ids = selection.map(({ id }) => id);
    return ((0, element_1.createElement)(components_1.Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                (0, tracks_1.recordEvent)('product_variations_menu_pricing_click', {
                    source: constants_1.TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: icons_1.chevronRight, iconPosition: "right" }, (0, i18n_1.__)('Pricing', 'fincommerce'))), renderContent: () => ((0, element_1.createElement)("div", { className: "components-dropdown-menu__menu" },
            (0, element_1.createElement)(components_1.MenuGroup, { label: (0, i18n_1.__)('Regular price', 'fincommerce') },
                (0, element_1.createElement)(set_list_price_menu_item_1.SetListPriceMenuItem, { selection: selection, onChange: onChange, onClose: onClose }),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'list_price_increase',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            message: (0, i18n_1.__)('Enter a value (fixed or %)', 'fincommerce'),
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'list_price_increase',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id, regular_price }) => ({
                                    id,
                                    regular_price: addFixedOrPercentage(regular_price, value)?.toFixed(2),
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Increase regular price', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'list_price_decrease',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            message: (0, i18n_1.__)('Enter a value (fixed or %)', 'fincommerce'),
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'list_price_increase',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id, regular_price }) => ({
                                    id,
                                    regular_price: addFixedOrPercentage(regular_price, value, -1)?.toFixed(2),
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Decrease regular price', 'fincommerce'))),
            (0, element_1.createElement)(components_1.MenuGroup, { label: (0, i18n_1.__)('Sale price', 'fincommerce') },
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'sale_price_set',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'sale_price_set',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id }) => ({
                                    id,
                                    sale_price: value,
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Set sale price', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'sale_price_increase',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            message: (0, i18n_1.__)('Enter a value (fixed or %)', 'fincommerce'),
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'sale_price_increase',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id, sale_price }) => ({
                                    id,
                                    sale_price: addFixedOrPercentage(sale_price, value)?.toFixed(2),
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Increase sale price', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'sale_price_decrease',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            message: (0, i18n_1.__)('Enter a value (fixed or %)', 'fincommerce'),
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'sale_price_decrease',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id, sale_price }) => ({
                                    id,
                                    sale_price: addFixedOrPercentage(sale_price, value, -1)?.toFixed(2),
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Decrease sale price', 'fincommerce')),
                (0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
                        (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'sale_price_schedule',
                            variation_id: ids,
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            message: (0, i18n_1.__)('Sale start date (YYYY-MM-DD format or leave blank)', 'fincommerce'),
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'sale_price_schedule',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id }) => ({
                                    id,
                                    date_on_sale_from_gmt: value,
                                })));
                            },
                        });
                        (0, handle_prompt_1.handlePrompt)({
                            message: (0, i18n_1.__)('Sale end date (YYYY-MM-DD format or leave blank)', 'fincommerce'),
                            onOk(value) {
                                (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                                    source: constants_1.TRACKS_SOURCE,
                                    action: 'sale_price_schedule',
                                    variation_id: ids,
                                });
                                onChange(selection.map(({ id }) => ({
                                    id,
                                    date_on_sale_to_gmt: value,
                                })));
                            },
                        });
                        onClose();
                    } }, (0, i18n_1.__)('Schedule sale', 'fincommerce'))),
            (0, element_1.createElement)(variation_actions_menus_1.VariationQuickUpdateMenuItem.Slot, { group: 'pricing', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
