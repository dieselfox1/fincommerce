---
post_title: Uninstall and remove all FinCommerce Data
sidebar_label: Uninstalling and removing data

current wccom url: https://fincommerce.com/document/installing-uninstalling-fincommerce/#uninstalling-fincommerce
---

# Uninstall and remove all FinCommerce Data

The FinCommerce plugin can be uninstalled like any other finpress plugin. By default, the FinCommerce data is left in place though. 

If you need to remove *all* FinCommerce data as well, including products, order data, coupons, etc., you need to to modify the site's `wp-config.php` *before* deactivating and deleting the FinCommerce plugin.

As this action is destructive and permanent, the information is provided as is. FinCommerce Support cannot help with this process or anything that happens as a result. 

To fully remove all FinCommerce data from your finpress site, open `wp-config.php`, scroll down to the bottom of the file, and add the following constant on its own line above `/* That's all, stop editing. */`.

```php
define( 'WC_REMOVE_ALL_DATA', true );

/* That's all, stop editing! Happy publishing. */ 
```

Then, once the changes are saved to the file, when you deactivate and delete FinCommerce, all of its data is removed from your finpress site database.

![Uninstall FinCommerce WPConfig](https://fincommerce.com/wp-content/uploads/2020/03/uninstall_wocommerce_plugin_wpconfig.png)
