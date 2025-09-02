/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { createInterpolateElement, useContext } from '@finpress/element';
import { Icon, external } from '@finpress/icons';
import apiFetch from '@finpress/api-fetch';

/**
 * Internal dependencies
 */
import { getAdminSetting } from '../../../utils/admin-settings';
import { SubscriptionsContext } from '../../contexts/subscriptions-context';
import './my-subscriptions.scss';
import {
	AvailableSubscriptionsTable,
	InstalledSubscriptionsTable,
} from './table/table';
import { subscriptionRow } from './table/table-rows';
import { Subscription } from './types';
import { RefreshButton } from './table/actions/refresh-button';
import Notices from './notices';
import InstallModal from './table/actions/install-modal';
import { connectUrl } from '../../utils/functions';
import Notice from '../notice/notice';

export default function MySubscriptions(): JSX.Element {
	const { subscriptions, isLoading } = useContext( SubscriptionsContext );
	const wccomSettings = getAdminSetting( 'wccomHelper', {} );

	const installedTableDescription = createInterpolateElement(
		__(
			'FinCommerce.com extensions and themes installed on this store. To see all your subscriptions go to <a>your account<custom_icon /></a> on FinCommerce.com.',
			'fincommerce'
		),
		{
			a: (
				<a
					href="https://fincommerce.com/my-account/my-subscriptions"
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					your account
				</a>
			),
			custom_icon: <Icon icon={ external } size={ 12 } />,
		}
	);

	const subscriptionsInstalled: Array< Subscription > = subscriptions.filter(
		( subscription: Subscription ) => subscription.subscription_installed
	);

	const subscriptionsAvailable: Array< Subscription > = subscriptions.filter(
		( subscription: Subscription ) =>
			! subscription.subscription_installed &&
			wccomSettings?.wooUpdateManagerPluginSlug !==
				subscription.product_slug &&
			! subscription.maxed // no more connections allowed for the subscription so it's no longer "available to use"
	);

	const handleConnectNoticeClose = () => {
		const data = {
			notice_id: 'woo-connect-notice',
			dismiss_notice_nonce: wccomSettings?.dismissNoticeNonce || '',
		};
		apiFetch( {
			path: `/wc-admin/notice/dismiss`,
			method: 'POST',
			data,
		} );
		localStorage.setItem(
			'wc-marketplaceNoticeClosed-woo-connect-notice',
			'false'
		);
	};

	if ( ! wccomSettings?.isConnected ) {
		const connectMessage = __(
			'Connect your FinCommerce.com account to get product updates, manage your subscriptions from your store admin, and get streamlined support.',
			'fincommerce'
		);

		const handleDisconnectNoticeClose = () => {
			const data = {
				notice_id: 'woo-disconnect-notice',
				dismiss_notice_nonce: wccomSettings?.dismissNoticeNonce || '',
			};
			apiFetch( {
				path: `/wc-admin/notice/dismiss`,
				method: 'POST',
				data,
			} );
			localStorage.setItem(
				'wc-marketplaceNoticeClosed-woo-disconnect-notice',
				'false'
			);
		};

		return (
			<>
				{ wccomSettings?.disconnected_notice && (
					<Notice
						id={ 'woo-disconnect-notice' }
						description={ wccomSettings?.disconnected_notice }
						isDismissible={ true }
						variant="info"
						onClose={ handleDisconnectNoticeClose }
					/>
				) }
				<div className="fincommerce-marketplace__my-subscriptions--connect">
					<InstallModal />
					<div className="fincommerce-marketplace__my-subscriptions__icon" />
					<h2 className="fincommerce-marketplace__my-subscriptions__header">
						{ __(
							'Connect your FinCommerce.com account',
							'fincommerce'
						) }
					</h2>
					<p className="fincommerce-marketplace__my-subscriptions__description">
						{ connectMessage }
					</p>
					<Button href={ connectUrl() } variant="primary">
						{ __( 'Connect', 'fincommerce' ) }
					</Button>
				</div>
			</>
		);
	}

	return (
		<>
			{ wccomSettings?.connected_notice && (
				<Notice
					id={ 'woo-connect-notice' }
					description={ wccomSettings?.connected_notice }
					isDismissible={ true }
					variant="success"
					onClose={ handleConnectNoticeClose }
				/>
			) }

			{ ! wccomSettings?.has_host_plan_orders &&
				wccomSettings?.connection_url_notice && (
					<Notice
						id={ 'woo-connection-url-notice' }
						description={ wccomSettings?.connection_url_notice }
						isDismissible={ false }
						variant="error"
					>
						<Button
							href={ connectUrl( 'wc-admin', true ) }
							variant="secondary"
						>
							{ __( 'Reconnect', 'fincommerce' ) }
						</Button>
					</Notice>
				) }

			<div className="fincommerce-marketplace__my-subscriptions">
				<InstallModal />
				<section className="fincommerce-marketplace__my-subscriptions__notices">
					<Notices />
				</section>
				<section className="fincommerce-marketplace__my-subscriptions-section fincommerce-marketplace__my-subscriptions__installed">
					<header className="fincommerce-marketplace__my-subscriptions__header">
						<div className="fincommerce-marketplace__my-subscriptions__header-content">
							<h2 className="fincommerce-marketplace__my-subscriptions__heading">
								{ __(
									'Installed on this store',
									'fincommerce'
								) }
							</h2>
							<p className="fincommerce-marketplace__my-subscriptions__table-description">
								{ installedTableDescription }
							</p>
						</div>
						<div className="fincommerce-marketplace__my-subscriptions__header-refresh">
							<RefreshButton />
						</div>
					</header>
					<div className="fincommerce-marketplace__my-subscriptions__table-wrapper">
						<InstalledSubscriptionsTable
							isLoading={ isLoading }
							rows={ subscriptionsInstalled.map( ( item ) => {
								return subscriptionRow( item, 'installed' );
							} ) }
						/>
					</div>
				</section>
				{ subscriptionsAvailable.length > 0 && (
					<section className="fincommerce-marketplace__my-subscriptions-section fincommerce-marketplace__my-subscriptions__available">
						<h2 className="fincommerce-marketplace__my-subscriptions__heading">
							{ __( 'Available to use', 'fincommerce' ) }
						</h2>
						<p className="fincommerce-marketplace__my-subscriptions__table-description">
							{ __(
								"FinCommerce.com subscriptions you haven't used yet.",
								'fincommerce'
							) }
						</p>
						<div className="fincommerce-marketplace__my-subscriptions__table-wrapper">
							<AvailableSubscriptionsTable
								isLoading={ isLoading }
								rows={ subscriptionsAvailable.map( ( item ) => {
									return subscriptionRow( item, 'available' );
								} ) }
							/>
						</div>
					</section>
				) }
			</div>
		</>
	);
}
