/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@finpress/block-editor';
import { Sidebar } from '@fincommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import type { TemplateArray } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps( { className: 'wc-block-cart__sidebar' } );
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CART_TOTALS );
	const defaultTemplate = [
		[ 'fincommerce/cart-order-summary-block', {}, [] ],
		[ 'fincommerce/cart-express-payment-block', {}, [] ],
		[ 'fincommerce/proceed-to-checkout-block', {}, [] ],
		[ 'fincommerce/cart-accepted-payment-methods-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<Sidebar { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</Sidebar>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
