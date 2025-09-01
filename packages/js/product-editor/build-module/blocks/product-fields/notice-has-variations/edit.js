/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { useEntityProp } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { Notice } from '../../../components/notice';
import { hasAttributesUsedForVariations } from '../../../utils';
export function Edit({ attributes, }) {
    const blockProps = useWooBlockProps(attributes);
    const { buttonText, content, title, type = 'info' } = attributes;
    const [productAttributes] = useEntityProp('postType', 'product', 'attributes');
    const [productType] = useEntityProp('postType', 'product', 'type');
    const isOptionsNoticeVisible = hasAttributesUsedForVariations(productAttributes) &&
        productType === 'variable';
    return (createElement("div", { ...blockProps }, isOptionsNoticeVisible && (createElement(Notice, { content: content, title: title, type: type },
        createElement(Button, { isSecondary: true, onClick: () => navigateTo({
                url: getNewPath({ tab: 'variations' }),
            }) }, buttonText)))));
}
