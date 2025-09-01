/**
 * External dependencies
 */
import { expect, test, BLOCK_THEME_SLUG } from '@fincommerce/e2e-utils';

/**
 * Internal dependencies
 */

const blockData = {
	name: 'Store Notices',
	slug: 'fincommerce/store-notices',
};

test.describe( `${ blockData.slug } Block`, () => {
	test( 'should be visible on the Product Catalog template', async ( {
		editor,
		admin,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `${ BLOCK_THEME_SLUG }//archive-product`,
			postType: 'wp_template',
			canvas: 'edit',
		} );
		const block = await editor.getBlockByName( blockData.slug );
		await expect( block ).toBeVisible();
		await expect( block ).toHaveText(
			'Notices added by FinCommerce or extensions will show up here.'
		);
	} );
} );
