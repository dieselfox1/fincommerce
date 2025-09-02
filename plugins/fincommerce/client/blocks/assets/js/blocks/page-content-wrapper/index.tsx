/**
 * External dependencies
 */
import {
	registerBlockType,
	InnerBlockTemplate,
	BlockAttributes,
} from '@finpress/blocks';
import { __ } from '@finpress/i18n';
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';
import { page } from '@finpress/icons';
import { CHECKOUT_PAGE_ID, CART_PAGE_ID } from '@fincommerce/block-settings';
import { useEffect } from '@finpress/element';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/page-content-wrapper/block.json';
import '@fincommerce/block-library/assets/js/blocks/page-content-wrapper/editor.scss';

const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ) => {
	const TEMPLATE: InnerBlockTemplate[] = [
		[ 'core/post-title', { align: 'wide', level: 1 } ],
		[ 'core/post-content', { align: 'wide' } ],
	];

	const blockProps = useBlockProps( {
		className: 'wp-block-fincommerce-page-content-wrapper',
	} );

	useEffect( () => {
		if ( ! attributes.postId && attributes.page ) {
			let postId = 0;

			if ( attributes.page === 'checkout' ) {
				postId = CHECKOUT_PAGE_ID;
			}

			if ( attributes.page === 'cart' ) {
				postId = CART_PAGE_ID;
			}

			if ( postId ) {
				setAttributes( { postId, postType: 'page' } );
			}
		}
	}, [ attributes, setAttributes ] );

	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

registerBlockType( metadata, {
	icon: {
		src: page,
	},
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	variations: [
		{
			name: 'checkout-page',
			title: __( 'Checkout Page', 'fincommerce' ),
			attributes: {
				page: 'checkout',
			},
			isActive: ( blockAttributes, variationAttributes ) =>
				blockAttributes.page === variationAttributes.page,
		},
		{
			name: 'cart-page',
			title: __( 'Cart Page', 'fincommerce' ),
			attributes: {
				page: 'cart',
			},
			isActive: ( blockAttributes, variationAttributes ) =>
				blockAttributes.page === variationAttributes.page,
		},
	],
} );
