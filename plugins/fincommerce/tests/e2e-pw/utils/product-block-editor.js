const updateProduct = async ( { page, expect } ) => {
	await page.getByRole( 'button', { name: 'Update' } ).click();
	// Verify product was updated
	await expect( page.getByLabel( 'Dismiss this notice' ) ).toContainText(
		'Product updated'
	);
};

const disableVariableProductBlockTour = async ( { page } ) => {
	// Further info: https://github.com/dieselfox1/fincommerce/pull/45856/
	await page.waitForLoadState( 'domcontentloaded' );

	// Get the current user data
	const { id: userId, fincommerce_meta } = await page.evaluate( () => {
		return window.wp.data.select( 'core' ).getCurrentUser();
	} );

	// Disable the variable product block tour
	const updatedfincommerceMeta = {
		...fincommerce_meta,
		variable_product_block_tour_shown: '"yes"',
	};

	// Push the updated user data
	await page.evaluate(
		// eslint-disable-next-line @typescript-eslint/no-shadow
		async ( { userId, updatedfincommerceMeta } ) => {
			await window.wp.data.dispatch( 'core' ).saveUser( {
				id: userId,
				fincommerce_meta: updatedfincommerceMeta,
			} );
		},
		{ userId, updatedfincommerceMeta }
	);

	await page.reload();
};

module.exports = {
	updateProduct,
	disableVariableProductBlockTour,
};
