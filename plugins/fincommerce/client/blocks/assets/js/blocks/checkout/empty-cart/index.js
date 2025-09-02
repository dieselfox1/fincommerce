/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { SHOP_URL } from '@fincommerce/block-settings';
import { cart } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/checkout/empty-cart/style.scss';

const EmptyCart = () => {
	return (
		<div className="wc-block-checkout-empty">
			<Icon
				className="wc-block-checkout-empty__image"
				icon={ cart }
				size={ 100 }
			/>
			<strong className="wc-block-checkout-empty__title">
				{ __( 'Your cart is currently empty!', 'fincommerce' ) }
			</strong>
			<p className="wc-block-checkout-empty__description">
				{ __(
					"Checkout is not available whilst your cart is empty—please take a look through our store and come back when you're ready to place an order.",
					'fincommerce'
				) }
			</p>
			{ SHOP_URL && (
				<span className="wp-block-button">
					<a href={ SHOP_URL } className="wp-block-button__link">
						{ __( 'Browse store', 'fincommerce' ) }
					</a>
				</span>
			) }
		</div>
	);
};

export default EmptyCart;
