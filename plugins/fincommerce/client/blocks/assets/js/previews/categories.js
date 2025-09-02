/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { WC_BLOCKS_IMAGE_URL } from '@fincommerce/block-settings';

export const previewCategories = [
	{
		id: 1,
		name: __( 'Clothing', 'fincommerce' ),
		slug: 'clothing',
		parent: 0,
		count: 10,
		description: `<p>${ __(
			'Branded t-shirts, jumpers, pants and more!',
			'fincommerce'
		) }</p>\n`,
		image: {
			id: 1,
			date_created: '2019-07-15T17:05:04',
			date_created_gmt: '2019-07-15T17:05:04',
			date_modified: '2019-07-15T17:05:04',
			date_modified_gmt: '2019-07-15T17:05:04',
			src: WC_BLOCKS_IMAGE_URL + 'previews/collection.jpg',
			name: '',
			alt: '',
		},
		permalink: '#',
	},
];
