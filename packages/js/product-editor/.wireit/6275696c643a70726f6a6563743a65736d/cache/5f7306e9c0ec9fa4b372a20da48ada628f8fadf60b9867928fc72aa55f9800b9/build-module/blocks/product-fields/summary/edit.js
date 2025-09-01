/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useInstanceId } from '@wordpress/compose';
import clsx from 'clsx';
import { 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
AlignmentControl, BlockControls, RichText, } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { ParagraphRTLControl } from './paragraph-rtl-control';
import { ALIGNMENT_CONTROLS } from './constants';
import { useClearSelectedBlockOnBlur } from '../../../hooks/use-clear-selected-block-on-blur';
export function SummaryBlockEdit({ attributes, setAttributes, context, }) {
    const { align, allowedFormats, direction, label, helpText } = attributes;
    const blockProps = useWooBlockProps(attributes, {
        style: { direction },
    });
    const contentId = useInstanceId(SummaryBlockEdit, 'wp-block-fincommerce-product-summary-field__content');
    const [summary, setSummary] = useEntityProp('postType', context.postType || 'product', attributes.property);
    // This is a workaround to hide the toolbar when the block is blurred.
    // This is a temporary solution until using Gutenberg 18 with the
    // fix from https://github.com/WordPress/gutenberg/pull/59800
    const { handleBlur: hideToolbar } = useClearSelectedBlockOnBlur();
    function handleAlignmentChange(value) {
        setAttributes({ align: value });
    }
    function handleDirectionChange(value) {
        setAttributes({ direction: value });
    }
    return (createElement("div", { className: 'wp-block wp-block-fincommerce-product-summary-field-wrapper' },
        createElement(BlockControls, { group: "block" },
            createElement(AlignmentControl, { alignmentControls: ALIGNMENT_CONTROLS, value: align, onChange: handleAlignmentChange }),
            createElement(ParagraphRTLControl, { direction: direction, onChange: handleDirectionChange })),
        createElement(BaseControl, { id: contentId.toString(), label: typeof label === 'undefined'
                ? createInterpolateElement(__('Summary', 'fincommerce'), {
                    optional: (createElement("span", { className: "fincommerce-product-form__optional-input" }, __('(OPTIONAL)', 'fincommerce'))),
                })
                : label, help: typeof helpText === 'undefined'
                ? __("Summarize this product in 1-2 short sentences. We'll show it at the top of the page.", 'fincommerce')
                : helpText },
            createElement("div", { ...blockProps },
                createElement(RichText, { id: contentId.toString(), identifier: "content", tagName: "p", value: summary, onChange: setSummary, "data-empty": Boolean(summary), className: clsx('components-summary-control', {
                        [`has-text-align-${align}`]: align,
                    }), dir: direction, allowedFormats: allowedFormats, onBlur: hideToolbar })))));
}
