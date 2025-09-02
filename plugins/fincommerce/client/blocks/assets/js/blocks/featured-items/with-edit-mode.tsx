/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import type { ComponentType } from 'react';
import { useEffect, useState } from '@finpress/element';
import { info } from '@finpress/icons';
import ProductCategoryControl from '@fincommerce/editor-components/product-category-control';
import ProductControl from '@fincommerce/editor-components/product-control';
import {
	ProductResponseItem,
	ProductCategoryResponseItem,
} from '@fincommerce/types';
import {
	Placeholder,
	Icon,
	Button,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@finpress/components';
import { ErrorObject } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */

import { BLOCK_NAMES } from '@fincommerce/block-library/assets/js/blocks/featured-items/constants';
import { EditorBlock, GenericBlockUIConfig } from '@fincommerce/block-library/assets/js/blocks/featured-items/types';
import { getClassPrefixFromName, getInvalidItemDescription } from '@fincommerce/block-library/assets/js/blocks/featured-items/utils';
import { useFeaturedItemStatus } from '@fincommerce/block-library/assets/js/blocks/featured-items/use-featured-item-status';

interface EditModeConfiguration extends GenericBlockUIConfig {
	description: string;
	editLabel: string;
}

type EditModeRequiredAttributes = {
	categoryId?: number;
	editMode: boolean;
	mediaId: number;
	mediaSrc: string;
	productId?: number;
};

interface EditModeRequiredProps< T > {
	attributes: EditModeRequiredAttributes & EditorBlock< T >[ 'attributes' ];
	debouncedSpeak: ( label: string ) => void;
	setAttributes: ( attrs: Partial< EditModeRequiredAttributes > ) => void;
	triggerUrlUpdate: () => void;
	isLoading: boolean;
	error?: ErrorObject | null;
}

type EditModeProps< T extends EditorBlock< T > > = T &
	EditModeRequiredProps< T >;

export const withEditMode =
	( { description, editLabel, icon, label }: EditModeConfiguration ) =>
	< T extends EditorBlock< T > >( Component: ComponentType< T > ) =>
	( props: EditModeProps< T > ) => {
		const {
			attributes,
			debouncedSpeak,
			name,
			setAttributes,
			triggerUrlUpdate = () => void null,
			error,
		} = props;

		const className = getClassPrefixFromName( name );
		const [ selectedOptions, setSelectedOptions ] = useState< {
			productId?: number;
			categoryId?: number;
			mediaId: number;
			mediaSrc: string;
			editMode: boolean;
		} >();

		const onDone = () => {
			if ( selectedOptions ) {
				setAttributes( selectedOptions );
				debouncedSpeak( editLabel );
			}
		};

		const itemId =
			name === BLOCK_NAMES.featuredProduct
				? attributes?.productId
				: attributes?.categoryId;

		const { status, isDeleted, isLoading } = useFeaturedItemStatus( {
			itemId,
			itemType: name,
		} );

		useEffect( () => {
			if ( ! isLoading ) {
				const currEditModeValue =
					( name === BLOCK_NAMES.featuredProduct &&
						status !== 'publish' ) ||
					isDeleted;

				if ( currEditModeValue ) {
					setAttributes( { editMode: currEditModeValue } );
				}
			}
		}, [ status, isDeleted, name, setAttributes, isLoading ] );

		if ( attributes.editMode ) {
			return (
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					label={ label }
					className={ className }
				>
					<HStack alignment="center">
						{ isDeleted ? (
							<Icon
								icon={ info }
								className="wc-blocks-featured-items__orange-info-icon"
							/>
						) : (
							<Icon icon={ info } />
						) }
						<Text>
							{ isDeleted
								? getInvalidItemDescription( name )
								: description }
						</Text>
					</HStack>
					<div className={ `${ className }__selection` }>
						{ name === BLOCK_NAMES.featuredCategory && (
							<ProductCategoryControl
								selected={
									selectedOptions?.categoryId
										? [ selectedOptions.categoryId ]
										: []
								}
								onChange={ (
									value: ProductCategoryResponseItem[] = []
								) => {
									const id = value[ 0 ] ? value[ 0 ].id : 0;
									setSelectedOptions( {
										categoryId: id,
										mediaId: 0,
										mediaSrc: '',
										editMode: false,
									} );
									triggerUrlUpdate();
								} }
								isSingle
							/>
						) }
						{ name === BLOCK_NAMES.featuredProduct && (
							<ProductControl
								selected={
									selectedOptions?.productId
										? [ selectedOptions.productId ]
										: []
								}
								showVariations
								onChange={ (
									value: ProductResponseItem[] = []
								) => {
									const id = value[ 0 ] ? value[ 0 ].id : 0;
									setSelectedOptions( {
										productId: id,
										mediaId: 0,
										mediaSrc: '',
										editMode: false,
									} );
									triggerUrlUpdate();
								} }
							/>
						) }
						<Button variant="primary" onClick={ onDone }>
							{ __( 'Done', 'fincommerce' ) }
						</Button>
					</div>
				</Placeholder>
			);
		}

		return (
			<Component
				{ ...props }
				isLoading={ isLoading }
				error={ isLoading ? null : error }
			/>
		);
	};
