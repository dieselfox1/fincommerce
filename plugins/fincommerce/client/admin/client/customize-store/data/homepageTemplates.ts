/**
 * Internal dependencies
 */
import { isWooExpress } from '~/utils/is-woo-express';
import { THEME_SLUG } from './constants';

const introPatternWooExpress = 'fincommerce-blocks/hero-product-split';
export const headerTemplateId = `${ THEME_SLUG }//header`;
export const footerTemplateId = `${ THEME_SLUG }//footer`;

export const HEADER_TEMPLATES = {
	template1: {
		blocks: [ 'fincommerce-blocks/header-centered-menu' ],
	},
	template2: {
		blocks: [ 'fincommerce-blocks/header-essential' ],
	},
	template3: {
		blocks: [ 'fincommerce-blocks/header-centered-menu' ],
	},
};

export const FOOTER_TEMPLATES = {
	template1: {
		blocks: [ 'fincommerce-blocks/footer-with-3-menus' ],
	},
	template2: {
		blocks: [ 'fincommerce-blocks/footer-large' ],
	},
	template3: {
		blocks: [ 'fincommerce-blocks/footer-with-3-menus' ],
	},
};

export const HOMEPAGE_TEMPLATES = {
	template1: {
		blocks: [
			// Body
			isWooExpress()
				? introPatternWooExpress
				: 'fincommerce-blocks/just-arrived-full-hero',
			'fincommerce-blocks/product-collection-5-columns',
			'fincommerce-blocks/hero-product-3-split',
			'fincommerce-blocks/product-collection-3-columns',
			'fincommerce-blocks/testimonials-3-columns',
			'fincommerce-blocks/featured-category-triple',
			'fincommerce-blocks/social-follow-us-in-social-media',
		],
		metadata: {
			businessType: [ 'e-commerce', 'large-business' ],
			contentFocus: [ 'featured products' ],
			audience: [ 'general' ],
			design: [ 'contemporary' ],
			features: [
				'fullwidth-image-banner',
				'testimonials',
				'social-media',
				'search',
			],
			complexity: 'high',
		},
	},
	template2: {
		blocks: [
			// Body
			isWooExpress()
				? introPatternWooExpress
				: 'fincommerce-blocks/featured-category-cover-image',
			'fincommerce-blocks/product-collection-4-columns',
			'fincommerce-blocks/hero-product-chessboard',
			'fincommerce-blocks/product-collection-5-columns',
			'fincommerce-blocks/testimonials-3-columns',
		],
		metadata: {
			businessType: [ 'e-commerce', 'subscription', 'large-business' ],
			contentFocus: [ 'catalog' ],
			audience: [ 'general' ],
			design: [ 'contemporary' ],
			features: [ 'small-banner', 'testimonials', 'newsletter' ],
			complexity: 'high',
		},
	},
	template3: {
		blocks: [
			// Body
			'fincommerce-blocks/hero-product-split',
			'fincommerce-blocks/product-collection-featured-products-5-columns',
			'fincommerce-blocks/featured-category-triple',
			'fincommerce-blocks/product-query-product-gallery',
		],
		metadata: {
			businessType: [ 'subscription', 'large-business' ],
			contentFocus: [ 'catalog', 'call-to-action' ],
			audience: [ 'general' ],
			design: [ 'contemporary' ],
			features: [ 'small-banner', 'social-media' ],
			complexity: 'high',
		},
	},
};
