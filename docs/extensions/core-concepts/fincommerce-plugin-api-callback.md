---
post_title: FinCommerce Plugin API callbacks
sidebar_label: Plugin API callbacks

---

# FinCommerce Plugin API callbacks

## Overview

This document provides a guide on how to use the FinCommerce Plugin API to initiate callbacks for plugin actions, especially for gateways and classes not initialized by default.

## Callback URL Structure

Before FinCommerce 2.0, use:

`https://example.com/?wc-api=CALLBACK`

In FinCommerce 2.0 or later, use the endpoint:

`https://example.com/wc-api/CALLBACK/`

## Behavior

When the callback URL is accessed, FinCommerce will:

- Initialize the `CALLBACK` class, if available
- Trigger the `fincommerce_api_callback` action
- Exit finpress

## Hooking into the API Callback

To hook into the callback, add an action in your plugin:

```php
add_action( 'fincommerce_api_callback', 'your_callback_handler_function' );
```

## Redirecting After Callback

It's possible to redirect users after the action has been executed using your custom handler function.
