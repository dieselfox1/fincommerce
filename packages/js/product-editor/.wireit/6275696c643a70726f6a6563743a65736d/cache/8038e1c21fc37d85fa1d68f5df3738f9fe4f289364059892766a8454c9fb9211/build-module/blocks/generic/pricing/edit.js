/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { Link } from '@fincommerce/components';
import { getNewPath } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
import { useInstanceId } from '@wordpress/compose';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useCurrencyInputProps } from '../../../hooks/use-currency-input-props';
import useProductEntityProp from '../../../hooks/use-product-entity-prop';
import { Label } from '../../../components/label/label';
export function Edit({ attributes, context: { postType }, }) {
    const blockProps = useWooBlockProps(attributes);
    const { property, label = __('Price', 'fincommerce'), help, disabled, tooltip, } = attributes;
    const [price, setPrice] = useProductEntityProp(property, {
        postType,
        fallbackValue: '',
    });
    const inputProps = useCurrencyInputProps({
        value: price || '',
        onChange: setPrice,
    });
    const interpolatedHelp = help
        ? createInterpolateElement(help, {
            PricingTab: (createElement(Link, { href: getNewPath({ tab: 'pricing' }), onClick: () => {
                    recordEvent('product_pricing_help_click');
                } })),
        })
        : null;
    const priceId = useInstanceId(BaseControl, 'wp-block-fincommerce-product-pricing-field');
    return (createElement("div", { ...blockProps },
        createElement(BaseControl, { id: priceId, help: interpolatedHelp },
            createElement(InputControl, { ...inputProps, disabled: disabled, id: priceId, name: property, label: tooltip ? (createElement(Label, { label: label, tooltip: tooltip })) : (label) }))));
}
