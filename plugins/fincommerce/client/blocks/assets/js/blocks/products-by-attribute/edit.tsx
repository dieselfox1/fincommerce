/**
 * External dependencies
 */
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	Disabled,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/products-by-attribute/editor.scss';
import { Props } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/types';
import { ProductsByAttributeInspectorControls } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/inspector-controls';
import { ProductsByAttributeEditMode } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/edit-mode';
import { ProductsByAttributeBlock } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/block';

export const EditBlock = ( props: Props ): JSX.Element => {
	const blockProps = useBlockProps();

	const {
		attributes: { attributes },
	} = props;

	const [ isEditing, setIsEditing ] = useState( ! attributes.length );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit selected attribute',
								'fincommerce'
							),
							onClick: () => setIsEditing( ! isEditing ),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
			<ProductsByAttributeInspectorControls { ...props } />
			{ isEditing ? (
				<ProductsByAttributeEditMode
					isEditing={ isEditing }
					setIsEditing={ setIsEditing }
					{ ...props }
				/>
			) : (
				<Disabled>
					<ProductsByAttributeBlock { ...props } />
				</Disabled>
			) }
		</div>
	);
};

export const Edit = withSpokenMessages( EditBlock );
