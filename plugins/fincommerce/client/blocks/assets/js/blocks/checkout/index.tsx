/**
 * External dependencies
 */
import clsx from 'clsx';
import { fields } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/edit';
import { blockAttributes, deprecatedAttributes } from '@fincommerce/block-library/assets/js/blocks/checkout/attributes';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/block.json';

const settings = {
	icon: {
		src: (
			<Icon
				icon={ fields }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		...blockAttributes,
		...deprecatedAttributes,
	},
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
							shortcode: 'checkout',
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
			attributes: {
				...metadata.attributes,
				...blockAttributes,
				...deprecatedAttributes,
			},
			save( { attributes }: { attributes: { className: string } } ) {
				return (
					<div
						className={ clsx( 'is-loading', attributes.className ) }
					/>
				);
			},
			migrate: ( attributes: {
				showOrderNotes: boolean;
				showPolicyLinks: boolean;
				showReturnToCart: boolean;
				cartPageId: number;
			} ) => {
				const {
					showOrderNotes,
					showPolicyLinks,
					showReturnToCart,
					cartPageId,
				} = attributes;
				return [
					attributes,
					[
						createBlock(
							'fincommerce/checkout-fields-block',
							{},
							[
								createBlock(
									'fincommerce/checkout-express-payment-block',
									{},
									[]
								),
								createBlock(
									'fincommerce/checkout-contact-information-block',
									{},
									[]
								),
								createBlock(
									'fincommerce/checkout-shipping-address-block',
									{},
									[]
								),
								createBlock(
									'fincommerce/checkout-billing-address-block',
									{},
									[]
								),
								createBlock(
									'fincommerce/checkout-shipping-methods-block',
									{},
									[]
								),
								createBlock(
									'fincommerce/checkout-payment-block',
									{},
									[]
								),
								createBlock(
									'fincommerce/checkout-additional-information-block',
									{},
									[]
								),
								showOrderNotes
									? createBlock(
											'fincommerce/checkout-order-note-block',
											{},
											[]
									  )
									: false,
								showPolicyLinks
									? createBlock(
											'fincommerce/checkout-terms-block',
											{},
											[]
									  )
									: false,
								createBlock(
									'fincommerce/checkout-actions-block',
									{
										showReturnToCart,
										cartPageId,
									},
									[]
								),
							].filter( Boolean ) as BlockInstance[]
						),
						createBlock( 'fincommerce/checkout-totals-block', {} ),
					],
				];
			},
			isEligible: (
				attributes: Record< string, unknown >,
				innerBlocks: BlockInstance[]
			) => {
				return ! innerBlocks.some(
					( block: { name: string } ) =>
						block.name === 'fincommerce/checkout-fields-block'
				);
			},
		},
		// Adds the additional information block.
		{
			save( { attributes }: { attributes: { className: string } } ) {
				return (
					<div
						className={ clsx( 'is-loading', attributes.className ) }
					/>
				);
			},
			isEligible: (
				_attributes: Record< string, unknown >,
				innerBlocks: BlockInstance[]
			) => {
				const checkoutFieldsBlock = innerBlocks.find(
					( block: { name: string } ) =>
						block.name === 'fincommerce/checkout-fields-block'
				);

				if ( ! checkoutFieldsBlock ) {
					return false;
				}

				// Top level block is the fields block, we then need to search within that for the additional information block.
				return ! checkoutFieldsBlock.innerBlocks.some(
					( block: { name: string } ) =>
						block.name ===
						'fincommerce/checkout-additional-information-block'
				);
			},
			migrate: (
				attributes: Record< string, unknown >,
				innerBlocks: BlockInstance[]
			) => {
				const checkoutFieldsBlockIndex = innerBlocks.findIndex(
					( block: { name: string } ) =>
						block.name === 'fincommerce/checkout-fields-block'
				);

				if ( checkoutFieldsBlockIndex === -1 ) {
					return false;
				}

				const checkoutFieldsBlock =
					innerBlocks[ checkoutFieldsBlockIndex ];

				const insertIndex = checkoutFieldsBlock.innerBlocks.findIndex(
					( block: { name: string } ) =>
						block.name ===
						'wp-block-fincommerce-checkout-payment-block'
				);

				if ( insertIndex === -1 ) {
					return false;
				}

				innerBlocks[ checkoutFieldsBlockIndex ] =
					checkoutFieldsBlock.innerBlocks
						.slice( 0, insertIndex )
						.concat(
							createBlock(
								'fincommerce/checkout-additional-information-block',
								{},
								[]
							)
						)
						.concat(
							innerBlocks.slice(
								insertIndex + 1,
								innerBlocks.length
							)
						);

				return [ attributes, innerBlocks ];
			},
		},
	],
};

registerBlockType( metadata, settings );
