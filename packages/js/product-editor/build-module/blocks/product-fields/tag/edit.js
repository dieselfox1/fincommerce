/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { createElement } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { TagField } from '../../../components/tags-field';
export function Edit({ attributes, context: { postType, isInSelectedTab }, }) {
    const blockProps = useWooBlockProps(attributes);
    const { name, label, placeholder } = attributes;
    const [tags, setTags] = useEntityProp('postType', postType || 'product', name || 'tags');
    const tagFieldId = useInstanceId(BaseControl, 'tag-field');
    return (createElement("div", { ...blockProps }, createElement(TagField, { id: tagFieldId, isVisible: isInSelectedTab, label: label || __('Tags', 'fincommerce'), placeholder: placeholder ||
            __('Search or create tags…', 'fincommerce'), onChange: setTags, value: tags || [] })));
}
