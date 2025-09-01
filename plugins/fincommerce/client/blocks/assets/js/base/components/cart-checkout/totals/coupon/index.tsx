/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { useState, useRef } from '@wordpress/element';
import Button from '@fincommerce/base-components/button';
import LoadingMask from '@fincommerce/base-components/loading-mask';
import {
	ValidatedTextInput,
	ValidationInputError,
	ValidatedTextInputHandle,
	Panel,
	Spinner,
} from '@fincommerce/blocks-components';
import { useSelect } from '@wordpress/data';
import { validationStore } from '@fincommerce/block-data';
import type { MouseEvent, MouseEventHandler } from 'react';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/totals/coupon/style.scss';

export interface TotalsCouponProps {
	/**
	 * Instance id of the input
	 */
	instanceId: string;
	/**
	 * Whether the component is in a loading state
	 */
	isLoading?: boolean;
	/**
	 * Whether the coupon form is hidden
	 */
	displayCouponForm?: boolean;
	/**
	 * Submit handler
	 */
	onSubmit?: ( couponValue: string ) => Promise< boolean > | undefined;
}

export const TotalsCoupon = ( {
	instanceId,
	isLoading = false,
	onSubmit,
	displayCouponForm = false,
}: TotalsCouponProps ): JSX.Element => {
	const [ couponValue, setCouponValue ] = useState( '' );
	const [ isCouponFormVisible, setIsCouponFormVisible ] =
		useState( displayCouponForm );
	const textInputId = `wc-block-components-totals-coupon__input-${ instanceId }`;
	const { validationErrorId } = useSelect(
		( select ) => {
			const store = select( validationStore );
			return {
				validationErrorId: store.getValidationErrorId( instanceId ),
			};
		},
		[ instanceId ]
	);
	const inputRef = useRef< ValidatedTextInputHandle >( null );

	const handleCouponSubmit: MouseEventHandler< HTMLButtonElement > = (
		e: MouseEvent< HTMLButtonElement >
	) => {
		e.preventDefault();
		if ( typeof onSubmit !== 'undefined' ) {
			onSubmit( couponValue )?.then( ( result ) => {
				if ( result ) {
					setCouponValue( '' );
					setIsCouponFormVisible( false );
				} else if ( inputRef.current?.focus ) {
					inputRef.current.focus();
				}
			} );
		} else {
			setCouponValue( '' );
			setIsCouponFormVisible( true );
		}
	};

	return (
		<Panel
			className="wc-block-components-totals-coupon"
			initialOpen={ isCouponFormVisible }
			hasBorder={ false }
			headingLevel={ 2 }
			title={ __( 'Add coupons', 'fincommerce' ) }
			state={ [ isCouponFormVisible, setIsCouponFormVisible ] }
		>
			<LoadingMask
				screenReaderLabel={ __( 'Applying coupon…', 'fincommerce' ) }
				isLoading={ isLoading }
				showSpinner={ false }
			>
				<div className="wc-block-components-totals-coupon__content">
					<form
						className="wc-block-components-totals-coupon__form"
						id="wc-block-components-totals-coupon__form"
					>
						<ValidatedTextInput
							id={ textInputId }
							errorId="coupon"
							className="wc-block-components-totals-coupon__input"
							label={ __( 'Enter code', 'fincommerce' ) }
							value={ couponValue }
							ariaDescribedBy={ validationErrorId || '' }
							onChange={ ( newCouponValue ) => {
								setCouponValue( newCouponValue );
							} }
							focusOnMount={ true }
							validateOnMount={ false }
							showError={ false }
							ref={ inputRef }
						/>
						<Button
							className={ clsx(
								'wc-block-components-totals-coupon__button',
								{
									'wc-block-components-totals-coupon__button--loading':
										isLoading,
								}
							) }
							disabled={ isLoading || ! couponValue }
							onClick={ handleCouponSubmit }
							type="submit"
						>
							{ isLoading && <Spinner /> }
							{ __( 'Apply', 'fincommerce' ) }
						</Button>
					</form>
					<ValidationInputError
						propertyName="coupon"
						elementId={ instanceId }
					/>
				</div>
			</LoadingMask>
		</Panel>
	);
};

export default TotalsCoupon;
