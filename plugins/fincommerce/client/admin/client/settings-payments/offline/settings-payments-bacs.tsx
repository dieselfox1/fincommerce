/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useDispatch, useSelect } from '@finpress/data';
import {
	CheckboxControl,
	TextControl,
	TextareaControl,
	Button,
} from '@finpress/components';
import { useState, useEffect } from '@finpress/element';
import {
	paymentGatewaysStore,
	optionsStore,
	paymentSettingsStore,
} from '@fincommerce/data';

/**
 * Internal dependencies
 */
import '../settings-payments-body.scss';
import { Settings } from '~/settings-payments/components/settings';
import { FieldPlaceholder } from '~/settings-payments/components/field-placeholder';
import { BankAccountsList } from '~/settings-payments/components/bank-accounts-list';
import { BankAccount } from '~/settings-payments/components/bank-accounts-list/types';

/**
 * This page is used to manage the settings for the BACS (Direct bank transfer) payment gateway.
 */
export const SettingsPaymentsBacs = () => {
	const storeCountryCode =
		window.wcSettings?.admin?.preloadSettings?.general
			?.fincommerce_default_country || 'US';

	const { createSuccessNotice, createErrorNotice } =
		useDispatch( 'core/notices' );

	const { bacsSettings, isLoading } = useSelect(
		( select ) => ( {
			bacsSettings:
				select( paymentGatewaysStore ).getPaymentGateway( 'bacs' ),
			isLoading: ! select( paymentGatewaysStore ).hasFinishedResolution(
				'getPaymentGateway',
				[ 'bacs' ]
			),
		} ),
		[]
	);

	const { invalidateResolution, invalidateResolutionForStoreSelector } =
		useDispatch( paymentSettingsStore );

	const { accountsOption, isLoadingAccounts } = useSelect( ( select ) => {
		const selectors = select( optionsStore );

		return {
			accountsOption: selectors.getOption(
				'fincommerce_bacs_accounts'
			) as BankAccount[] | undefined,
			isLoadingAccounts: ! selectors.hasFinishedResolution( 'getOption', [
				'fincommerce_bacs_accounts',
			] ),
		};
	}, [] );

	const [ formValues, setFormValues ] = useState<
		Record< string, string | boolean | string[] >
	>( {} );

	const [ isSaving, setIsSaving ] = useState( false );
	const [ hasChanges, setHasChanges ] = useState( false );

	useEffect( () => {
		if ( bacsSettings ) {
			setFormValues( {
				enabled: bacsSettings.enabled,
				title: bacsSettings.settings.title.value,
				description: bacsSettings.description,
				instructions: bacsSettings.settings.instructions.value,
			} );
			setHasChanges( false );
		}
	}, [ bacsSettings ] );

	const [ accounts, setAccounts ] = useState< BankAccount[] >( [] );

	useEffect( () => {
		if ( accountsOption ) {
			setAccounts( accountsOption );
		}
	}, [ accountsOption ] );

	const { updateOptions } = useDispatch( optionsStore );
	const { updatePaymentGateway } = useDispatch( paymentGatewaysStore );

	const saveSettings = async () => {
		if ( ! bacsSettings ) {
			return;
		}

		setIsSaving( true );
		const settings: Record< string, string | string[] > = {
			title: String( formValues.title ),
			instructions: String( formValues.instructions ),
		};

		try {
			await Promise.all( [
				updateOptions( {
					fincommerce_bacs_accounts: accounts.map(
						( {
							account_name,
							account_number,
							bank_name,
							sort_code,
							iban,
							bic,
							country_code,
						} ) => ( {
							account_name,
							account_number,
							bank_name,
							sort_code,
							iban,
							bic,
							country_code,
						} )
					),
				} ),
				updatePaymentGateway( 'bacs', {
					enabled: Boolean( formValues.enabled ),
					description: String( formValues.description ),
					settings,
				} ),
			] );
			setHasChanges( false );
			createSuccessNotice(
				__( 'Settings updated successfully', 'fincommerce' )
			);
		} catch ( error ) {
			createErrorNotice(
				__( 'Failed to update settings', 'fincommerce' )
			);
		} finally {
			setIsSaving( false );
			invalidateResolution( 'getPaymentProviders', [] );
			invalidateResolutionForStoreSelector( 'getOfflinePaymentGateways' );
		}
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
							'Choose how you want to present bank transfer to your customers during checkout.',
							'fincommerce'
						) }
					>
						{ isLoading ? (
							<FieldPlaceholder size="small" />
						) : (
							<CheckboxControl
								label={ __(
									'Enable direct bank transfers',
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
									'Direct bank transfer payments',
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

					<Settings.Section
						title={ __( 'Account details', 'fincommerce' ) }
						description={ __(
							'Configure your bank account details.',
							'fincommerce'
						) }
					>
						{ isLoadingAccounts ? (
							<FieldPlaceholder size="large" />
						) : (
							<BankAccountsList
								accounts={ accounts }
								onChange={ ( bankAccounts ) => {
									setAccounts( bankAccounts );
									setHasChanges( true );
								} }
								defaultCountry={ storeCountryCode }
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

export default SettingsPaymentsBacs;
