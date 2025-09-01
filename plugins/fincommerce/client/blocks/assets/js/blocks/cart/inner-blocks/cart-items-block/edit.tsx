/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Main } from '@fincommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';
import crossSells from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/cross-sells';

interface Props {
	clientId: string;
}

export const Edit = ( { clientId }: Props ): JSX.Element => {
	const blockProps = useBlockProps( { className: 'wc-block-cart__main' } );
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CART_ITEMS );
	// Product collection is used for the Cross-Sells block.
	// We don't want to set a parent on the product collection block
	// so we add it here manually.
	allowedBlocks.push( 'fincommerce/product-collection' );

	const defaultTemplate = [
		[ 'fincommerce/cart-line-items-block', {}, [] ],
		[
			'fincommerce/product-collection',
			{
				...crossSells.attributes,
				displayLayout: {
					...crossSells.attributes.displayLayout,
					columns: 3,
				},
				query: {
					...crossSells.attributes.query,
					perPage: 3,
				},
				collection: 'fincommerce/product-collection/cross-sells',
			},
			crossSells.innerBlocks,
		],
	] as unknown as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );
	return (
		<Main { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</Main>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
