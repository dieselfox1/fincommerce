/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { __experimentalTooltip as Tooltip } from '@fincommerce/components';
import { sanitizeHTML } from '../../utils/sanitize-html';
import { BlockSlot } from '../block-slot-fill';
export function SectionHeader({ description, sectionTagName, title, }) {
    const HeadingTagName = sectionTagName === 'fieldset' ? 'legend' : 'div';
    return (createElement(HeadingTagName, { className: "wp-block-fincommerce-product-section-header__heading" },
        createElement("div", { className: "wp-block-fincommerce-product-section-header__heading-title-wrapper" },
            createElement("h2", { className: "wp-block-fincommerce-product-section-header__heading-title" },
                title,
                description && (createElement(Tooltip, { className: "wp-block-fincommerce-product-section-header__heading-tooltip", text: createElement("p", { className: "wp-block-fincommerce-product-section-header__heading-description", dangerouslySetInnerHTML: sanitizeHTML(description) }), position: 'bottom center', helperText: __('View helper text', 'fincommerce') }))),
            createElement("div", { className: "wp-block-fincommerce-product-section-header__actions" },
                createElement(BlockSlot, { name: `section-actions` }))),
        createElement(BlockSlot, { name: `section-description` })));
}
