/**
 * External dependencies
 */
import { PaymentMethodIcons } from '@fincommerce/base-components/cart-checkout';
import { usePaymentMethods } from '@fincommerce/base-context/hooks';
import { getIconsFromPaymentMethods } from '@fincommerce/base-utils';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { paymentMethods } = usePaymentMethods();

	return (
		<PaymentMethodIcons
			className={ className }
			icons={ getIconsFromPaymentMethods( paymentMethods ) }
		/>
	);
};

export default Block;
