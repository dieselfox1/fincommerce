/**
 * External dependencies
 */
import { store as blockEditorStore } from '@finpress/block-editor';
import { useState } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { useGetLocation } from '@fincommerce/blocks/product-template/utils';
import { Spinner, Flex } from '@finpress/components';

/**
 * Internal dependencies
 */
import {
	ProductCollectionContentProps,
	ProductCollectionEditComponentProps,
	ProductCollectionUIStatesInEditor,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import ProductCollectionPlaceholder from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/product-collection-placeholder';
import ProductCollectionContent from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/product-collection-content';
import CollectionSelectionModal from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/collection-selection-modal';
import { useProductCollectionUIState } from '@fincommerce/block-library/assets/js/blocks/product-collection/utils';
import ProductPicker from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/ProductPicker';
import { useTracksLocation } from '@fincommerce/block-library/assets/js/blocks/product-collection/tracks-utils';

const Edit = ( props: ProductCollectionEditComponentProps ) => {
	const { clientId, attributes, context } = props;
	const location = useGetLocation( context, clientId );
	const tracksLocation = useTracksLocation( context.templateSlug );

	const [ isSelectionModalOpen, setIsSelectionModalOpen ] = useState( false );
	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	const { productCollectionUIStateInEditor, isLoading } =
		useProductCollectionUIState( {
			location,
			attributes,
			hasInnerBlocks,
			usesReference: props.usesReference,
		} );

	// Show spinner while calculating Editor UI state.
	if ( isLoading ) {
		return (
			<Flex justify="center" align="center">
				<Spinner />
			</Flex>
		);
	}

	const productCollectionContentProps: ProductCollectionContentProps = {
		...props,
		openCollectionSelectionModal: () => setIsSelectionModalOpen( true ),
		location,
		isUsingReferencePreviewMode:
			productCollectionUIStateInEditor ===
			ProductCollectionUIStatesInEditor.VALID_WITH_PREVIEW,
	};

	const renderComponent = () => {
		switch ( productCollectionUIStateInEditor ) {
			case ProductCollectionUIStatesInEditor.COLLECTION_PICKER:
				return (
					<ProductCollectionPlaceholder
						{ ...props }
						tracksLocation={ tracksLocation }
					/>
				);
			case ProductCollectionUIStatesInEditor.PRODUCT_REFERENCE_PICKER:
				return (
					<ProductPicker
						{ ...props }
						isDeletedProductReference={ false }
					/>
				);
			case ProductCollectionUIStatesInEditor.DELETED_PRODUCT_REFERENCE:
				return (
					<ProductPicker
						{ ...props }
						isDeletedProductReference={ true }
					/>
				);
			case ProductCollectionUIStatesInEditor.VALID:
			case ProductCollectionUIStatesInEditor.VALID_WITH_PREVIEW:
				return (
					<ProductCollectionContent
						{ ...productCollectionContentProps }
					/>
				);
			default:
				return (
					<ProductCollectionPlaceholder
						{ ...props }
						tracksLocation={ tracksLocation }
					/>
				);
		}
	};

	return (
		<>
			{ renderComponent() }
			{ isSelectionModalOpen && (
				<CollectionSelectionModal
					clientId={ clientId }
					attributes={ attributes }
					tracksLocation={ tracksLocation }
					closePatternSelectionModal={ () =>
						setIsSelectionModalOpen( false )
					}
				/>
			) }
		</>
	);
};

export default Edit;
