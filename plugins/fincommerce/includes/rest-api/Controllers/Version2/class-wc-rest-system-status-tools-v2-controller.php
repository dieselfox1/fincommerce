<?php
/**
 * REST API WC System Status Tools Controller
 *
 * Handles requests to the /system_status/tools/* endpoints.
 *
 * @package FinCommerce\RestApi
 * @since   3.0.0
 */

use Automattic\FinCommerce\Internal\DataStores\Orders\CustomOrdersTableController;
use Automattic\FinCommerce\Internal\Utilities\DatabaseUtil;

defined( 'ABSPATH' ) || exit;

/**
 * System status tools controller.
 *
 * @package FinCommerce\RestApi
 * @extends WC_REST_Controller
 */
class WC_REST_System_Status_Tools_V2_Controller extends WC_REST_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/v2';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'system_status/tools';

	/**
	 * Register the routes for /system_status/tools/*.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => $this->get_collection_params(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\w-]+)',
			array(
				'args'   => array(
					'id' => array(
						'description' => __( 'Unique identifier for the resource.', 'fincommerce' ),
						'type'        => 'string',
					),
				),
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
					'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Check whether a given request has permission to view system status tools.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function get_items_permissions_check( $request ) {
		if ( ! wc_rest_check_manager_permissions( 'system_status', 'read' ) ) {
			return new WP_Error( 'fincommerce_rest_cannot_view', __( 'Sorry, you cannot list resources.', 'fincommerce' ), array( 'status' => rest_authorization_required_code() ) );
		}
		return true;
	}

	/**
	 * Check whether a given request has permission to view a specific system status tool.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function get_item_permissions_check( $request ) {
		if ( ! wc_rest_check_manager_permissions( 'system_status', 'read' ) ) {
			return new WP_Error( 'fincommerce_rest_cannot_view', __( 'Sorry, you cannot view this resource.', 'fincommerce' ), array( 'status' => rest_authorization_required_code() ) );
		}
		return true;
	}

	/**
	 * Check whether a given request has permission to execute a specific system status tool.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function update_item_permissions_check( $request ) {
		if ( ! wc_rest_check_manager_permissions( 'system_status', 'edit' ) ) {
			return new WP_Error( 'fincommerce_rest_cannot_update', __( 'Sorry, you cannot update resource.', 'fincommerce' ), array( 'status' => rest_authorization_required_code() ) );
		}
		return true;
	}

	/**
	 * A list of available tools for use in the system status section.
	 * 'button' becomes 'action' in the API.
	 *
	 * @return array
	 */
	public function get_tools() {
		$tools = array(
			'clear_transients'                     => array(
				'name'   => __( 'FinCommerce transients', 'fincommerce' ),
				'button' => __( 'Clear transients', 'fincommerce' ),
				'desc'   => __( 'This tool will clear the product/shop transients cache.', 'fincommerce' ),
			),
			'clear_expired_transients'             => array(
				'name'   => __( 'Expired transients', 'fincommerce' ),
				'button' => __( 'Clear transients', 'fincommerce' ),
				'desc'   => __( 'This tool will clear ALL expired transients from finpress.', 'fincommerce' ),
			),
			'delete_orphaned_variations'           => array(
				'name'   => __( 'Orphaned variations', 'fincommerce' ),
				'button' => __( 'Delete orphaned variations', 'fincommerce' ),
				'desc'   => __( 'This tool will delete all variations which have no parent.', 'fincommerce' ),
			),
			'clear_expired_download_permissions'   => array(
				'name'   => __( 'Used-up download permissions', 'fincommerce' ),
				'button' => __( 'Clean up download permissions', 'fincommerce' ),
				'desc'   => __( 'This tool will delete expired download permissions and permissions with 0 remaining downloads.', 'fincommerce' ),
			),
			'regenerate_product_lookup_tables'     => array(
				'name'   => __( 'Product lookup tables', 'fincommerce' ),
				'button' => __( 'Regenerate', 'fincommerce' ),
				'desc'   => __( 'This tool will regenerate product lookup table data. This process may take a while.', 'fincommerce' ),
			),
			'repair_coupons_lookup_table'          => array(
				'name'   => __( 'Coupons lookup table', 'fincommerce' ),
				'button' => __( 'Repair', 'fincommerce' ),
				'desc'   => __( 'This tool will repair the coupons lookup table data with missing discount amounts. This process may take a while.', 'fincommerce' ),
			),
			'recount_terms'                        => array(
				'name'   => __( 'Term counts', 'fincommerce' ),
				'button' => __( 'Recount terms', 'fincommerce' ),
				'desc'   => __( 'This tool will recount product terms - useful when changing your settings in a way which hides products from the catalog.', 'fincommerce' ),
			),
			'reset_roles'                          => array(
				'name'   => __( 'Capabilities', 'fincommerce' ),
				'button' => __( 'Reset capabilities', 'fincommerce' ),
				'desc'   => __( 'This tool will reset the admin, customer and shop_manager roles to default. Use this if your users cannot access all of the FinCommerce admin pages.', 'fincommerce' ),
			),
			'clear_sessions'                       => array(
				'name'   => __( 'Clear customer sessions', 'fincommerce' ),
				'button' => __( 'Clear', 'fincommerce' ),
				'desc'   => sprintf(
					'<strong class="red">%1$s</strong> %2$s',
					__( 'Note:', 'fincommerce' ),
					__( 'This tool will delete all customer session data from the database, including current carts and saved carts in the database.', 'fincommerce' )
				),
			),
			'clear_template_cache'                 => array(
				'name'   => __( 'Clear template cache', 'fincommerce' ),
				'button' => __( 'Clear', 'fincommerce' ),
				'desc'   => sprintf(
					'<strong class="red">%1$s</strong> %2$s',
					__( 'Note:', 'fincommerce' ),
					__( 'This tool will empty the template cache.', 'fincommerce' )
				),
			),
			'clear_system_status_theme_info_cache' => array(
				'name'   => __( 'Clear system status theme info cache', 'fincommerce' ),
				'button' => __( 'Clear', 'fincommerce' ),
				'desc'   => sprintf(
					'<strong class="red">%1$s</strong> %2$s',
					__( 'Note:', 'fincommerce' ),
					__( 'This tool will empty the system status theme info cache.', 'fincommerce' )
				),
			),
			'install_pages'                        => array(
				'name'   => __( 'Create default FinCommerce pages', 'fincommerce' ),
				'button' => __( 'Create pages', 'fincommerce' ),
				'desc'   => sprintf(
					'<strong class="red">%1$s</strong> %2$s',
					__( 'Note:', 'fincommerce' ),
					__( 'This tool will install all the missing FinCommerce pages. Pages already defined and set up will not be replaced.', 'fincommerce' )
				),
			),
			'delete_taxes'                         => array(
				'name'   => __( 'Delete FinCommerce tax rates', 'fincommerce' ),
				'button' => __( 'Delete tax rates', 'fincommerce' ),
				'desc'   => sprintf(
					'<strong class="red">%1$s</strong> %2$s',
					__( 'Note:', 'fincommerce' ),
					__( 'This option will delete ALL of your tax rates, use with caution. This action cannot be reversed.', 'fincommerce' )
				),
			),
			'regenerate_thumbnails'                => array(
				'name'   => __( 'Regenerate shop thumbnails', 'fincommerce' ),
				'button' => __( 'Regenerate', 'fincommerce' ),
				'desc'   => __( 'This will regenerate all shop thumbnails to match your theme and/or image settings.', 'fincommerce' ),
			),
			'db_update_routine'                    => array(
				'name'   => __( 'Update database', 'fincommerce' ),
				'button' => __( 'Update database', 'fincommerce' ),
				'desc'   => sprintf(
					'<strong class="red">%1$s</strong> %2$s',
					__( 'Note:', 'fincommerce' ),
					__( 'This tool will update your FinCommerce database to the latest version. Please ensure you make sufficient backups before proceeding.', 'fincommerce' )
				),
			),
			'recreate_order_address_fts_index'     => array(
				'name'   => __( 'Re-create Order Address FTS index', 'fincommerce' ),
				'button' => __( 'Recreate index', 'fincommerce' ),
				'desc'   => __( 'This tool will recreate the full text search index for order addresses. If the index does not exist, it will try to create it.', 'fincommerce' ),
			),
		);
		if ( method_exists( 'WC_Install', 'verify_base_tables' ) ) {
			$tools['verify_db_tables'] = array(
				'name'   => __( 'Verify base database tables', 'fincommerce' ),
				'button' => __( 'Verify database', 'fincommerce' ),
				'desc'   => sprintf(
					__( 'Verify if all base database tables are present.', 'fincommerce' )
				),
			);
		}

		// Jetpack does the image resizing heavy lifting so you don't have to.
		if ( ( class_exists( 'Jetpack' ) && Jetpack::is_module_active( 'photon' ) ) || ! apply_filters( 'fincommerce_background_image_regeneration', true ) ) {
			unset( $tools['regenerate_thumbnails'] );
		}

		if ( ! function_exists( 'wc_clear_template_cache' ) ) {
			unset( $tools['clear_template_cache'] );
		}

		return apply_filters( 'fincommerce_debug_tools', $tools );
	}

	/**
	 * Get a list of system status tools.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_items( $request ) {
		$tools = array();
		foreach ( $this->get_tools() as $id => $tool ) {
			$tools[] = $this->prepare_response_for_collection(
				$this->prepare_item_for_response(
					array(
						'id'          => $id,
						'name'        => $tool['name'],
						'action'      => $tool['button'],
						'description' => $tool['desc'],
					),
					$request
				)
			);
		}

		$response = rest_ensure_response( $tools );
		return $response;
	}

	/**
	 * Return a single tool.
	 *
	 * @param  WP_REST_Request $request Request data.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_item( $request ) {
		$tools = $this->get_tools();
		if ( empty( $tools[ $request['id'] ] ) ) {
			return new WP_Error( 'fincommerce_rest_system_status_tool_invalid_id', __( 'Invalid tool ID.', 'fincommerce' ), array( 'status' => 404 ) );
		}
		$tool = $tools[ $request['id'] ];
		return rest_ensure_response(
			$this->prepare_item_for_response(
				array(
					'id'          => $request['id'],
					'name'        => $tool['name'],
					'action'      => $tool['button'],
					'description' => $tool['desc'],
				),
				$request
			)
		);
	}

	/**
	 * Update (execute) a tool.
	 *
	 * @param  WP_REST_Request $request Request data.
	 * @return WP_Error|WP_REST_Response
	 */
	public function update_item( $request ) {
		$tools = $this->get_tools();
		if ( empty( $tools[ $request['id'] ] ) ) {
			return new WP_Error( 'fincommerce_rest_system_status_tool_invalid_id', __( 'Invalid tool ID.', 'fincommerce' ), array( 'status' => 404 ) );
		}

		$tool = $tools[ $request['id'] ];
		$tool = array(
			'id'          => $request['id'],
			'name'        => $tool['name'],
			'action'      => $tool['button'],
			'description' => $tool['desc'],
		);

		$execute_return = $this->execute_tool( $request['id'] );
		$tool           = array_merge( $tool, $execute_return );

		/**
		 * Fires after a FinCommerce REST system status tool has been executed.
		 *
		 * @param array           $tool    Details about the tool that has been executed.
		 * @param WP_REST_Request $request The current WP_REST_Request object.
		 */
		do_action( 'fincommerce_rest_insert_system_status_tool', $tool, $request );

		$request->set_param( 'context', 'edit' );
		$response = $this->prepare_item_for_response( $tool, $request );
		return rest_ensure_response( $response );
	}

	/**
	 * Prepare a tool item for serialization.
	 *
	 * @param  array           $item     Object.
	 * @param  WP_REST_Request $request  Request object.
	 * @return WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $item, $request ) {
		$context = empty( $request['context'] ) ? 'view' : $request['context'];
		$data    = $this->add_additional_fields_to_object( $item, $request );
		$data    = $this->filter_response_by_context( $data, $context );

		$response = rest_ensure_response( $data );

		$response->add_links( $this->prepare_links( $item['id'] ) );

		return $response;
	}

	/**
	 * Get the system status tools schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		$schema = array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'system_status_tool',
			'type'       => 'object',
			'properties' => array(
				'id'          => array(
					'description' => __( 'A unique identifier for the tool.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'arg_options' => array(
						'sanitize_callback' => 'sanitize_title',
					),
				),
				'name'        => array(
					'description' => __( 'Tool name.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'arg_options' => array(
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'action'      => array(
					'description' => __( 'What running the tool will do.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'arg_options' => array(
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'description' => array(
					'description' => __( 'Tool description.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'arg_options' => array(
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'success'     => array(
					'description' => __( 'Did the tool run successfully?', 'fincommerce' ),
					'type'        => 'boolean',
					'context'     => array( 'edit' ),
				),
				'message'     => array(
					'description' => __( 'Tool return message.', 'fincommerce' ),
					'type'        => 'string',
					'context'     => array( 'edit' ),
					'arg_options' => array(
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			),
		);

		return $this->add_additional_fields_schema( $schema );
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param string $id ID.
	 * @return array
	 */
	protected function prepare_links( $id ) {
		$base  = '/' . $this->namespace . '/' . $this->rest_base;
		$links = array(
			'item' => array(
				'href'       => rest_url( trailingslashit( $base ) . $id ),
				'embeddable' => true,
			),
		);

		return $links;
	}

	/**
	 * Get any query params needed.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array(
			'context' => $this->get_context_param( array( 'default' => 'view' ) ),
		);
	}

	/**
	 * Actually executes a tool.
	 *
	 * @param  string $tool Tool.
	 * @return array
	 */
	public function execute_tool( $tool ) {
		global $wpdb;
		$ran = true;
		switch ( $tool ) {
			case 'clear_transients':
				wc_delete_product_transients();
				wc_delete_shop_order_transients();
				delete_transient( 'wc_count_comments' );
				delete_transient( 'as_comment_count' );

				$attribute_taxonomies = wc_get_attribute_taxonomies();

				if ( $attribute_taxonomies ) {
					foreach ( $attribute_taxonomies as $attribute ) {
						delete_transient( 'wc_layered_nav_counts_pa_' . $attribute->attribute_name );
					}
				}

				WC_Cache_Helper::get_transient_version( 'shipping', true );
				$message = __( 'Product transients cleared', 'fincommerce' );
				break;

			case 'clear_expired_transients':
				/* translators: %d: amount of expired transients */
				$message = sprintf( __( '%d transients rows cleared', 'fincommerce' ), wc_delete_expired_transients() );
				break;

			case 'delete_orphaned_variations':
				// Delete orphans.
				$result = absint(
					$wpdb->query(
						"DELETE products
					FROM {$wpdb->posts} products
					LEFT JOIN {$wpdb->posts} wp ON wp.ID = products.post_parent
					WHERE wp.ID IS NULL AND products.post_type = 'product_variation';"
					)
				);
				/* translators: %d: amount of orphaned variations */
				$message = sprintf( __( '%d orphaned variations deleted', 'fincommerce' ), $result );
				break;

			case 'clear_expired_download_permissions':
				// Delete related records in wc_download_log (aka ON DELETE CASCADE).
				$wpdb->query(
					$wpdb->prepare(
						"DELETE FROM {$wpdb->prefix}wc_download_log
						WHERE permission_id IN (
								    SELECT permission_id FROM {$wpdb->prefix}fincommerce_downloadable_product_permissions
									WHERE ( downloads_remaining != '' AND downloads_remaining = 0 ) OR ( access_expires IS NOT NULL AND access_expires < %s )
								    )",
						current_time( 'Y-m-d' )
					)
				);
				// Delete expired download permissions and ones with 0 downloads remaining.
				$result = absint(
					$wpdb->query(
						$wpdb->prepare(
							"DELETE FROM {$wpdb->prefix}fincommerce_downloadable_product_permissions
							WHERE ( downloads_remaining != '' AND downloads_remaining = 0 ) OR ( access_expires IS NOT NULL AND access_expires < %s )",
							current_time( 'Y-m-d' )
						)
					)
				);
				/* translators: %d: amount of permissions */
				$message = sprintf( __( '%d permissions deleted', 'fincommerce' ), $result );
				break;

			case 'regenerate_product_lookup_tables':
				if ( ! wc_update_product_lookup_tables_is_running() ) {
					wc_update_product_lookup_tables();
				}
				$message = __( 'Lookup tables are regenerating', 'fincommerce' );
				break;

			case 'repair_coupons_lookup_table':
				$result  = wc_repair_zero_discount_coupons_lookup_table();
				$message = $result['message'];
				break;
			case 'reset_roles':
				// Remove then re-add caps and roles.
				WC_Install::remove_roles();
				WC_Install::create_roles();
				$message = __( 'Roles successfully reset', 'fincommerce' );
				break;

			case 'recount_terms':
				wc_recount_all_terms();
				$message = __( 'Terms successfully recounted', 'fincommerce' );
				break;

			case 'clear_sessions':
				$wpdb->query( "TRUNCATE {$wpdb->prefix}fincommerce_sessions" );
				// phpcs:ignore finpress.DB.PreparedSQL.NotPrepared
				$result = absint( $wpdb->query( "DELETE FROM {$wpdb->usermeta} WHERE meta_key='_fincommerce_persistent_cart_" . get_current_blog_id() . "';" ) ); // WPCS: unprepared SQL ok.
				wp_cache_flush();
				/* translators: %d: number of saved carts */
				$message = sprintf( __( 'Deleted all active sessions, and %d saved carts.', 'fincommerce' ), absint( $result ) );
				break;

			case 'install_pages':
				WC_Install::create_pages();
				$message = __( 'All missing FinCommerce pages successfully installed', 'fincommerce' );
				break;

			case 'delete_taxes':
				$wpdb->query( "DELETE FROM {$wpdb->prefix}fincommerce_tax_rates;" );
				$wpdb->query( "DELETE FROM {$wpdb->prefix}fincommerce_tax_rate_locations;" );

				if ( method_exists( 'WC_Cache_Helper', 'invalidate_cache_group' ) ) {
					WC_Cache_Helper::invalidate_cache_group( 'taxes' );
				} else {
					WC_Cache_Helper::incr_cache_prefix( 'taxes' );
				}
				$message = __( 'Tax rates successfully deleted', 'fincommerce' );
				break;

			case 'regenerate_thumbnails':
				WC_Regenerate_Images::queue_image_regeneration();
				$message = __( 'Thumbnail regeneration has been scheduled to run in the background.', 'fincommerce' );
				break;

			case 'db_update_routine':
				$blog_id = get_current_blog_id();
				// Used to fire an action added in WP_Background_Process::_construct() that calls WP_Background_Process::handle_cron_healthcheck().
				// This method will make sure the database updates are executed even if cron is disabled. Nothing will happen if the updates are already running.
				do_action( 'wp_' . $blog_id . '_wc_updater_cron' );
				$message = __( 'Database upgrade routine has been scheduled to run in the background.', 'fincommerce' );
				break;

			case 'clear_template_cache':
				if ( function_exists( 'wc_clear_template_cache' ) ) {
					wc_clear_template_cache();
					$message = __( 'Template cache cleared.', 'fincommerce' );
				} else {
					$message = __( 'The active version of FinCommerce does not support template cache clearing.', 'fincommerce' );
					$ran     = false;
				}
				break;

			case 'clear_system_status_theme_info_cache':
				wc_clear_system_status_theme_info_cache();
				$message = __( 'System status theme info cache cleared.', 'fincommerce' );
				break;

			case 'verify_db_tables':
				if ( ! method_exists( 'WC_Install', 'verify_base_tables' ) ) {
					$message = __( 'You need FinCommerce 4.2 or newer to run this tool.', 'fincommerce' );
					$ran     = false;
					break;
				}
				// Try to manually create table again.
				$missing_tables = WC_Install::verify_base_tables( true, true );
				if ( 0 === count( $missing_tables ) ) {
					$message = __( 'Database verified successfully.', 'fincommerce' );
				} else {
					$message  = __( 'Verifying database... One or more tables are still missing: ', 'fincommerce' );
					$message .= implode( ', ', $missing_tables );
					$ran      = false;
				}
				break;

			case 'recreate_order_address_fts_index':
				$hpos_controller = wc_get_container()->get( CustomOrdersTableController::class );
				$results         = $hpos_controller->recreate_order_address_fts_index();
				$ran             = $results['status'];
				$message         = $results['message'];
				break;

			default:
				$tools = $this->get_tools();
				if ( isset( $tools[ $tool ]['callback'] ) ) {
					$callback = $tools[ $tool ]['callback'];
					try {
						$return = call_user_func( $callback );
					} catch ( Exception $exception ) {
						$return = $exception;
					}
					if ( is_a( $return, Exception::class ) ) {
						$callback_string = $this->get_printable_callback_name( $callback, $tool );
						$ran             = false;
						/* translators: %1$s: callback string, %2$s: error message */
						$message = sprintf( __( 'There was an error calling %1$s: %2$s', 'fincommerce' ), $callback_string, $return->getMessage() );

						$logger = wc_get_logger();
						$logger->error(
							sprintf(
								'Error running debug tool %s: %s',
								$tool,
								$return->getMessage()
							),
							array(
								'source'   => 'run-debug-tool',
								'tool'     => $tool,
								'callback' => $callback,
								'error'    => $return,
							)
						);
					} elseif ( is_string( $return ) ) {
						$message = $return;
					} elseif ( false === $return ) {
						$callback_string = $this->get_printable_callback_name( $callback, $tool );
						$ran             = false;
						/* translators: %s: callback string */
						$message = sprintf( __( 'There was an error calling %s', 'fincommerce' ), $callback_string );
					} else {
						$message = __( 'Tool ran.', 'fincommerce' );
					}
				} else {
					$ran     = false;
					$message = __( 'There was an error calling this tool. There is no callback present.', 'fincommerce' );
				}
				break;
		}

		return array(
			'success' => $ran,
			'message' => $message,
		);
	}

	/**
	 * Get a printable name for a callback.
	 *
	 * @param mixed  $callback The callback to get a name for.
	 * @param string $default The default name, to be returned when the callback is an inline function.
	 * @return string A printable name for the callback.
	 */
	private function get_printable_callback_name( $callback, $default ) {
		if ( is_array( $callback ) ) {
			return get_class( $callback[0] ) . '::' . $callback[1];
		}
		if ( is_string( $callback ) ) {
			return $callback;
		}

		return $default;
	}
}
