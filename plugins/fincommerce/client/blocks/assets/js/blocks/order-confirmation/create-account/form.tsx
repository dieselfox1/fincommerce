/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { useState, createInterpolateElement } from '@wordpress/element';
import Button from '@fincommerce/base-components/button';
import {
	PasswordStrengthMeter,
	getPasswordStrength,
} from '@fincommerce/base-components/cart-checkout/password-strength-meter';
import { PRIVACY_URL, TERMS_URL } from '@fincommerce/block-settings';
import { ValidatedTextInput, Spinner } from '@fincommerce/blocks-components';
import { useSelect } from '@wordpress/data';
import { validationStore } from '@fincommerce/block-data';
import { getSetting } from '@fincommerce/settings';

const termsPageLink = TERMS_URL ? (
	<a href={ TERMS_URL } target="_blank" rel="noreferrer">
		{ __( 'Terms', 'fincommerce' ) }
	</a>
) : (
	<span>{ __( 'Terms', 'fincommerce' ) }</span>
);

const privacyPageLink = PRIVACY_URL ? (
	<a href={ PRIVACY_URL } target="_blank" rel="noreferrer">
		{ __( 'Privacy Policy', 'fincommerce' ) }
	</a>
) : (
	<span>{ __( 'Privacy Policy', 'fincommerce' ) }</span>
);

const PasswordField = ( {
	isLoading,
	password,
	setPassword,
}: {
	isLoading: boolean;
	password: string;
	setPassword: ( password: string ) => void;
} ) => {
	return (
		<div>
			<ValidatedTextInput
				disabled={ isLoading }
				type="password"
				label={ __( 'Password', 'fincommerce' ) }
				className={ `wc-block-components-address-form__password` }
				value={ password }
				required={ true }
				errorId={ 'account-password' }
				customValidityMessage={ (
					validity: ValidityState
				): string | undefined => {
					if (
						validity.valueMissing ||
						validity.badInput ||
						validity.typeMismatch
					) {
						return __(
							'Please enter a valid password',
							'fincommerce'
						);
					}
				} }
				customValidation={ ( inputObject ) => {
					if ( getPasswordStrength( inputObject.value ) < 2 ) {
						inputObject.setCustomValidity(
							__(
								'Please create a stronger password',
								'fincommerce'
							)
						);
						return false;
					}
					return true;
				} }
				onChange={ ( value: string ) => setPassword( value ) }
				feedback={ <PasswordStrengthMeter password={ password } /> }
			/>
		</div>
	);
};

const Form = ( {
	attributes: blockAttributes,
	isEditor,
}: {
	attributes?: { customerEmail?: string; nonceToken?: string };
	isEditor: boolean;
} ) => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ password, setPassword ] = useState( '' );
	const hasValidationError = useSelect(
		( select ) =>
			select( validationStore ).getValidationError( 'account-password' ),
		[]
	);
	const customerEmail =
		blockAttributes?.customerEmail ||
		( isEditor ? 'customer@email.com' : '' );
	const nonceToken = blockAttributes?.nonceToken || '';

	// Passwords might not be required based on settings.
	const registrationGeneratePassword = getSetting(
		'registrationGeneratePassword',
		false
	);
	const needsPassword = ! registrationGeneratePassword && ! password;

	if ( ! customerEmail ) {
		return null;
	}

	return (
		<form
			className={ 'wc-block-order-confirmation-create-account-form' }
			id="create-account"
			method="POST"
			action="#create-account"
			onSubmit={ ( event ) => {
				if ( hasValidationError ) {
					event.preventDefault();
					return;
				}
				setIsLoading( true );
			} }
		>
			{ ! registrationGeneratePassword && (
				<>
					<p>
						{ createInterpolateElement(
							__( 'Set a password for <email/>', 'fincommerce' ),
							{
								email: <strong>{ customerEmail }</strong>,
							}
						) }
					</p>
					<PasswordField
						isLoading={ isLoading }
						password={ password }
						setPassword={ setPassword }
					/>
				</>
			) }
			<Button
				className={ clsx(
					'wc-block-order-confirmation-create-account-button',
					{
						'wc-block-order-confirmation-create-account-button--loading':
							isLoading,
					}
				) }
				type="submit"
				disabled={ !! hasValidationError || needsPassword || isLoading }
			>
				{ !! isLoading && <Spinner /> }
				{ __( 'Create account', 'fincommerce' ) }
			</Button>
			<input type="hidden" name="email" value={ customerEmail } />
			<input type="hidden" name="password" value={ password } />
			<input type="hidden" name="create-account" value="1" />
			<input type="hidden" name="_wpnonce" value={ nonceToken } />
			<div className="wc-block-order-confirmation-create-account-description">
				<p>
					{ registrationGeneratePassword && (
						<>
							{ createInterpolateElement(
								__(
									'Check your email at <email/> for the link to set up an account password.',
									'fincommerce'
								),
								{
									email: <>{ customerEmail }</>,
								}
							) }{ ' ' }
						</>
					) }
					{ createInterpolateElement(
						__(
							'By creating an account you agree to our <terms/> and <privacy/>.',
							'fincommerce'
						),
						{
							terms: termsPageLink,
							privacy: privacyPageLink,
						}
					) }
				</p>
			</div>
		</form>
	);
};

export default Form;
