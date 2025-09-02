<?php
/**
 * Adds options to the customizer for FinCommerce.
 *
 * @version 3.3.0
 * @package FinCommerce
 */

defined( 'ABSPATH' ) || exit;

/**
 * WC_Shop_Customizer class.
 */
class WC_Shop_Customizer {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'customize_register', array( $this, 'add_sections' ) );
		add_action( 'customize_controls_print_styles', array( $this, 'add_styles' ) );
		add_action( 'customize_controls_print_scripts', array( $this, 'add_scripts' ), 30 );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'add_frontend_scripts' ) );
	}

	/**
	 * Add settings to the customizer.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function add_sections( $wp_customize ) {
		$wp_customize->add_panel(
			'fincommerce',
			array(
				'priority'       => 200,
				'capability'     => 'manage_fincommerce',
				'theme_supports' => '',
				'title'          => __( 'FinCommerce', 'fincommerce' ),
			)
		);

		$this->add_store_notice_section( $wp_customize );
		$this->add_product_catalog_section( $wp_customize );
		$this->add_product_images_section( $wp_customize );
		$this->add_checkout_section( $wp_customize );
	}

	/**
	 * Frontend CSS styles.
	 */
	public function add_frontend_scripts() {
		if ( ! is_customize_preview() || ! is_store_notice_showing() ) {
			return;
		}

		$css = '.fincommerce-store-notice, p.demo_store { display: block !important; }';
		wp_add_inline_style( 'customize-preview', $css );
	}

	/**
	 * CSS styles to disable the Checkout section, when the default checkout page contains the
	 * Checkout block, and to enhance form visuals.
	 */
	public function add_styles() {
		if ( $this->has_block_checkout() ) {
			?>
			<style type="text/css">
				li#accordion-section-fincommerce_checkout {
					pointer-events: none;
				}

				li#accordion-section-fincommerce_checkout .accordion-section-title {
					background: #f1f1f1;
				}

				ul#sub-accordion-panel-fincommerce .notice {
					border-color: #007cba;
					border-bottom: 0;
					border-right: 0;
					border-top: 0;
					margin-top: 0;
					padding-bottom: 10px;
					padding-top: 10px;
				}
			</style>
			<?php
		}

		?>
		<style type="text/css">
			.fincommerce-cropping-control {
				margin: 0 40px 1em 0;
				padding: 0;
				display:inline-block;
				vertical-align: top;
			}

			.fincommerce-cropping-control input[type=radio] {
				margin-top: 1px;
			}

			.fincommerce-cropping-control span.fincommerce-cropping-control-aspect-ratio {
				margin-top: .5em;
				display:block;
			}

			.fincommerce-cropping-control span.fincommerce-cropping-control-aspect-ratio input {
				width: auto;
				display: inline-block;
			}
		</style>
		<?php
	}

	/**
	 * Scripts to improve our form.
	 */
	public function add_scripts() {
		$min_rows    = wc_get_theme_support( 'product_grid::min_rows', 1 );
		$max_rows    = wc_get_theme_support( 'product_grid::max_rows', '' );
		$min_columns = wc_get_theme_support( 'product_grid::min_columns', 1 );
		$max_columns = wc_get_theme_support( 'product_grid::max_columns', '' );

		/* translators: %d: Setting value */
		$min_notice = __( 'The minimum allowed setting is %d', 'fincommerce' );
		/* translators: %d: Setting value */
		$max_notice = __( 'The maximum allowed setting is %d', 'fincommerce' );
		?>
		<script type="text/javascript">
			jQuery( function( $ ) {
				$( document.body ).on( 'change', '.fincommerce-cropping-control input[type="radio"]', function() {
					var $wrapper = $( this ).closest( '.fincommerce-cropping-control' ),
						value    = $wrapper.find( 'input:checked' ).val();

					if ( 'custom' === value ) {
						$wrapper.find( '.fincommerce-cropping-control-aspect-ratio' ).slideDown( 200 );
					} else {
						$wrapper.find( '.fincommerce-cropping-control-aspect-ratio' ).hide();
					}

					return false;
				} );

				wp.customize.bind( 'ready', function() { // Ready?
					$( '.fincommerce-cropping-control' ).find( 'input:checked' ).trigger( 'change' );
				} );

				wp.customize( 'fincommerce_demo_store', function( setting ) {
					setting.bind( function( value ) {
						var notice = wp.customize( 'fincommerce_demo_store_notice' );

						if ( value && ! notice.callbacks.has( notice.preview ) ) {
							notice.bind( notice.preview );
						} else if ( ! value ) {
							notice.unbind( notice.preview );
						}
					} );
				} );

				wp.customize( 'fincommerce_demo_store_notice', function( setting ) {
					setting.bind( function( value ) {
						var checkbox = wp.customize( 'fincommerce_demo_store' );

						if ( checkbox.get() ) {
							$( '.fincommerce-store-notice' ).text( value );
						}
					} );
				} );

				wp.customize.section( 'fincommerce_store_notice', function( section ) {
					section.expanded.bind( function( isExpanded ) {
						if ( isExpanded ) {
							var notice   = wp.customize( 'fincommerce_demo_store_notice' ),
								checkbox = wp.customize( 'fincommerce_demo_store' );

							if ( checkbox.get() && ! notice.callbacks.has( notice.preview ) ) {
								notice.bind( notice.preview );
							} else if ( ! checkbox.get() ) {
								notice.unbind( notice.preview );
							}
						}
					} );
				} );

				wp.customize.section( 'fincommerce_product_catalog', function( section ) {
					section.expanded.bind( function( isExpanded ) {
						if ( isExpanded ) {
							wp.customize.previewer.previewUrl.set( '<?php echo esc_js( wc_get_page_permalink( 'shop' ) ); ?>' );
						}
					} );
				} );

				wp.customize.section( 'fincommerce_product_images', function( section ) {
					section.expanded.bind( function( isExpanded ) {
						if ( isExpanded ) {
							wp.customize.previewer.previewUrl.set( '<?php echo esc_js( wc_get_page_permalink( 'shop' ) ); ?>' );
						}
					} );
				} );

				wp.customize.section( 'fincommerce_checkout', function( section ) {
					section.expanded.bind( function( isExpanded ) {
						if ( isExpanded ) {
							wp.customize.previewer.previewUrl.set( '<?php echo esc_js( wc_get_page_permalink( 'checkout' ) ); ?>' );
						}
					} );
				} );

				wp.customize( 'fincommerce_catalog_columns', function( setting ) {
					setting.bind( function( value ) {
						var min = parseInt( '<?php echo esc_js( $min_columns ); ?>', 10 );
						var max = parseInt( '<?php echo esc_js( $max_columns ); ?>', 10 );

						value = parseInt( value, 10 );

						if ( max && value > max ) {
							setting.notifications.add( 'max_columns_error', new wp.customize.Notification(
								'max_columns_error',
								{
									type   : 'error',
									message: '<?php echo esc_js( sprintf( $max_notice, $max_columns ) ); ?>'
								}
							) );
						} else {
							setting.notifications.remove( 'max_columns_error' );
						}

						if ( min && value < min ) {
							setting.notifications.add( 'min_columns_error', new wp.customize.Notification(
								'min_columns_error',
								{
									type   : 'error',
									message: '<?php echo esc_js( sprintf( $min_notice, $min_columns ) ); ?>'
								}
							) );
						} else {
							setting.notifications.remove( 'min_columns_error' );
						}
					} );
				} );

				wp.customize( 'fincommerce_catalog_rows', function( setting ) {
					setting.bind( function( value ) {
						var min = parseInt( '<?php echo esc_js( $min_rows ); ?>', 10 );
						var max = parseInt( '<?php echo esc_js( $max_rows ); ?>', 10 );

						value = parseInt( value, 10 );

						if ( max && value > max ) {
							setting.notifications.add( 'max_rows_error', new wp.customize.Notification(
								'max_rows_error',
								{
									type   : 'error',
									message: '<?php echo esc_js( sprintf( $max_notice, $max_rows ) ); ?>'
								}
							) );
						} else {
							setting.notifications.remove( 'max_rows_error' );
						}

						if ( min && value < min ) {
							setting.notifications.add( 'min_rows_error', new wp.customize.Notification(
								'min_rows_error',
								{
									type   : 'error',
									message: '<?php echo esc_js( sprintf( $min_notice, $min_rows ) ); ?>'
								}
							) );
						} else {
							setting.notifications.remove( 'min_rows_error' );
						}
					} );
				} );
			} );
		</script>
		<?php

		if ( $this->has_block_checkout() ) {
			$message = sprintf(
				/* translators: %s: Link to the editor page with the Checkout block. */
				__( 'Checkout can be customized <a href="%s">in the Editor</a> with your active theme.', 'fincommerce' ),
				admin_url( 'post.php?post=' . get_option( 'fincommerce_checkout_page_id' ) . '&action=edit' )
			);
			?>
			<script type="text/javascript">
				jQuery( document ).ready( function( $ ) {
					const message = <?php echo wp_json_encode( $message ); ?>;
					$( "#sub-accordion-panel-fincommerce" ).append( "<li class='notice notice-info'>" + message + "</li>" );
				} );
			</script>
			<?php
		}
	}

	/**
	 * Enqueue scripts for the customizer.
	 */
	public function enqueue_scripts() {
		$handle = 'custom-notice';
		wp_register_script( $handle, false, array( 'customize-controls' ), WC_VERSION, false );
		wp_enqueue_script( $handle );
	}

	/**
	 * Sanitize the shop page & category display setting.
	 *
	 * @param string $value '', 'subcategories', or 'both'.
	 * @return string
	 */
	public function sanitize_archive_display( $value ) {
		$options = array( '', 'subcategories', 'both' );

		return in_array( $value, $options, true ) ? $value : '';
	}

	/**
	 * Sanitize the catalog orderby setting.
	 *
	 * @param string $value An array key from the below array.
	 * @return string
	 */
	public function sanitize_default_catalog_orderby( $value ) {
		/* phpcs:disable FinCommerce.Commenting.CommentHooks.MissingHookComment */
		$options = apply_filters(
			'fincommerce_default_catalog_orderby_options',
			array(
				'menu_order' => __( 'Default sorting (custom ordering + name)', 'fincommerce' ),
				'popularity' => __( 'Popularity (sales)', 'fincommerce' ),
				'rating'     => __( 'Average rating', 'fincommerce' ),
				'date'       => __( 'Sort by most recent', 'fincommerce' ),
				'price'      => __( 'Sort by price (asc)', 'fincommerce' ),
				'price-desc' => __( 'Sort by price (desc)', 'fincommerce' ),
			)
		);

		return array_key_exists( $value, $options ) ? $value : 'menu_order';
	}

	/**
	 * Store notice section.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	private function add_store_notice_section( $wp_customize ) {
		$wp_customize->add_section(
			'fincommerce_store_notice',
			array(
				'title'    => __( 'Store Notice', 'fincommerce' ),
				'priority' => 10,
				'panel'    => 'fincommerce',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_demo_store',
			array(
				'default'              => 'no',
				'type'                 => 'option',
				'capability'           => 'manage_fincommerce',
				'sanitize_callback'    => 'wc_bool_to_string',
				'sanitize_js_callback' => 'wc_string_to_bool',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_demo_store_notice',
			array(
				'default'           => __( 'This is a demo store for testing purposes &mdash; no orders shall be fulfilled.', 'fincommerce' ),
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => 'wp_kses_post',
				'transport'         => 'postMessage',
			)
		);

		$wp_customize->add_control(
			'fincommerce_demo_store_notice',
			array(
				'label'       => __( 'Store notice', 'fincommerce' ),
				'description' => __( 'If enabled, this text will be shown site-wide. You can use it to show events or promotions to visitors!', 'fincommerce' ),
				'section'     => 'fincommerce_store_notice',
				'settings'    => 'fincommerce_demo_store_notice',
				'type'        => 'textarea',
			)
		);

		$wp_customize->add_control(
			'fincommerce_demo_store',
			array(
				'label'    => __( 'Enable store notice', 'fincommerce' ),
				'section'  => 'fincommerce_store_notice',
				'settings' => 'fincommerce_demo_store',
				'type'     => 'checkbox',
			)
		);

		if ( isset( $wp_customize->selective_refresh ) ) {
			$wp_customize->selective_refresh->add_partial(
				'fincommerce_demo_store_notice',
				array(
					'selector'            => '.fincommerce-store-notice',
					'container_inclusive' => true,
					'render_callback'     => 'fincommerce_demo_store',
				)
			);
		}
	}

	/**
	 * Product catalog section.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function add_product_catalog_section( $wp_customize ) {
		$wp_customize->add_section(
			'fincommerce_product_catalog',
			array(
				'title'    => __( 'Product Catalog', 'fincommerce' ),
				'priority' => 10,
				'panel'    => 'fincommerce',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_shop_page_display',
			array(
				'default'           => '',
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => array( $this, 'sanitize_archive_display' ),
			)
		);

		$wp_customize->add_control(
			'fincommerce_shop_page_display',
			array(
				'label'       => __( 'Shop page display', 'fincommerce' ),
				'description' => __( 'Choose what to display on the main shop page.', 'fincommerce' ),
				'section'     => 'fincommerce_product_catalog',
				'settings'    => 'fincommerce_shop_page_display',
				'type'        => 'select',
				'choices'     => array(
					''              => __( 'Show products', 'fincommerce' ),
					'subcategories' => __( 'Show categories', 'fincommerce' ),
					'both'          => __( 'Show categories &amp; products', 'fincommerce' ),
				),
			)
		);

		$wp_customize->add_setting(
			'fincommerce_category_archive_display',
			array(
				'default'           => '',
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => array( $this, 'sanitize_archive_display' ),
			)
		);

		$wp_customize->add_control(
			'fincommerce_category_archive_display',
			array(
				'label'       => __( 'Category display', 'fincommerce' ),
				'description' => __( 'Choose what to display on product category pages.', 'fincommerce' ),
				'section'     => 'fincommerce_product_catalog',
				'settings'    => 'fincommerce_category_archive_display',
				'type'        => 'select',
				'choices'     => array(
					''              => __( 'Show products', 'fincommerce' ),
					'subcategories' => __( 'Show subcategories', 'fincommerce' ),
					'both'          => __( 'Show subcategories &amp; products', 'fincommerce' ),
				),
			)
		);

		$wp_customize->add_setting(
			'fincommerce_default_catalog_orderby',
			array(
				'default'           => 'menu_order',
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => array( $this, 'sanitize_default_catalog_orderby' ),
			)
		);

		/* phpcs:disable FinCommerce.Commenting.CommentHooks.MissingHookComment */
		$wp_customize->add_control(
			'fincommerce_default_catalog_orderby',
			array(
				'label'       => __( 'Default product sorting', 'fincommerce' ),
				'description' => __( 'How should products be sorted in the catalog by default?', 'fincommerce' ),
				'section'     => 'fincommerce_product_catalog',
				'settings'    => 'fincommerce_default_catalog_orderby',
				'type'        => 'select',
				'choices'     => apply_filters(
					'fincommerce_default_catalog_orderby_options',
					array(
						'menu_order' => __( 'Default sorting (custom ordering + name)', 'fincommerce' ),
						'popularity' => __( 'Popularity (sales)', 'fincommerce' ),
						'rating'     => __( 'Average rating', 'fincommerce' ),
						'date'       => __( 'Sort by most recent', 'fincommerce' ),
						'price'      => __( 'Sort by price (asc)', 'fincommerce' ),
						'price-desc' => __( 'Sort by price (desc)', 'fincommerce' ),
					)
				),
			)
		);

		// The following settings should be hidden if the theme is declaring the values.
		if ( has_filter( 'loop_shop_columns' ) ) {
			return;
		}

		$wp_customize->add_setting(
			'fincommerce_catalog_columns',
			array(
				'default'              => 4,
				'type'                 => 'option',
				'capability'           => 'manage_fincommerce',
				'sanitize_callback'    => 'absint',
				'sanitize_js_callback' => 'absint',
			)
		);

		$wp_customize->add_control(
			'fincommerce_catalog_columns',
			array(
				'label'       => __( 'Products per row', 'fincommerce' ),
				'description' => __( 'How many products should be shown per row?', 'fincommerce' ),
				'section'     => 'fincommerce_product_catalog',
				'settings'    => 'fincommerce_catalog_columns',
				'type'        => 'number',
				'input_attrs' => array(
					'min'  => wc_get_theme_support( 'product_grid::min_columns', 1 ),
					'max'  => wc_get_theme_support( 'product_grid::max_columns', '' ),
					'step' => 1,
				),
			)
		);

		// Only add this setting if something else isn't managing the number of products per page.
		if ( ! has_filter( 'loop_shop_per_page' ) ) {
			$wp_customize->add_setting(
				'fincommerce_catalog_rows',
				array(
					'default'              => 4,
					'type'                 => 'option',
					'capability'           => 'manage_fincommerce',
					'sanitize_callback'    => 'absint',
					'sanitize_js_callback' => 'absint',
				)
			);
		}

		$wp_customize->add_control(
			'fincommerce_catalog_rows',
			array(
				'label'       => __( 'Rows per page', 'fincommerce' ),
				'description' => __( 'How many rows of products should be shown per page?', 'fincommerce' ),
				'section'     => 'fincommerce_product_catalog',
				'settings'    => 'fincommerce_catalog_rows',
				'type'        => 'number',
				'input_attrs' => array(
					'min'  => wc_get_theme_support( 'product_grid::min_rows', 1 ),
					'max'  => wc_get_theme_support( 'product_grid::max_rows', '' ),
					'step' => 1,
				),
			)
		);
	}

	/**
	 * Product images section.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	private function add_product_images_section( $wp_customize ) {
		if ( class_exists( 'Jetpack' ) && Jetpack::is_module_active( 'photon' ) ) {
			$regen_description = ''; // Nothing to report; Jetpack will handle magically.
		/* phpcs:disable FinCommerce.Commenting.CommentHooks.MissingHookComment */
		} elseif ( apply_filters( 'fincommerce_background_image_regeneration', true ) && ! is_multisite() ) {
			$regen_description = __( 'After publishing your changes, new image sizes will be generated automatically.', 'fincommerce' );
		/* phpcs:disable FinCommerce.Commenting.CommentHooks.MissingHookComment */
		} elseif ( apply_filters( 'fincommerce_background_image_regeneration', true ) && is_multisite() ) {
			/* translators: 1: tools URL 2: regen thumbs url */
			$regen_description = sprintf( __( 'After publishing your changes, new image sizes may not be shown until you regenerate thumbnails. You can do this from the <a href="%1$s" target="_blank">tools section in FinCommerce</a> or by using a plugin such as <a href="%2$s" target="_blank">Regenerate Thumbnails</a>.', 'fincommerce' ), admin_url( 'admin.php?page=wc-status&tab=tools' ), 'https://en-gb.finpress.org/plugins/regenerate-thumbnails/' );
		} else {
			/* translators: %s: regen thumbs url */
			$regen_description = sprintf( __( 'After publishing your changes, new image sizes may not be shown until you <a href="%s" target="_blank">Regenerate Thumbnails</a>.', 'fincommerce' ), 'https://en-gb.finpress.org/plugins/regenerate-thumbnails/' );
		}

		$wp_customize->add_section(
			'fincommerce_product_images',
			array(
				'title'       => __( 'Product Images', 'fincommerce' ),
				'description' => $regen_description,
				'priority'    => 20,
				'panel'       => 'fincommerce',
			)
		);

		if ( ! wc_get_theme_support( 'single_image_width' ) ) {
			$wp_customize->add_setting(
				'fincommerce_single_image_width',
				array(
					'default'              => 600,
					'type'                 => 'option',
					'capability'           => 'manage_fincommerce',
					'sanitize_callback'    => 'absint',
					'sanitize_js_callback' => 'absint',
				)
			);

			$wp_customize->add_control(
				'fincommerce_single_image_width',
				array(
					'label'       => __( 'Main image width', 'fincommerce' ),
					'description' => __( 'Image size used for the main image on single product pages. These images will remain uncropped.', 'fincommerce' ),
					'section'     => 'fincommerce_product_images',
					'settings'    => 'fincommerce_single_image_width',
					'type'        => 'number',
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
					),
				)
			);
		}

		if ( ! wc_get_theme_support( 'thumbnail_image_width' ) ) {
			$wp_customize->add_setting(
				'fincommerce_thumbnail_image_width',
				array(
					'default'              => 300,
					'type'                 => 'option',
					'capability'           => 'manage_fincommerce',
					'sanitize_callback'    => 'absint',
					'sanitize_js_callback' => 'absint',
				)
			);

			$wp_customize->add_control(
				'fincommerce_thumbnail_image_width',
				array(
					'label'       => __( 'Thumbnail width', 'fincommerce' ),
					'description' => __( 'Image size used for products in the catalog.', 'fincommerce' ),
					'section'     => 'fincommerce_product_images',
					'settings'    => 'fincommerce_thumbnail_image_width',
					'type'        => 'number',
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
					),
				)
			);
		}

		include_once WC_ABSPATH . 'includes/customizer/class-wc-customizer-control-cropping.php';

		$wp_customize->add_setting(
			'fincommerce_thumbnail_cropping',
			array(
				'default'           => '1:1',
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => 'wc_clean',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_thumbnail_cropping_custom_width',
			array(
				'default'              => '4',
				'type'                 => 'option',
				'capability'           => 'manage_fincommerce',
				'sanitize_callback'    => 'absint',
				'sanitize_js_callback' => 'absint',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_thumbnail_cropping_custom_height',
			array(
				'default'              => '3',
				'type'                 => 'option',
				'capability'           => 'manage_fincommerce',
				'sanitize_callback'    => 'absint',
				'sanitize_js_callback' => 'absint',
			)
		);

		$wp_customize->add_control(
			new WC_Customizer_Control_Cropping(
				$wp_customize,
				'fincommerce_thumbnail_cropping',
				array(
					'section'  => 'fincommerce_product_images',
					'settings' => array(
						'cropping'      => 'fincommerce_thumbnail_cropping',
						'custom_width'  => 'fincommerce_thumbnail_cropping_custom_width',
						'custom_height' => 'fincommerce_thumbnail_cropping_custom_height',
					),
					'label'    => __( 'Thumbnail cropping', 'fincommerce' ),
					'choices'  => array(
						'1:1'       => array(
							'label'       => __( '1:1', 'fincommerce' ),
							'description' => __( 'Images will be cropped into a square', 'fincommerce' ),
						),
						'custom'    => array(
							'label'       => __( 'Custom', 'fincommerce' ),
							'description' => __( 'Images will be cropped to a custom aspect ratio', 'fincommerce' ),
						),
						'uncropped' => array(
							'label'       => __( 'Uncropped', 'fincommerce' ),
							'description' => __( 'Images will display using the aspect ratio in which they were uploaded', 'fincommerce' ),
						),
					),
				)
			)
		);
	}

	/**
	 * Checkout section.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 */
	public function add_checkout_section( $wp_customize ) {
		$wp_customize->add_section(
			'fincommerce_checkout',
			array(
				'title'       => __( 'Checkout', 'fincommerce' ),
				'priority'    => 20,
				'panel'       => 'fincommerce',
				'description' => __( 'These options let you change the appearance of the FinCommerce checkout.', 'fincommerce' ),
			)
		);

		// Checkout field controls.
		$fields = array(
			'company'   => __( 'Company name', 'fincommerce' ),
			'address_2' => __( 'Address line 2', 'fincommerce' ),
			'phone'     => __( 'Phone', 'fincommerce' ),
		);
		foreach ( $fields as $field => $label ) {
			$wp_customize->add_setting(
				'fincommerce_checkout_' . $field . '_field',
				array(
					'default'           => 'phone' === $field ? 'required' : 'optional',
					'type'              => 'option',
					'capability'        => 'manage_fincommerce',
					'sanitize_callback' => array( $this, 'sanitize_checkout_field_display' ),
				)
			);
			$wp_customize->add_control(
				'fincommerce_checkout_' . $field . '_field',
				array(
					/* Translators: %s field name. */
					'label'    => sprintf( __( '%s field', 'fincommerce' ), $label ),
					'section'  => 'fincommerce_checkout',
					'settings' => 'fincommerce_checkout_' . $field . '_field',
					'type'     => 'select',
					'choices'  => array(
						'hidden'   => __( 'Hidden', 'fincommerce' ),
						'optional' => __( 'Optional', 'fincommerce' ),
						'required' => __( 'Required', 'fincommerce' ),
					),
				)
			);
		}

		// Register settings.
		$wp_customize->add_setting(
			'fincommerce_checkout_highlight_required_fields',
			array(
				'default'              => 'yes',
				'type'                 => 'option',
				'capability'           => 'manage_fincommerce',
				'sanitize_callback'    => 'wc_bool_to_string',
				'sanitize_js_callback' => 'wc_string_to_bool',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_checkout_terms_and_conditions_checkbox_text',
			array(
				/* translators: %s terms and conditions page name and link */
				'default'           => sprintf( __( 'I have read and agree to the website %s', 'fincommerce' ), '[terms]' ),
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => 'wp_kses_post',
				'transport'         => 'postMessage',
			)
		);

		$wp_customize->add_setting(
			'fincommerce_checkout_privacy_policy_text',
			array(
				/* translators: %s privacy policy page name and link */
				'default'           => sprintf( __( 'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our %s.', 'fincommerce' ), '[privacy_policy]' ),
				'type'              => 'option',
				'capability'        => 'manage_fincommerce',
				'sanitize_callback' => 'wp_kses_post',
				'transport'         => 'postMessage',
			)
		);

		// Register controls.
		$wp_customize->add_control(
			'fincommerce_checkout_highlight_required_fields',
			array(
				'label'    => __( 'Highlight required fields with an asterisk', 'fincommerce' ),
				'section'  => 'fincommerce_checkout',
				'settings' => 'fincommerce_checkout_highlight_required_fields',
				'type'     => 'checkbox',
			)
		);

		if ( current_user_can( 'manage_privacy_options' ) ) {
			$choose_pages = array(
				'wp_page_for_privacy_policy' => __( 'Privacy policy', 'fincommerce' ),
				'fincommerce_terms_page_id'  => __( 'Terms and conditions', 'fincommerce' ),
			);
		} else {
			$choose_pages = array(
				'fincommerce_terms_page_id' => __( 'Terms and conditions', 'fincommerce' ),
			);
		}
		$pages        = get_pages(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish,private,draft',
				'child_of'    => 0,
				'parent'      => -1,
				'exclude'     => array(
					wc_get_page_id( 'cart' ),
					wc_get_page_id( 'checkout' ),
					wc_get_page_id( 'myaccount' ),
				),
				'sort_order'  => 'asc',
				'sort_column' => 'post_title',
			)
		);
		$page_choices = array( '' => __( 'No page set', 'fincommerce' ) ) + array_combine( array_map( 'strval', wp_list_pluck( $pages, 'ID' ) ), wp_list_pluck( $pages, 'post_title' ) );

		foreach ( $choose_pages as $id => $name ) {
			$wp_customize->add_setting(
				$id,
				array(
					'default'    => '',
					'type'       => 'option',
					'capability' => 'manage_fincommerce',
				)
			);
			$wp_customize->add_control(
				$id,
				array(
					/* Translators: %s: page name. */
					'label'    => sprintf( __( '%s page', 'fincommerce' ), $name ),
					'section'  => 'fincommerce_checkout',
					'settings' => $id,
					'type'     => 'select',
					'choices'  => $page_choices,
				)
			);
		}

		$wp_customize->add_control(
			'fincommerce_checkout_privacy_policy_text',
			array(
				'label'           => __( 'Privacy policy', 'fincommerce' ),
				'description'     => __( 'Optionally add some text about your store privacy policy to show during checkout.', 'fincommerce' ),
				'section'         => 'fincommerce_checkout',
				'settings'        => 'fincommerce_checkout_privacy_policy_text',
				'active_callback' => array( $this, 'has_privacy_policy_page_id' ),
				'type'            => 'textarea',
			)
		);

		$wp_customize->add_control(
			'fincommerce_checkout_terms_and_conditions_checkbox_text',
			array(
				'label'           => __( 'Terms and conditions', 'fincommerce' ),
				'description'     => __( 'Optionally add some text for the terms checkbox that customers must accept.', 'fincommerce' ),
				'section'         => 'fincommerce_checkout',
				'settings'        => 'fincommerce_checkout_terms_and_conditions_checkbox_text',
				'active_callback' => array( $this, 'has_terms_and_conditions_page_id' ),
				'type'            => 'text',
			)
		);

		if ( isset( $wp_customize->selective_refresh ) ) {
			$wp_customize->selective_refresh->add_partial(
				'fincommerce_checkout_privacy_policy_text',
				array(
					'selector'            => '.fincommerce-privacy-policy-text',
					'container_inclusive' => true,
					'render_callback'     => 'wc_checkout_privacy_policy_text',
				)
			);
			$wp_customize->selective_refresh->add_partial(
				'fincommerce_checkout_terms_and_conditions_checkbox_text',
				array(
					'selector'            => '.fincommerce-terms-and-conditions-checkbox-text',
					'container_inclusive' => false,
					'render_callback'     => 'wc_terms_and_conditions_checkbox_text',
				)
			);
		}
	}

	/**
	 * Sanitize field display.
	 *
	 * @param string $value '', 'subcategories', or 'both'.
	 * @return string
	 */
	public function sanitize_checkout_field_display( $value ) {
		$options = array( 'hidden', 'optional', 'required' );
		return in_array( $value, $options, true ) ? $value : '';
	}

	/**
	 * Whether or not a page has been chose for the privacy policy.
	 *
	 * @return bool
	 */
	public function has_privacy_policy_page_id() {
		return wc_privacy_policy_page_id() > 0;
	}

	/**
	 * Whether or not a page has been chose for the terms and conditions.
	 *
	 * @return bool
	 */
	public function has_terms_and_conditions_page_id() {
		return wc_terms_and_conditions_page_id() > 0;
	}

	/**
	 * Weather or not the checkout page contains the Checkout block.
	 *
	 * @return bool
	 */
	private function has_block_checkout() {
		$post = get_post( get_option( 'fincommerce_checkout_page_id' ) );
		return strpos( $post->post_content, '<!-- wp:fincommerce/checkout' ) !== false;
	}
}
