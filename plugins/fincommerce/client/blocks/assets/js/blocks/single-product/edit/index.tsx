/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useEffect, useState } from '@finpress/element';
import { withProduct } from '@fincommerce/block-hocs';
import BlockErrorBoundary from '@fincommerce/base-components/block-error-boundary';
import EditProductLink from '@fincommerce/editor-components/edit-product-link';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import { ProductResponseItem } from '@fincommerce/types';
import ErrorPlaceholder, {
	ErrorObject,
} from '@fincommerce/editor-components/error-placeholder';
import { PRODUCTS_STORE_NAME, Product } from '@fincommerce/data';
import { useSelect } from '@finpress/data';
import { Icon, info } from '@finpress/icons';
import {
	Placeholder,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalHStack as HStack,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalText as Text,
	Button,
	PanelBody,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/single-product/edit/editor.scss';
import SharedProductControl from '@fincommerce/block-library/assets/js/blocks/single-product/edit/shared-product-control';
import EditorBlockControls from '@fincommerce/block-library/assets/js/blocks/single-product/edit/editor-block-controls';
import LayoutEditor from '@fincommerce/block-library/assets/js/blocks/single-product/edit/layout-editor';
import { BLOCK_ICON } from '@fincommerce/block-library/assets/js/blocks/single-product/constants';
import metadata from '@fincommerce/block-library/assets/js/blocks/single-product/block.json';
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/single-product/types';

interface EditorProps {
	className: string;
	attributes: {
		productId: number;
		isPreview: boolean;
	};
	setAttributes: ( attributes: Attributes ) => void;
	error: string | ErrorObject;
	getProduct: () => void;
	product: ProductResponseItem;
	isLoading: boolean;
	clientId: string;
}

const Editor = ( {
	attributes,
	setAttributes,
	error,
	getProduct,
	product,
	isLoading,
	clientId,
}: EditorProps ) => {
	const { productId, isPreview } = attributes;
	const [ isEditing, setIsEditing ] = useState( ! productId );
	const blockProps = useBlockProps();

	const block = useSelect(
		( select ) => select( 'core/blocks' ).getBlockType( metadata.name ),
		[]
	);

	const productPreview = useSelect( ( select ) => {
		if ( ! isPreview ) {
			return null;
		}
		return select( PRODUCTS_STORE_NAME ).getProducts< Array< Product > >( {
			per_page: 1,
		} );
	} );

	const isInvalidProductId =
		typeof error === 'object' &&
		error?.code === 'fincommerce_rest_product_invalid_id';

	useEffect( () => {
		const productPreviewId = productPreview
			? productPreview[ 0 ]?.id
			: null;

		// If the product is set, do not override it with the preview.
		if ( ! productPreviewId || productId ) {
			return;
		}

		setAttributes( {
			...attributes,
			productId: productPreviewId,
		} );
		setIsEditing( false );
	}, [ attributes, productId, productPreview, setAttributes ] );

	useEffect( () => {
		if ( isInvalidProductId && ! isEditing ) {
			setIsEditing( true );
		}
	}, [ isInvalidProductId ] );

	if ( error && ! isInvalidProductId ) {
		return (
			<ErrorPlaceholder
				className="wc-block-editor-single-product-error"
				error={ error as ErrorObject }
				isLoading={ isLoading }
				onRetry={ getProduct }
			/>
		);
	}

	const infoTitle = isInvalidProductId ? (
		<>
			<Icon
				icon={ info }
				className="wc-block-editor-single-product__info-icon"
			/>
			<Text>
				{ __(
					'Previously selected product is no longer available.',
					'fincommerce'
				) }
			</Text>
		</>
	) : (
		<Text>{ block.description }</Text>
	);

	const onChange = isInvalidProductId
		? () => setIsEditing( false )
		: undefined;

	return (
		<div { ...blockProps }>
			{ /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
			{ /* @ts-ignore */ }
			<BlockErrorBoundary
				header={ __( 'Single Product Block Error', 'fincommerce' ) }
			>
				<EditorBlockControls
					setIsEditing={ setIsEditing }
					isEditing={ isEditing }
				/>
				{ isEditing ? (
					<Placeholder
						icon={ BLOCK_ICON }
						label={ block.title }
						className="wc-block-editor-single-product"
					>
						<HStack alignment="center"> { infoTitle } </HStack>
						<div className="wc-block-editor-single-product__selection">
							<SharedProductControl
								attributes={ attributes }
								setAttributes={ setAttributes }
								onChange={ onChange }
							/>
							{ ! isInvalidProductId && (
								<Button
									variant="secondary"
									onClick={ () => {
										setIsEditing( false );
									} }
								>
									{ __( 'Done', 'fincommerce' ) }
								</Button>
							) }
						</div>
					</Placeholder>
				) : (
					<div>
						<InspectorControls>
							<PanelBody
								title={ __( 'Product', 'fincommerce' ) }
								initialOpen={ false }
							>
								<SharedProductControl
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
							</PanelBody>
						</InspectorControls>

						<EditProductLink productId={ productId } />
						<LayoutEditor
							clientId={ clientId }
							product={ product }
							isLoading={ isLoading }
						/>
					</div>
				) }
			</BlockErrorBoundary>
		</div>
	);
};

export default withProduct( Editor );
