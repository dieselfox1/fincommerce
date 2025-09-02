/**
 * External dependencies
 */
import { BlockControls, useBlockProps } from '@finpress/block-editor';
import { useState } from '@finpress/element';
import {
	Disabled,
	ToolbarGroup,
	withSpokenMessages,
} from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { ProductByCategoryBlock } from '@fincommerce/block-library/assets/js/blocks/product-category/block';
import { Attributes, Props } from '@fincommerce/block-library/assets/js/blocks/product-category/types';
import { ProductsByCategoryInspectorControls } from '@fincommerce/block-library/assets/js/blocks/product-category/inspector-controls';
import { ProductsByCategoryEditMode } from '@fincommerce/block-library/assets/js/blocks/product-category/edit-mode';

const EditBlock = ( props: Props ): JSX.Element => {
	const blockProps = useBlockProps();

	const { attributes } = props;

	const [ isEditing, setIsEditing ] = useState(
		! attributes.categories.length
	);

	const [ changedAttributes, setChangedAttributes ] = useState<
		Partial< Attributes >
	>( {} );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit selected categories',
								'fincommerce'
							),
							onClick: () => setIsEditing( ! isEditing ),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
			<ProductsByCategoryInspectorControls
				isEditing={ isEditing }
				setChangedAttributes={ setChangedAttributes }
				{ ...props }
			/>
			{ isEditing ? (
				<ProductsByCategoryEditMode
					isEditing={ isEditing }
					setIsEditing={ setIsEditing }
					changedAttributes={ changedAttributes }
					setChangedAttributes={ setChangedAttributes }
					{ ...props }
				/>
			) : (
				<Disabled>
					<ProductByCategoryBlock { ...props } />
				</Disabled>
			) }
		</div>
	);
};

export const Edit = withSpokenMessages( EditBlock );
