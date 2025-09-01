<?php

declare( strict_types=1 );

namespace Automattic\FinCommerce\Internal\EmailEditor\PersonalizationTags;

use Automattic\FinCommerce\EmailEditor\Engine\PersonalizationTags\Personalization_Tag;
use Automattic\FinCommerce\EmailEditor\Engine\PersonalizationTags\Personalization_Tags_Registry;
use Automattic\FinCommerce\Internal\EmailEditor\Integration;

/**
 * Provider for customer-related personalization tags.
 *
 * @internal
 */
class CustomerTagsProvider extends AbstractTagProvider {
	/**
	 * Register customer tags with the registry.
	 *
	 * @param Personalization_Tags_Registry $registry The personalization tags registry.
	 * @return void
	 */
	public function register_tags( Personalization_Tags_Registry $registry ): void {
		$registry->register(
			new Personalization_Tag(
				__( 'Customer Email', 'fincommerce' ),
				'fincommerce/customer-email',
				__( 'Customer', 'fincommerce' ),
				function ( array $context ): string {
					if ( isset( $context['order'] ) ) {
						return $context['order']->get_billing_email() ?? '';
					}
					return $context['recipient_email'] ?? '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Customer First Name', 'fincommerce' ),
				'fincommerce/customer-first-name',
				__( 'Customer', 'fincommerce' ),
				function ( array $context ): string {
					if ( isset( $context['order'] ) ) {
						return $context['order']->get_billing_first_name() ?? '';
					} elseif ( isset( $context['wp_user'] ) ) {
						return $context['wp_user']->first_name ?? '';
					}
					return '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Customer Last Name', 'fincommerce' ),
				'fincommerce/customer-last-name',
				__( 'Customer', 'fincommerce' ),
				function ( array $context ): string {
					if ( isset( $context['order'] ) ) {
						return $context['order']->get_billing_last_name() ?? '';
					} elseif ( isset( $context['wp_user'] ) ) {
						return $context['wp_user']->last_name ?? '';
					}
					return '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Customer Full Name', 'fincommerce' ),
				'fincommerce/customer-full-name',
				__( 'Customer', 'fincommerce' ),
				function ( array $context ): string {
					if ( isset( $context['order'] ) ) {
						return $context['order']->get_formatted_billing_full_name() ?? '';
					} elseif ( isset( $context['wp_user'] ) ) {
						$first_name = $context['wp_user']->first_name ?? '';
						$last_name  = $context['wp_user']->last_name ?? '';
						return trim( "$first_name $last_name" );
					}
					return '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Customer Username', 'fincommerce' ),
				'fincommerce/customer-username',
				__( 'Customer', 'fincommerce' ),
				function ( array $context ): string {
					if ( isset( $context['wp_user'] ) ) {
						return stripslashes( $context['wp_user']->user_login ?? '' );
					}
					return '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);

		$registry->register(
			new Personalization_Tag(
				__( 'Customer Country', 'fincommerce' ),
				'fincommerce/customer-country',
				__( 'Customer', 'fincommerce' ),
				function ( array $context ): string {
					if ( isset( $context['order'] ) ) {
						$country_code = $context['order']->get_billing_country();
						return WC()->countries->countries[ $country_code ] ?? $country_code ?? '';
					}
					return '';
				},
				array(),
				null,
				array( Integration::EMAIL_POST_TYPE ),
			)
		);
	}
}
