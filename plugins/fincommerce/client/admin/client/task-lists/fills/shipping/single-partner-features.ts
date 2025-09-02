/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import TimerImage from './shipping-providers/assets/timer.svg';
import DiscountImage from './shipping-providers/assets/discount.svg';
import StarImage from './shipping-providers/assets/star.svg';

export const SinglePartnerFeatures = [
	{
		icon: TimerImage,
		title: __( 'Save time', 'fincommerce' ),
		description: __(
			'Automatically import order information to quickly print your labels.',
			'fincommerce'
		),
	},
	{
		icon: DiscountImage,
		title: __( 'Save money', 'fincommerce' ),
		description: __(
			'Shop for the best shipping rates, and access pre-negotiated discounted rates.',
			'fincommerce'
		),
	},
	{
		icon: StarImage,
		title: __( 'Wow your shoppers', 'fincommerce' ),
		description: __(
			'Keep your customers informed with tracking notifications.',
			'fincommerce'
		),
	},
];
