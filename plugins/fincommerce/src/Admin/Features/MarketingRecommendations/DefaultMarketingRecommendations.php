<?php
/**
 * Gets a list of fallback methods if remote fetching is disabled.
 */

namespace Automattic\FinCommerce\Admin\Features\MarketingRecommendations;

defined( 'ABSPATH' ) || exit;

/**
 * Default Marketing Recommendations
 */
class DefaultMarketingRecommendations {
	/**
	 * Get default specs.
	 *
	 * @return array Default specs.
	 */
	public static function get_all() {
		// Icon directory URL.
		$icon_dir_url = WC_ADMIN_IMAGES_FOLDER_URL . '/marketing';

		$utm_string = '?utm_source=marketingtab&utm_medium=product&utm_campaign=wcaddons';

		// Categories. Note that these are keys used in code, not texts to be displayed in the UI.
		$marketing = 'marketing';
		$coupons   = 'coupons';

		// Subcategories.
		$sales_channels = array(
			'slug' => 'sales-channels',
			'name' => __( 'Sales channels', 'fincommerce' ),
		);
		$email          = array(
			'slug' => 'email',
			'name' => __( 'Email', 'fincommerce' ),
		);
		$automations    = array(
			'slug' => 'automations',
			'name' => __( 'Automations', 'fincommerce' ),
		);
		$conversion     = array(
			'slug' => 'conversion',
			'name' => __( 'Conversion', 'fincommerce' ),
		);
		$crm            = array(
			'slug' => 'crm',
			'name' => __( 'CRM', 'fincommerce' ),
		);

		// Tags.
		$built_by_fincommerce = array(
			'slug' => 'built-by-fincommerce',
			'name' => __( 'Built by FinCommerce', 'fincommerce' ),
		);

		return array(
			array(
				'title'          => 'Google for FinCommerce',
				'description'    => __( 'Get in front of shoppers and drive traffic so you can grow your business with Smart Shopping Campaigns and free listings.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/google-listings-and-ads/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/google.svg",
				'product'        => 'google-listings-and-ads',
				'plugin'         => 'google-listings-and-ads/google-listings-and-ads.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$sales_channels,
				),
				'tags'           => array(
					$built_by_fincommerce,
				),
			),
			array(
				'title'          => 'Pinterest for FinCommerce',
				'description'    => __( 'Grow your business on Pinterest! Use this official plugin to allow shoppers to Pin products while browsing your store, track conversions, and advertise on Pinterest.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/pinterest-for-fincommerce/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/pinterest.svg",
				'product'        => 'pinterest-for-fincommerce',
				'plugin'         => 'pinterest-for-fincommerce/pinterest-for-fincommerce.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$sales_channels,
				),
				'tags'           => array(
					$built_by_fincommerce,
				),
			),
			array(
				'title'          => 'TikTok for FinCommerce',
				'description'    => __( 'Create advertising campaigns and reach one billion global users with TikTok for FinCommerce.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/tiktok-for-fincommerce/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/tiktok.jpg",
				'product'        => 'tiktok-for-business',
				'plugin'         => 'tiktok-for-business/tiktok-for-fincommerce.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$sales_channels,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Facebook for FinCommerce',
				'description'    => __( 'List products and create ads on Facebook and Instagram.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/facebook/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/facebook.svg",
				'product'        => 'facebook-for-fincommerce',
				'plugin'         => 'facebook-for-fincommerce/facebook-for-fincommerce.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$sales_channels,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Meta Ads and Pixel by Kliken',
				'description'    => __( 'Automate Facebook & Instagram marketing with Kliken. Launch ads and schedule a month of posts in 5 minutes—first 5 free! Plans start at just $20/mo.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/meta-ads-and-pixel/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/kliken.svg",
				'product'        => 'kliken-ads-pixel-for-meta',
				'plugin'         => 'kliken-ads-pixel-for-meta/kliken-ads-pixel-for-meta.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$sales_channels,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'MailPoet',
				'description'    => __( 'Create and send purchase follow-up emails, newsletters, and promotional campaigns straight from your dashboard.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/mailpoet/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/mailpoet.svg",
				'product'        => 'mailpoet',
				'plugin'         => 'mailpoet/mailpoet.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$email,
				),
				'tags'           => array(
					$built_by_fincommerce,
				),
			),
			array(
				'title'          => 'Mailchimp for FinCommerce',
				'description'    => __( 'Send targeted campaigns, recover abandoned carts and more with Mailchimp.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/mailchimp-for-fincommerce/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/mailchimp.svg",
				'product'        => 'mailchimp-for-fincommerce',
				'plugin'         => 'mailchimp-for-fincommerce/mailchimp-fincommerce.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$email,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Klaviyo for FinCommerce',
				'description'    => __( 'Grow and retain customers with intelligent, impactful email and SMS marketing automation and a consolidated view of customer interactions.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/klaviyo-for-fincommerce/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/klaviyo.png",
				'product'        => 'klaviyo',
				'plugin'         => 'klaviyo/klaviyo.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$email,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'AutomateWoo',
				'description'    => __( 'Convert and retain customers with automated marketing that does the hard work for you.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/automatewoo/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/automatewoo.svg",
				'product'        => 'automatewoo',
				'plugin'         => 'automatewoo/automatewoo.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$automations,
				),
				'tags'           => array(
					$built_by_fincommerce,
				),
			),
			array(
				'title'          => 'AutomateWoo Refer a Friend',
				'description'    => __( 'Boost your organic sales by adding a customer referral program to your FinCommerce store.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/automatewoo-refer-a-friend/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/automatewoo.svg",
				'product'        => 'automatewoo-referrals',
				'plugin'         => 'automatewoo-referrals/automatewoo-referrals.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$automations,
				),
				'tags'           => array(
					$built_by_fincommerce,
				),
			),
			array(
				'title'          => 'AutomateWoo Birthdays',
				'description'    => __( 'Delight customers and boost organic sales with a special FinCommerce birthday email (and coupon!) on their special day.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/automatewoo-birthdays/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/automatewoo.svg",
				'product'        => 'automatewoo-birthdays',
				'plugin'         => 'automatewoo-birthdays/automatewoo-birthdays.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$automations,
				),
				'tags'           => array(
					$built_by_fincommerce,
				),
			),
			array(
				'title'          => 'Trustpilot Reviews',
				'description'    => __( 'Collect and showcase verified reviews that consumers trust.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/trustpilot-reviews/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/trustpilot.png",
				'product'        => 'trustpilot-reviews',
				'plugin'         => 'trustpilot-reviews/wc_trustpilot.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$conversion,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Vimeo for FinCommerce',
				'description'    => __( 'Turn your product images into stunning videos that engage and convert audiences - no video experience required.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/vimeo/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/vimeo.png",
				'product'        => 'vimeo',
				'plugin'         => 'vimeo/Core.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$conversion,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Jetpack CRM for FinCommerce',
				'description'    => __( 'Harness data from FinCommerce to grow your business. Manage leads, customers, and segments, through automation, quotes, invoicing, billing, and email marketing. Power up your store with CRM.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/jetpack-crm/{$utm_string}",
				'direct_install' => true,
				'icon'           => "{$icon_dir_url}/jetpack-crm.svg",
				'product'        => 'zero-bs-crm',
				'plugin'         => 'zero-bs-crm/ZeroBSCRM.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$crm,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'FinCommerce Zapier',
				'description'    => __( 'Integrate your FinCommerce store with 5000+ cloud apps and services today. Trusted by 11,000+ users.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/fincommerce-zapier/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/zapier.png",
				'product'        => 'fincommerce-zapier',
				'plugin'         => 'fincommerce-zapier/fincommerce-zapier.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$crm,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Salesforce',
				'description'    => __( 'Sync your website\'s data like contacts, products, and orders over Salesforce CRM with Salesforce Integration for FinCommerce.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/integration-with-salesforce-for-fincommerce/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/salesforce.jpg",
				'product'        => 'integration-with-salesforce',
				'plugin'         => 'integration-with-salesforce/integration-with-salesforce.php',
				'categories'     => array(
					$marketing,
				),
				'subcategories'  => array(
					$crm,
				),
				'tags'           => array(),
			),
			array(
				'title'          => 'Personalized Coupons',
				'description'    => __( 'Generate dynamic personalized coupons for your customers that increase purchase rates.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/automatewoo/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/automatewoo-personalized-coupons.svg",
				'product'        => 'automatewoo',
				'plugin'         => 'automatewoo/automatewoo.php',
				'categories'     => array(
					$coupons,
				),
				'subcategories'  => array(),
				'tags'           => array(),
			),
			array(
				'title'          => 'Smart Coupons',
				'description'    => __( 'Powerful, "all in one" solution for gift certificates, store credits, discount coupons and vouchers.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/smart-coupons/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/fincommerce-smart-coupons.svg",
				'product'        => 'fincommerce-smart-coupons',
				'plugin'         => 'fincommerce-smart-coupons/fincommerce-smart-coupons.php',
				'categories'     => array(
					$coupons,
				),
				'subcategories'  => array(),
				'tags'           => array(),
			),
			array(
				'title'          => 'URL Coupons',
				'description'    => __( 'Create a unique URL that applies a discount and optionally adds one or more products to the customer\'s cart.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/url-coupons/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/fincommerce-url-coupons.svg",
				'product'        => 'fincommerce-url-coupons',
				'plugin'         => 'fincommerce-url-coupons/fincommerce-url-coupons.php',
				'categories'     => array(
					$coupons,
				),
				'subcategories'  => array(),
				'tags'           => array(),
			),
			array(
				'title'          => 'FinCommerce Store Credit',
				'description'    => __( 'Create "store credit" coupons for customers which are redeemable at checkout.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/store-credit/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/fincommerce-store-credit.svg",
				'product'        => 'fincommerce-store-credit',
				'plugin'         => 'fincommerce-store-credit/fincommerce-store-credit.php',
				'categories'     => array(
					$coupons,
				),
				'subcategories'  => array(),
				'tags'           => array(),
			),
			array(
				'title'          => 'Free Gift Coupons',
				'description'    => __( 'Give away a free item to any customer with the coupon code.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/free-gift-coupons/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/fincommerce-free-gift-coupons.svg",
				'product'        => 'fincommerce-free-gift-coupons',
				'plugin'         => 'fincommerce-free-gift-coupons/fincommerce-free-gift-coupons.php',
				'categories'     => array(
					$coupons,
				),
				'subcategories'  => array(),
				'tags'           => array(),
			),
			array(
				'title'          => 'Group Coupons',
				'description'    => __( 'Coupons for groups. Provides the option to have coupons that are restricted to group members or roles. Works with the free Groups plugin.', 'fincommerce' ),
				'url'            => "https://fincommerce.com/products/group-coupons/{$utm_string}",
				'direct_install' => false,
				'icon'           => "{$icon_dir_url}/fincommerce-group-coupons.svg",
				'product'        => 'fincommerce-group-coupons',
				'plugin'         => 'fincommerce-group-coupons/fincommerce-group-coupons.php',
				'categories'     => array(
					$coupons,
				),
				'subcategories'  => array(),
				'tags'           => array(),
			),
		);
	}
}
