/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useSelect } from '@finpress/data';
import { PanelBody } from '@finpress/components';
import type { BlockEditProps } from '@finpress/blocks';
import {
	InspectorControls,
	useBlockProps,
	// @ts-expect-error useInnerBlocksProps is not exported from @finpress/block-editor
	useInnerBlocksProps,
	store as blockEditorStore,
	Warning,
} from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { ReviewsPaginationArrowControls } from '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination/reviews-pagination-arrow-controls';
import '@fincommerce/block-library/assets/js/blocks/product-reviews/inner-blocks/reviews-pagination/editor.scss';

const TEMPLATE = [
	[ 'fincommerce/product-reviews-pagination-previous' ],
	[ 'fincommerce/product-reviews-pagination-numbers' ],
	[ 'fincommerce/product-reviews-pagination-next' ],
];

type Props = BlockEditProps< { paginationArrow: string | number | undefined } >;

export default function Edit( {
	attributes: { paginationArrow },
	setAttributes,
	clientId,
}: Props ) {
	const hasNextPreviousBlocks = useSelect(
		( select ) => {
			// TODO: remove the @ts-expect-error comment and typecast for innerBlock once we upgrade @finpress/block-editor types version.
			// @ts-expect-error We're using an outdated types of `@finpress/block-editor`, so the property 'getBlocks' does not exist on type returned by select.
			const { getBlocks } = select( blockEditorStore );
			const innerBlocks = getBlocks( clientId );
			/**
			 * Show the `paginationArrow` control only if a
			 * Product Reviews Pagination Next or Product Reviews Pagination Previous
			 * block exists.
			 */
			return innerBlocks?.find( ( innerBlock: { name: string } ) => {
				return [
					'fincommerce/product-reviews-pagination-previous',
					'fincommerce/product-reviews-pagination-next',
				].includes( innerBlock.name );
			} );
		},
		[ clientId ]
	);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
	} );

	// Get the Discussion settings
	const pageComments = useSelect( ( select ) => {
		// @ts-expect-error We're using an outdated types of `@finpress/block-editor`, so the property 'getSettings' does not exist on type returned by select.
		const { getSettings } = select( blockEditorStore );
		const { __experimentalDiscussionSettings } = getSettings();
		return __experimentalDiscussionSettings?.pageComments;
	}, [] );

	// If paging comments is not enabled in the Discussion Settings then hide the pagination
	// controls. We don't want to remove them from the template so that when the user enables
	// paging comments, the controls will be visible.
	if ( ! pageComments ) {
		return (
			<Warning>
				{ __(
					'Product Reviews Pagination block: paging comments is disabled in the Discussion Settings',
					'fincommerce'
				) }
			</Warning>
		);
	}

	return (
		<>
			{ hasNextPreviousBlocks && (
				<InspectorControls>
					<PanelBody title={ __( 'Settings', 'fincommerce' ) }>
						<ReviewsPaginationArrowControls
							value={ paginationArrow }
							onChange={ ( value ) => {
								setAttributes( {
									paginationArrow: value,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...innerBlocksProps } />
		</>
	);
}
