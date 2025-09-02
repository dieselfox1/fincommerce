/**
 * External dependencies
 */
import { BlockControls, useBlockProps } from '@finpress/block-editor';
import {
	ToolbarGroup,
	Disabled,
	withSpokenMessages,
} from '@finpress/components';
import { useState } from '@finpress/element';
import { __ } from '@finpress/i18n';
/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/handpicked-products/editor.scss';
import { Props } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/types';
import { HandpickedProductsInspectorControls } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/inspector-controls';
import { HandpickedProductsEditMode } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/edit-mode';
import { HandpickedProductsBlock } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/block';

export const EditBlock = ( props: Props ): JSX.Element => {
	const blockProps = useBlockProps();

	const {
		attributes: { products },
	} = props;

	const [ isEditing, setIsEditing ] = useState( ! products.length );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit selected products',
								'fincommerce'
							),
							onClick: () => setIsEditing( ! isEditing ),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
			<HandpickedProductsInspectorControls { ...props } />
			{ isEditing ? (
				<HandpickedProductsEditMode
					isEditing={ isEditing }
					setIsEditing={ setIsEditing }
					{ ...props }
				/>
			) : (
				<Disabled>
					<HandpickedProductsBlock { ...props } />
				</Disabled>
			) }
		</div>
	);
};

export const Edit = withSpokenMessages( EditBlock );
