/**
 * External dependencies
 */
import {
	Button,
	CheckboxControl,
	TextControl,
	TextareaControl,
} from '@finpress/components';
import { TreeSelectControl } from '@fincommerce/components';
import { __ } from '@finpress/i18n';
import { useDispatch, useSelect } from '@finpress/data';
import { paymentGatewaysStore, paymentSettingsStore } from '@fincommerce/data';
import { useState, useEffect } from '@finpress/element';

/**
 * Internal dependencies
 */
import '../settings-payments-body.scss';
import { mapShippingMethodsOptions } from '~/settings-payments/offline/utils';
import { Settings } from '~/settings-payments/components/settings';
import { FieldPlaceholder } from '~/settings-payments/components/field-placeholder';

/**
 * This page is used to manage the settings for the Cash on delivery payment gateway.
 */
export const SettingsPaymentsCod = () => {
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( 'core/notices' );
	const { codSettings, isLoading } = useSelect(
		( select ) => ( {
			codSettings:
				select( paymentGatewaysStore ).getPaymentGateway( 'cod' ),
			isLoading: ! select( paymentGatewaysStore ).hasFinishedResolution(
				'getPaymentGateway',
				[ 'cod' ]
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
		if ( codSettings ) {
			setFormValues( {
				enabled: codSettings.enabled,
				title: codSettings.settings.title.value,
				description: codSettings.description,
				instructions: codSettings.settings.instructions.value,
				enable_for_methods: Array.isArray(
					codSettings.settings.enable_for_methods.value
				)
					? codSettings.settings.enable_for_methods.value
					: [],
				enable_for_virtual:
					codSettings.settings.enable_for_virtual.value === 'yes',
			} );
			setHasChanges( false );
		}
	}, [ codSettings ] );

	const saveSettings = () => {
		if ( ! codSettings ) {
			return;
		}

		setIsSaving( true );

		const settings: Record< string, string | string[] > = {
			title: String( formValues.title ),
			instructions: String( formValues.instructions ),
			enable_for_methods: Array.isArray( formValues.enable_for_methods )
				? formValues.enable_for_methods
				: [],
			enable_for_virtual: formValues.enable_for_virtual ? 'yes' : 'no',
		};

		updatePaymentGateway( 'cod', {
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
							'Choose how you want to present cash on delivery payments to your customers during checkout.',
							'fincommerce'
						) }
					>
						{ isLoading ? (
							<FieldPlaceholder size="small" />
						) : (
							<CheckboxControl
								label={ __(
									'Enable cash on delivery payments',
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
									'Cash on delivery payments',
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
						{ isLoading || ! codSettings ? (
							<FieldPlaceholder size="medium" />
						) : (
							<TreeSelectControl
								label={ __(
									'Enable for shipping methods',
									'fincommerce'
								) }
								help={ __(
									'Select shipping methods for which this payment method is enabled.',
									'fincommerce'
								) }
								options={
									codSettings.settings.enable_for_methods
										?.options
										? mapShippingMethodsOptions(
												codSettings.settings
													.enable_for_methods.options
										  )
										: []
								}
								value={
									Array.isArray(
										formValues.enable_for_methods
									)
										? formValues.enable_for_methods
										: []
								}
								onChange={ ( value: string[] ) => {
									setFormValues( {
										...formValues,
										enable_for_methods: value,
									} );
									setHasChanges( true );
								} }
								selectAllLabel={ false }
							/>
						) }
						{ isLoading ? (
							<FieldPlaceholder size="small" />
						) : (
							<CheckboxControl
								label={ __(
									'Accept for virtual orders',
									'fincommerce'
								) }
								help={ __(
									'Accept cash on delivery if the order is virtual',
									'fincommerce'
								) }
								checked={ Boolean(
									formValues.enable_for_virtual
								) }
								onChange={ ( checked ) => {
									setFormValues( {
										...formValues,
										enable_for_virtual: checked,
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

export default SettingsPaymentsCod;
