/**
 * External dependencies
 */
import clsx from 'clsx';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { Product } from '@fincommerce/data';
import { useInstanceId } from '@finpress/compose';
import { useEntityProp } from '@finpress/core-data';
import { createElement, useEffect } from '@finpress/element';
import { sprintf, __ } from '@finpress/i18n';
import {
	BaseControl,
	__experimentalInputControl as InputControl,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import { Label } from '../../../components/label/label';
import { useValidation } from '../../../contexts/validation-context';
import { useCurrencyInputProps } from '../../../hooks/use-currency-input-props';
import { sanitizeHTML } from '../../../utils/sanitize-html';
import type { ProductEditorBlockEditProps } from '../../../types';
import type { SalePriceBlockAttributes } from './types';

export function Edit( {
	attributes,
	clientId,
	context,
}: ProductEditorBlockEditProps< SalePriceBlockAttributes > ) {
	const blockProps = useWooBlockProps( attributes );
	const { label, help, isRequired, tooltip, disabled } = attributes;
	const [ regularPrice, setRegularPrice ] = useEntityProp< string >(
		'postType',
		context.postType || 'product',
		'regular_price'
	);
	const [ salePrice ] = useEntityProp< string >(
		'postType',
		context.postType || 'product',
		'sale_price'
	);
	const inputProps = useCurrencyInputProps( {
		value: regularPrice,
		onChange: setRegularPrice,
	} );

	function renderHelp() {
		if ( help ) {
			return <span dangerouslySetInnerHTML={ sanitizeHTML( help ) } />;
		}
	}

	const regularPriceId = useInstanceId(
		BaseControl,
		'wp-block-fincommerce-product-regular-price-field'
	) as string;

	const {
		ref: regularPriceRef,
		error: regularPriceValidationError,
		validate: validateRegularPrice,
	} = useValidation< Product >(
		`regular_price-${ clientId }`,
		async function regularPriceValidator() {
			const listPrice = Number.parseFloat( regularPrice );
			if ( listPrice ) {
				if ( listPrice < 0 ) {
					return {
						message: __(
							'Regular price must be greater than or equals to zero.',
							'fincommerce'
						),
					};
				}
				if (
					salePrice &&
					listPrice <= Number.parseFloat( salePrice )
				) {
					return {
						message: __(
							'Regular price must be greater than the sale price.',
							'fincommerce'
						),
					};
				}
			} else if ( isRequired ) {
				return {
					message: sprintf(
						/* translators: label of required field. */
						__( '%s is required.', 'fincommerce' ),
						label
					),
				};
			}
		},
		[ regularPrice, salePrice ]
	);

	useEffect( () => {
		if ( isRequired ) {
			validateRegularPrice();
		}
	}, [] );

	return (
		<div { ...blockProps }>
			<BaseControl
				id={ regularPriceId }
				help={
					regularPriceValidationError
						? regularPriceValidationError
						: renderHelp()
				}
				className={ clsx( {
					'has-error': regularPriceValidationError,
				} ) }
			>
				<InputControl
					{ ...inputProps }
					id={ regularPriceId }
					name={ 'regular_price' }
					inputMode="decimal"
					ref={ regularPriceRef }
					label={
						tooltip ? (
							<Label label={ label } tooltip={ tooltip } />
						) : (
							label
						)
					}
					disabled={ disabled }
					onBlur={ () => validateRegularPrice() }
				/>
			</BaseControl>
		</div>
	);
}
