/**
 * External dependencies
 */
import { __, _n, sprintf } from '@finpress/i18n';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import {
	Button,
	PanelBody,
	Placeholder,
	withSpokenMessages,
} from '@finpress/components';
import { SearchListItem } from '@fincommerce/editor-components/search-list-control';
import ProductControl from '@fincommerce/editor-components/product-control';
import { commentContent, Icon } from '@finpress/icons';
import { decodeEntities } from '@finpress/html-entities';

/**
 * Internal dependencies
 */
import EditorContainerBlock from '@fincommerce/block-library/assets/js/blocks/reviews/editor-container-block';
import NoReviewsPlaceholder from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-product/no-reviews-placeholder';
import {
	getBlockControls,
	getSharedReviewContentControls,
	getSharedReviewListControls,
} from '@fincommerce/block-library/assets/js/blocks/reviews/edit-utils';
import { ReviewsByProductEditorProps } from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-product/types';

const ReviewsByProductEditor = ( {
	attributes,
	debouncedSpeak,
	setAttributes,
}: ReviewsByProductEditorProps ) => {
	const { editMode, productId } = attributes;

	const blockProps = useBlockProps();

	const renderProductControlItem = ( args ) => {
		const { item = 0 } = args;

		return (
			<SearchListItem
				{ ...args }
				item={ {
					...item,
					count: item.details.review_count,
				} }
				countLabel={ sprintf(
					/* translators: %d is the review count. */
					_n(
						'%d review',
						'%d reviews',
						item.details.review_count,
						'fincommerce'
					),
					item.details.review_count
				) }
				aria-label={ sprintf(
					/* translators: %1$s is the item name, and %2$d is the number of reviews for the item. */
					_n(
						'%1$s, has %2$d review',
						'%1$s, has %2$d reviews',
						item.details.review_count,
						'fincommerce'
					),
					decodeEntities( item.name ),
					item.details.review_count
				) }
			/>
		);
	};

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Product', 'fincommerce' ) }
					initialOpen={ false }
				>
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
						renderItem={ renderProductControlItem }
						isCompact={ true }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'fincommerce' ) }>
					{ getSharedReviewContentControls(
						attributes,
						setAttributes
					) }
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'fincommerce' ) }>
					{ getSharedReviewListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	const renderEditMode = () => {
		const onDone = () => {
			setAttributes( { editMode: false } );
			debouncedSpeak(
				__( 'Showing Reviews by Product block preview.', 'fincommerce' )
			);
		};

		return (
			<Placeholder
				icon={
					<Icon
						icon={ commentContent }
						className="block-editor-block-icon"
					/>
				}
				label={ __( 'Reviews by Product', 'fincommerce' ) }
				className="wc-block-reviews-by-product"
			>
				{ __(
					'Show reviews of your product to build trust',
					'fincommerce'
				) }
				<div className="wc-block-reviews__selection">
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
						queryArgs={ {
							orderby: 'comment_count',
							order: 'desc',
						} }
						renderItem={ renderProductControlItem }
					/>
					<Button variant="primary" onClick={ onDone }>
						{ __( 'Done', 'fincommerce' ) }
					</Button>
				</div>
			</Placeholder>
		);
	};

	if ( ! productId || editMode ) {
		return renderEditMode();
	}

	const buttonTitle = __( 'Edit selected product', 'fincommerce' );

	return (
		<div { ...blockProps }>
			{ getBlockControls( editMode, setAttributes, buttonTitle ) }
			{ getInspectorControls() }
			<EditorContainerBlock
				attributes={ attributes }
				icon={
					<Icon
						icon={ commentContent }
						className="block-editor-block-icon"
					/>
				}
				name={ __( 'Reviews by Product', 'fincommerce' ) }
				noReviewsPlaceholder={ NoReviewsPlaceholder }
			/>
		</div>
	);
};

export default withSpokenMessages( ReviewsByProductEditor );
