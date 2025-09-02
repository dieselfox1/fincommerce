/**
 * External dependencies
 */
import { ComponentProps } from 'react';
import { Button } from '@finpress/components';
import { dispatch, useSelect } from '@finpress/data';
import { useContext } from '@finpress/element';
import { __, sprintf } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { SubscriptionsContext } from '../../../../contexts/subscriptions-context';
import {
	addNotice,
	getInstallUrl,
	installProduct,
	removeNotice,
} from '../../../../utils/functions';
import { Subscription } from '../../types';
import { installingStore } from '../../../../contexts/install-store';
import { NoticeStatus } from '../../../../contexts/types';

type ButtonProps = ComponentProps< typeof Button >;

interface InstallProps {
	subscription: Subscription;
	variant?: ButtonProps[ 'variant' ];
	onSuccess?: () => void;
	onError?: () => void;
}

export default function Install( props: InstallProps ) {
	const { loadSubscriptions } = useContext( SubscriptionsContext );

	const loading: boolean = useSelect(
		( select ) => {
			return select( installingStore ).isInstalling(
				props.subscription.product_key
			);
		},
		[ props.subscription.product_key ]
	);

	const startInstall = () => {
		dispatch( installingStore ).startInstalling(
			props.subscription.product_key
		);
	};
	const stopInstall = () => {
		dispatch( installingStore ).stopInstalling(
			props.subscription.product_key
		);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleInstallError = ( error: any ) => {
		loadSubscriptions( false ).then( () => {
			let errorMessage = sprintf(
				// translators: %s is the product name.
				__( '%s couldn’t be installed.', 'fincommerce' ),
				props.subscription.product_name
			);
			if ( error?.success === false && error?.data.message ) {
				errorMessage += ' ' + error.data.message;
			}
			addNotice(
				props.subscription.product_key,
				errorMessage,
				NoticeStatus.Error,
				{
					actions: [
						{
							label: __(
								'Download and install manually',
								'fincommerce'
							),
							url: 'https://fincommerce.com/my-account/downloads/',
							onClick: () => {},
						},
					],
				}
			);
			stopInstall();

			if ( props.onError ) {
				props.onError();
			}
		} );

		recordEvent( 'marketplace_product_install_failed', {
			product_zip_slug: props.subscription.zip_slug,
			product_id: props.subscription.product_id,
			product_current_version: props.subscription.version,
			error_message: error?.data?.message,
		} );
	};

	const install = () => {
		recordEvent( 'marketplace_product_install_button_clicked', {
			product_zip_slug: props.subscription.zip_slug,
			product_id: props.subscription.product_id,
			product_current_version: props.subscription.version,
		} );

		startInstall();
		removeNotice( props.subscription.product_key );

		if ( props.subscription.is_installable ) {
			installProduct( props.subscription )
				.then( () => {
					loadSubscriptions( false ).then( () => {
						addNotice(
							props.subscription.product_key,
							sprintf(
								// translators: %s is the product name.
								__(
									'%s successfully installed.',
									'fincommerce'
								),
								props.subscription.product_name
							),
							NoticeStatus.Success
						);
						stopInstall();
					} );

					recordEvent( 'marketplace_product_installed', {
						product_zip_slug: props.subscription.zip_slug,
						product_id: props.subscription.product_id,
						product_current_version: props.subscription.version,
					} );

					if ( props.onSuccess ) {
						props.onSuccess();
					}
				} )
				.catch( handleInstallError );
		} else {
			getInstallUrl( props.subscription )
				.then( ( url: string ) => {
					recordEvent( 'marketplace_product_install_url', {
						product_zip_slug: props.subscription.zip_slug,
						product_id: props.subscription.product_id,
						product_current_version: props.subscription.version,
						product_install_url: url,
					} );

					stopInstall();

					if ( url ) {
						window.open( url, '_self' );
					} else {
						throw new Error();
					}
				} )
				.catch( handleInstallError );
		}
	};

	return (
		<Button
			variant={ props.variant ?? 'link' }
			isBusy={ loading }
			disabled={ loading }
			onClick={ install }
		>
			{ __( 'Install', 'fincommerce' ) }
		</Button>
	);
}
