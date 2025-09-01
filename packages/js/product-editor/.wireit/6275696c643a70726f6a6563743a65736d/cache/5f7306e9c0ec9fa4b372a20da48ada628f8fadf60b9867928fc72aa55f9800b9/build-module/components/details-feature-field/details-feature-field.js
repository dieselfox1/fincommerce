/**
 * External dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useFormContext, Link, __experimentalTooltip as Tooltip, } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';
import { createElement, Fragment, createInterpolateElement, } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { getCheckboxTracks } from '../../utils';
import { PRODUCT_DETAILS_SLUG } from '../../constants';
export const DetailsFeatureField = () => {
    const { getCheckboxControlProps } = useFormContext();
    return (createElement(CheckboxControl
    // @ts-expect-error label type is wrong
    , { 
        // @ts-expect-error label type is wrong
        label: createElement(Fragment, null,
            __('Feature this product', 'fincommerce'),
            createElement(Tooltip, { text: createInterpolateElement(__('Include this product in a featured section on your website with a widget or shortcode. <moreLink />', 'fincommerce'), {
                    moreLink: (createElement(Link, { href: "https://fincommerce.com/document/fincommerce-shortcodes/#products", target: "_blank", type: "external", onClick: () => recordEvent('add_product_learn_more', {
                            category: PRODUCT_DETAILS_SLUG,
                        }) }, __('Learn more', 'fincommerce'))),
                }) })), ...getCheckboxControlProps('featured', getCheckboxTracks('featured')) }));
};
