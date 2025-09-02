/**
 * External dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@finpress/block-editor';
import { BlockEditProps, InnerBlockTemplate } from '@finpress/blocks';
import { withProductDataContext } from '@fincommerce/shared-hocs';

/**
 * Internal dependencies
 */
import { ProductGalleryBlockSettings } from '@fincommerce/block-library/assets/js/blocks/product-gallery/block-settings';
import type { ProductGalleryBlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-gallery/types';

const TEMPLATE: InnerBlockTemplate[] = [
	[ 'fincommerce/product-gallery-thumbnails' ],
	[
		'fincommerce/product-gallery-large-image',
		{},
		[
			[
				'fincommerce/product-image',
				{
					showProductLink: false,
					showSaleBadge: false,
				},
			],
			[
				'fincommerce/product-sale-badge',
				{
					align: 'right',
				},
			],
			[ 'fincommerce/product-gallery-large-image-next-previous' ],
		],
	],
];

export const Edit = withProductDataContext(
	( {
		attributes,
		setAttributes,
	}: BlockEditProps< ProductGalleryBlockAttributes > ) => {
		const blockProps = useBlockProps( {
			className: 'wc-block-product-gallery',
		} );

		return (
			<div { ...blockProps }>
				<InspectorControls>
					<ProductGalleryBlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<InnerBlocks
					allowedBlocks={ [
						'fincommerce/product-gallery-large-image',
						'fincommerce/product-gallery-thumbnails',
					] }
					template={ TEMPLATE }
				/>
			</div>
		);
	}
);

export const Save = () => {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};
