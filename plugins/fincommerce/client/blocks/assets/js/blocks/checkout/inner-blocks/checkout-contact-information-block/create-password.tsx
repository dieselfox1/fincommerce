/**
 * External dependencies
 */
import PasswordStrengthMeter from '@fincommerce/base-components/cart-checkout/password-strength-meter';
import { checkoutStore, validationStore } from '@fincommerce/block-data';
import { ValidatedTextInput } from '@fincommerce/blocks-components';
import { useDispatch, useSelect } from '@finpress/data';
import { useEffect, useState } from '@finpress/element';
import { __ } from '@finpress/i18n';

const CreatePassword = () => {
	const [ passwordStrength, setPasswordStrength ] = useState( 0 );
	const { customerPassword } = useSelect( ( select ) => {
		const store = select( checkoutStore );
		return {
			customerPassword: store.getCustomerPassword(),
		};
	}, [] );
	const { __internalSetCustomerPassword } = useDispatch( checkoutStore );
	const { setValidationErrors, clearValidationError } =
		useDispatch( validationStore );

	useEffect( () => {
		if ( ! customerPassword ) {
			return;
		}
		if ( passwordStrength < 2 ) {
			setValidationErrors( {
				'account-password': {
					message: __(
						'Please create a stronger password',
						'fincommerce'
					),
					hidden: true,
				},
			} );
			return;
		}
		clearValidationError( 'account-password' );
	}, [
		clearValidationError,
		customerPassword,
		passwordStrength,
		setValidationErrors,
	] );

	return (
		<ValidatedTextInput
			type="password"
			label={ __( 'Create a password', 'fincommerce' ) }
			className={ `wc-block-components-address-form__password` }
			value={ customerPassword }
			required={ true }
			errorId={ 'account-password' }
			onChange={ ( value: string ) => {
				__internalSetCustomerPassword( value );

				if ( ! value ) {
					setValidationErrors( {
						'account-password': {
							message: __(
								'Please enter a valid password',
								'fincommerce'
							),
							hidden: true,
						},
					} );
				}
			} }
			feedback={
				<PasswordStrengthMeter
					password={ customerPassword }
					onChange={ ( strength: number ) =>
						setPasswordStrength( strength )
					}
				/>
			}
		/>
	);
};

export default CreatePassword;
