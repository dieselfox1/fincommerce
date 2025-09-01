<?php
/**
 * Gets a list of fallback methods if remote fetching is disabled.
 */

namespace Automattic\FinCommerce\Admin\Features\PaymentGatewaySuggestions;

defined( 'ABSPATH' ) || exit;

use WC_Gateway_BACS;
use WC_Gateway_COD;

/**
 * Default Payment Gateways
 */
class DefaultPaymentGateways {
	/**
	 * This is the default priority for countries that are not in the $recommendation_priority_map.
	 * Priority is used to determine which payment gateway to recommend first.
	 * The lower the number, the higher the priority.
	 *
	 * @var array
	 */
	private static $recommendation_priority = array(
		'fincommerce_payments'                            => 1,
		'fincommerce_payments:with-in-person-payments'    => 1,
		'fincommerce_payments:without-in-person-payments' => 1,
		'stripe'                                          => 2,
		'woo-mercado-pago-custom'                         => 3,
		// PayPal Payments.
		'ppcp-gateway'                                    => 4,
		'mollie_wc_gateway_banktransfer'                  => 5,
		'razorpay'                                        => 5,
		'payfast'                                         => 5,
		'payubiz'                                         => 6,
		'square_credit_card'                              => 6,
		'klarna_payments'                                 => 6,
		// Klarna Checkout.
		'kco'                                             => 6,
		'paystack'                                        => 6,
		'eway'                                            => 7,
		'amazon_payments_advanced'                        => 7,
		'affirm'                                          => 8,
		'afterpay'                                        => 9,
		'zipmoney'                                        => 10,
		'payoneer-checkout'                               => 11,
	);

	/**
	 * Get default specs.
	 *
	 * @return array Default specs.
	 */
	public static function get_all() {
		$payment_gateways = array(
			array(
				'id'                  => 'affirm',
				'title'               => __( 'Affirm', 'fincommerce' ),
				'content'             => __( 'Affirm’s tailored Buy Now Pay Later programs remove price as a barrier, turning browsers into buyers, increasing average order value, and expanding your customer base.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/affirm.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/affirm.png',
				'plugins'             => array(),
				'external_link'       => 'https://fincommerce.com/products/fincommerce-gateway-affirm',
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'US',
							'CA',
						)
					),
					(object) array(
						'type'     => 'or',
						'operands' => array(
							self::get_rules_for_wcpay_activated( false ),
							self::get_rules_for_wcpay_connected( false ),
						),
					),
				),
				'category_other'      => array(),
				'category_additional' => array(
					'US',
					'CA',
				),
			),
			array(
				'id'                  => 'afterpay',
				'title'               => __( 'Afterpay', 'fincommerce' ),
				'content'             => __( 'Afterpay allows customers to receive products immediately and pay for purchases over four installments, always interest-free.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/afterpay.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/afterpay.png',
				'plugins'             => array( 'afterpay-gateway-for-fincommerce' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'US',
							'CA',
							'AU',
						)
					),
					(object) array(
						'type'     => 'or',
						'operands' => array(
							self::get_rules_for_wcpay_activated( false ),
							self::get_rules_for_wcpay_connected( false ),
						),
					),
				),
				'category_other'      => array(),
				'category_additional' => array(
					'US',
					'CA',
					'AU',
				),
			),
			array(
				'id'                  => 'airwallex_main',
				'title'               => __( 'Airwallex Payments', 'fincommerce' ),
				'content'             => __( 'Boost international sales and save on FX fees. Accept 60+ local payment methods including Apple Pay and Google Pay.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/airwallex.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/airwallex.png',
				'plugins'             => array( 'airwallex-online-payments-gateway' ),
				'is_visible'          => array(
					self::get_rules_for_countries( array( 'GB', 'AT', 'BE', 'EE', 'FR', 'DE', 'GR', 'IE', 'IT', 'NL', 'PL', 'PT', 'AU', 'NZ', 'HK', 'SG', 'CN' ) ),
				),
				'category_other'      => array( 'GB', 'AT', 'BE', 'EE', 'FR', 'DE', 'GR', 'IE', 'IT', 'NL', 'PL', 'PT', 'AU', 'NZ', 'HK', 'SG', 'CN' ),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'amazon_payments_advanced',
				'title'               => __( 'Amazon Pay', 'fincommerce' ),
				'content'             => __( 'Enable a familiar, fast checkout for hundreds of millions of active Amazon customers globally.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/amazonpay.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/amazonpay.png',
				'plugins'             => array( 'fincommerce-gateway-amazon-payments-advanced' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'US',
							'AT',
							'BE',
							'CY',
							'DK',
							'ES',
							'FR',
							'DE',
							'GB',
							'HU',
							'IE',
							'IT',
							'LU',
							'NL',
							'PT',
							'SL',
							'SE',
							'JP',
						)
					),
				),
				'category_other'      => array(),
				'category_additional' => array(
					'US',
					'AT',
					'BE',
					'CY',
					'DK',
					'ES',
					'FR',
					'DE',
					'GB',
					'HU',
					'IE',
					'IT',
					'LU',
					'NL',
					'PT',
					'SL',
					'SE',
					'JP',
				),
			),
			array(
				'id'          => WC_Gateway_BACS::ID,
				'title'       => __( 'Direct bank transfer', 'fincommerce' ),
				'content'     => __( 'Take payments via bank transfer.', 'fincommerce' ),
				'image'       => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/bacs.svg',
				'image_72x72' => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/bacs.png',
				'is_visible'  => array(
					self::get_rules_for_cbd( false ),
				),
				'is_offline'  => true,
			),
			array(
				'id'          => WC_Gateway_COD::ID,
				'title'       => __( 'Cash on delivery', 'fincommerce' ),
				'content'     => __( 'Take payments in cash upon delivery.', 'fincommerce' ),
				'image'       => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/cod.svg',
				'image_72x72' => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/cod.png',
				'is_visible'  => array(
					self::get_rules_for_cbd( false ),
				),
				'is_offline'  => true,
			),
			array(
				'id'                  => 'eway',
				'title'               => __( 'Eway', 'fincommerce' ),
				'content'             => __( 'The Eway extension for FinCommerce allows you to take credit card payments directly on your store without redirecting your customers to a third party site to make payment.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/eway.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/eway.png',
				'plugins'             => array( 'fincommerce-gateway-eway' ),
				'is_visible'          => false,
				'category_other'      => array(),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'kco',
				'title'               => __( 'Klarna Checkout', 'fincommerce' ),
				'content'             => __( 'Choose the payment that you want, pay now, pay later or slice it. No credit card numbers, no passwords, no worries.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/klarna-black.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/klarna.png',
				'plugins'             => array( 'klarna-checkout-for-fincommerce' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'NO',
							'SE',
							'FI',
						)
					),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array(
					'NO',
					'SE',
					'FI',
				),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'klarna_payments',
				'title'               => __( 'Klarna Payments', 'fincommerce' ),
				'content'             => __( 'Choose the payment that you want, pay now, pay later or slice it. No credit card numbers, no passwords, no worries.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/klarna-black.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/klarna.png',
				'plugins'             => array( 'klarna-payments-for-fincommerce' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'MX',
							'US',
							'CA',
							'AT',
							'BE',
							'CH',
							'DK',
							'ES',
							'FI',
							'FR',
							'DE',
							'GB',
							'IT',
							'NL',
							'NO',
							'PL',
							'SE',
							'NZ',
							'AU',
						)
					),
					self::get_rules_for_cbd( false ),
					(object) array(
						'type'     => 'or',
						'operands' => array(
							(object) array(
								'type'    => 'not',
								'operand' => array(
									self::get_rules_for_countries( self::get_wcpay_countries() ),
								),
							),
							self::get_rules_for_wcpay_activated( false ),
							self::get_rules_for_wcpay_connected( false ),
						),
					),
				),
				'category_other'      => array(),
				'category_additional' => array(
					'MX',
					'US',
					'CA',
					'AT',
					'BE',
					'CH',
					'DK',
					'ES',
					'FI',
					'FR',
					'DE',
					'GB',
					'IT',
					'NL',
					'NO',
					'PL',
					'SE',
					'NZ',
					'AU',
				),
			),
			array(
				'id'                  => 'mollie_wc_gateway_banktransfer',
				'title'               => __( 'Mollie', 'fincommerce' ),
				'content'             => __( 'Effortless payments by Mollie: Offer global and local payment methods, get onboarded in minutes, and supported in your language.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/mollie.svg',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/mollie.png',
				'plugins'             => array( 'mollie-payments-for-fincommerce' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'AT',
							'BE',
							'CH',
							'ES',
							'FI',
							'FR',
							'DE',
							'GB',
							'IT',
							'NL',
							'PL',
						)
					),
				),
				'category_other'      => array(
					'AT',
					'BE',
					'CH',
					'ES',
					'FI',
					'FR',
					'DE',
					'GB',
					'IT',
					'NL',
					'PL',
				),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'payfast',
				'title'               => __( 'Payfast', 'fincommerce' ),
				'content'             => __( 'The Payfast extension for FinCommerce enables you to accept payments by Credit Card and EFT via one of South Africa’s most popular payment gateways. No setup fees or monthly subscription costs. Selecting this extension will configure your store to use South African rands as the selected currency.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/payfast.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/payfast.png',
				'plugins'             => array( 'fincommerce-payfast-gateway' ),
				'is_visible'          => array(
					self::get_rules_for_countries( array( 'ZA' ) ),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array( 'ZA' ),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'payoneer-checkout',
				'title'               => __( 'Payoneer Checkout', 'fincommerce' ),
				'content'             => __( 'Payoneer Checkout is the next generation of payment processing platforms, giving merchants around the world the solutions and direction they need to succeed in today’s hyper-competitive global market.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/payoneer.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/payoneer.png',
				'plugins'             => array( 'payoneer-checkout' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'HK',
							'CN',
						)
					),
				),
				'category_other'      => array(),
				'category_additional' => array(
					'HK',
					'CN',
				),
			),
			array(
				'id'                  => 'paystack',
				'title'               => __( 'Paystack', 'fincommerce' ),
				'content'             => __( 'Paystack helps African merchants accept one-time and recurring payments online with a modern, safe, and secure payment gateway.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/paystack.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/paystack.png',
				'plugins'             => array( 'woo-paystack' ),
				'is_visible'          => array(
					self::get_rules_for_countries( array( 'ZA', 'GH', 'NG' ) ),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array( 'ZA', 'GH', 'NG' ),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'payubiz',
				'title'               => __( 'PayU for FinCommerce', 'fincommerce' ),
				'content'             => __( 'Enable PayU’s exclusive plugin for FinCommerce to start accepting payments in 100+ payment methods available in India including credit cards, debit cards, UPI, & more!', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/payu.svg',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/payu.png',
				'plugins'             => array( 'payu-india' ),
				'is_visible'          => array(
					(object) array(
						'type'      => 'base_location_country',
						'value'     => 'IN',
						'operation' => '=',
					),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array( 'IN' ),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'ppcp-gateway',
				'title'               => __( 'PayPal Payments', 'fincommerce' ),
				'content'             => __( "Safe and secure payments using credit cards or your customer's PayPal account.", 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/paypal.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/paypal.png',
				'plugins'             => array( 'fincommerce-paypal-payments' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'US',
							'CA',
							'MX',
							'BR',
							'AR',
							'CL',
							'CO',
							'EC',
							'PE',
							'UY',
							'VE',
							'AT',
							'BE',
							'BG',
							'HR',
							'CH',
							'CY',
							'CZ',
							'DK',
							'EE',
							'ES',
							'FI',
							'FR',
							'DE',
							'GB',
							'GR',
							'HU',
							'IE',
							'IT',
							'LV',
							'LT',
							'LU',
							'MT',
							'NL',
							'NO',
							'PL',
							'PT',
							'RO',
							'SK',
							'SL',
							'SE',
							'AU',
							'NZ',
							'HK',
							'JP',
							'SG',
							'CN',
							'ID',
							'IN',
						)
					),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array(
					'US',
					'CA',
					'MX',
					'BR',
					'AR',
					'CL',
					'CO',
					'EC',
					'PE',
					'UY',
					'VE',
					'AT',
					'BE',
					'BG',
					'HR',
					'CH',
					'CY',
					'CZ',
					'DK',
					'EE',
					'ES',
					'FI',
					'FR',
					'DE',
					'GB',
					'GR',
					'HU',
					'IE',
					'IT',
					'LV',
					'LT',
					'LU',
					'MT',
					'NL',
					'NO',
					'PL',
					'PT',
					'RO',
					'SK',
					'SL',
					'SE',
					'AU',
					'NZ',
					'HK',
					'JP',
					'SG',
					'CN',
					'ID',
				),
				'category_additional' => array(
					'US',
					'CA',
					'ZA',
					'NG',
					'GH',
					'EC',
					'VE',
					'AR',
					'CL',
					'CO',
					'PE',
					'UY',
					'MX',
					'BR',
					'AT',
					'BE',
					'BG',
					'HR',
					'CH',
					'CY',
					'CZ',
					'DK',
					'EE',
					'ES',
					'FI',
					'FR',
					'DE',
					'GB',
					'GR',
					'HU',
					'IE',
					'IT',
					'LV',
					'LT',
					'LU',
					'MT',
					'NL',
					'NO',
					'PL',
					'PT',
					'RO',
					'SK',
					'SL',
					'SE',
					'AU',
					'NZ',
					'HK',
					'JP',
					'SG',
					'CN',
					'ID',
					'IN',
				),
			),
			array(
				'id'                  => 'razorpay',
				'title'               => __( 'Razorpay', 'fincommerce' ),
				'content'             => __( 'The official Razorpay extension for FinCommerce allows you to accept credit cards, debit cards, netbanking, wallet, and UPI payments.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/razorpay.svg',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/razorpay.png',
				'plugins'             => array( 'woo-razorpay' ),
				'is_visible'          => array(
					(object) array(
						'type'      => 'base_location_country',
						'value'     => 'IN',
						'operation' => '=',
					),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array( 'IN' ),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'square_credit_card',
				'title'               => __( 'Square', 'fincommerce' ),
				'content'             => __( 'Securely accept credit and debit cards with one low rate, no surprise fees (custom rates available). Sell online and in store and track sales and inventory in one place.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/square-black.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/square.png',
				'plugins'             => array( 'fincommerce-square' ),
				'is_visible'          => array(
					(object) array(
						'type'     => 'or',
						'operands' => (object) array(
							array(
								self::get_rules_for_countries( array( 'US' ) ),
								self::get_rules_for_cbd( true ),
							),
							array(
								self::get_rules_for_countries(
									array(
										'US',
										'CA',
										'IE',
										'ES',
										'FR',
										'GB',
										'AU',
										'JP',
									)
								),
								(object) array(
									'type'     => 'or',
									'operands' => (object) array(
										self::get_rules_for_selling_venues( array( 'brick-mortar', 'brick-mortar-other' ) ),
										self::get_rules_selling_offline(),
									),
								),
							),
						),
					),
				),
				'category_other'      => array(
					'US',
					'CA',
					'IE',
					'ES',
					'FR',
					'GB',
					'AU',
					'JP',
				),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'stripe',
				'title'               => __( ' Stripe', 'fincommerce' ),
				'content'             => __( 'Accept debit and credit cards in 135+ currencies, methods such as Alipay, and one-touch checkout with Apple Pay.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/stripe.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/stripe.png',
				'plugins'             => array( 'fincommerce-gateway-stripe' ),
				'is_visible'          => array(
					// https://stripe.com/global.
					self::get_rules_for_countries(
						array(
							'US',
							'CA',
							'MX',
							'BR',
							'AT',
							'BE',
							'BG',
							'CH',
							'CY',
							'CZ',
							'DK',
							'EE',
							'ES',
							'FI',
							'FR',
							'DE',
							'GB',
							'GR',
							'HU',
							'IE',
							'IT',
							'LV',
							'LT',
							'LU',
							'MT',
							'NL',
							'NO',
							'PL',
							'PT',
							'RO',
							'SK',
							'SL',
							'SE',
							'AU',
							'NZ',
							'HK',
							'JP',
							'SG',
							'ID',
							'IN',
						)
					),
					self::get_rules_for_cbd( false ),
				),
				'category_other'      => array(
					'US',
					'CA',
					'MX',
					'BR',
					'AT',
					'BE',
					'BG',
					'CH',
					'CY',
					'CZ',
					'DK',
					'EE',
					'ES',
					'FI',
					'FR',
					'DE',
					'GB',
					'GR',
					'HU',
					'IE',
					'IT',
					'LV',
					'LT',
					'LU',
					'MT',
					'NL',
					'NO',
					'PL',
					'PT',
					'RO',
					'SK',
					'SL',
					'SE',
					'AU',
					'NZ',
					'HK',
					'JP',
					'SG',
					'ID',
					'IN',
				),
				'category_additional' => array(),
			),
			array(
				'id'                  => 'woo-mercado-pago-custom',
				'title'               => __( 'Mercado Pago', 'fincommerce' ),
				'content'             => __( 'Set up your payment methods and accept credit and debit cards, cash, bank transfers and money from your Mercado Pago account. Offer safe and secure payments with Latin America’s leading processor.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/mercadopago.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/mercadopago.png',
				'plugins'             => array( 'fincommerce-mercadopago' ),
				'is_visible'          => array(
					self::get_rules_for_countries(
						array(
							'AR',
							'CL',
							'CO',
							'EC',
							'PE',
							'UY',
							'MX',
							'BR',
						)
					),
				),
				'is_local_partner'    => true,
				'category_other'      => array(
					'AR',
					'CL',
					'CO',
					'EC',
					'PE',
					'UY',
					'MX',
					'BR',
				),
				'category_additional' => array(),
			),
			// This is for backwards compatibility only (WC < 5.10.0-dev or WCA < 2.9.0-dev).
			array(
				'id'          => 'fincommerce_payments',
				'title'       => __( 'WooPayments', 'fincommerce' ),
				'content'     => __(
					'Manage transactions without leaving your WordPress Dashboard. Only with WooPayments.',
					'fincommerce'
				),
				'image'       => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay.svg',
				'image_72x72' => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay.svg',
				'plugins'     => array( 'fincommerce-payments' ),
				'description' => __( 'With WooPayments, you can securely accept major cards, Apple Pay, and payments in over 100 currencies. Track cash flow and manage recurring revenue directly from your store’s dashboard - with no setup costs or monthly fees.', 'fincommerce' ),
				'is_visible'  => array(
					self::get_rules_for_cbd( false ),
					self::get_rules_for_countries( self::get_wcpay_countries() ),
					(object) array(
						'type'     => 'plugin_version',
						'plugin'   => 'fincommerce',
						'version'  => '5.10.0-dev',
						'operator' => '<',
					),
					(object) array(
						'type'     => 'or',
						'operands' => (object) array(
							(object) array(
								'type'    => 'not',
								'operand' => array(
									(object) array(
										'type'    => 'plugins_activated',
										'plugins' => array( 'fincommerce-admin' ),
									),
								),
							),
							(object) array(
								'type'     => 'plugin_version',
								'plugin'   => 'fincommerce-admin',
								'version'  => '2.9.0-dev',
								'operator' => '<',
							),
						),
					),
				),
			),
			array(
				'id'          => 'fincommerce_payments:without-in-person-payments',
				'title'       => __( 'WooPayments', 'fincommerce' ),
				'content'     => __(
					'Manage transactions without leaving your WordPress Dashboard. Only with WooPayments.',
					'fincommerce'
				),
				'image'       => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay.svg',
				'image_72x72' => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay.svg',
				'plugins'     => array( 'fincommerce-payments' ),
				'description' => __( 'With WooPayments, you can securely accept major cards, Apple Pay, and payments in over 100 currencies. Track cash flow and manage recurring revenue directly from your store’s dashboard - with no setup costs or monthly fees.', 'fincommerce' ),
				'is_visible'  => array(
					self::get_rules_for_cbd( false ),
					self::get_rules_for_countries( array_diff( self::get_wcpay_countries(), array( 'US', 'CA' ) ) ),
					(object) array(
						'type'     => 'or',
						// Older versions of FinCommerce Admin require the ID to be `fincommerce-payments` to show the suggestion card.
						'operands' => (object) array(
							(object) array(
								'type'     => 'plugin_version',
								'plugin'   => 'fincommerce-admin',
								'version'  => '2.9.0-dev',
								'operator' => '>=',
							),
							(object) array(
								'type'     => 'plugin_version',
								'plugin'   => 'fincommerce',
								'version'  => '5.10.0-dev',
								'operator' => '>=',
							),
						),
					),
				),
			),
			// This is the same as the above, but with a different description for countries that support in-person payments such as US and CA.
			array(
				'id'          => 'fincommerce_payments:with-in-person-payments',
				'title'       => __( 'WooPayments', 'fincommerce' ),
				'content'     => __(
					'Manage transactions without leaving your WordPress Dashboard. Only with WooPayments.',
					'fincommerce'
				),
				'image'       => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay.svg',
				'image_72x72' => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay.svg',
				'plugins'     => array( 'fincommerce-payments' ),
				'description' => __( 'With WooPayments, you can securely accept major cards, Apple Pay, and payments in over 100 currencies – with no setup costs or monthly fees – and you can now accept in-person payments with the Woo mobile app.', 'fincommerce' ),
				'is_visible'  => array(
					self::get_rules_for_cbd( false ),
					self::get_rules_for_countries( array( 'US', 'CA' ) ),
					(object) array(
						'type'     => 'or',
						// Older versions of FinCommerce Admin require the ID to be `fincommerce-payments` to show the suggestion card.
						'operands' => (object) array(
							(object) array(
								'type'     => 'plugin_version',
								'plugin'   => 'fincommerce-admin',
								'version'  => '2.9.0-dev',
								'operator' => '>=',
							),
							(object) array(
								'type'     => 'plugin_version',
								'plugin'   => 'fincommerce',
								'version'  => '5.10.0-dev',
								'operator' => '>=',
							),
						),
					),
				),
			),
			array(
				'id'          => 'fincommerce_payments:bnpl',
				'title'       => __( 'Activate BNPL instantly on WooPayments', 'fincommerce' ),
				'content'     => __(
					'The world’s favorite buy now, pay later options and many more are right at your fingertips with WooPayments — all from one dashboard, without needing multiple extensions and logins.',
					'fincommerce'
				),
				'image'       => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay-bnpl.svg',
				'image_72x72' => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/wcpay-bnpl.svg',
				'plugins'     => array( 'fincommerce-payments' ),
				'is_visible'  => array(
					self::get_rules_for_countries(
						array_intersect(
							array(
								'US',
								'CA',
								'AU',
								'AT',
								'BE',
								'CH',
								'DK',
								'ES',
								'FI',
								'FR',
								'DE',
								'GB',
								'IT',
								'NL',
								'NO',
								'PL',
								'SE',
								'NZ',
							),
							self::get_wcpay_countries()
						),
					),
					self::get_rules_for_cbd( false ),
					self::get_rules_for_wcpay_activated( true ),
					self::get_rules_for_wcpay_connected( true ),
				),
			),
			array(
				'id'                  => 'zipmoney',
				'title'               => __( 'Zip Co - Buy Now, Pay Later', 'fincommerce' ),
				'content'             => __( 'Give your customers the power to pay later, interest free and watch your sales grow.', 'fincommerce' ),
				'image'               => WC_ADMIN_IMAGES_FOLDER_URL . '/onboarding/zipco.png',
				'image_72x72'         => WC_ADMIN_IMAGES_FOLDER_URL . '/payment_methods/72x72/zipco.png',
				'plugins'             => array( 'zipmoney-payments-fincommerce' ),
				'is_visible'          => false,
				'category_other'      => array(),
				'category_additional' => array(),
			),
		);

		$base_location = wc_get_base_location();
		$country       = $base_location['country'];
		foreach ( $payment_gateways as $index => $payment_gateway ) {
			$payment_gateways[ $index ]['recommendation_priority'] = self::get_recommendation_priority( $payment_gateway['id'], $country );
		}

		return $payment_gateways;
	}

	/**
	 * Get array of countries supported by WCPay depending on feature flag.
	 *
	 * @return array Array of countries.
	 */
	public static function get_wcpay_countries() {
		return array( 'US', 'PR', 'AU', 'CA', 'CY', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'IE', 'IT', 'LU', 'LT', 'LV', 'NO', 'NZ', 'MT', 'AT', 'BE', 'NL', 'PL', 'PT', 'CH', 'HK', 'SI', 'SK', 'SG', 'BG', 'CZ', 'HR', 'HU', 'RO', 'SE', 'JP', 'AE' );
	}

	/**
	 * Get rules that match the store base location to one of the provided countries.
	 *
	 * @param array $countries Array of countries to match.
	 * @return object Rules to match.
	 */
	public static function get_rules_for_countries( $countries ) {
		$rules = array();

		foreach ( $countries as $country ) {
			$rules[] = (object) array(
				'type'      => 'base_location_country',
				'value'     => $country,
				'operation' => '=',
			);
		}

		return (object) array(
			'type'     => 'or',
			'operands' => $rules,
		);
	}

	/**
	 * Get rules that match the store's selling venues.
	 *
	 * @param array $selling_venues Array of venues to match.
	 * @return object Rules to match.
	 */
	public static function get_rules_for_selling_venues( $selling_venues ) {
		$rules = array();

		foreach ( $selling_venues as $venue ) {
			$rules[] = (object) array(
				'type'         => 'option',
				'transformers' => array(
					(object) array(
						'use'       => 'dot_notation',
						'arguments' => (object) array(
							'path' => 'selling_venues',
						),
					),
				),
				'option_name'  => 'fincommerce_onboarding_profile',
				'operation'    => '=',
				'value'        => $venue,
				'default'      => array(),
			);
		}

		return (object) array(
			'type'     => 'or',
			'operands' => $rules,
		);
	}

	/**
	 * Get rules for when selling offline for core profiler.
	 *
	 * @return object Rules to match.
	 */
	public static function get_rules_selling_offline() {
		return (object) array(
			'type'         => 'option',
			'transformers' => array(
				(object) array(
					'use'       => 'dot_notation',
					'arguments' => (object) array(
						'path' => 'selling_online_answer',
					),
				),
			),
			'option_name'  => 'fincommerce_onboarding_profile',
			'operation'    => 'in',
			'value'        => array( 'no_im_selling_offline', 'im_selling_both_online_and_offline' ),
			'default'      => '',
		);
	}

	/**
	 * Get default rules for CBD based on given argument.
	 *
	 * @param bool $should_have Whether or not the store should have CBD as an industry (true) or not (false).
	 * @return object Rules to match.
	 */
	public static function get_rules_for_cbd( $should_have ) {
		return (object) array(
			'type'         => 'option',
			'transformers' => array(
				(object) array(
					'use'       => 'dot_notation',
					'arguments' => (object) array(
						'path' => 'industry',
					),
				),
				(object) array(
					'use'       => 'array_column',
					'arguments' => (object) array(
						'key' => 'slug',
					),
				),
			),
			'option_name'  => 'fincommerce_onboarding_profile',
			'operation'    => $should_have ? 'contains' : '!contains',
			'value'        => 'cbd-other-hemp-derived-products',
			'default'      => array(),
		);
	}

	/**
	 * Get default rules for the WooPayments plugin being installed and activated.
	 *
	 * @param bool $should_be Whether WooPayments should be activated.
	 *
	 * @return object Rules to match.
	 */
	public static function get_rules_for_wcpay_activated( $should_be ) {
		$active_rule = (object) array(
			'type'    => 'plugins_activated',
			'plugins' => array( 'fincommerce-payments' ),
		);

		if ( $should_be ) {
			return $active_rule;
		}

		return (object) array(
			'type'    => 'not',
			'operand' => array( $active_rule ),
		);
	}

	/**
	 * Get default rules for WooPayments being connected or not.
	 *
	 * This does not include the check for the WooPayments plugin to be active.
	 *
	 * @param bool $should_be Whether WooPayments should be connected.
	 *
	 * @return object Rules to match.
	 */
	public static function get_rules_for_wcpay_connected( $should_be ) {
		return (object) array(
			'type'         => 'option',
			'transformers' => array(
				// Extract only the 'data' key from the option.
				(object) array(
					'use'       => 'dot_notation',
					'arguments' => (object) array(
						'path' => 'data',
					),
				),
				// Extract the keys from the data array.
				(object) array(
					'use' => 'array_keys',
				),
			),
			'option_name'  => 'wcpay_account_data',
			// The rule will be look for the 'account_id' key in the account data array.
			'operation'    => $should_be ? 'contains' : '!contains',
			'value'        => 'account_id',
			'default'      => array(),
		);
	}

	/**
	 * Get recommendation priority for a given payment gateway by id and country.
	 * If country is not supported, return null.
	 *
	 * @param string $gateway_id Payment gateway id.
	 * @param string $country_code Store country code.
	 * @return int|null Priority. Priority is 0-indexed, so 0 is the highest priority.
	 */
	private static function get_recommendation_priority( $gateway_id, $country_code ) {
		$recommendation_priority_map = array(
			'US' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'square_credit_card',
				'amazon_payments_advanced',
				'affirm',
				'afterpay',
				'klarna_payments',
			),
			'CA' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'square_credit_card',
				'affirm',
				'afterpay',
				'klarna_payments',
			),
			'AT' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'BE' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'BG' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'HR' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'ppcp-gateway',
			),
			'CH' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
			),
			'CY' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'amazon_payments_advanced',
			),
			'CZ' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'DK' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'EE' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
			),
			'ES' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'mollie_wc_gateway_banktransfer',
				'square_credit_card',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'FI' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'mollie_wc_gateway_banktransfer',
				'kco',
				'klarna_payments',
			),
			'FR' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'square_credit_card',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'DE' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'GB' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'square_credit_card',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'GR' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
			),
			'HU' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'amazon_payments_advanced',
			),
			'IE' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'square_credit_card',
				'amazon_payments_advanced',
			),
			'IT' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'LV' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'LT' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'LU' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'amazon_payments_advanced',
			),
			'MT' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'NL' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'NO' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'kco',
				'klarna_payments',
			),
			'PL' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'mollie_wc_gateway_banktransfer',
				'klarna_payments',
			),
			'PT' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'airwallex_main',
				'amazon_payments_advanced',
			),
			'RO' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'SK' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
			),
			'SL' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'amazon_payments_advanced',
			),
			'SE' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'kco',
				'klarna_payments',
				'amazon_payments_advanced',
			),
			'MX' => array(
				'stripe',
				'woo-mercado-pago-custom',
				'ppcp-gateway',
				'klarna_payments',
			),
			'BR' => array( 'stripe', 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'AR' => array( 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'BO' => array(),
			'CL' => array( 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'CO' => array( 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'EC' => array( 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'FK' => array(),
			'GF' => array(),
			'GY' => array(),
			'PY' => array(),
			'PE' => array( 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'SR' => array(),
			'UY' => array( 'woo-mercado-pago-custom', 'ppcp-gateway' ),
			'VE' => array( 'ppcp-gateway' ),
			'AU' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'airwallex_main',
				'ppcp-gateway',
				'square_credit_card',
				'afterpay',
				'klarna_payments',
			),
			'NZ' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'airwallex_main',
				'ppcp-gateway',
				'klarna_payments',
			),
			'HK' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'airwallex_main',
				'ppcp-gateway',
				'payoneer-checkout',
			),
			'JP' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'ppcp-gateway',
				'square_credit_card',
				'amazon_payments_advanced',
			),
			'SG' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
				'stripe',
				'airwallex_main',
				'ppcp-gateway',
			),
			'CN' => array( 'airwallex_main', 'ppcp-gateway', 'payoneer-checkout' ),
			'FJ' => array(),
			'GU' => array(),
			'ID' => array( 'stripe', 'ppcp-gateway' ),
			'IN' => array( 'stripe', 'razorpay', 'payubiz', 'ppcp-gateway' ),
			'ZA' => array( 'payfast', 'paystack' ),
			'NG' => array( 'paystack' ),
			'GH' => array( 'paystack' ),
			'AE' => array(
				'fincommerce_payments:with-in-person-payments',
				'fincommerce_payments:without-in-person-payments',
				'fincommerce_payments',
			),
		);

		// If the country code is not in the list, return default priority.
		if ( ! isset( $recommendation_priority_map[ $country_code ] ) ) {
			return self::get_default_recommendation_priority( $gateway_id );
		}

		$index = array_search( $gateway_id, $recommendation_priority_map[ $country_code ], true );

		// If the gateway is not in the list, return the last index + 1.
		if ( false === $index ) {
			return count( $recommendation_priority_map[ $country_code ] );
		}

		return $index;
	}

	/**
	 * Get the default recommendation priority for a payment gateway.
	 * This is used when a country is not in the $recommendation_priority_map array.
	 *
	 * @param string $id Payment gateway id.
	 * @return int Priority.
	 */
	private static function get_default_recommendation_priority( $id ) {
		if ( ! $id || ! array_key_exists( $id, self::$recommendation_priority ) ) {
			return null;
		}
		return self::$recommendation_priority[ $id ];
	}
}
