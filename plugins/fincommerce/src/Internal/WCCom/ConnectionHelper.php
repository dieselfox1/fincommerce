<?php
/**
 * Helpers for managing connection to FinCommerce.com.
 */

namespace Automattic\FinCommerce\Internal\WCCom;

defined( 'ABSPATH' ) || exit;

/**
 * Class WCConnectionHelper.
 *
 * Helpers for managing connection to FinCommerce.com.
 */
final class ConnectionHelper {
	/**
	 * Check if FinCommerce.com account is connected.
	 *
	 * @since 4.4.0
	 * @return bool Whether account is connected.
	 */
	public static function is_connected() {
		$helper_options    = get_option( 'fincommerce_helper_data', array() );
		if ( is_array( $helper_options ) && array_key_exists( 'auth', $helper_options ) && ! empty( $helper_options['auth'] ) ) {
			return true;
		}
		return false;
	}
}
