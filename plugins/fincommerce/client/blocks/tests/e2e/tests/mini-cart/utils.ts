/**
 * External dependencies
 */
import { FrontendUtils, BlockData } from '@fincommerce/e2e-utils';

export const blockData: BlockData = {
	name: 'Mini-Cart',
	slug: 'fincommerce/mini-cart',
	mainClass: '.wc-block-minicart',
	selectors: {
		frontend: {},
		editor: {},
	},
};

export const openMiniCart = async ( frontendUtils: FrontendUtils ) => {
	const block = await frontendUtils.getBlockByName( 'fincommerce/mini-cart' );
	await block.click();
};
