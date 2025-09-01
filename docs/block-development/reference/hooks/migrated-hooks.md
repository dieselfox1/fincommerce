---
sidebar_label:  Migrated legacy hooks
---

# Migrated legacy hooks

Below are the hooks that exist in FinCommerce core and that were brought over to FinCommerce Blocks.

Please note that the actions and filters here run on the server side. The client-side blocks won't necessarily change based on a callback added to a server side hook. [Please see our documentation relating to APIs for manipulating the blocks on the client-side](./README.md).

## Legacy Filters

- [loop_shop_per_page](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#loop_shop_per_page)
- [wc_session_expiration](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#wc_session_expiration)
- [fincommerce_add_cart_item](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_add_cart_item)
- [fincommerce_add_cart_item_data](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_add_cart_item_data)
- [fincommerce_add_to_cart_quantity](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_add_to_cart_quantity)
- [fincommerce_add_to_cart_sold_individually_quantity](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_add_to_cart_sold_individually_quantity)
- [fincommerce_add_to_cart_validation](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_add_to_cart_validation)
- [fincommerce_adjust_non_base_location_prices](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_adjust_non_base_location_prices)
- [fincommerce_apply_base_tax_for_local_pickup](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_apply_base_tax_for_local_pickup)
- [fincommerce_apply_individual_use_coupon](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_apply_individual_use_coupon)
- [fincommerce_apply_with_individual_use_coupon](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_apply_with_individual_use_coupon)
- [fincommerce_cart_contents_changed](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_cart_contents_changed)
- [fincommerce_cart_item_permalink](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_cart_item_permalink)
- [fincommerce_get_item_data](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_get_item_data)
- [fincommerce_loop_add_to_cart_args](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_loop_add_to_cart_args)
- [fincommerce_loop_add_to_cart_link](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_loop_add_to_cart_link)
- [fincommerce_new_customer_data](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_new_customer_data)
- [fincommerce_pay_order_product_has_enough_stock](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_pay_order_product_has_enough_stock)
- [fincommerce_pay_order_product_in_stock](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_pay_order_product_in_stock)
- [fincommerce_registration_errors](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_registration_errors)
- [fincommerce_shipping_package_name](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_shipping_package_name)
- [fincommerce_show_page_title](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_show_page_title)
- [fincommerce_single_product_image_thumbnail_html](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/filters.md#fincommerce_single_product_image_thumbnail_html)

## Legacy Actions

- [fincommerce_add_to_cart](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_add_to_cart)
- [fincommerce_after_main_content](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_after_main_content)
- [fincommerce_after_shop_loop](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_after_shop_loop)
- [fincommerce_applied_coupon](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_applied_coupon)
- [fincommerce_archive_description](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_archive_description)
- [fincommerce_before_main_content](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_before_main_content)
- [fincommerce_before_shop_loop](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_before_shop_loop)
- [fincommerce_check_cart_items](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_check_cart_items)
- [fincommerce_created_customer](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_created_customer)
- [fincommerce_no_products_found](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_no_products_found)
- [fincommerce_register_post](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_register_post)
- [fincommerce_shop_loop](https://github.com/dieselfox1/fincommerce/blob/trunk/plugins/fincommerce/client/blocks/docs/third-party-developers/extensibility/hooks/actions.md#fincommerce_shop_loop)
