<?php
/**
 * Admin View: Product import form
 *
 * @package FinCommerce\Admin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<form class="wc-progress-form-content fincommerce-importer" enctype="multipart/form-data" method="post">
	<header>
		<h2><?php esc_html_e( 'Import products from a CSV file', 'fincommerce' ); ?></h2>
		<p><?php esc_html_e( 'This tool allows you to import (or merge) product data to your store from a CSV or TXT file.', 'fincommerce' ); ?></p>
	</header>
	<section>
		<table class="form-table fincommerce-importer-options">
			<tbody>
				<tr>
					<th scope="row">
						<label for="upload">
							<?php esc_html_e( 'Choose a CSV file from your computer:', 'fincommerce' ); ?>
						</label>
					</th>
					<td>
						<?php
						if ( ! empty( $upload_dir['error'] ) ) {
							?>
							<div class="inline error">
								<p><?php esc_html_e( 'Before you can upload your import file, you will need to fix the following error:', 'fincommerce' ); ?></p>
								<p><strong><?php echo esc_html( $upload_dir['error'] ); ?></strong></p>
							</div>
							<?php
						} else {
							?>
							<input type="file" id="upload" name="import" size="25" />
							<input type="hidden" name="action" value="save" />
							<input type="hidden" name="max_file_size" value="<?php echo esc_attr( $bytes ); ?>" />
							<br>
							<small>
								<?php
								printf(
									/* translators: %s: maximum upload size */
									esc_html__( 'Maximum size: %s', 'fincommerce' ),
									esc_html( $size )
								);
								?>
							</small>
							<?php
						}
						?>
					</td>
				</tr>
				<tr>
					<th><label for="fincommerce-importer-update-existing"><?php esc_html_e( 'Update existing products', 'fincommerce' ); ?></label><br/></th>
					<td>
						<input type="hidden" name="update_existing" value="0" />
						<input type="checkbox" id="fincommerce-importer-update-existing" name="update_existing" value="1" />
						<label for="fincommerce-importer-update-existing"><?php esc_html_e( 'Existing products that match by ID or SKU will be updated. Products that do not exist will be skipped.', 'fincommerce' ); ?></label>
					</td>
				</tr>
				<tr class="fincommerce-importer-advanced hidden">
					<th>
						<label for="fincommerce-importer-file-url"><?php esc_html_e( 'Alternatively, enter the path to a CSV file on your server:', 'fincommerce' ); ?></label>
					</th>
					<td>
						<label for="fincommerce-importer-file-url" class="fincommerce-importer-file-url-field-wrapper">
							<code><?php echo esc_html( ABSPATH ) . ' '; ?></code><input type="text" id="fincommerce-importer-file-url" name="file_url" />
						</label>
					</td>
				</tr>
				<tr class="fincommerce-importer-advanced hidden">
					<th><label><?php esc_html_e( 'CSV Delimiter', 'fincommerce' ); ?></label><br/></th>
					<td><input type="text" name="delimiter" placeholder="," size="2" /></td>
				</tr>
				<tr class="fincommerce-importer-advanced hidden">
					<th><label><?php esc_html_e( 'Use previous column mapping preferences?', 'fincommerce' ); ?></label><br/></th>
					<td><input type="checkbox" id="fincommerce-importer-map-preferences" name="map_preferences" value="1" /></td>
				</tr>
				<tr class="fincommerce-importer-advanced hidden">
					<th><label><?php esc_html_e( 'Character encoding of the file', 'fincommerce' ); ?></label><br/></th>
					<td><select id="fincommerce-importer-character-encoding" name="character_encoding">
							<option value="" selected><?php esc_html_e( 'Autodetect', 'fincommerce' ); ?></option>
							<?php
							$encodings = mb_list_encodings();
							sort( $encodings, SORT_NATURAL );
							foreach ( $encodings as $encoding ) {
								echo '<option>' . esc_html( $encoding ) . '</option>';
							}
							?>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<script type="text/javascript">
		jQuery(function() {
			jQuery( '.fincommerce-importer-toggle-advanced-options' ).on( 'click', function() {
				var elements = jQuery( '.fincommerce-importer-advanced' );
				if ( elements.is( '.hidden' ) ) {
					elements.removeClass( 'hidden' );
					jQuery( this ).text( jQuery( this ).data( 'hidetext' ) );
				} else {
					elements.addClass( 'hidden' );
					jQuery( this ).text( jQuery( this ).data( 'showtext' ) );
				}
				return false;
			} );
		});
	</script>
	<div class="wc-actions">
		<a href="#" class="fincommerce-importer-toggle-advanced-options" data-hidetext="<?php esc_attr_e( 'Hide advanced options', 'fincommerce' ); ?>" data-showtext="<?php esc_attr_e( 'Show advanced options', 'fincommerce' ); ?>"><?php esc_html_e( 'Show advanced options', 'fincommerce' ); ?></a>
		<button type="submit" class="button button-primary button-next" value="<?php esc_attr_e( 'Continue', 'fincommerce' ); ?>" name="save_step"><?php esc_html_e( 'Continue', 'fincommerce' ); ?></button>
		<?php wp_nonce_field( 'fincommerce-csv-importer' ); ?>
	</div>
</form>
