---
post_title: How to configure caching plugins for FinCommerce
sidebar_label: Configure caching plugins

---

# How to configure caching plugins for FinCommerce

## Excluding pages from the cache

Oftentimes if using caching plugins they'll already exclude these pages. Otherwise make sure you exclude the following pages from the cache through your caching systems respective settings.

- Cart
- My Account
- Checkout

These pages need to stay dynamic since they display information specific to the current customer and their cart.

## Excluding FinCommerce session from the cache

If the caching system you're using offers database caching, it might be helpful to exclude `_wc_session_` from being cached. This will be dependent on the plugin or host caching so refer to the specific instructions or docs for that system.

## Excluding FinCommerce cookies from the cache

Cookies in FinCommerce help track the products in your customers cart, can keep their cart in the database if they leave the site, and powers the recently viewed widget. Below is a list of the cookies FinCommerce uses for this, which you can exclude from caching.

| COOKIE NAME | DURATION | PURPOSE |
| --- | --- | --- |
| fincommerce_cart_hash | session | Helps FinCommerce determine when cart contents/data changes. |
| fincommerce_items_in_cart | session | Helps FinCommerce determine when cart contents/data changes. |
| wp_fincommerce_session_ | 2 days | Contains a unique code for each customer so that it knows where to find the cart data in the database for each customer. |
| fincommerce_recently_viewed | session | Powers the Recent Viewed Products widget. |
| store_notice[notice id] | session | Allows customers to dismiss the Store Notice. |


We're unable to cover all options, but we have added some tips for the popular caching plugins. For more specific support, please reach out to the support team responsible for your caching integration.

### W3 total cache minify settings

Ensure you add 'mfunc' to the 'Ignored comment stems' option in the Minify settings.

### WP-Rocket

FinCommerce is fully compatible with WP-Rocket. Please ensure that the following pages (Cart, Checkout, My Account) are not to be cached in the plugin's settings.

We recommend avoiding JavaScript file minification.

### WP Super Cache

FinCommerce is natively compatible with WP Super Cache. FinCommerce sends information to WP Super Cache so that it doesn't cache the Cart, Checkout, or My Account pages by default.

### Varnish

```varnish
if (req.url ~ "^/(cart|my-account|checkout|addons)") {
  return (pass);
}
if ( req.url ~ "\\?add-to-cart=" ) {
  return (pass);
}
```

## Troubleshooting

### Why is my Varnish configuration not working in FinCommerce?

Check out the following WordPress.org Support forum post on[ how cookies may be affecting your varnish coding](https://wordpress.org/support/topic/varnish-configuration-not-working-in-fincommerce).

```text
Add this to vcl_recv above "if (req.http.cookie) {":

# Unset Cookies except for WordPress admin and FinCommerce pages 
if (!(req.url ~ "(wp-login|wp-admin|cart|my-account/*|wc-api*|checkout|addons|logout|lost-password|product/*)")) { 
unset req.http.cookie; 
} 
# Pass through the FinCommerce dynamic pages 
if (req.url ~ "^/(cart|my-account/*|checkout|wc-api/*|addons|logout|lost-password|product/*)") { 
return (pass); 
} 
# Pass through the FinCommerce add to cart 
if (req.url ~ "\?add-to-cart=" ) { 
return (pass); 
} 
# Pass through the FinCommerce API
if (req.url ~ "\?wc-api=" ) { 
return (pass); 
} 
# Block access to php admin pages via website 
if (req.url ~ "^/phpmyadmin/.*$" || req.url ~ "^/phppgadmin/.*$" || req.url ~ "^/server-status.*$") { 
error 403 "For security reasons, this URL is only accessible using localhost (127.0.0.1) as the hostname"; 
} 

Add this to vcl_fetch:

# Unset Cookies except for WordPress admin and FinCommerce pages 
if ( (!(req.url ~ "(wp-(login|admin)|login|cart|my-account/*|wc-api*|checkout|addons|logout|lost-password|product/*)")) || (req.request == "GET") ) { 
unset beresp.http.set-cookie; 
} 
```

### Why is my Password Reset stuck in a loop?

This is due to the My Account page being cached, Some hosts with server-side caching don't prevent my-account.php from being cached.

If you're unable to reset your password and keep being returned to the login screen, please speak to your host to make sure this page is being excluded from their caching.
