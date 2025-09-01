/**
 * External dependencies
 */
import {
	test,
	expect,
	wpCLI,
	BlockData,
	Editor,
	BLOCK_THEME_SLUG,
} from '@fincommerce/e2e-utils';

/**
 * Internal dependencies
 */

const blockData: Partial< BlockData > = {
	name: 'fincommerce/legacy-template',
};

const classicTemplateBlockNames = [
	'FinCommerce Classic Template',
	'Product (Classic)',
	'Product Attribute (Classic)',
	'Product Category (Classic)',
	'Product Tag (Classic)',
	"Product's Custom Taxonomy (Classic)",
	'Product Search Results (Classic)',
	'Product Grid (Classic)',
];

const templates = [
	{
		title: 'Single Product',
		slug: 'single-product',
		path: '/product/hoodie',
		needsCreation: false,
	},
	{
		title: 'Products by Attribute',
		slug: 'taxonomy-product_attribute',
		path: '/color/blue',
		needsCreation: false,
	},
	{
		title: 'Products by Category',
		slug: 'taxonomy-product_cat',
		path: '/product-category/clothing',
		needsCreation: true,
	},
	{
		title: 'Products by Tag',
		slug: 'taxonomy-product_tag',
		path: '/product-tag/recommended/',
		needsCreation: true,
	},
	{
		title: 'Product Catalog',
		slug: 'archive-product',
		path: '/shop/',
		needsCreation: false,
	},
	{
		title: 'Product Search Results',
		slug: 'product-search-results',
		path: '/?s=shirt&post_type=product',
		needsCreation: false,
	},
];

const getClassicTemplateBlocksInInserter = async ( {
	editor,
}: {
	editor: Editor;
} ) => {
	await editor.openGlobalBlockInserter();

	await editor.page
		.getByRole( 'searchbox', { name: 'Search' } )
		.fill( 'classic' );

	// Wait for blocks search to have finished.
	await expect(
		editor.page.getByRole( 'heading', {
			name: 'Available to install',
			exact: true,
		} )
	).toBeVisible();

	const inserterBlocks = editor.page.getByRole( 'listbox', {
		name: 'Blocks',
		exact: true,
	} );
	const options = inserterBlocks.locator( 'role=option' );

	// Filter out blocks that don't match one of the possible Classic Template block names (case-insensitive).
	const classicTemplateBlocks = await options.evaluateAll(
		( elements, blockNames ) => {
			const blockOptions = elements.filter( ( element ) => {
				return blockNames.some(
					( name ) => element.textContent === name
				);
			} );
			return blockOptions.map( ( element ) => element.textContent );
		},
		classicTemplateBlockNames
	);

	return classicTemplateBlocks;
};

test.describe( `${ blockData.name } Block `, () => {
	test.beforeEach( async () => {
		await wpCLI(
			'option update wc_blocks_use_blockified_product_grid_block_as_template false'
		);
	} );

	test( `is registered/unregistered when navigating from a non-WC template to a WC template and back`, async ( {
		admin,
		editor,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `twentytwentyfour//home`,
			postType: 'wp_template',
			canvas: 'edit',
		} );

		let classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks ).toHaveLength( 0 );

		await editor.page.getByLabel( 'Open Navigation' ).click();
		await editor.page
			.getByLabel( 'Product Catalog', { exact: true } )
			.click();

		classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks ).toHaveLength( 1 );

		await editor.page.getByLabel( 'Open Navigation' ).click();
		await editor.page.getByLabel( 'Blog Home', { exact: true } ).click();

		classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks ).toHaveLength( 0 );
	} );

	test( `is registered/unregistered when navigating from a WC template to a non-WC template and back`, async ( {
		admin,
		editor,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `${ BLOCK_THEME_SLUG }//archive-product`,
			postType: 'wp_template',
			canvas: 'edit',
		} );

		let classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks ).toHaveLength( 1 );

		await editor.page.getByLabel( 'Open Navigation' ).click();
		await editor.page.getByLabel( 'Blog Home', { exact: true } ).click();

		classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks ).toHaveLength( 0 );

		await editor.page.getByLabel( 'Open Navigation' ).click();
		await editor.page
			.getByLabel( 'Product Catalog', { exact: true } )
			.click();

		classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks ).toHaveLength( 1 );
	} );

	test( `updates block title when navigating between WC templates`, async ( {
		admin,
		editor,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `${ BLOCK_THEME_SLUG }//archive-product`,
			postType: 'wp_template',
			canvas: 'edit',
		} );

		let classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks[ 0 ] ).toBe( 'Product Grid (Classic)' );

		await editor.page.getByLabel( 'Open Navigation' ).click();
		await editor.page
			.getByLabel( 'Product Search Results', { exact: true } )
			.click();

		classicTemplateBlocks = await getClassicTemplateBlocksInInserter( {
			editor,
		} );

		expect( classicTemplateBlocks[ 0 ] ).toBe(
			'Product Search Results (Classic)'
		);
	} );

	test( `is not available when editing template parts`, async ( {
		admin,
		editor,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `twentytwentyfour//header`,
			postType: 'wp_template_part',
			canvas: 'edit',
		} );

		const classicTemplateBlocks = await getClassicTemplateBlocksInInserter(
			{
				editor,
			}
		);

		expect( classicTemplateBlocks ).toHaveLength( 0 );
	} );

	// @see https://github.com/dieselfox1/fincommerce-blocks/issues/9637
	test( `is still available after resetting a modified WC template`, async ( {
		admin,
		editor,
		wpCoreVersion,
	} ) => {
		await admin.visitSiteEditor( {
			postId: `${ BLOCK_THEME_SLUG }//single-product`,
			postType: 'wp_template',
			canvas: 'edit',
		} );

		await editor.insertBlock( {
			name: 'core/paragraph',
			attributes: { content: 'Hello World' },
		} );

		await editor.saveSiteEditorEntities( {
			isOnlyCurrentEntityDirty: true,
		} );

		await editor.page.getByLabel( 'Open Navigation' ).click();

		await editor.revertTemplate( {
			templateName: 'Single Product',
		} );

		if ( wpCoreVersion >= 6.8 ) {
			const actionsButton = editor.page.getByRole( 'button', {
				name: 'Actions',
			} );
			await actionsButton.click();
		}

		const editButton = editor.page.getByRole( 'menuitem', {
			name: 'Edit',
		} );

		// Edit the template again.
		await editButton.click();

		// Verify the Classic Template block is still registered.
		const classicTemplateBlocks = await getClassicTemplateBlocksInInserter(
			{
				editor,
			}
		);

		expect( classicTemplateBlocks ).toHaveLength( 1 );
	} );

	for ( const template of templates ) {
		test( `is rendered on ${ template.title } template`, async ( {
			admin,
			editor,
			page,
		} ) => {
			if ( template.needsCreation ) {
				await admin.visitSiteEditor( {
					postType: 'wp_template',
				} );
				await editor.createTemplate( {
					templateName: template.title,
				} );
			} else {
				await admin.visitSiteEditor( {
					postId: `${ BLOCK_THEME_SLUG }//${ template.slug }`,
					postType: 'wp_template',
					canvas: 'edit',
				} );
			}

			const block = editor.canvas.locator(
				`[data-type="${ blockData.name }"]`
			);

			await expect( block ).toBeVisible();

			if ( template.needsCreation ) {
				await editor.saveSiteEditorEntities( {
					isOnlyCurrentEntityDirty: true,
				} );
			}

			await page.goto( template.path );

			await expect( page.locator( 'div[data-template]' ) ).toBeVisible();
		} );
	}
} );
