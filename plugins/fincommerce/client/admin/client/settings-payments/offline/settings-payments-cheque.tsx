/**
 * External dependencies
 */
import {
	Button,
	CheckboxControl,
	TextControl,
	TextareaControl,
} from '@finpress/components';
import { __ } from '@finpress/i18n';
import { useDispatch, useSelect } from '@finpress/data';
import { paymentGatewaysStore, paymentSettingsStore } from '@fincommerce/data';
import { useState, useEffect } from '@finpress/element';

/**
 * Internal dependencies
 */
import '../settings-payments-body.scss';
import { Settings } from '~/settings-payments/components/settings';
import { FieldPlaceholder } from '~/settings-payments/components/field-placeholder';

/**
 * This page is used to manage the settings for the Cheque payment gateway.
 * Noting that we refer to it as 'cheque' in the code, but use the American English spelling
 * 'check' in the UI.
 */
export const SettingsPaymentsCheque = () => {
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( 'core/notices' );
	const { chequeSettings, isLoading } = useSelect(
		( select ) => ( {
			chequeSettings:
				select( paymentGatewaysStore ).getPaymentGateway( 'cheque' ),
			isLoading: ! select( paymentGatewaysStore ).hasFinishedResolution(
				'getPaymentGateway',
				[ 'cheque' ]
			),
		} ),
		[]
	);

	const { updatePaymentGateway, invalidateResolutionForStoreSelector } =
		useDispatch( paymentGatewaysStore );

	const {
		invalidateResolution,
		invalidateResolutionForStoreSelector:
			invalidateResolutionForPaymentSettings,
	} = useDispatch( paymentSettingsStore );

	const [ formValues, setFormValues ] = useState<
		Record< string, string | boolean | string[] >
	>( {} );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ hasChanges, setHasChanges ] = useState( false );

	useEffect( () => {
		if ( chequeSettings ) {
			setFormValues( {
				enabled: chequeSettings.enabled,
				title: chequeSettings.settings.title.value,
				description: chequeSettings.description,
				instructions: chequeSettings.settings.instructions.value,
			} );
		}
	}, [ chequeSettings ] );

	const saveSettings = () => {
		if ( ! chequeSettings ) {
			return;
		}

		setIsSaving( true );

		const settings: Record< string, string > = {
			title: String( formValues.title ),
			instructions: String( formValues.instructions ),
		};

		updatePaymentGateway( 'cheque', {
			enabled: Boolean( formValues.enabled ),
			description: String( formValues.description ),
			settings,
		} )
			.then( () => {
				setHasChanges( false );
				invalidateResolutionForStoreSelector( 'getPaymentGateway' );
				createSuccessNotice(
					__( 'Settings updated successfully', 'fincommerce' )
				);
			} )
			.catch( () => {
				createErrorNotice(
					__( 'Failed to update settings', 'fincommerce' )
				);
			} )
			.finally( () => {
				setIsSaving( false );
				invalidateResolution( 'getPaymentProviders', [] );
				invalidateResolutionForPaymentSettings(
					'getOfflinePaymentGateways'
				);
			} );
	};

	return (
		<Settings>
			<Settings.Layout>
				<Settings.Form
					onSubmit={ ( e ) => {
						e.preventDefault();
						saveSettings();
					} }
				>
					<Settings.Section
						title={ __( 'Enable and customise', 'fincommerce' ) }
						description={ __(
							'Choose how you want to present check payments to your customers during checkout.',
							'fincommerce'
						) }
					>
						{ isLoading ? (
							<FieldPlaceholder size="small" />
						) : (
							<CheckboxControl
								label={ __(
									'Enable check payments',
									'fincommerce'
								) }
								checked={ Boolean( formValues.enabled ) }
								onChange={ ( checked ) => {
									setFormValues( {
										...formValues,
										enabled: checked,
									} );
									setHasChanges( true );
								} }
							/>
						) }
						{ isLoading ? (
							<FieldPlaceholder size="medium" />
						) : (
							<TextControl
								label={ __( 'Title', 'fincommerce' ) }
								help={ __(
									'Payment method name that the customer will see during checkout.',
									'fincommerce'
								) }
								placeholder={ __(
									'Check payments',
									'fincommerce'
								) }
								value={ String( formValues.title ) }
								onChange={ ( value ) => {
									setFormValues( {
										...formValues,
										title: value,
									} );
									setHasChanges( true );
								} }
							/>
						) }
						{ isLoading ? (
							<FieldPlaceholder size="large" />
						) : (
							<TextareaControl
								label={ __( 'Description', 'fincommerce' ) }
								help={ __(
									'Payment method description that the customer will see during checkout.',
									'fincommerce'
								) }
								value={ String( formValues.description ) }
								onChange={ ( value ) => {
									setFormValues( {
										...formValues,
										description: value,
									} );
									setHasChanges( true );
								} }
							/>
						) }
						{ isLoading ? (
							<FieldPlaceholder size="large" />
						) : (
							<TextareaControl
								label={ __( 'Instructions', 'fincommerce' ) }
								help={ __(
									'Instructions that will be added to the thank you page and emails.',
									'fincommerce'
								) }
								value={ String( formValues.instructions ) }
								onChange={ ( value ) => {
									setFormValues( {
										...formValues,
										instructions: value,
									} );
									setHasChanges( true );
								} }
							/>
						) }
					</Settings.Section>
					<Settings.Actions>
						<Button
							variant="primary"
							type="submit"
							isBusy={ isSaving }
							disabled={ isSaving || ! hasChanges }
						>
							{ __( 'Save changes', 'fincommerce' ) }
						</Button>
					</Settings.Actions>
				</Settings.Form>
			</Settings.Layout>
		</Settings>
	);
};

export default SettingsPaymentsCheque;
