/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { Form, H, TextControl } from '@fincommerce/components';
import { optionsStore } from '@fincommerce/data';
import { registerPlugin } from '@finpress/plugins';
import { useDispatch, useSelect } from '@finpress/data';
import { WooPaymentGatewaySetup } from '@fincommerce/onboarding';

const initialFormValues = {
	account_name: '',
	account_number: '',
	bank_name: '',
	sort_code: '',
	iban: '',
	bic: '',
};

const BacsPaymentGatewaySetup = () => {
	const isUpdating = useSelect( ( select ) => {
		return select( optionsStore ).isOptionsUpdating();
	} );
	const { createNotice } = useDispatch( 'core/notices' );
	const { updateOptions } = useDispatch( optionsStore );

	const validate = ( values ) => {
		const errors = {};

		if ( ! values.account_number && ! values.iban ) {
			errors.account_number = errors.iban = __(
				'Please enter an account number or IBAN',
				'fincommerce'
			);
		}

		return errors;
	};

	const updateSettings = async ( values, markConfigured ) => {
		const update = await updateOptions( {
			fincommerce_bacs_settings: {
				enabled: 'yes',
			},
			fincommerce_bacs_accounts: [ values ],
		} );

		if ( update.success ) {
			markConfigured();
			createNotice(
				'success',
				__(
					'Direct bank transfer details added successfully',
					'fincommerce'
				)
			);
			return;
		}

		createNotice(
			'error',
			__(
				'There was a problem saving your payment settings',
				'fincommerce'
			)
		);
	};

	return (
		<>
			<WooPaymentGatewaySetup id="bacs">
				{ ( { markConfigured } ) => {
					return (
						<Form
							initialValues={ initialFormValues }
							onSubmit={ ( values ) =>
								updateSettings( values, markConfigured )
							}
							validate={ validate }
						>
							{ ( { getInputProps, handleSubmit } ) => {
								return (
									<>
										<H>
											{ __(
												'Add your bank details',
												'fincommerce'
											) }
										</H>
										<p>
											{ __(
												'These details are required to receive payments via bank transfer',
												'fincommerce'
											) }
										</p>
										<div className="fincommerce-task-payment-method__fields">
											<TextControl
												__nextHasNoMarginBottom
												label={ __(
													'Account name',
													'fincommerce'
												) }
												required
												{ ...getInputProps(
													'account_name'
												) }
											/>
											<TextControl
												__nextHasNoMarginBottom
												label={ __(
													'Account number',
													'fincommerce'
												) }
												required
												{ ...getInputProps(
													'account_number'
												) }
											/>
											<TextControl
												__nextHasNoMarginBottom
												label={ __(
													'Bank name',
													'fincommerce'
												) }
												required
												{ ...getInputProps(
													'bank_name'
												) }
											/>
											<TextControl
												__nextHasNoMarginBottom
												label={ __(
													'Sort code',
													'fincommerce'
												) }
												required
												{ ...getInputProps(
													'sort_code'
												) }
											/>
											<TextControl
												__nextHasNoMarginBottom
												label={ __(
													'IBAN',
													'fincommerce'
												) }
												required
												{ ...getInputProps( 'iban' ) }
											/>
											<TextControl
												__nextHasNoMarginBottom
												label={ __(
													'BIC / Swift',
													'fincommerce'
												) }
												required
												{ ...getInputProps( 'bic' ) }
											/>
										</div>
										<Button
											variant="primary"
											isBusy={ isUpdating }
											onClick={ handleSubmit }
										>
											{ __( 'Save', 'fincommerce' ) }
										</Button>
									</>
								);
							} }
						</Form>
					);
				} }
			</WooPaymentGatewaySetup>
		</>
	);
};

registerPlugin( 'wc-admin-payment-gateway-setup-bacs', {
	render: BacsPaymentGatewaySetup,
	scope: 'fincommerce-tasks',
} );
