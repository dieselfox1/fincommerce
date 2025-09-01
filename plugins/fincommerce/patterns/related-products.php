<?php
/**
 * Title: Related Products
 * Slug: fincommerce-blocks/related-products
 * Categories: FinCommerce
 * Inserter: false
 */
?>

<!-- wp:fincommerce/product-collection {"align":"wide","queryId":0,"query":{"perPage":5,"pages":1,"offset":0,"postType":"product","order":"asc","orderBy":"title","search":"","exclude":[],"inherit":false,"taxQuery":{},"isProductCollectionBlock":true,"featured":false,"fincommerceOnSale":false,"fincommerceStockStatus":["instock","onbackorder"],"fincommerceAttributes":[],"fincommerceHandPickedProducts":[],"filterable":false,"relatedBy":{"categories":true,"tags":true}},"tagName":"div","displayLayout":{"type":"flex","columns":5,"shrinkColumns":false},"dimensions":{"widthType":"fill"},"collection":"fincommerce/product-collection/related","hideControls":["inherit"],"queryContextIncludes":["collection"],"__privatePreviewState":{"isPreview":true,"previewMessage":"Actual products will vary depending on the product being viewed."}} -->
	<div class="wp-block-fincommerce-product-collection alignwide">
		<!-- wp:heading {"style":{"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}}} -->
		<h2 class="wp-block-heading" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30)">
				<?php
					echo esc_html__(
						'Related products',
						'fincommerce'
					)
					?>
			</h2>
		<!-- /wp:heading -->

		<!-- wp:fincommerce/product-template -->
			<!-- wp:fincommerce/product-image {"showSaleBadge":false,"imageSizing":"thumbnail","isDescendentOfQueryLoop":true} -->
				<!-- wp:fincommerce/product-sale-badge {"isDescendentOfQueryLoop":true,"align":"right"} /-->
			<!-- /wp:fincommerce/product-image -->
			<!-- wp:post-title {"textAlign":"center","level":3,"isLink":true,"style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}},"fontSize":"medium","__fincommerceNamespace":"fincommerce/product-collection/product-title"} /-->
			<!-- wp:fincommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"center","fontSize":"small"} /-->
			<!-- wp:fincommerce/product-button {"textAlign":"center","isDescendentOfQueryLoop":true,"fontSize":"small"} /-->
		<!-- /wp:fincommerce/product-template -->
	</div>
<!-- /wp:fincommerce/product-collection -->
