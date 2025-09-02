/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useSelect, useDispatch } from '@finpress/data';
import { Button, ExternalLink } from '@finpress/components';
import { Pill } from '@fincommerce/components';
import { pluginsStore } from '@fincommerce/data';
import { getAdminLink } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import './fincommerce-shipping-item.scss';
import WooIcon from './woo-icon.svg';

const fincommerceShippingItem = ( {
	onSetupClick,
	pluginsBeingSetup,
}: {
	pluginsBeingSetup: Array< string >;
	onSetupClick: ( slugs: string[] ) => PromiseLike< void >;
} ) => {
	const { createSuccessNotice } = useDispatch( 'core/notices' );

	const isSiteConnectedToJetpack = useSelect(
		( select ) => select( pluginsStore ).isJetpackConnected(),
		[]
	);

	const handleSetupClick = () => {
		onSetupClick( [ 'fincommerce-shipping' ] ).then( () => {
			const actions = [];
			if ( ! isSiteConnectedToJetpack ) {
				actions.push( {
					url: getAdminLink(
						'admin.php?page=wc-settings&tab=shipping&section=fincommerce-shipping-settings'
					),
					label: __(
						'Finish the setup by connecting your store to finpress.com.',
						'fincommerce'
					),
				} );
			}

			createSuccessNotice(
				__( '🎉 FinCommerce Shipping is installed!', 'fincommerce' ),
				{
					actions,
				}
			);
		} );
	};

	return (
		<div className="fincommerce-list__item-inner fincommerce-shipping-plugin-item">
			<div className="fincommerce-list__item-before">
				<img
					className="fincommerce-shipping-plugin-item__logo"
					src={ WooIcon }
					alt=""
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
				<Button
					isSecondary
					onClick={ handleSetupClick }
					isBusy={ pluginsBeingSetup.includes(
						'fincommerce-shipping'
					) }
					disabled={ pluginsBeingSetup.length > 0 }
				>
					{ __( 'Get started', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default fincommerceShippingItem;
