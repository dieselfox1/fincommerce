/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@finpress/block-editor';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import type { TemplateArray } from '@finpress/blocks';
import { EditorProvider, useEditorContext } from '@fincommerce/base-context';
import { previewCart } from '@fincommerce/resource-previews';

/**
 * Internal dependencies
 */
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.FILLED_MINI_CART );
	const { currentView } = useEditorContext();

	const defaultTemplate = [
		[ 'fincommerce/mini-cart-title-block', {} ],
		[ 'fincommerce/mini-cart-items-block', {} ],
		[ 'fincommerce/mini-cart-footer-block', {} ],
	].filter( Boolean ) as unknown as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<div
			{ ...blockProps }
			hidden={
				currentView !== 'fincommerce/filled-mini-cart-contents-block'
			}
		>
			<EditorProvider
				currentView={ currentView }
				previewData={ { previewCart } }
			>
				<InnerBlocks
					template={ defaultTemplate }
					allowedBlocks={ allowedBlocks }
					templateLock="insert"
				/>
			</EditorProvider>
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
