/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Text } from '@fincommerce/experimental';
import { Flex } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	PaymentCardIcon,
	InternationalMarketIcon,
	EarnManageIcon,
	WooPayIcon,
} from './icons';

export const WCPayBenefits: React.VFC< {
	isWooPayEligible: boolean;
} > = ( { isWooPayEligible = false } ) => {
	return (
		<Flex className="fincommerce-wcpay-benefits" align="top">
			<Flex className="fincommerce-wcpay-benefits-benefit">
				<Flex className="fincommerce-wcpay-benefits-benefit-icon-container">
					<PaymentCardIcon />
				</Flex>
				<Text as="p">
					{ __(
						'Offer your customers card payments, iDeal, and the ability to sell in-person with Woo mobile app.',
						'fincommerce'
					) }
				</Text>
			</Flex>
			<Flex className="fincommerce-wcpay-benefits-benefit">
				<Flex className="fincommerce-wcpay-benefits-benefit-icon-container">
					<InternationalMarketIcon />
				</Flex>
				<Text as="p">
					{ __(
						'Sell to international markets and accept more than 135 currencies with local payment methods.',
						'fincommerce'
					) }
				</Text>
			</Flex>
			<Flex className="fincommerce-wcpay-benefits-benefit">
				<Flex className="fincommerce-wcpay-benefits-benefit-icon-container">
					<EarnManageIcon />
				</Flex>
				<Text as="p">
					{ __(
						'Earn and manage recurring revenue and get automatic deposits into your nominated bank account.',
						'fincommerce'
					) }
				</Text>
			</Flex>
			{ isWooPayEligible && (
				<Flex className="fincommerce-wcpay-benefits-benefit">
					<Flex className="fincommerce-wcpay-benefits-benefit-icon-container">
						<WooPayIcon />
					</Flex>
					<Text as="p">
						{ __(
							'Boost conversions with WooPay, a new express checkout feature included in WooPayments.',
							'fincommerce'
						) }
					</Text>
				</Flex>
			) }
		</Flex>
	);
};
