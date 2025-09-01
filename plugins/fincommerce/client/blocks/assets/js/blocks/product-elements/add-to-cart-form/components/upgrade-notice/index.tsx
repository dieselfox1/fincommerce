/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { recordEvent } from '@fincommerce/tracks';
import { dispatch, select } from '@wordpress/data';
import { UpgradeDowngradeNotice as Notice } from '@fincommerce/editor-components/upgrade-downgrade-notice';
import { findBlock } from '@fincommerce/utils';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form/block.json';

const upgradeToBlockifiedAddToCartWithOptions = async (
	blockClientId: string
) => {
	const blocks = select( 'core/block-editor' ).getBlocks();
	const foundBlock = findBlock( {
		blocks,
		findCondition: ( block ) =>
			block.name === metadata.name && block.clientId === blockClientId,
	} );

	if ( ! foundBlock ) {
		return false;
	}

	const newBlock = createBlock( 'fincommerce/add-to-cart-with-options' );
	dispatch( 'core/block-editor' ).replaceBlock(
		foundBlock.clientId,
		newBlock
	);

	return true;
};

export const UpgradeNotice = ( {
	blockClientId,
}: {
	blockClientId: string;
} ) => {
	const notice = createInterpolateElement(
		__(
			'Gain access to more customization options when you upgrade to the <strongText />.',
			'fincommerce'
		),
		{
			strongText: (
				<strong>
					{ __( `blockified experience`, 'fincommerce' ) }
				</strong>
			),
		}
	);

	const buttonLabel = __(
		'Upgrade to the Add to Cart + Options block',
		'fincommerce'
	);

	const handleClick = async () => {
		const upgraded = await upgradeToBlockifiedAddToCartWithOptions(
			blockClientId
		);
		if ( upgraded ) {
			recordEvent( 'blocks_add_to_cart_with_options_migration', {
				transform_to: 'blockified',
			} );
		}
	};

	return (
		<Notice
			isDismissible={ false }
			actionLabel={ buttonLabel }
			onActionClick={ handleClick }
		>
			{ notice }
		</Notice>
	);
};
