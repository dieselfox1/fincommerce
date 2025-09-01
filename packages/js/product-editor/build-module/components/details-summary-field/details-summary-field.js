/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useFormContext, __experimentalRichTextEditor as RichTextEditor, } from '@fincommerce/components';
import { serialize, parse } from '@wordpress/blocks';
import { useState, createElement } from '@wordpress/element';
export const DetailsSummaryField = () => {
    const { setValue, values } = useFormContext();
    const [summaryBlocks, setSummaryBlocks] = useState(parse(values.short_description || ''));
    return (createElement(RichTextEditor, { label: __('Summary', 'fincommerce'), blocks: summaryBlocks, onChange: (blocks) => {
            setSummaryBlocks(blocks);
            if (!summaryBlocks.length) {
                return;
            }
            setValue('short_description', serialize(blocks));
        }, placeholder: __("Summarize this product in 1-2 short sentences. We'll show it at the top of the page.", 'fincommerce') }));
};
