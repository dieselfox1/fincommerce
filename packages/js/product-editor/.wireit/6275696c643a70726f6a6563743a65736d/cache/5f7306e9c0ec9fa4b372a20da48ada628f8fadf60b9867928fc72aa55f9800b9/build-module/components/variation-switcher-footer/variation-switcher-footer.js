/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { arrowLeft, arrowRight, Icon } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { SwitcherLoadingPlaceholder } from './switcher-loading-placeholder';
import { VariationImagePlaceholder } from './variation-image-placeholder';
import { useVariationSwitcher } from '../../hooks/use-variation-switcher';
export function VariationSwitcherFooter({ parentProductType, variationId, parentId, }) {
    const { numberOfVariations, nextVariationId, previousVariationId, activeVariationIndex, nextVariationIndex, previousVariationIndex, goToNextVariation, goToPreviousVariation, } = useVariationSwitcher({
        variationId,
        parentId,
        parentProductType,
    });
    const { previousVariation, nextVariation } = useSelect((select) => {
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
            recordEvent('product_variation_switch_previous', {
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
            recordEvent('product_variation_switch_next', {
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
    return (createElement("div", { className: "fincommerce-product-variation-switcher-footer" },
        previousVariation && (createElement(Button, { className: "fincommerce-product-variation-switcher-footer__button fincommerce-product-variation-switcher-footer__button-previous", label: __('Previous', 'fincommerce'), onClick: onPrevious },
            createElement(Icon, { icon: arrowLeft, size: 16 }),
            previousVariation.image ? (createElement("img", { alt: previousVariation.image.alt || '', src: previousVariation.image.src, className: "fincommerce-product-variation-switcher-footer__product-image" })) : (createElement(VariationImagePlaceholder, { className: "fincommerce-product-variation-switcher-footer__product-image" })),
            previousVariation.name)),
        !previousVariation && previousVariationId !== null && (createElement(SwitcherLoadingPlaceholder, { position: "left" })),
        nextVariation && (createElement(Button, { className: "fincommerce-product-variation-switcher-footer__button fincommerce-product-variation-switcher-footer__button-next", label: __('Next', 'fincommerce'), onClick: onNext },
            nextVariation.name,
            nextVariation.image ? (createElement("img", { alt: nextVariation.image.alt || '', src: nextVariation.image.src, className: "fincommerce-product-variation-switcher-footer__product-image" })) : (createElement(VariationImagePlaceholder, { className: "fincommerce-product-variation-switcher-footer__product-image" })),
            createElement(Icon, { icon: arrowRight, size: 16 }))),
        !nextVariation && nextVariationId !== null && (createElement(SwitcherLoadingPlaceholder, { position: "right" }))));
}
