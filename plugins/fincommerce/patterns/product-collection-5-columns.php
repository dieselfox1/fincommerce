<?php
/**
 * Title: Product Collection 5 Columns
 * Slug: fincommerce-blocks/product-collection-5-columns
 * Categories: FinCommerce, featured-selling
 */

$products_title = __( 'Our latest and greatest', 'fincommerce' );
?>

<!-- wp:group {"metadata":{"name":"Product Collection 5 Columns"},"align":"full","style":{"spacing":{"padding":{"top":"calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))","bottom":"calc( 0.5 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))","left":"var(--wp--style--root--padding-left, var(--wp--custom--gap--horizontal))","right":"var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal))"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","justifyContent":"center"}} -->
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

	<!-- wp:fincommerce/product-collection {"queryId":7,"query":{"perPage":5,"pages":0,"offset":0,"postType":"product","order":"asc","orderBy":"title","search":"","exclude":[],"inherit":false,"taxQuery":[],"isProductCollectionBlock":true,"fincommerceOnSale":false,"fincommerceStockStatus":["instock","outofstock","onbackorder"],"fincommerceAttributes":[],"fincommerceHandPickedProducts":[]},"tagName":"div","dimensions":{"widthType":"fill","fixedWidth":""},"displayLayout":{"type":"flex","columns":5},"queryContextIncludes":["collection"],"align":"wide"} -->
	<div class="wp-block-fincommerce-product-collection alignwide">
		<!-- wp:fincommerce/product-template -->
		<!-- wp:fincommerce/product-image {"showSaleBadge":false,"isDescendentOfQueryLoop":true,"aspectRatio":"3/5"} -->
			<!-- wp:fincommerce/product-sale-badge {"isDescendentOfQueryLoop":true,"align":"right"} /-->
		<!-- /wp:fincommerce/product-image -->

		<!-- wp:post-title {"textAlign":"left","level":2,"isLink":true,"style":{"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}},"fontSize":"medium","__fincommerceNamespace":"fincommerce/product-collection/product-title","style":{"typography":{"lineHeight":"1.4"}}} /-->

		<!-- wp:fincommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"left","fontSize":"small"} /-->
		<!-- /wp:fincommerce/product-template -->
	</div>
	<!-- /wp:fincommerce/product-collection -->

	<!-- wp:spacer {"height":"calc( 0.25 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))"} -->
	<div style="height:calc( 0.25 * var(--wp--style--root--padding-right, var(--wp--custom--gap--horizontal)))" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
</div>
<!-- /wp:group -->
