/**
 * External dependencies
 */
import { ComponentProps } from 'react';
import { Button, ButtonGroup, Modal } from '@wordpress/components';
import { useContext, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { SubscriptionsContext } from '../../../../contexts/subscriptions-context';
import {
	activateProductPlugin,
	addNotice,
	connectProduct,
	removeNotice,
} from '../../../../utils/functions';
import {
	getConnectionErrorMessage,
	getConnectionErrorAction,
	trackConnectErrorActionClicked,
	type ConnectError,
} from '../../error-utils';
import { Subscription } from '../../types';
import { NoticeStatus } from '../../../../contexts/types';
import sanitizeHTML from '~/lib/sanitize-html';

type ButtonProps = ComponentProps< typeof Button >;

interface ConnectProps {
	subscription: Subscription;
	onClose?: () => void;
	variant?: ButtonProps[ 'variant' ];
}

export default function ConnectButton( props: ConnectProps ) {
	const [ isConnecting, setIsConnecting ] = useState( false );
	const [ showActivationConfirmation, setShowActivationConfirmation ] =
		useState( false );
	const { loadSubscriptions } = useContext( SubscriptionsContext );

	const refreshSubscriptionsList = () => {
		setIsConnecting( true );
		setShowActivationConfirmation( false );
		loadSubscriptions( false )
			.then( () => {
				addNotice(
					props.subscription.product_key,
					sprintf(
						// translators: %s is the product name.
						__( '%s successfully connected.', 'fincommerce' ),
						props.subscription.product_name
					),
					NoticeStatus.Success
				);
				setIsConnecting( false );
				if ( props.onClose ) {
					props.onClose();
				}
			} )
			.catch( () => {
				setIsConnecting( false );
			} );
	};

	const connect = () => {
		recordEvent( 'marketplace_product_connect_button_clicked', {
			product_zip_slug: props.subscription.zip_slug,
			product_id: props.subscription.product_id,
		} );

		setIsConnecting( true );
		setShowActivationConfirmation( false );
		removeNotice( props.subscription.product_key );
		connectProduct( props.subscription )
			.then( () => {
				if (
					props.subscription.local.installed &&
					! props.subscription.local.active &&
					props.subscription.local.type === 'plugin'
				) {
					setIsConnecting( false );
					setShowActivationConfirmation( true );
					return;
				}

				refreshSubscriptionsList();
			} )
			.catch( ( error: unknown ) => {
				const connectError = error as ConnectError;
				const baseNoticeMessage = sprintf(
					// translators: %s is the product name.
					__( '%s couldn’t be connected.', 'fincommerce' ),
					props.subscription.product_name
				);
				const noticeMessage = getConnectionErrorMessage(
					connectError,
					baseNoticeMessage
				);
				const action = getConnectionErrorAction( connectError );

				const actions = action
					? [ action ]
					: [
							{
								label: __( 'Try again', 'fincommerce' ),
								onClick: () => {
									trackConnectErrorActionClicked(
										'try_again',
										connectError.data?.code || ''
									);
									connect();
								},
							},
					  ];

				addNotice(
					props.subscription.product_key,
					noticeMessage,
					NoticeStatus.Error,
					{ actions }
				);
				setIsConnecting( false );
				if ( props.onClose ) {
					props.onClose();
				}
			} );
	};

	const activatePlugin = () => {
		setIsConnecting( true );
		activateProductPlugin( props.subscription )
			.then( () => {
				refreshSubscriptionsList();
			} )
			.catch( () => {
				addNotice(
					props.subscription.product_key,
					sprintf(
						// translators: %s is the product name.
						__(
							'%s is connected to FinCommerce.com but failed to activate the local plugin.',
							'fincommerce'
						),
						props.subscription.product_name
					),
					NoticeStatus.Error
				);
			} );
		setShowActivationConfirmation( false );
	};

	const activationConfirmationModal = () => {
		if ( ! showActivationConfirmation ) {
			return null;
		}
		return (
			<Modal
				title={ __( 'Activate the Plugin', 'fincommerce' ) }
				onRequestClose={ () => refreshSubscriptionsList() }
				focusOnMount={ true }
				className="fincommerce-marketplace__header-account-modal"
				style={ { borderRadius: 4 } }
				overlayClassName="fincommerce-marketplace__header-account-modal-overlay"
			>
				<p className="fincommerce-marketplace__header-account-modal-text">
					<span
						dangerouslySetInnerHTML={ sanitizeHTML(
							sprintf(
								// translators: %s is the product name.
								__(
									'<b>%s</b> is installed but not activated on this store. Would you like to activate it now?',
									'fincommerce'
								),
								props.subscription.product_name
							)
						) }
					/>
				</p>
				<ButtonGroup className="fincommerce-marketplace__header-account-modal-button-group">
					<Button
						onClick={ () => refreshSubscriptionsList() }
						variant="tertiary"
						className="fincommerce-marketplace__header-account-modal-button"
					>
						{ __( 'No', 'fincommerce' ) }
					</Button>
					<Button onClick={ activatePlugin } variant="primary">
						{ __( 'Yes', 'fincommerce' ) }
					</Button>
				</ButtonGroup>
			</Modal>
		);
	};

	return (
		<>
			{ activationConfirmationModal() }
			<Button
				onClick={ connect }
				variant={ props.variant ?? 'secondary' }
				isBusy={ isConnecting }
				disabled={ isConnecting }
			>
				{ __( 'Connect', 'fincommerce' ) }
			</Button>
		</>
	);
}
