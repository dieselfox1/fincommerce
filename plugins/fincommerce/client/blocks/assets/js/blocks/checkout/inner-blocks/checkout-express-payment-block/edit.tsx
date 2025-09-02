/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import { useExpressPaymentMethods } from '@fincommerce/base-context/hooks';
import clsx from 'clsx';
import { ExpressPaymentControls } from '@fincommerce/blocks/cart-checkout-shared';
import type { BlockAttributes } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/block';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/editor.scss';
import type { ExpressCheckoutAttributes } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/types';
import { ExpressPaymentContext } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment/express-payment-context';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: ExpressCheckoutAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ): JSX.Element | null => {
	const { paymentMethods, isInitialized } = useExpressPaymentMethods();
	const hasExpressPaymentMethods = Object.keys( paymentMethods ).length > 0;
	const blockProps = useBlockProps( {
		className: clsx(
			{
				'wp-block-fincommerce-checkout-express-payment-block--has-express-payment-methods':
					hasExpressPaymentMethods,
			},
			attributes?.className
		),
		attributes,
	} );

	if ( ! isInitialized || ! hasExpressPaymentMethods ) {
		return null;
	}

	const { buttonHeight, buttonBorderRadius, showButtonStyles } = attributes;

	return (
		<div { ...blockProps }>
			<ExpressPaymentControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<ExpressPaymentContext.Provider
				value={ { showButtonStyles, buttonHeight, buttonBorderRadius } }
			>
				<Block />
			</ExpressPaymentContext.Provider>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
