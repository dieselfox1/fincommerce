/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createInterpolateElement } from '@finpress/element';
import { recordEvent } from '@fincommerce/tracks';
import { UpgradeDowngradeNotice } from '@fincommerce/editor-components/upgrade-downgrade-notice';

export const UpgradeNotice = ( props: { upgradeBlock: () => void } ) => {
	const notice = createInterpolateElement(
		__(
			'Upgrade all Products (Beta) blocks on this page to <strongText /> for more features!',
			'fincommerce'
		),
		{
			strongText: (
				<strong>{ __( `Product Collection`, 'fincommerce' ) }</strong>
			),
		}
	);

	const buttonLabel = __( 'Upgrade to Product Collection', 'fincommerce' );

	const handleClick = () => {
		props.upgradeBlock();
		recordEvent(
			'blocks_product_collection_migration_between_products_beta',
			{
				transform_to: 'product_collection',
			}
		);
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
