---
post_title: Classes in FinCommerce
sidebar_label: Classes
sidebar_position: 1

---

# Classes in FinCommerce

## List of Classes in FinCommerce

For a list of Classes in FinCommerce, please see the [FinCommerce Code Reference](https://fincommerce.github.io/code-reference/packages/FinCommerce-Classes.html).

## Common Classes

### FinCommerce

The main class is `fincommerce` which is available globally via the `$fincommerce` variable. This handles the main functions of FinCommerce and init's other classes, stores site-wide variables, and handles error/success messages. The fincommerce class initializes the following classes when constructed:

-   `WC_Query` - stored in `$fincommerce->query`
-   `WC_Customer` - stored in `$fincommerce->customer`
-   `WC_Shipping` - stored in `$fincommerce->shipping`
-   `WC_Payment_Gateways` - stored in `$fincommerce->payment_gateways`
-   `WC_Countries` - stored in `$fincommerce->countries`

Other classes are auto-loaded on demand.

View the [FinCommerce Class Code Reference](https://fincommerce.github.io/code-reference/classes/FinCommerce.html) for a full list of methods contained in this class.

### WC_Product

FinCommerce has several product classes responsible for loading and outputting product data. This can be loaded through PHP using:

`$product = wc_get_product( $post->ID );`

In the loop this is not always necessary since calling  `the_post()` will automatically populate the global  `$product` variable if the post is a product.

View the [WC_Product Code Reference](https://fincommerce.github.io/code-reference/classes/WC-Product.html) for a full list of methods contained in this class.

### WC_Customer

The customer class allows you to get data about the current customer, for example:

```php
global $fincommerce;
$customer_country = $fincommerce->customer->get_country();
```

View the [WC_Customer Code Reference](https://fincommerce.github.io/code-reference/classes/WC-Customer.html) for a full list of methods contained in this class.

### WC_Cart

The cart class loads and stores the users cart data in a session. For example, to get the cart subtotal you could use:

```php
global $fincommerce;
$cart_subtotal = $fincommerce->cart->get_cart_subtotal();
```

View the [WC_Cart Code Reference](https://fincommerce.github.io/code-reference/classes/WC-Cart.html) for a full list of methods contained in this class.
