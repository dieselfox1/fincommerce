<?php
/**
 * Title: Product Gallery
 * Slug: fincommerce-blocks/product-query-product-gallery
 * Categories: FinCommerce, featured-selling
 * Block Types: core/query/fincommerce/product-query
 */

$products_title = __( 'Bestsellers', 'fincommerce' );
?>

<!-- wp:group {"metadata":{"name":"Product Gallery","categories":["woo-commerce","social-media"],"patternName":"fincommerce-blocks/social-follow-us-in-social-media"},"align":"full","style":{"spacing":{"padding":{"top":"calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))","bottom":"calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))","left":"var(--wp--style--root--padding-left, var(--wp--custom--gap--horizontal))","right":"var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal))"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)));padding-right:var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal));padding-bottom:calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)));padding-left:var(--wp--style--root--padding-left, var(--wp--custom--gap--horizontal))">
	<!-- wp:spacer {"height":"calc( 0.25 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))"} -->
	<div style="height:calc( 0.25 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:heading {"level":3,"align":"wide"} -->
	<h3 class="wp-block-heading alignwide"><?php echo esc_html( $products_title ); ?></h3>
	<!-- /wp:heading -->

	<!-- wp:spacer {"height":"var:preset|spacing|20"} -->
	<div style="height:var(--wp--preset--spacing--20)" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:fincommerce/product-collection {"queryId":2,"query":{"perPage":6,"pages":0,"offset":0,"postType":"product","order":"asc","orderBy":"title","search":"","exclude":[],"inherit":false,"taxQuery":[],"isProductCollectionBlock":true,"fincommerceOnSale":false,"fincommerceStockStatus":["instock","outofstock","onbackorder"],"fincommerceAttributes":[],"fincommerceHandPickedProducts":[]},"tagName":"div","dimensions":{"widthType":"fill","fixedWidth":""},"displayLayout":{"type":"flex","columns":3,"shrinkColumns":true},"queryContextIncludes":["collection"],"align":"wide","layout":{"type":"default"}} -->
	<div class="wp-block-fincommerce-product-collection alignwide">
		<!-- wp:fincommerce/product-template -->
		<!-- wp:fincommerce/product-image {"isDescendentOfQueryLoop":true,"aspectRatio":"3/4"} /-->
		<!-- wp:fincommerce/product-image {"showSaleBadge":false,"isDescendentOfQueryLoop":true,"aspectRatio":"3/4"} -->
			<!-- wp:fincommerce/product-sale-badge {"isDescendentOfQueryLoop":true,"align":"right"} /-->
		<!-- /wp:fincommerce/product-image -->

		<!-- wp:post-title {"textAlign":"center","level":6,"isLink":true,"style":{"typography":{"textTransform":"capitalize"},"spacing":{"margin":{"top":"12px","bottom":"8px"}}}} /-->

		<!-- wp:fincommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"center","fontSize":"small"} /-->
		<!-- /wp:fincommerce/product-template -->
	</div>
	<!-- /wp:fincommerce/product-collection -->

	<!-- wp:spacer {"height":"calc( 0.25 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))"} -->
	<div style="height:calc( 0.25 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
</div>
<!-- /wp:group -->
