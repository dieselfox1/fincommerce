/**
 * External dependencies
 */
import { createBlock } from '@finpress/blocks';
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/block.json';

const deprecated = [
	{
		attributes: metadata.attributes,
		save: () => {
			return (
				<div { ...useBlockProps.save() }>
					<InnerBlocks.Content />
				</div>
			);
		},
		supports: metadata.supports,
		migrate: ( { attributes } ) => {
			return [
				attributes,
				[
					createBlock(
						'fincommerce/checkout-order-summary-cart-items-block',
						{},
						[]
					),
					createBlock(
						'fincommerce/checkout-order-summary-coupon-form-block',
						{},
						[]
					),
					createBlock(
						'fincommerce/checkout-order-summary-totals-block',
						{},
						[
							createBlock(
								'fincommerce/checkout-order-summary-subtotal-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/checkout-order-summary-fee-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/checkout-order-summary-discount-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/checkout-order-summary-shipping-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/checkout-order-summary-taxes-block',
								{},
								[]
							),
						]
					),
				],
			];
		},
		isEligible: ( attributes, innerBlocks ) => {
			return ! innerBlocks.some(
				( block ) =>
					block.name ===
					'fincommerce/checkout-order-summary-totals-block'
			);
		},
	},
];

export default deprecated;
