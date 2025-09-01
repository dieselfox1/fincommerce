/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/product-meta/editor.scss';

const Edit = () => {
	const TEMPLATE: InnerBlockTemplate[] = [
		[
			'core/group',
			{ layout: { type: 'flex', flexWrap: 'nowrap' } },
			[
				[ 'fincommerce/product-sku' ],
				[
					'core/post-terms',
					{
						prefix: __( 'Category: ', 'fincommerce' ),
						term: 'product_cat',
					},
				],
				[
					'core/post-terms',
					{
						prefix: __( 'Tags: ', 'fincommerce' ),
						term: 'product_tag',
					},
				],
			],
		],
	];
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

export default Edit;
