/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Modal, TextControl } from '@finpress/components';
import {
	useState,
	createElement,
	createInterpolateElement,
} from '@finpress/element';
import { useDispatch } from '@finpress/data';
import { cleanForSlug } from '@finpress/url';
import { Product } from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';

type EditProductLinkModalProps = {
	product: Product;
	permalinkPrefix: string;
	permalinkSuffix: string;
	onCancel: () => void;
	onSaved: () => void;
	saveHandler: (
		slug: string
	) => Promise< { slug: string; permalink: string } | undefined >;
};

export const EditProductLinkModal = ( {
	product,
	permalinkPrefix,
	permalinkSuffix,
	onCancel,
	onSaved,
	saveHandler,
}: EditProductLinkModalProps ) => {
	const { createNotice } = useDispatch( 'core/notices' );
	const [ isSaving, setIsSaving ] = useState< boolean >( false );
	const [ slug, setSlug ] = useState(
		product.slug || cleanForSlug( product.name )
	);

	const onSave = async () => {
		recordEvent( 'product_update_slug', {
			source: TRACKS_SOURCE,
			product_id: product.id,
			product_type: product.type,
		} );

		const { slug: updatedSlug, permalink: updatedPermalink } =
			( await saveHandler( slug ) ) ?? {};

		if ( updatedSlug ) {
			createNotice(
				updatedSlug === cleanForSlug( slug ) ? 'success' : 'info',
				updatedSlug === cleanForSlug( slug )
					? __( 'Product link successfully updated.', 'fincommerce' )
					: __(
							'Product link already existed, updated to ',
							'fincommerce'
					  ) + updatedPermalink
			);
		} else {
			createNotice(
				'error',
				__( 'Failed to update product link.', 'fincommerce' )
			);
		}
		onSaved();
	};

	const newProductLinkLabel =
		permalinkPrefix + cleanForSlug( slug ) + permalinkSuffix;

	return (
		<Modal
			title={ __( 'Edit product link', 'fincommerce' ) }
			onRequestClose={ () => onCancel() }
			className="fincommerce-product-link-edit-modal"
		>
			<div className="fincommerce-product-link-edit-modal__wrapper">
				<p className="fincommerce-product-link-edit-modal__description">
					{ __(
						"Create a unique link for this product. Use simple, descriptive words and numbers. We'll replace spaces with hyphens (-).",
						'fincommerce'
					) }
				</p>
				<TextControl
					label={ __( 'Product link', 'fincommerce' ) }
					name="slug"
					value={ slug }
					onChange={ setSlug }
					hideLabelFromVision
					help={ createInterpolateElement(
						__( 'Preview: <link />', 'fincommerce' ),
						{
							link: <strong>{ newProductLinkLabel }</strong>,
						}
					) }
				/>
				<div className="fincommerce-product-link-edit-modal__buttons">
					<Button isSecondary onClick={ () => onCancel() }>
						{ __( 'Cancel', 'fincommerce' ) }
					</Button>
					<Button
						isPrimary
						isBusy={ isSaving }
						disabled={ isSaving || slug === product.slug }
						onClick={ async () => {
							setIsSaving( true );
							await onSave();
							setIsSaving( false );
						} }
					>
						{ __( 'Save', 'fincommerce' ) }
					</Button>
				</div>
			</div>
		</Modal>
	);
};
