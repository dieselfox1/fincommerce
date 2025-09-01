/**
 * External dependencies
 */
import clsx from 'clsx';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/edit';
import '@fincommerce/block-library/assets/js/blocks/cart/style.scss';
import { blockName, blockAttributes } from '@fincommerce/block-library/assets/js/blocks/cart/attributes';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks';
import { metadata } from '@fincommerce/block-library/assets/js/blocks/cart/metadata';

/**
 * Register and run the Cart block.
 */
export const settings = {
	...metadata,
	attributes: blockAttributes,
	edit: Edit,
	save: Save,
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'fincommerce/classic-shortcode' ],
				transform: ( attributes ) => {
					return createBlock(
						'fincommerce/classic-shortcode',
						{
							shortcode: 'cart',
							align: attributes.align,
						},
						[]
					);
				},
			},
		],
	},
	// Migrates v1 to v2 checkout.
	deprecated: [
		{
			attributes: blockAttributes,
			save: ( { attributes } ) => {
				return (
					<div
						className={ clsx( 'is-loading', attributes.className ) }
					>
						<InnerBlocks.Content />
					</div>
				);
			},
			migrate: ( attributes, innerBlocks ) => {
				const { checkoutPageId, align } = attributes;
				return [
					attributes,
					[
						createBlock(
							'fincommerce/filled-cart-block',
							{ align },
							[
								createBlock( 'fincommerce/cart-items-block' ),
								createBlock(
									'fincommerce/cart-totals-block',
									{},
									[
										createBlock(
											'fincommerce/cart-order-summary-block',
											{}
										),
										createBlock(
											'fincommerce/cart-express-payment-block'
										),
										createBlock(
											'fincommerce/proceed-to-checkout-block',
											{ checkoutPageId }
										),
										createBlock(
											'fincommerce/cart-accepted-payment-methods-block'
										),
									]
								),
							]
						),
						createBlock(
							'fincommerce/empty-cart-block',
							{ align },
							innerBlocks
						),
					],
				];
			},
			isEligible: ( _, innerBlocks ) => {
				return ! innerBlocks.find(
					( block ) => block.name === 'fincommerce/filled-cart-block'
				);
			},
		},
	],
};

registerBlockType( blockName, settings );
