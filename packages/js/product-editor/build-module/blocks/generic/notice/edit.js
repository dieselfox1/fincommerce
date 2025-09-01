/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { Notice } from '../../../components/notice';
import { sanitizeHTML } from '../../../utils/sanitize-html';
export function Edit({ attributes, }) {
    const blockProps = useWooBlockProps(attributes);
    return (createElement("div", { ...blockProps },
        createElement(Notice, { content: createElement("div", { dangerouslySetInnerHTML: sanitizeHTML(attributes.message) }) })));
}
