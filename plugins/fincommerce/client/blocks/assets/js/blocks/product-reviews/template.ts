/**
 * External dependencies
 */
import { InnerBlockTemplate } from '@finpress/blocks';

const TEMPLATE: InnerBlockTemplate[] = [
	[ 'fincommerce/product-reviews-title' ],
	[
		'fincommerce/product-review-template',
		{},
		[
			[
				'core/columns',
				{},
				[
					[
						'core/column',
						{ width: '40px' },
						[
							[
								'core/avatar',
								{
									size: 40,
									style: {
										border: { radius: '20px' },
									},
								},
							],
						],
					],
					[
						'core/column',
						{},
						[
							[
								'core/group',
								{
									tagName: 'div',
									layout: {
										type: 'flex',
										flexWrap: 'nowrap',
										justifyContent: 'space-between',
									},
								},
								[
									[
										'fincommerce/product-review-author-name',
										{
											fontSize: 'small',
										},
									],
									[ 'fincommerce/product-review-rating' ],
								],
							],
							[
								'core/group',
								{
									layout: { type: 'flex' },
									style: {
										spacing: {
											margin: {
												top: '0px',
												bottom: '0px',
											},
										},
									},
								},
								[
									[
										'fincommerce/product-review-date',
										{
											fontSize: 'small',
										},
									],
								],
							],
							[ 'fincommerce/product-review-content' ],
						],
					],
				],
			],
		],
	],
	[ 'fincommerce/product-reviews-pagination' ],
	[ 'fincommerce/product-review-form' ],
];

export default TEMPLATE;
