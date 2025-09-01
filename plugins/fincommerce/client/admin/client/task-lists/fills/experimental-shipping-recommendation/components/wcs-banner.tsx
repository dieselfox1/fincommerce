/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import WCSImage from '../images/wcs.svg';
import PrinterImage from '../images/printer.svg';
import PaperImage from '../images/paper.svg';
import DiscountImage from '../images/discount.svg';
import { PluginBanner } from './plugin-banner';

const features = [
	{
		icon: PrinterImage,
		title: __( 'Buy postage when you need it', 'fincommerce' ),
		description: __(
			'No need to wonder where that stampbook went.',
			'fincommerce'
		),
	},
	{
		icon: PaperImage,
		title: __( 'Print at home', 'fincommerce' ),
		description: __(
			'Pick up an order, then just pay, print, package and post.',
			'fincommerce'
		),
	},
	{
		icon: DiscountImage,
		title: __( 'Discounted rates', 'fincommerce' ),
		description: __(
			'Access discounted shipping rates with USPS, UPS, and DHL.',
			'fincommerce'
		),
	},
];

export const WCSBanner = () => {
	return <PluginBanner logo={ { image: WCSImage } } features={ features } />;
};
