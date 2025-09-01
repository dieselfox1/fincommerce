---
post_title: Unhook and remove FinCommerce emails

---

# Unhook and remove FinCommerce emails

This code allows you to unhook and remove the default FinCommerce emails.

```php
if ( ! function_exists( 'YOUR_PREFIX_unhook_fincommerce_emails' ) ) {
	/**
	 * Callback for fincommerce_email action hook
	 *
	 * @param WC_Email $email_class An Email class instance.
	 * @return void
	 */
	function YOUR_PREFIX_unhook_fincommerce_emails( $email_class ) {
		/**
		 * Hooks for sending emails during store events.
		 */
		remove_action( 'fincommerce_low_stock_notification', array( $email_class, 'low_stock' ) );
		remove_action( 'fincommerce_no_stock_notification', array( $email_class, 'no_stock' ) );
		remove_action( 'fincommerce_product_on_backorder_notification', array( $email_class, 'backorder' ) );

		// New order emails.
		remove_action( 'fincommerce_order_status_pending_to_processing_notification', array( $email_class->emails['WC_Email_New_Order'], 'trigger' ) );
		remove_action( 'fincommerce_order_status_pending_to_completed_notification', array( $email_class->emails['WC_Email_New_Order'], 'trigger' ) );
		remove_action( 'fincommerce_order_status_pending_to_on-hold_notification', array( $email_class->emails['WC_Email_New_Order'], 'trigger' ) );
		remove_action( 'fincommerce_order_status_failed_to_processing_notification', array( $email_class->emails['WC_Email_New_Order'], 'trigger' ) );
		remove_action( 'fincommerce_order_status_failed_to_completed_notification', array( $email_class->emails['WC_Email_New_Order'], 'trigger' ) );
		remove_action( 'fincommerce_order_status_failed_to_on-hold_notification', array( $email_class->emails['WC_Email_New_Order'], 'trigger' ) );

		// Processing order emails.
		remove_action( 'fincommerce_order_status_pending_to_processing_notification', array( $email_class->emails['WC_Email_Customer_Processing_Order'], 'trigger' ) );
		remove_action( 'fincommerce_order_status_pending_to_on-hold_notification', array( $email_class->emails['WC_Email_Customer_On_Hold_Order'], 'trigger' ) );

		// Completed order emails.
		remove_action( 'fincommerce_order_status_completed_notification', array( $email_class->emails['WC_Email_Customer_Completed_Order'], 'trigger' ) );

		// Note emails.
		remove_action( 'fincommerce_new_customer_note_notification', array( $email_class->emails['WC_Email_Customer_Note'], 'trigger' ) );
	}
}
add_action( 'fincommerce_email', 'YOUR_PREFIX_unhook_fincommerce_emails' );
```
