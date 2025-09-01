/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Spinner } from '@wordpress/components';
import { updateQueryString } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { getPluginTrackKey } from '~/utils';

export const Action = ( {
	hasSetup = false,
	needsSetup = true,
	id,
	isEnabled = false,
	isLoading = false,
	isInstalled = false,
	isRecommended = false,
	hasPlugins,
	manageUrl = null,
	markConfigured = () => {},
	onSetUp = () => {},
	onSetupCallback,
	setupButtonText = __( 'Get started', 'fincommerce' ),
	externalLink = null,
} ) => {
	const [ isBusy, setIsBusy ] = useState( false );

	const classes = 'fincommerce-task-payment__action';

	if ( isLoading ) {
		return <Spinner />;
	}

	const handleClick = async () => {
		onSetUp( id );

		recordEvent( 'tasklist_payment_setup', {
			selected: getPluginTrackKey( id ),
		} );

		if ( ! hasPlugins && externalLink ) {
			window.location.href = externalLink;
			return;
		}

		if ( onSetupCallback ) {
			setIsBusy( true );
			await new Promise( onSetupCallback )
				.then( () => {
					setIsBusy( false );
				} )
				.catch( () => {
					setIsBusy( false );
				} );

			return;
		}

		updateQueryString( {
			id,
		} );
	};

	const ManageButton = () => (
		<Button
			className={ classes }
			isSecondary
			role="button"
			href={ manageUrl }
			onClick={ () => recordEvent( 'tasklist_payment_manage', { id } ) }
		>
			{ __( 'Manage', 'fincommerce' ) }
		</Button>
	);

	const SetupButton = () => (
		<Button
			className={ classes }
			isPrimary={ isRecommended }
			isSecondary={ ! isRecommended }
			isBusy={ isBusy }
			disabled={ isBusy }
			onClick={ () => handleClick() }
		>
			{ setupButtonText }
		</Button>
	);

	const EnableButton = () => (
		<Button
			className={ classes }
			isSecondary
			onClick={ () => markConfigured( id ) }
		>
			{ __( 'Enable', 'fincommerce' ) }
		</Button>
	);

	if ( ! hasSetup ) {
		if ( ! isEnabled ) {
			return <EnableButton />;
		}

		return <ManageButton />;
	}

	// This isolates core gateways that include setup
	if ( ! hasPlugins ) {
		if ( isEnabled ) {
			return <ManageButton />;
		}

		return <SetupButton />;
	}

	if ( ! needsSetup ) {
		if ( ! isEnabled ) {
			return <EnableButton />;
		}

		return <ManageButton />;
	}

	if ( isInstalled && hasPlugins ) {
		return (
			<Button
				className={ classes }
				isPrimary={ isRecommended }
				isSecondary={ ! isRecommended }
				isBusy={ isBusy }
				disabled={ isBusy }
				onClick={ () => handleClick() }
			>
				{ __( 'Finish setup', 'fincommerce' ) }
			</Button>
		);
	}

	return <SetupButton />;
};
