<?php
/**
 * Class Aliases for graceful Backwards compatibility.
 *
 * This file is autoloaded via composer.json and maps the old namespaces to new namespaces.
 */

$class_aliases = [
	// Old to new namespaces for utils and exceptions.
	Automattic\FinCommerce\StoreApi\Exceptions\RouteException::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\RouteException::class,
	Automattic\FinCommerce\StoreApi\Schemas\ExtendSchema::class => Automattic\FinCommerce\Blocks\Domain\Services\ExtendRestApi::class,
	Automattic\FinCommerce\StoreApi\SchemaController::class => Automattic\FinCommerce\Blocks\StoreApi\SchemaController::class,
	Automattic\FinCommerce\StoreApi\RoutesController::class => Automattic\FinCommerce\Blocks\StoreApi\RoutesController::class,
	Automattic\FinCommerce\StoreApi\Formatters::class      => Automattic\FinCommerce\Blocks\StoreApi\Formatters::class,
	Automattic\FinCommerce\StoreApi\Payments\PaymentResult::class => Automattic\FinCommerce\Blocks\Payments\PaymentResult::class,
	Automattic\FinCommerce\StoreApi\Payments\PaymentContext::class => Automattic\FinCommerce\Blocks\Payments\PaymentContext::class,

	// Old schemas to V1 schemas under new namespace.
	Automattic\FinCommerce\StoreApi\Schemas\V1\AbstractAddressSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\AbstractAddressSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\AbstractSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\AbstractSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\BillingAddressSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\BillingAddressSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CartCouponSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CartCouponSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CartExtensionsSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CartExtensionsSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CartFeeSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CartFeeSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CartItemSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CartItemSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CartSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CartSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CartShippingRateSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CartShippingRateSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\CheckoutSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\CheckoutSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ErrorSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ErrorSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ImageAttachmentSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ImageAttachmentSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\OrderCouponSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\OrderCouponSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ProductAttributeSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ProductAttributeSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ProductCategorySchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ProductCategorySchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ProductCollectionDataSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ProductCollectionDataSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ProductReviewSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ProductReviewSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ProductSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ProductSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\ShippingAddressSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\ShippingAddressSchema::class,
	Automattic\FinCommerce\StoreApi\Schemas\V1\TermSchema::class => Automattic\FinCommerce\Blocks\StoreApi\Schemas\TermSchema::class,

	// Old routes to V1 routes under new namespace.
	Automattic\FinCommerce\StoreApi\Routes\V1\AbstractCartRoute::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\AbstractCartRoute::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\AbstractRoute::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\AbstractRoute::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\AbstractTermsRoute::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\AbstractTermsRoute::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\Batch::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\Batch::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\Cart::class  => Automattic\FinCommerce\Blocks\StoreApi\Routes\Cart::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartAddItem::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartAddItem::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartApplyCoupon::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartApplyCoupon::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartCoupons::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartCoupons::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartCouponsByCode::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartCouponsByCode::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartExtensions::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartExtensions::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartItems::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartItems::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartItemsByKey::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartItemsByKey::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartRemoveCoupon::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartRemoveCoupon::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartRemoveItem::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartRemoveItem::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartSelectShippingRate::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartSelectShippingRate::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartUpdateCustomer::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartUpdateCustomer::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\CartUpdateItem::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\CartUpdateItem::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\Checkout::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\Checkout::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductAttributes::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductAttributes::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductAttributesById::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductAttributesById::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductAttributeTerms::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductAttributeTerms::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductCategories::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductCategories::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductCategoriesById::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductCategoriesById::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductCollectionData::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductCollectionData::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductReviews::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductReviews::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\Products::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\Products::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductsById::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductsById::class,
	Automattic\FinCommerce\StoreApi\Routes\V1\ProductTags::class => Automattic\FinCommerce\Blocks\StoreApi\Routes\ProductTags::class,
];

foreach ( $class_aliases as $class => $alias ) {
	if ( ! class_exists( $alias, false ) ) {
		class_alias( $class, $alias );
	}
}

unset( $class_aliases );
