/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createInterpolateElement } from '@finpress/element';
import { UpgradeDowngradeNotice } from '@fincommerce/editor-components/upgrade-downgrade-notice';
import { useDispatch, select } from '@finpress/data';
import { createBlock } from '@finpress/blocks';

export const UpgradeNotice = ( { clientId }: { clientId: string } ) => {
	const { replaceBlock, removeBlock, updateBlockAttributes, selectBlock } =
		useDispatch( 'core/block-editor' );

	const notice = createInterpolateElement(
		__(
			'Upgrade all Filter blocks on this page for better performance and more customizability',
			'fincommerce'
		),
		{
			strongText: (
				<strong>{ __( `Product Filters`, 'fincommerce' ) }</strong>
			),
		}
	);

	const buttonLabel = __( 'Upgrade all Filter blocks', 'fincommerce' );

	const handleClick = () => {
		const { getBlocksByName, getBlockParentsByBlockName } =
			select( 'core/block-editor' );

		const blockParent = getBlockParentsByBlockName(
			clientId,
			'fincommerce/filter-wrapper'
		);

		const newBlock = createBlock( 'fincommerce/product-filters' );

		if ( blockParent.length ) {
			replaceBlock( blockParent[ 0 ], newBlock );
		} else {
			replaceBlock( clientId, newBlock );
		}

		const legacyFilterBlockWrapper = getBlocksByName(
			'fincommerce/filter-wrapper'
		);

		// We want to remove all the legacy filter blocks on the page.
		legacyFilterBlockWrapper.forEach( ( blockId: string ) => {
			// We need to disable locked blocks first.
			updateBlockAttributes( blockId, {
				lock: {
					remove: false,
				},
			} );

			removeBlock( blockId );
		} );

		// These are the v1 legacy filters without the wrapper block.
		const v1LegacyFilterBlocks = [
			'fincommerce/active-filters',
			'fincommerce/price-filter',
			'fincommerce/attribute-filter',
			'fincommerce/stock-filter',
		];

		v1LegacyFilterBlocks.forEach( ( blockName ) => {
			const block = getBlocksByName( blockName );

			if ( block.length ) {
				// We need to disable locked blocks first.
				updateBlockAttributes( block[ 0 ], {
					lock: {
						remove: false,
					},
				} );

				removeBlock( block[ 0 ] );
			}
		} );

		// Make sure to put the focus on the newly added Product Filters block.
		selectBlock( newBlock.clientId );
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
