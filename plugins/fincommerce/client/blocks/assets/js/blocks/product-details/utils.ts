/**
 * External dependencies
 */
import { PartialProduct, ProductDimensions } from '@fincommerce/data';
import { isEmpty } from '@fincommerce/types';
import { __ } from '@wordpress/i18n';

export const isAdditionalProductDataEmpty = (
	product: PartialProduct
): boolean => {
	const isDimensionsEmpty = ( value: ProductDimensions | undefined ) => {
		return (
			! value ||
			Object.values( value ).every(
				( val ) => ! val || val.trim() === ''
			)
		);
	};

	return (
		isEmpty( product.weight ) &&
		isDimensionsEmpty( product.dimensions ) &&
		isEmpty( product.attributes )
	);
};

export const getTemplate = (
	product: PartialProduct | null,
	{
		isInnerBlockOfSingleProductBlock,
	}: { isInnerBlockOfSingleProductBlock: boolean }
) => {
	const additionalProductDataEmpty =
		product !== null &&
		product !== undefined &&
		isAdditionalProductDataEmpty( product ) &&
		isInnerBlockOfSingleProductBlock;

	return [
		[
			'fincommerce/accordion-group',
			{
				metadata: {
					isDescendantOfProductDetails: true,
				},
			},
			[
				[
					'fincommerce/accordion-item',
					{
						openByDefault: true,
					},
					[
						[
							'fincommerce/accordion-header',
							{ title: __( 'Description', 'fincommerce' ) },
							[],
						],
						[
							'fincommerce/accordion-panel',
							{},
							[ [ 'fincommerce/product-description', {}, [] ] ],
						],
					],
				],
				...( ! additionalProductDataEmpty
					? [
							[
								'fincommerce/accordion-item',
								{},
								[
									[
										'fincommerce/accordion-header',
										{
											title: __(
												'Additional Information',
												'fincommerce'
											),
										},
										[],
									],
									[
										'fincommerce/accordion-panel',
										{},
										[
											[
												'fincommerce/product-specifications',
												{},
											],
										],
									],
								],
							],
					  ]
					: [] ),
				[
					'fincommerce/accordion-item',
					{},
					[
						[
							'fincommerce/accordion-header',
							{ title: __( 'Reviews', 'fincommerce' ) },
							[],
						],
						[
							'fincommerce/accordion-panel',
							{},
							[ [ 'fincommerce/product-reviews', {} ] ],
						],
					],
				],
			],
		],
	];
};
