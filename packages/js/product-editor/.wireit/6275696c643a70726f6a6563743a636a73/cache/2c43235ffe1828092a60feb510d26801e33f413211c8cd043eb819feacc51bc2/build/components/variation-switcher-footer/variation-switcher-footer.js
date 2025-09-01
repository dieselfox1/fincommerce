"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationSwitcherFooter = VariationSwitcherFooter;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const data_1 = require("@wordpress/data");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const switcher_loading_placeholder_1 = require("./switcher-loading-placeholder");
const variation_image_placeholder_1 = require("./variation-image-placeholder");
const use_variation_switcher_1 = require("../../hooks/use-variation-switcher");
function VariationSwitcherFooter({ parentProductType, variationId, parentId, }) {
    const { numberOfVariations, nextVariationId, previousVariationId, activeVariationIndex, nextVariationIndex, previousVariationIndex, goToNextVariation, goToPreviousVariation, } = (0, use_variation_switcher_1.useVariationSwitcher)({
        variationId,
        parentId,
        parentProductType,
    });
    const { previousVariation, nextVariation } = (0, data_1.useSelect)((select) => {
        const { getEntityRecord } = select('core');
        if (numberOfVariations && numberOfVariations > 0) {
            return {
                previousVariation: previousVariationId !== null &&
                    // @ts-expect-error Selector is not typed
                    getEntityRecord('postType', 'product_variation', previousVariationId),
                nextVariation: nextVariationId !== null &&
                    // @ts-expect-error Selector is not typed
                    getEntityRecord('postType', 'product_variation', nextVariationId),
            };
        }
        return {};
    }, [nextVariationId, previousVariationId, numberOfVariations]);
    function onPrevious() {
        if (previousVariation) {
            (0, tracks_1.recordEvent)('product_variation_switch_previous', {
                variation_length: numberOfVariations,
                variation_id: previousVariation?.id,
                variation_index: activeVariationIndex,
                previous_variation_index: previousVariationIndex,
            });
            goToPreviousVariation();
        }
    }
    function onNext() {
        if (nextVariation) {
            (0, tracks_1.recordEvent)('product_variation_switch_next', {
                variation_length: numberOfVariations,
                variation_id: nextVariation?.id,
                variation_index: activeVariationIndex,
                next_variation_index: nextVariationIndex,
            });
            goToNextVariation();
        }
    }
    if (!numberOfVariations || numberOfVariations < 2) {
        return null;
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-variation-switcher-footer" },
        previousVariation && ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-product-variation-switcher-footer__button fincommerce-product-variation-switcher-footer__button-previous", label: (0, i18n_1.__)('Previous', 'fincommerce'), onClick: onPrevious },
            (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.arrowLeft, size: 16 }),
            previousVariation.image ? ((0, element_1.createElement)("img", { alt: previousVariation.image.alt || '', src: previousVariation.image.src, className: "fincommerce-product-variation-switcher-footer__product-image" })) : ((0, element_1.createElement)(variation_image_placeholder_1.VariationImagePlaceholder, { className: "fincommerce-product-variation-switcher-footer__product-image" })),
            previousVariation.name)),
        !previousVariation && previousVariationId !== null && ((0, element_1.createElement)(switcher_loading_placeholder_1.SwitcherLoadingPlaceholder, { position: "left" })),
        nextVariation && ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-product-variation-switcher-footer__button fincommerce-product-variation-switcher-footer__button-next", label: (0, i18n_1.__)('Next', 'fincommerce'), onClick: onNext },
            nextVariation.name,
            nextVariation.image ? ((0, element_1.createElement)("img", { alt: nextVariation.image.alt || '', src: nextVariation.image.src, className: "fincommerce-product-variation-switcher-footer__product-image" })) : ((0, element_1.createElement)(variation_image_placeholder_1.VariationImagePlaceholder, { className: "fincommerce-product-variation-switcher-footer__product-image" })),
            (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.arrowRight, size: 16 }))),
        !nextVariation && nextVariationId !== null && ((0, element_1.createElement)(switcher_loading_placeholder_1.SwitcherLoadingPlaceholder, { position: "right" }))));
}
