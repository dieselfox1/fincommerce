/**
 * External dependencies
 */
import { Dropdown, MenuItem, MenuGroup } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { chevronRight } from '@wordpress/icons';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../../constants';
import { handlePrompt } from '../../../utils/handle-prompt';
import { VariationQuickUpdateMenuItem } from '../variation-actions-menus/variation-quick-update-menu-item';
export function ShippingMenuItem({ selection, onChange, onClose, supportsMultipleSelection = false, }) {
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
    return (createElement(Dropdown, { popoverProps: {
            placement: 'right-start',
        }, renderToggle: ({ isOpen, onToggle }) => (createElement(MenuItem, { onClick: () => {
                recordEvent('product_variations_menu_shipping_click', {
                    source: TRACKS_SOURCE,
                    variation_id: ids,
                });
                onToggle();
            }, "aria-expanded": isOpen, icon: chevronRight, iconPosition: "right" }, __('Shipping', 'fincommerce'))), renderContent: () => (createElement("div", { className: "components-dropdown-menu__menu" },
            createElement(MenuGroup, null,
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_shipping_select', {
                            source: TRACKS_SOURCE,
                            action: 'toggle_shipping',
                            variation_id: ids,
                        });
                        onChange(selection.map(({ id, virtual }) => ({
                            id,
                            virtual: !virtual,
                        })));
                        recordEvent('product_variations_menu_shipping_update', {
                            source: TRACKS_SOURCE,
                            action: 'toggle_shipping',
                            variation_id: ids,
                        });
                        onClose();
                    } }, __('Toggle shipping', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_shipping_select', {
                            source: TRACKS_SOURCE,
                            action: 'dimensions_length_set',
                            variation_id: ids,
                        });
                        handlePrompt({
                            onOk(value) {
                                recordEvent('product_variations_menu_shipping_update', {
                                    source: TRACKS_SOURCE,
                                    action: 'dimensions_length_set',
                                    variation_id: ids,
                                });
                                handleDimensionsChange({
                                    length: value,
                                });
                            },
                        });
                        onClose();
                    } }, __('Set length', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_shipping_select', {
                            source: TRACKS_SOURCE,
                            action: 'dimensions_width_set',
                            variation_id: ids,
                        });
                        handlePrompt({
                            onOk(value) {
                                recordEvent('product_variations_menu_shipping_update', {
                                    source: TRACKS_SOURCE,
                                    action: 'dimensions_width_set',
                                    variation_id: ids,
                                });
                                handleDimensionsChange({
                                    width: value,
                                });
                            },
                        });
                        onClose();
                    } }, __('Set width', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_shipping_select', {
                            source: TRACKS_SOURCE,
                            action: 'dimensions_height_set',
                            variation_id: ids,
                        });
                        handlePrompt({
                            onOk(value) {
                                recordEvent('product_variations_menu_shipping_update', {
                                    source: TRACKS_SOURCE,
                                    action: 'dimensions_height_set',
                                    variation_id: ids,
                                });
                                handleDimensionsChange({
                                    height: value,
                                });
                            },
                        });
                        onClose();
                    } }, __('Set height', 'fincommerce')),
                createElement(MenuItem, { onClick: () => {
                        recordEvent('product_variations_menu_shipping_select', {
                            source: TRACKS_SOURCE,
                            action: 'weight_set',
                            variation_id: ids,
                        });
                        handlePrompt({
                            onOk(value) {
                                recordEvent('product_variations_menu_shipping_update', {
                                    source: TRACKS_SOURCE,
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
                    } }, __('Set weight', 'fincommerce'))),
            createElement(VariationQuickUpdateMenuItem.Slot, { group: 'shipping', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }))) }));
}
