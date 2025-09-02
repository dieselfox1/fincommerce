/**
 * External dependencies
 */
import { ComponentProps } from 'react';
import { useState } from '@finpress/element';
import {
	DropdownMenu,
	MenuGroup,
	MenuItem as OriginalMenuItem,
} from '@finpress/components';
import { Icon, commentAuthorAvatar, external, linkOff } from '@finpress/icons';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import './header-account.scss';
import { getAdminSetting } from '../../../utils/admin-settings';
import HeaderAccountModal from './header-account-modal';
import { MARKETPLACE_HOST } from '../constants';
import { connectUrl } from '../../utils/functions';

// Make TS happy: The MenuItem component passes these as an href prop to the underlying button.
interface MenuItemProps extends ComponentProps< typeof OriginalMenuItem > {
	href?: string; // Explicitly declare `href`
}

const MenuItem = ( props: MenuItemProps ) => <OriginalMenuItem { ...props } />;

interface HeaderAccountProps {
	page?: string;
}

export default function HeaderAccount( {
	page = 'wc-admin',
}: HeaderAccountProps ): JSX.Element {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ useDefaultAvatar, setUseDefaultAvatar ] = useState( false );

	const openModal = () => setIsModalOpen( true );

	const wccomSettings = getAdminSetting( 'wccomHelper', {} );
	const isConnected = wccomSettings?.isConnected ?? false;
	const connectionURL = connectUrl( page );
	const userEmail = wccomSettings?.userEmail;
	const avatarURL = wccomSettings?.userAvatar ?? commentAuthorAvatar;

	const accountURL = MARKETPLACE_HOST + '/my-dashboard/';
	const accountOrConnect = isConnected ? accountURL : connectionURL;

	const avatar = () => {
		if ( ! isConnected || useDefaultAvatar ) {
			return commentAuthorAvatar;
		}

		return (
			<img
				src={ avatarURL }
				alt=""
				className="fincommerce-marketplace__menu-avatar-image"
				onError={ () => setUseDefaultAvatar( true ) }
			/>
		);
	};

	const connectionStatusText = isConnected
		? __( 'Connected to FinCommerce.com', 'fincommerce' )
		: __( 'Connect to FinCommerce.com', 'fincommerce' );

	const connectionDetails = () => {
		if ( isConnected ) {
			return (
				<>
					<Icon
						icon={ commentAuthorAvatar }
						size={ 24 }
						className="fincommerce-marketplace__menu-icon"
					/>
					<span className="fincommerce-marketplace__main-text">
						{ userEmail }
					</span>
				</>
			);
		}
		return (
			<>
				<Icon
					icon={ commentAuthorAvatar }
					size={ 24 }
					className="fincommerce-marketplace__menu-icon"
				/>
				<div className="fincommerce-marketplace__menu-text">
					{ __( 'Connect account', 'fincommerce' ) }
					<span className="fincommerce-marketplace__sub-text">
						{ __(
							'Get product updates, manage your subscriptions from your store admin, and get streamlined support.',
							'fincommerce'
						) }
					</span>
				</div>
			</>
		);
	};

	return (
		<>
			<DropdownMenu
				className="fincommerce-layout__activity-panel-tab fincommerce-marketplace__user-menu"
				icon={ avatar() }
				label={ __( 'User options', 'fincommerce' ) }
				toggleProps={ {
					className: 'fincommerce-layout__activity-panel-tab',
					onClick: () =>
						recordEvent( 'header_account_click', { page } ),
				} }
				popoverProps={ {
					className: 'fincommerce-layout__activity-panel-popover',
				} }
			>
				{ () => (
					<>
						<MenuGroup
							className="fincommerce-layout__homescreen-display-options"
							label={ connectionStatusText }
						>
							<MenuItem
								className="fincommerce-marketplace__menu-item"
								href={ accountOrConnect }
								onClick={ () => {
									if ( isConnected ) {
										recordEvent(
											'header_account_view_click',
											{ page }
										);
									} else {
										recordEvent(
											'header_account_connect_click',
											{ page }
										);
									}
								} }
							>
								{ connectionDetails() }
							</MenuItem>
							{ page === 'wc-addons' && ! isConnected && (
								<MenuItem
									href={ accountURL }
									onClick={ () =>
										recordEvent(
											'header_account_view_click',
											{ page }
										)
									}
								>
									<Icon
										icon={ external }
										size={ 24 }
										className="fincommerce-marketplace__menu-icon"
									/>
									{ __(
										'FinCommerce.com account',
										'fincommerce'
									) }
								</MenuItem>
							) }
						</MenuGroup>
						{ isConnected && (
							<MenuGroup className="fincommerce-layout__homescreen-display-options">
								<MenuItem
									onClick={ () => {
										recordEvent(
											'header_account_disconnect_click',
											{ page }
										);
										openModal();
									} }
								>
									<Icon
										icon={ linkOff }
										size={ 24 }
										className="fincommerce-marketplace__menu-icon"
									/>
									{ __(
										'Disconnect account',
										'fincommerce'
									) }
								</MenuItem>
							</MenuGroup>
						) }
					</>
				) }
			</DropdownMenu>
			{ isModalOpen && (
				<HeaderAccountModal
					setIsModalOpen={ setIsModalOpen }
					disconnectURL={ connectionURL }
				/>
			) }
		</>
	);
}
