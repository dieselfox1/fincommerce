/**
 * External dependencies
 */
import { ValidatedTextInput } from '@fincommerce/blocks-components';
import { useState, Fragment, useCallback, useEffect } from '@wordpress/element';
import { usePrevious } from '@fincommerce/base-hooks';
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@ariakit/react';
import { getFieldLabel } from '@fincommerce/blocks-checkout';
/**
 * Internal dependencies
 */
import { AddressLineFieldProps } from '@fincommerce/block-library/assets/js/base/components/cart-checkout/form/types';
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/form/style.scss';

const AddressLine2Field = ( {
	field,
	props,
	onChange,
	value,
}: AddressLineFieldProps ): JSX.Element => {
	const isFieldRequired = field?.required ?? false;
	const previousIsFieldRequired = usePrevious( isFieldRequired );

	// Display the input field if it has a value or if it is required.
	const [ isFieldVisible, setIsFieldVisible ] = useState(
		() => Boolean( value ) || isFieldRequired
	);

	const fieldLabel = getFieldLabel( field.label );
	// Re-render if the isFieldVisible prop changes.
	useEffect( () => {
		if ( previousIsFieldRequired !== isFieldRequired ) {
			setIsFieldVisible( Boolean( value ) || isFieldRequired );
		}
	}, [ value, previousIsFieldRequired, isFieldRequired ] );

	const handleHiddenInputChange = useCallback(
		( newValue: string ) => {
			onChange( newValue );
			setIsFieldVisible( true );
		},
		[ onChange ]
	);

	return (
		<Fragment>
			{ isFieldVisible ? (
				<ValidatedTextInput
					{ ...props }
					type={ field.type }
					label={
						isFieldRequired ? field.label : field.optionalLabel
					}
					className={ `wc-block-components-address-form__address_2` }
					value={ value }
					onChange={ ( newValue: string ) => onChange( newValue ) }
				/>
			) : (
				<>
					<Button
						render={ <span /> }
						className={
							'wc-block-components-address-form__address_2-toggle'
						}
						onClick={ () => setIsFieldVisible( true ) }
					>
						{ sprintf(
							// translators: %s: address 2 field label.
							__( '+ Add %s', 'fincommerce' ),
							fieldLabel
						) }
					</Button>
					<input
						type="text"
						tabIndex={ -1 }
						className="wc-block-components-address-form__address_2-hidden-input"
						aria-hidden="true"
						aria-label={ field.label }
						autoComplete={ field.autocomplete }
						id={ props?.id }
						value={ value }
						onChange={ ( event ) =>
							handleHiddenInputChange( event.target.value )
						}
					/>
				</>
			) }
		</Fragment>
	);
};

export default AddressLine2Field;
