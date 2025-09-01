"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetListPriceMenuItem = SetListPriceMenuItem;
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
function SetListPriceMenuItem({ selection, onChange, onClose, }) {
    return ((0, element_1.createElement)(components_1.MenuItem, { onClick: () => {
            const ids = selection.map(({ id }) => id);
            (0, tracks_1.recordEvent)('product_variations_menu_pricing_select', {
                source: constants_1.TRACKS_SOURCE,
                action: 'list_price_set',
                variation_id: ids,
            });
            (0, handle_prompt_1.handlePrompt)({
                onOk(value) {
                    (0, tracks_1.recordEvent)('product_variations_menu_pricing_update', {
                        source: constants_1.TRACKS_SOURCE,
                        action: 'list_price_set',
                        variation_id: ids,
                    });
                    onChange(selection.map(({ id }) => ({
                        id,
                        regular_price: value,
                    })));
                },
            });
            onClose();
        } }, (0, i18n_1.__)('Set regular price', 'fincommerce')));
}
