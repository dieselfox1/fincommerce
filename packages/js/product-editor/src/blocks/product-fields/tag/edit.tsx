/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { createElement } from '@finpress/element';
import { BlockAttributes } from '@finpress/blocks';
import { BaseControl } from '@finpress/components';
import { ProductTag } from '@fincommerce/data';
import { useInstanceId } from '@finpress/compose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@finpress/core-data';

/**
 * Internal dependencies
 */
import { TagField } from '../../../components/tags-field';
import { ProductEditorBlockEditProps } from '../../../types';

export function Edit( {
	attributes,
	context: { postType, isInSelectedTab },
}: ProductEditorBlockEditProps< BlockAttributes > ) {
	const blockProps = useWooBlockProps( attributes );
	const { name, label, placeholder } = attributes;
	const [ tags, setTags ] = useEntityProp<
		Pick< ProductTag, 'id' | 'name' >[]
	>( 'postType', postType || 'product', name || 'tags' );

	const tagFieldId = useInstanceId( BaseControl, 'tag-field' ) as string;

	return (
		<div { ...blockProps }>
			{
				<TagField
					id={ tagFieldId }
					isVisible={ isInSelectedTab }
					label={ label || __( 'Tags', 'fincommerce' ) }
					placeholder={
						placeholder ||
						__( 'Search or create tags…', 'fincommerce' )
					}
					onChange={ setTags }
					value={ tags || [] }
				/>
			}
		</div>
	);
}
