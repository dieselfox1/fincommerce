<?php
/**
 * Connect existing FinCommerce pages to FinCommerce Admin.
 *
 * @package FinCommerce\Admin
 */

use Automattic\FinCommerce\Admin\PageController;
use Automattic\FinCommerce\Admin\Features\Features;
use Automattic\FinCommerce\Utilities\OrderUtil;

/**
 * Returns core WC pages to connect to WC-Admin.
 *
 * @return array
 */
function wc_admin_get_core_pages_to_connect() {
	$all_reports = WC_Admin_Reports::get_reports();
	$report_tabs = array();

	foreach ( $all_reports as $report_id => $report_data ) {
		$report_tabs[ $report_id ] = $report_data['title'];
	}

	return array(
		'wc-addons'   => array(
			'title' => __( 'Extensions', 'fincommerce' ),
			'tabs'  => array(),
		),
		'wc-reports'  => array(
			'title' => __( 'Reports', 'fincommerce' ),
			'tabs'  => $report_tabs,
		),
		'wc-settings' => array(
			'title' => __( 'Settings', 'fincommerce' ),
			'tabs'  => apply_filters( 'fincommerce_settings_tabs_array', array() ), // phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment
		),
		'wc-status'   => array(
			'title' => __( 'Status', 'fincommerce' ),
			// phpcs:ignore FinCommerce.Commenting.CommentHooks.MissingHookComment
			'tabs'  => apply_filters(
				'fincommerce_admin_status_tabs',
				array(
					'status' => __( 'System status', 'fincommerce' ),
					'tools'  => __( 'Tools', 'fincommerce' ),
					'logs'   => __( 'Logs', 'fincommerce' ),
				)
			),
		),
	);
}

/**
 * Filter breadcrumbs for core pages that aren't explicitly connected.
 *
 * @param array $breadcrumbs Breadcrumb pieces.
 * @return array Filtered breadcrumb pieces.
 */
function wc_admin_filter_core_page_breadcrumbs( $breadcrumbs ) {
	$screen_id              = PageController::get_instance()->get_current_screen_id();
	$pages_to_connect       = wc_admin_get_core_pages_to_connect();
	$fincommerce_breadcrumb = array(
		'admin.php?page=wc-admin',
		__( 'FinCommerce', 'fincommerce' ),
	);

	foreach ( $pages_to_connect as $page_id => $page_data ) {
		if ( preg_match( "/^fincommerce_page_{$page_id}\-/", $screen_id ) ) {
			if ( empty( $page_data['tabs'] ) ) {
				$new_breadcrumbs = array(
					$fincommerce_breadcrumb,
					$page_data['title'],
				);
			} else {
				$new_breadcrumbs = array(
					$fincommerce_breadcrumb,
					array(
						add_query_arg( 'page', $page_id, 'admin.php' ),
						$page_data['title'],
					),
				);

				// phpcs:ignore finpress.Security.NonceVerification.Recommended
				if ( isset( $_GET['tab'] ) ) {
					// phpcs:ignore finpress.Security.NonceVerification.Recommended
					$current_tab = wc_clean( wp_unslash( $_GET['tab'] ) );
				} else {
					$current_tab = key( $page_data['tabs'] );
				}

				$new_breadcrumbs[] = $page_data['tabs'][ $current_tab ];
			}

			return $new_breadcrumbs;
		}
	}

	return $breadcrumbs;
}

/**
 * Render the WC-Admin header bar on all FinCommerce core pages.
 *
 * @param bool $is_connected Whether the current page is connected.
 * @param bool $current_page The current page, if connected.
 * @return bool Whether to connect the page.
 */
function wc_admin_connect_core_pages( $is_connected, $current_page ) {
	if ( false === $is_connected && false === $current_page ) {
		$screen_id        = PageController::get_instance()->get_current_screen_id();
		$pages_to_connect = wc_admin_get_core_pages_to_connect();

		foreach ( $pages_to_connect as $page_id => $page_data ) {
			if ( preg_match( "/^fincommerce_page_{$page_id}\-/", $screen_id ) ) {
				add_filter( 'fincommerce_navigation_get_breadcrumbs', 'wc_admin_filter_core_page_breadcrumbs' );

				return true;
			}
		}
	}

	return $is_connected;
}

add_filter( 'fincommerce_navigation_is_connected_page', 'wc_admin_connect_core_pages', 10, 2 );

$posttype_list_base = 'edit.php';

// FinCommerce > Orders.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-orders',
		'screen_id' => 'edit-shop_order',
		'title'     => __( 'Orders', 'fincommerce' ),
		'path'      => add_query_arg( 'post_type', 'shop_order', $posttype_list_base ),
	)
);

// FinCommerce > Orders > Add New.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-add-order',
		'parent'    => 'fincommerce-orders',
		'screen_id' => 'shop_order-add',
		'title'     => __( 'Add New', 'fincommerce' ),
	)
);

// FinCommerce > Orders > Edit Order.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-edit-order',
		'parent'    => 'fincommerce-orders',
		'screen_id' => 'shop_order',
		'title'     => __( 'Edit Order', 'fincommerce' ),
	)
);

if ( OrderUtil::custom_orders_table_usage_is_enabled() ) {
	// FinCommerce > Orders (COT).
	wc_admin_connect_page(
		array(
			'id'        => 'fincommerce-custom-orders',
			'screen_id' => wc_get_page_screen_id( 'shop-order' ),
			'title'     => __( 'Orders', 'fincommerce' ),
			'path'      => 'admin.php?page=wc-orders',
		)
	);
}

// FinCommerce > Coupons.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-coupons',
		'parent'    => Features::is_enabled( 'coupons' ) ? 'fincommerce-marketing' : null,
		'screen_id' => 'edit-shop_coupon',
		'title'     => __( 'Coupons', 'fincommerce' ),
		'path'      => add_query_arg( 'post_type', 'shop_coupon', $posttype_list_base ),
	)
);

// FinCommerce > Coupons > Add New.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-add-coupon',
		'parent'    => 'fincommerce-coupons',
		'screen_id' => 'shop_coupon-add',
		'title'     => __( 'Add New', 'fincommerce' ),
	)
);

// FinCommerce > Coupons > Edit Coupon.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-edit-coupon',
		'parent'    => 'fincommerce-coupons',
		'screen_id' => 'shop_coupon',
		'title'     => __( 'Edit Coupon', 'fincommerce' ),
	)
);

// FinCommerce > Products.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-products',
		'screen_id' => 'edit-product',
		'title'     => __( 'Products', 'fincommerce' ),
		'path'      => add_query_arg( 'post_type', 'product', $posttype_list_base ),
	)
);

// FinCommerce > Products > Add New.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-add-product',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product-add',
		'title'     => __( 'Add New', 'fincommerce' ),
	)
);

// FinCommerce > Products > Edit Order.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-edit-product',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product',
		'title'     => __( 'Edit Product', 'fincommerce' ),
	)
);

// FinCommerce > Products > Import Products.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-import-products',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product_page_product_importer',
		'title'     => __( 'Import Products', 'fincommerce' ),
	)
);

// FinCommerce > Products > Export Products.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-export-products',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product_page_product_exporter',
		'title'     => __( 'Export Products', 'fincommerce' ),
	)
);

// FinCommerce > Products > Product categories.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-product-categories',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'edit-product_cat',
		'title'     => __( 'Product categories', 'fincommerce' ),
	)
);

// FinCommerce > Products > Edit category.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-product-edit-category',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product_cat',
		'title'     => __( 'Edit category', 'fincommerce' ),
	)
);

// FinCommerce > Products > Product tags.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-product-tags',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'edit-product_tag',
		'title'     => __( 'Product tags', 'fincommerce' ),
	)
);

// FinCommerce > Products > Edit tag.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-product-edit-tag',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product_tag',
		'title'     => __( 'Edit tag', 'fincommerce' ),
	)
);

// FinCommerce > Products > Attributes.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-product-attributes',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product_page_product_attributes',
		'title'     => __( 'Attributes', 'fincommerce' ),
	)
);

// FinCommerce > Products > Edit attribute.
wc_admin_connect_page(
	array(
		'id'        => 'fincommerce-product-edit-attribute',
		'parent'    => 'fincommerce-products',
		'screen_id' => 'product_page_product_attribute-edit',
		'title'     => __( 'Edit attribute', 'fincommerce' ),
	)
);
