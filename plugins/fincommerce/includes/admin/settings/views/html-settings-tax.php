<?php
/**
 * Admin view: Settings tax
 *
 * @package FinCommerce\Admin\Settings
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div class="wc-tax-rates-search" id="rates-search">
	<input type="search" class="wc-tax-rates-search-field" placeholder="<?php esc_attr_e( 'Search&hellip;', 'fincommerce' ); ?>" value="<?php echo isset( $_GET['s'] ) ? esc_attr( $_GET['s'] ) : ''; ?>" />
</div>

<div id="rates-pagination"></div>

<h3>
	<?php
	/* translators: %s: tax rate */
	printf(
		__( '"%s" tax rates', 'fincommerce' ),
		$current_class ? esc_html( $current_class ) : __( 'Standard', 'fincommerce' )
	);
	?>
</h3>

<table class="wc_tax_rates wc_input_table widefat">
	<thead>
		<tr>
			<th width="8%"><a href="https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes" target="_blank"><?php _e( 'Country&nbsp;code', 'fincommerce' ); ?></a>&nbsp;<?php echo wc_help_tip( __( 'A 2 digit country code, e.g. US. Leave blank to apply to all.', 'fincommerce' ) ); ?></th>
			<th width="8%"><?php _e( 'State code', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'A 2 digit state code, e.g. AL. Leave blank to apply to all.', 'fincommerce' ) ); ?></th>
			<th><?php _e( 'Postcode / ZIP', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Postcode for this rule. Semi-colon (;) separate multiple values. Leave blank to apply to all areas. Wildcards (*) and ranges for numeric postcodes (e.g. 12345...12350) can also be used.', 'fincommerce' ) ); ?></th>
			<th><?php _e( 'City', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Cities for this rule. Semi-colon (;) separate multiple values. Leave blank to apply to all cities.', 'fincommerce' ) ); ?></th>
			<th width="8%"><?php _e( 'Rate&nbsp;%', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Enter a tax rate (percentage) to 4 decimal places.', 'fincommerce' ) ); ?></th>
			<th width="8%"><?php _e( 'Tax name', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Enter a name for this tax rate.', 'fincommerce' ) ); ?></th>
			<th width="8%"><?php _e( 'Priority', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Choose a priority for this tax rate. Only 1 matching rate per priority will be used. To define multiple tax rates for a single area you need to specify a different priority per rate.', 'fincommerce' ) ); ?></th>
			<th width="8%"><?php _e( 'Compound', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Choose whether or not this is a compound rate. Compound tax rates are applied on top of other tax rates.', 'fincommerce' ) ); ?></th>
			<th width="8%"><?php _e( 'Shipping', 'fincommerce' ); ?>&nbsp;<?php echo wc_help_tip( __( 'Choose whether or not this tax rate also gets applied to shipping.', 'fincommerce' ) ); ?></th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th colspan="9">
				<a href="#" class="button plus insert"><?php _e( 'Insert row', 'fincommerce' ); ?></a>
				<a href="#" class="button minus remove_tax_rates"><?php _e( 'Remove selected row(s)', 'fincommerce' ); ?></a>
				<a href="#" download="tax_rates.csv" class="button export"><?php _e( 'Export CSV', 'fincommerce' ); ?></a>
				<a href="<?php echo admin_url( 'admin.php?import=fincommerce_tax_rate_csv' ); ?>" class="button import"><?php _e( 'Import CSV', 'fincommerce' ); ?></a>
			</th>
		</tr>
	</tfoot>
	<tbody id="rates">
		<tr>
			<th colspan="9" style="text-align: center;"><?php esc_html_e( 'Loading&hellip;', 'fincommerce' ); ?></th>
		</tr>
	</tbody>
</table>

<div id="rates-bottom-pagination"></div>

<script type="text/html" id="tmpl-wc-tax-table-row">
	<tr class="tips" data-tip="<?php printf( esc_attr__( 'Tax rate ID: %s', 'fincommerce' ), '{{ data.tax_rate_id }}' ); ?>" data-id="{{ data.tax_rate_id }}">
		<td class="country">
			<input type="text" value="{{ data.tax_rate_country }}" placeholder="*" name="tax_rate_country[{{ data.tax_rate_id }}]" class="wc_input_country_iso" data-attribute="tax_rate_country" style="text-transform:uppercase" />
		</td>

		<td class="state">
			<input type="text" value="{{ data.tax_rate_state }}" placeholder="*" name="tax_rate_state[{{ data.tax_rate_id }}]" data-attribute="tax_rate_state" />
		</td>

		<td class="postcode">
			<input type="text" value="<# if ( data.postcode ) print( _.escape( data.postcode.join( '; ' ) ) ); #>" placeholder="*" data-name="tax_rate_postcode[{{ data.tax_rate_id }}]" data-attribute="postcode" />
		</td>

		<td class="city">
			<input type="text" value="<# if ( data.city ) print( _.escape( data.city.join( '; ' ) ) ); #>" placeholder="*" data-name="tax_rate_city[{{ data.tax_rate_id }}]" data-attribute="city" />
		</td>

		<td class="rate">
			<input type="text" value="{{ data.tax_rate }}" placeholder="0" name="tax_rate[{{ data.tax_rate_id }}]" data-attribute="tax_rate" />
		</td>

		<td class="name">
			<input type="text" value="{{ data.tax_rate_name }}" name="tax_rate_name[{{ data.tax_rate_id }}]" data-attribute="tax_rate_name" />
		</td>

		<td class="priority">
			<input type="number" step="1" min="1" value="{{ data.tax_rate_priority }}" name="tax_rate_priority[{{ data.tax_rate_id }}]" data-attribute="tax_rate_priority" />
		</td>

		<td class="compound">
			<input type="checkbox" class="checkbox" name="tax_rate_compound[{{ data.tax_rate_id }}]" <# if ( parseInt( data.tax_rate_compound, 10 ) ) { #> checked="checked" <# } #> data-attribute="tax_rate_compound" />
		</td>

		<td class="apply_to_shipping">
			<input type="checkbox" class="checkbox" name="tax_rate_shipping[{{ data.tax_rate_id }}]" <# if ( parseInt( data.tax_rate_shipping, 10 ) ) { #> checked="checked" <# } #> data-attribute="tax_rate_shipping" />
		</td>
	</tr>
</script>

<script type="text/html" id="tmpl-wc-tax-table-row-empty">
	<tr>
		<th colspan="9" style="text-align:center"><?php esc_html_e( 'No matching tax rates found.', 'fincommerce' ); ?></th>
	</tr>
</script>

<script type="text/html" id="tmpl-wc-tax-table-pagination">
	<div class="tablenav">
		<div class="tablenav-pages">
			<span class="displaying-num">
				<?php
				/* translators: %s: number */
				printf(
					__( '%s items', 'fincommerce' ), // %s will be a number eventually, but must be a string for now.
					'{{ data.qty_rates }}'
				);
				?>
			</span>
			<span class="pagination-links">
				<# if ( data.current_page === 1 ) { #>
					<span class="tablenav-pages-navspan button disabled" aria-hidden="true">&laquo;</span>
					<span class="tablenav-pages-navspan button disabled" aria-hidden="true">&lsaquo;</span>
				<# } else { #>
					<a class="button" data-goto="1">
						<span class="screen-reader-text"><?php esc_html_e( 'First page', 'fincommerce' ); ?></span>
						<span aria-hidden="true">&laquo;</span>
					</a>
					<a class="button" data-goto="<# print( Math.max( 1, parseInt( data.current_page, 10 ) - 1 ) ) #>">
						<span class="screen-reader-text"><?php esc_html_e( 'Previous page', 'fincommerce' ); ?></span>
						<span aria-hidden="true">&lsaquo;</span>
					</a>
				<# } #>

				<span class="paging-input">
					<label for="current-page-selector" class="screen-reader-text"><?php esc_html_e( 'Current page', 'fincommerce' ); ?></label>
					<?php
						/* translators: 1: current page 2: total pages */
						printf(
							esc_html_x( '%1$s of %2$s', 'Pagination', 'fincommerce' ),
							'<input class="current-page" id="current-page-selector" type="text" name="paged" value="{{ data.current_page }}" size="<# print( data.qty_pages.toString().length ) #>" aria-describedby="table-paging">',
							'<span class="total-pages">{{ data.qty_pages }}</span>'
						);
					?>
				</span>

				<# if ( data.current_page === data.qty_pages ) { #>
					<span class="tablenav-pages-navspan button disabled" aria-hidden="true">&rsaquo;</span>
					<span class="tablenav-pages-navspan button disabled" aria-hidden="true">&raquo;</span>
				<# } else { #>
					<a class="button" data-goto="<# print( Math.min( data.qty_pages, parseInt( data.current_page, 10 ) + 1 ) ) #>">
						<span class="screen-reader-text"><?php esc_html_e( 'Next page', 'fincommerce' ); ?></span>
						<span aria-hidden="true">&rsaquo;</span>
					</a>
					<a class="button" data-goto="{{ data.qty_pages }}">
						<span class="screen-reader-text"><?php esc_html_e( 'Last page', 'fincommerce' ); ?></span>
						<span aria-hidden="true">&raquo;</span>
					</a>
				<# } #>

			</span>
		</div>
	</div>
</script>
