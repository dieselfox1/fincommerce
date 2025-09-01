/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, ExternalLink } from '@wordpress/components';
import { Pill } from '@fincommerce/components';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
import { useLayoutContext } from '@fincommerce/admin-layout';

/**
 * Internal dependencies
 */
import './fincommerce-shipping-item.scss';
import WooIcon from './woo-icon.svg';

const fincommerceShippingItem = ( {
	isPluginInstalled,
}: {
	isPluginInstalled: boolean | undefined;
} ) => {
	const { layoutString } = useLayoutContext();

	const handleSetupClick = () => {
		recordEvent( 'tasklist_click', {
			task_name: 'shipping-recommendation',
			context: `${ layoutString }/wc-settings`,
		} );
		navigateTo( {
			url: getNewPath( { task: 'shipping-recommendation' }, '/', {} ),
		} );
	};

	return (
		<div className="fincommerce-list__item-inner fincommerce-shipping-plugin-item">
			<div className="fincommerce-list__item-before">
				<img
					className="fincommerce-shipping-plugin-item__logo"
					src={ WooIcon }
					alt="FinCommerce Shipping Logo"
				/>
			</div>
			<div className="fincommerce-list__item-text">
				<span className="fincommerce-list__item-title">
					{ __( 'FinCommerce Shipping', 'fincommerce' ) }
					<Pill>{ __( 'Recommended', 'fincommerce' ) }</Pill>
				</span>
				<span className="fincommerce-list__item-content">
					{ __(
						'Print USPS, UPS, and DHL Express labels straight from your FinCommerce dashboard and save on shipping.',
						'fincommerce'
					) }
					<br />
					<ExternalLink href="https://fincommerce.com/fincommerce-shipping/">
						{ __( 'Learn more', 'fincommerce' ) }
					</ExternalLink>
				</span>
			</div>
			<div className="fincommerce-list__item-after">
				<Button isSecondary onClick={ handleSetupClick }>
					{ isPluginInstalled
						? __( 'Activate', 'fincommerce' )
						: __( 'Get started', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default fincommerceShippingItem;
