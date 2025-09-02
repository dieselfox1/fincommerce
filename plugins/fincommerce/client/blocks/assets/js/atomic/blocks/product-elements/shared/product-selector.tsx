/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import ProductControl from '@fincommerce/editor-components/product-control';
import { Placeholder, Button, ToolbarGroup } from '@finpress/components';
import { BlockControls } from '@finpress/block-editor';
import TextToolbarButton from '@fincommerce/editor-components/text-toolbar-button';
import { useState } from '@finpress/element';

export const ProductSelector = ( {
	productId,
	icon,
	label,
	description,
	setAttributes,
	children,
}: {
	productId: string;
	icon: string;
	label: string;
	description: string;
	setAttributes: ( obj: Record< string, string > ) => void;
	children: React.ReactNode;
} ) => {
	const [ isEditing, setIsEditing ] = useState( ! productId );

	return (
		<>
			{ isEditing ? (
				<Placeholder
					icon={ icon || '' }
					label={ label || '' }
					className="wc-atomic-blocks-product"
				>
					{ !! description && <div>{ description }</div> }
					<div className="wc-atomic-blocks-product__selection">
						<ProductControl
							selected={ productId || 0 }
							showVariations
							onChange={ ( value = [] ) => {
								setAttributes( {
									productId: value[ 0 ] ? value[ 0 ].id : 0,
								} );
							} }
						/>
						<Button
							variant="secondary"
							disabled={ ! productId }
							onClick={ () => {
								setIsEditing( false );
							} }
						>
							{ __( 'Done', 'fincommerce' ) }
						</Button>
					</div>
				</Placeholder>
			) : (
				<>
					<BlockControls>
						<ToolbarGroup>
							<TextToolbarButton
								onClick={ () => setIsEditing( true ) }
							>
								{ __( 'Switch product…', 'fincommerce' ) }
							</TextToolbarButton>
						</ToolbarGroup>
					</BlockControls>
					{ children }
				</>
			) }
		</>
	);
};
