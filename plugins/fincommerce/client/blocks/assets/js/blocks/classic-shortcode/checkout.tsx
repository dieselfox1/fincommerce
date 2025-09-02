/**
 * External dependencies
 */
import { createBlock, type BlockInstance } from '@finpress/blocks';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import type { OnClickCallbackParameter, InheritedAttributes } from '@fincommerce/block-library/assets/js/blocks/classic-shortcode/types';

const getButtonLabel = () => __( 'Transform into blocks', 'fincommerce' );

const getBlockifiedTemplate = ( inheritedAttributes: InheritedAttributes ) =>
	[
		createBlock( 'fincommerce/checkout', {
			...inheritedAttributes,
			className: 'wc-block-checkout',
		} ),
	].filter( Boolean ) as BlockInstance[];

const onClickCallback = ( {
	clientId,
	attributes,
	getBlocks,
	replaceBlock,
	selectBlock,
}: OnClickCallbackParameter ) => {
	replaceBlock( clientId, getBlockifiedTemplate( attributes ) );

	const blocks = getBlocks();

	const groupBlock = blocks.find(
		( block ) =>
			block.name === 'core/group' &&
			block.innerBlocks.some(
				( innerBlock ) =>
					innerBlock.name === 'fincommerce/store-notices'
			)
	);

	if ( groupBlock ) {
		selectBlock( groupBlock.clientId );
	}
};

const getTitle = () => {
	return __( 'Classic Checkout', 'fincommerce' );
};

const getDescription = () => {
	return __(
		'This block will render the classic checkout shortcode. You can optionally transform it into blocks for more control over the checkout experience.',
		'fincommerce'
	);
};

const blockifyConfig = {
	getButtonLabel,
	onClickCallback,
	getBlockifiedTemplate,
};

export { blockifyConfig, getDescription, getTitle };
