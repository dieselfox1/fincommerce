/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement } from '@wordpress/element';
export const RecommendedRibbon = ({ isLocalPartner = false, }) => {
    const text = isLocalPartner
        ? __('Local Partner', 'fincommerce')
        : __('Recommended', 'fincommerce');
    return (createElement("div", { className: 'fincommerce-task-payment__recommended-ribbon' },
        createElement("span", null, text)));
};
