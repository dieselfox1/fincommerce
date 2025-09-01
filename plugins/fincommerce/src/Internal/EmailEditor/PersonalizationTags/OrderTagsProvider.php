<?php

declare( strict_types=1 );

namespace Automattic\FinCommerce\Internal\EmailEditor\PersonalizationTags;

use Automattic\FinCommerce\EmailEditor\Engine\PersonalizationTags\Personalization_Tag;
use Automattic\FinCommerce\EmailEditor\Engine\PersonalizationTags\Personalization_Tags_Registry;
use Automattic\FinCommerce\Internal\EmailEditor\Integration;

/**
 * Provider for order-related personalization tags.
 *
 * @internal
 */
class OrderTagsProvider extends AbstractTagProvider {
	/**
	 * Register order tags with the registry.
	 *
	 * @param Personalization_Tags_Registry $registry The personalization tags registry.
	 * @return void
	 */
	public function register_tags( Personalization_Tags_Registry $registry ): void {
		$registry->register(
			new Personalization_Tag(
				__( 'Order Number', 'fincommerce' ),
				'fincommerce/order-number',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_order_number() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Date', 'fincommerce' ),
				'fincommerce/order-date',
				__( 'Order', 'fincommerce' ),
				function ( array $context, array $parameters = array() ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					$format       = isset( $parameters['format'] ) && is_string( $parameters['format'] ) ? $parameters['format'] : wc_date_format();
					$date_created = $context['order']->get_date_created();
					if ( ! $date_created ) {
						return '';
					}
					return wc_format_datetime( $date_created, $format );
				},
				array(
					'format' => wc_date_format(),
				),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Items', 'fincommerce' ),
				'fincommerce/order-items',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					$items = array();
					foreach ( $context['order']->get_items() as $item ) {
						$items[] = $item->get_name();
					}
					return implode( ', ', $items );
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Subtotal', 'fincommerce' ),
				'fincommerce/order-subtotal',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return (string) $context['order']->get_subtotal() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Tax', 'fincommerce' ),
				'fincommerce/order-tax',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return (string) $context['order']->get_total_tax() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Discount', 'fincommerce' ),
				'fincommerce/order-discount',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return wc_price( $context['order']->get_discount_total(), array( 'currency' => $context['order']->get_currency() ) );
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Shipping', 'fincommerce' ),
				'fincommerce/order-shipping',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return wc_price( $context['order']->get_shipping_total(), array( 'currency' => $context['order']->get_currency() ) );
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Total', 'fincommerce' ),
				'fincommerce/order-total',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return (string) $context['order']->get_total() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Payment Method', 'fincommerce' ),
				'fincommerce/order-payment-method',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_payment_method_title() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Payment URL', 'fincommerce' ),
				'fincommerce/order-payment-url',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_checkout_payment_url() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Transaction ID', 'fincommerce' ),
				'fincommerce/order-transaction-id',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_transaction_id() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Shipping Method', 'fincommerce' ),
				'fincommerce/order-shipping-method',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_shipping_method() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Shipping Address', 'fincommerce' ),
				'fincommerce/order-shipping-address',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_formatted_shipping_address() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Billing Address', 'fincommerce' ),
				'fincommerce/order-billing-address',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_formatted_billing_address() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order View URL', 'fincommerce' ),
				'fincommerce/order-view-url',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_view_order_url() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Admin URL', 'fincommerce' ),
				'fincommerce/order-admin-url',
				__( 'Order', 'fincommerce' ),
				function ( array $context ): string {
					if ( ! isset( $context['order'] ) ) {
						return '';
					}
					return $context['order']->get_edit_order_url() ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Order Custom Field', 'fincommerce' ),
				'fincommerce/order-custom-field',
				__( 'Order', 'fincommerce' ),
				function ( array $context, array $parameters = array() ): string {
					if ( ! isset( $context['order'] ) || ! isset( $parameters['key'] ) ) {
						return '';
					}
					$field_key = sanitize_text_field( $parameters['key'] );
					return $context['order']->get_meta( $field_key ) ?? '';
				},
				array(
					'key' => '',
				),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);
	}
}
