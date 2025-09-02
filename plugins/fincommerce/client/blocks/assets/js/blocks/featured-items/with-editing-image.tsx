/**
 * External dependencies
 */
import { useEffect, useState } from '@finpress/element';
import type { ComponentType } from 'react';

/**
 * Internal dependencies
 */
import { EditorBlock } from '@fincommerce/block-library/assets/js/blocks/featured-items/types';

interface EditingImageRequiredProps {
	isSelected: boolean;
}

type EditingImageProps< T extends EditorBlock< T > > = T &
	EditingImageRequiredProps;

export const withEditingImage =
	< T extends EditorBlock< T > >( Component: ComponentType< T > ) =>
	( props: EditingImageProps< T > ) => {
		const [ isEditingImage, setIsEditingImage ] = useState( false );
		const { isSelected } = props;

		useEffect( () => {
			setIsEditingImage( false );
		}, [ isSelected ] );

		return (
			<Component
				{ ...props }
				useEditingImage={ [ isEditingImage, setIsEditingImage ] }
			/>
		);
	};
