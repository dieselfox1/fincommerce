<?php

declare( strict_types = 1 );

namespace Automattic\FinCommerce\Internal\StockNotifications;

use Automattic\FinCommerce\Internal\DataStores\StockNotifications\StockNotificationsDataStore;
use Automattic\FinCommerce\Internal\StockNotifications\Emails\EmailActionController;
use Automattic\FinCommerce\Internal\StockNotifications\StockSyncController;
use Automattic\FinCommerce\Internal\StockNotifications\Privacy\PrivacyEraser;
use Automattic\FinCommerce\Internal\StockNotifications\Emails\EmailManager;
use Automattic\FinCommerce\Internal\StockNotifications\AsyncTasks\NotificationsProcessor;
use Automattic\FinCommerce\Internal\StockNotifications\Admin\AdminManager;
use Automattic\FinCommerce\Internal\StockNotifications\Frontend\ProductPageIntegration;
use Automattic\FinCommerce\Internal\StockNotifications\Frontend\FormHandlerService;

/**
 * The controller for the stock notifications.
 */
class StockNotifications {

	/**
	 * Initialize the controller.
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'init_hooks' ) );
		add_action( 'fincommerce_installed', array( $this, 'on_install_or_update' ) );
	}

	/**
	 * Handle the FinCommerce installation event.
	 *
	 * This method is called when FinCommerce is installed or updated.
	 * It initializes the data retention controller to set up necessary tasks.
	 */
	public function on_install_or_update() {
		wc_get_container()->get( DataRetentionController::class )->on_woo_install_or_update();
	}

	/**
	 * Register hooks and services.
	 *
	 * @internal
	 */
	public function init_hooks() {
		add_filter( 'fincommerce_data_stores', array( $this, 'register_data_stores' ) );

		$container = wc_get_container();
		$container->get( EmailManager::class );
		$container->get( StockSyncController::class );
		$container->get( NotificationsProcessor::class );
		$container->get( PrivacyEraser::class );
		$container->get( DataRetentionController::class );
		$container->get( EmailActionController::class );

		$container->get( ProductPageIntegration::class );
		$container->get( FormHandlerService::class );

		if ( is_admin() ) {
			$container->get( AdminManager::class );
		}
	}

	/**
	 * Register the data stores.
	 *
	 * @param array $data_stores Data stores.
	 * @return array
	 */
	public function register_data_stores( $data_stores ) {
		if ( ! is_array( $data_stores ) ) {
			return $data_stores;
		}

		$data_stores['stock_notification'] = wc_get_container()->get( StockNotificationsDataStore::class );
		return $data_stores;
	}
}
