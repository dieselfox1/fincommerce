<?php
/**
 * FinCommerce Onboarding Industries
 */

namespace Automattic\FinCommerce\Internal\Admin\Onboarding;

/**
 * Logic around onboarding industries.
 */
class OnboardingIndustries {
	/**
	 * Init.
	 */
	public static function init() {
		add_filter( 'fincommerce_admin_onboarding_preloaded_data', array( __CLASS__, 'preload_data' ) );
	}

	/**
	 * Get a list of allowed industries for the onboarding wizard.
	 *
	 * @return array
	 */
	public static function get_allowed_industries() {
		/* With "use_description" we turn the description input on. With "description_label" we set the input label */
		return apply_filters(
			'fincommerce_admin_onboarding_industries',
			array(
				'fashion-apparel-accessories'     => array(
					'label'             => __( 'Fashion, apparel, and accessories', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'health-beauty'                   => array(
					'label'             => __( 'Health and beauty', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'electronics-computers'           => array(
					'label'             => __( 'Electronics and computers', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'food-drink'                      => array(
					'label'             => __( 'Food and drink', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'home-furniture-garden'           => array(
					'label'             => __( 'Home, furniture, and garden', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'cbd-other-hemp-derived-products' => array(
					'label'             => __( 'CBD and other hemp-derived products', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'education-and-learning'          => array(
					'label'             => __( 'Education and learning', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'sports-and-recreation'           => array(
					'label'             => __( 'Sports and recreation', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'arts-and-crafts'                 => array(
					'label'             => __( 'Arts and crafts', 'fincommerce' ),
					'use_description'   => false,
					'description_label' => '',
				),
				'other'                           => array(
					'label'             => __( 'Other', 'fincommerce' ),
					'use_description'   => true,
					'description_label' => __( 'Description', 'fincommerce' ),
				),
			)
		);
	}

	/**
	 * Add preloaded data to onboarding.
	 *
	 * @param array $settings Component settings.
	 * @return array
	 */
	public static function preload_data( $settings ) {
		$settings['onboarding']['industries'] = self::get_allowed_industries();
		return $settings;
	}
}
