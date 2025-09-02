/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps, InnerBlocks } from '@finpress/block-editor';
import { Sidebar } from '@fincommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import type { TemplateArray } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-totals-block/style.scss';
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';

export const Edit = ( {
	clientId,
	attributes,
}: {
	clientId: string;
	attributes: {
		className?: string;
	};
} ): JSX.Element => {
	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-checkout__sidebar', attributes?.className ),
	} );
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CHECKOUT_TOTALS );

	const defaultTemplate = [
		[ 'fincommerce/checkout-order-summary-block', {}, [] ],
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
				templateLock={ false }
				template={ defaultTemplate }
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
