/**
 * External dependencies
 */
import { Icon, payment } from '@finpress/icons';
import { createBlock, registerBlockType } from '@finpress/blocks';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-footer-block/edit';
import deprecatedAttributes from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-footer-block/attributes';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- TypeScript expects some required properties which we already
// registered in PHP.
registerBlockType( 'fincommerce/mini-cart-footer-block', {
	icon: {
		src: (
			<Icon
				icon={ payment }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	deprecated: [
		{
			attributes: deprecatedAttributes,

			migrate( attributes, innerBlocks ) {
				const {
					cartButtonLabel,
					checkoutButtonLabel,
					...restAttributes
				} = attributes;

				return [
					restAttributes,
					[
						createBlock(
							'fincommerce/mini-cart-cart-button-block',
							{
								cartButtonLabel,
							}
						),
						createBlock(
							'fincommerce/mini-cart-checkout-button-block',
							{
								checkoutButtonLabel,
							}
						),
						...innerBlocks,
					],
				];
			},
			isEligible: ( attributes, innerBlocks ) => {
				return ! innerBlocks.length;
			},
			save: (): JSX.Element => {
				return <div { ...useBlockProps.save() }></div>;
			},
		},
	],
	edit: Edit,
	save: Save,
} );
