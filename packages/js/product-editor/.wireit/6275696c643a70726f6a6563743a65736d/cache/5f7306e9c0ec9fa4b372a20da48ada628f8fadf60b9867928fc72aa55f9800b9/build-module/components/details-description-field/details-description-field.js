/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useFormContext, __experimentalRichTextEditor as RichTextEditor, } from '@fincommerce/components';
import { serialize, parse } from '@wordpress/blocks';
import { useState, createElement } from '@wordpress/element';
export const DetailsDescriptionField = () => {
    const { setValue, values } = useFormContext();
    const [descriptionBlocks, setDescriptionBlocks] = useState(parse(values.description || ''));
    return (createElement(RichTextEditor, { label: __('Description', 'fincommerce'), blocks: descriptionBlocks, onChange: (blocks) => {
            setDescriptionBlocks(blocks);
            if (!descriptionBlocks.length) {
                return;
            }
            setValue('description', serialize(blocks));
        }, placeholder: __('Describe this product. What makes it unique? What are its most important features?', 'fincommerce') }));
};
