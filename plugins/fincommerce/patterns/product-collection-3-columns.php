<?php
/**
 * Title: Product Collection 3 Columns
 * Slug: fincommerce-blocks/product-collection-3-columns
 * Categories: FinCommerce
 */
?>

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"var:preset|spacing|30","right":"var:preset|spacing|30"},"margin":{"top":"0px","bottom":"80px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" style="margin-top:0px;margin-bottom:80px;padding-top:0;padding-right:var(--wp--preset--spacing--30);padding-bottom:0;padding-left:var(--wp--preset--spacing--30)">
	<!-- wp:fincommerce/product-collection {"query":{"perPage":3,"pages":0,"offset":0,"postType":"product","order":"asc","orderBy":"title","search":"","exclude":[],"inherit":false,"taxQuery":{},"isProductCollectionBlock":true,"fincommerceOnSale":false,"fincommerceStockStatus":["instock","outofstock","onbackorder"],"fincommerceAttributes":[],"fincommerceHandPickedProducts":[]},"tagName":"div","dimensions":{"widthType":"fill","fixedWidth":""},"displayLayout":{"type":"flex","columns":3},"align":"wide"} -->
	<div class="wp-block-fincommerce-product-collection alignwide">
		<!-- wp:fincommerce/product-template -->
		<!-- wp:fincommerce/product-image {"showSaleBadge":false,"aspectRatio":"3/5","imageSizing":"single","isDescendentOfQueryLoop":true} -->
			<!-- wp:fincommerce/product-sale-badge {"isDescendentOfQueryLoop":true,"align":"right"} /-->
		<!-- /wp:fincommerce/product-image -->

		<!-- wp:fincommerce/product-rating {"isDescendentOfQueryLoop":true,"textAlign":"center"} /-->

		<!-- wp:post-title {"textAlign":"center","level":2,"isLink":true,"style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}},"fontSize":"medium","__fincommerceNamespace":"fincommerce/product-collection/product-title","style":{"typography":{"lineHeight":"1.4"}}} /-->

		<!-- wp:fincommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"center","fontSize":"small"} /-->
		<!-- /wp:fincommerce/product-template -->
	</div>
	<!-- /wp:fincommerce/product-collection -->
</div>
<!-- /wp:group -->
