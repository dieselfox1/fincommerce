/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createBlock } from '@finpress/blocks';
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/block.json';

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
						'fincommerce/cart-order-summary-heading-block',
						{
							content: __( 'Cart totals', 'fincommerce' ),
						},
						[]
					),
					createBlock(
						'fincommerce/cart-order-summary-coupon-form-block',
						{},
						[]
					),
					createBlock(
						'fincommerce/cart-order-summary-totals-block',
						{},
						[
							createBlock(
								'fincommerce/cart-order-summary-subtotal-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/cart-order-summary-fee-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/cart-order-summary-discount-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/cart-order-summary-shipping-block',
								{},
								[]
							),
							createBlock(
								'fincommerce/cart-order-summary-taxes-block',
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
					block.name === 'fincommerce/cart-order-summary-totals-block'
			);
		},
	},
];

export default deprecated;
