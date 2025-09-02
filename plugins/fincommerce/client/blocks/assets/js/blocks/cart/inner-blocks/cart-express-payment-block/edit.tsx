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
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/block';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/editor.scss';
import type { ExpressCartAttributes } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/types';
import { ExpressPaymentContext } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment/express-payment-context';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: ExpressCartAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ): JSX.Element | null => {
	const { paymentMethods, isInitialized } = useExpressPaymentMethods();
	const hasExpressPaymentMethods = Object.keys( paymentMethods ).length > 0;
	const blockProps = useBlockProps( {
		className: clsx( {
			'wp-block-fincommerce-cart-express-payment-block--has-express-payment-methods':
				hasExpressPaymentMethods,
		} ),
	} );

	const { className, showButtonStyles, buttonHeight, buttonBorderRadius } =
		attributes;

	if ( ! isInitialized || ! hasExpressPaymentMethods ) {
		return null;
	}

	return (
		<div { ...blockProps }>
			<ExpressPaymentControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<ExpressPaymentContext.Provider
				value={ { showButtonStyles, buttonHeight, buttonBorderRadius } }
			>
				<Block className={ className } />
			</ExpressPaymentContext.Provider>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
