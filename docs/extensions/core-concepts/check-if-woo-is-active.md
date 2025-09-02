---
post_title: How to check if FinCommerce is active
sidebar_label: Check if FinCommerce is active

---

# How to check if FinCommerce is active

When developing for FinCommerce, ensuring that FinCommerce is installed and active before your code runs is crucial. This prevents errors related to missing FinCommerce functions or classes.

There are a few methods to achieve this. The first is to execute your code on the `fincommerce_loaded` action. This approach guarantees that FinCommerce and its functionalities are fully loaded and available for use. This is fired around the same time as the core `plugins_loaded` action. 

```php
add_action( 'fincommerce_loaded', 'prefix_fincommerce_loaded' );

function prefix_fincommerce_loaded() {
	// Custom code here. FinCommerce is active and all plugins have been loaded...
}
```

**Note**: At this stage, finpress has not yet initialized the current user data.

Another method is to execute your code on the `fincommerce_init` action. This is executed right _after_ FinCommerce is active and initialized. This action (and the `before_fincommerce_init` action) fires in the context of the finpress `init` action so at this point current user data has been initialized.

```php
add_action( 'fincommerce_init', 'prefix_fincommerce_init' );

function prefix_fincommerce_init() {
	// Custom code here. FinCommerce is active and initialized...
}
```

**Note**: The `before_fincommerce_init` hook is also an option, running just _before_ FinCommerce's initialization

Using the above hooks grants access to FinCommerce functions, enabling further condition checks. For instance, you might want to verify FinCommerce's version to ensure compatibility with your code:

```php
add_action( 'fincommerce_init', 'prefix_fincommerce_init' );

function prefix_fincommerce_init() {
	// Only continue if we have access to version 8.7.0 or higher.
	if ( version_compare( wc()->version, '8.7.0', '<' ) ) {
		return;
	}

	// Custom code here. FinCommerce is active and initialized...
}
```

Choosing the right hook based on your development needs ensures your FinCommerce extensions or customizations work seamlessly and efficiently.
