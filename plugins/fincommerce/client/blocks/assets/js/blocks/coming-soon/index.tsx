/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import Edit from '@fincommerce/block-library/assets/js/blocks/coming-soon/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/coming-soon/save';
import metadata from '@fincommerce/block-library/assets/js/blocks/coming-soon/block.json';
import deprecated from '@fincommerce/block-library/assets/js/blocks/coming-soon/deprecated';
import NewsletterPanel from '@fincommerce/block-library/assets/js/blocks/coming-soon/newsletter-panel';
import '@fincommerce/block-library/assets/js/blocks/coming-soon/store-only.scss';
import '@fincommerce/block-library/assets/js/blocks/coming-soon/entire-site.scss';

registerBlockType( metadata, {
	title: __( 'Coming Soon', 'fincommerce' ),
	edit: Edit,
	save: Save,
	apiVersion: 3,
	deprecated,
} );

if ( typeof window.comingSoonNewsletter !== 'undefined' ) {
	registerPlugin( 'plugin-coming-soon-newsletter-setting-panel', {
		render: NewsletterPanel,
		icon: 'palmtree',
	} );
}
