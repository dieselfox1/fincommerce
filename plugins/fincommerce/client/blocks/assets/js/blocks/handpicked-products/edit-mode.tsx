/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Placeholder } from '@finpress/components';
import { Icon, stack } from '@finpress/icons';
import ProductsControl from '@fincommerce/editor-components/products-control';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/types';

export interface EditModeProps extends Props {
	isEditing: boolean;
	setIsEditing: ( isEditing: boolean ) => void;
}

export const HandpickedProductsEditMode = (
	props: EditModeProps
): JSX.Element => {
	const {
		attributes,
		setAttributes,
		debouncedSpeak,
		isEditing,
		setIsEditing,
	} = props;
	const onDone = () => {
		setIsEditing( ! isEditing );
		debouncedSpeak(
			__(
				'Now displaying a preview of the Hand-picked Products block.',
				'fincommerce'
			)
		);
	};

	return (
		<Placeholder
			icon={ <Icon icon={ stack } /> }
			label={ __( 'Hand-picked Products', 'fincommerce' ) }
			className="wc-block-products-grid wc-block-handpicked-products"
		>
			{ __(
				'Display a selection of hand-picked products in a grid.',
				'fincommerce'
			) }
			<div className="wc-block-handpicked-products__selection">
				<ProductsControl
					selected={ attributes.products }
					onChange={ ( value = [] ) => {
						const ids = value.map( ( { id } ) => id );
						setAttributes( { products: ids } );
					} }
				/>
				<Button variant="primary" onClick={ onDone }>
					{ __( 'Done', 'fincommerce' ) }
				</Button>
			</div>
		</Placeholder>
	);
};
