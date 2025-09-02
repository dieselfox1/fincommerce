/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { createBlock } from '@finpress/blocks';
import { dispatch, select } from '@finpress/data';
import { UpgradeDowngradeNotice } from '@fincommerce/editor-components/upgrade-downgrade-notice';
import { findBlock } from '@fincommerce/utils';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/block.json';

const downgradeToClassicAddToCartWithOptions = ( blockClientId: string ) => {
	const blocks = select( 'core/block-editor' ).getBlocks();
	const foundBlock = findBlock( {
		blocks,
		findCondition: ( block ) =>
			block.name === metadata.name && block.clientId === blockClientId,
	} );

	if ( ! foundBlock ) {
		return false;
	}

	const newBlock = createBlock( 'fincommerce/add-to-cart-form', {
		quantitySelectorStyle: 'input',
	} );

	dispatch( 'core/block-editor' ).replaceBlock(
		foundBlock.clientId,
		newBlock
	);

	return true;
};

export const DowngradeNotice = ( {
	blockClientId,
}: {
	blockClientId: string;
} ) => {
	const notice = __(
		'Switch back to the classic Add to Cart + Options block.',
		'fincommerce'
	);

	const buttonLabel = __( 'Switch back', 'fincommerce' );

	const handleClick = async () => {
		const downgraded = await downgradeToClassicAddToCartWithOptions(
			blockClientId
		);
		if ( downgraded ) {
			recordEvent( 'blocks_add_to_cart_with_options_migration', {
				transform_to: 'legacy',
			} );
		}
	};

	return (
		<UpgradeDowngradeNotice
			isDismissible={ false }
			actionLabel={ buttonLabel }
			onActionClick={ handleClick }
		>
			{ notice }
		</UpgradeDowngradeNotice>
	);
};
