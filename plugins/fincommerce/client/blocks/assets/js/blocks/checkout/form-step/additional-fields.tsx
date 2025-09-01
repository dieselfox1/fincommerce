/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/checkout/form-step/editor.scss';
import { useForcedLayout, getAllowedBlocks } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';

export const AdditionalFields = ( {
	block,
}: {
	// Name of the parent block.
	block: string;
} ): JSX.Element => {
	const { 'data-block': clientId } = useBlockProps();
	const allowedBlocks = getAllowedBlocks( block );

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
	} );

	return (
		<div className="wc-block-checkout__additional_fields">
			<InnerBlocks allowedBlocks={ allowedBlocks } />
		</div>
	);
};

export const AdditionalFieldsContent = (): JSX.Element => (
	<InnerBlocks.Content />
);
