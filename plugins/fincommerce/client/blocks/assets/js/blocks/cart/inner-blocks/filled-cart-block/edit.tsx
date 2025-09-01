/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import { SidebarLayout } from '@fincommerce/base-components/sidebar-layout';
import type { TemplateArray } from '@wordpress/blocks';
import { useEditorContext } from '@fincommerce/base-context';

/**
 * Internal dependencies
 */
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/filled-cart-block/editor.scss';
import { useCartBlockContext } from '@fincommerce/block-library/assets/js/blocks/cart/context';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const { currentView } = useEditorContext();
	const { hasDarkControls } = useCartBlockContext();
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.FILLED_CART );
	const defaultTemplate = [
		[ 'fincommerce/cart-items-block', {}, [] ],
		[ 'fincommerce/cart-totals-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );
	return (
		<div
			{ ...blockProps }
			hidden={ currentView !== 'fincommerce/filled-cart-block' }
		>
			<SidebarLayout
				className={ clsx( 'wc-block-cart', {
					'has-dark-controls': hasDarkControls,
				} ) }
			>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ defaultTemplate }
					templateLock="insert"
				/>
			</SidebarLayout>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
