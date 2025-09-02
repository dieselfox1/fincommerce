/**
 * External dependencies
 */
import clsx from 'clsx';
import { useRef } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { __ } from '@finpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@finpress/block-editor';
import PageSelector from '@fincommerce/editor-components/page-selector';
import { PanelBody, ToggleControl, TextControl } from '@finpress/components';
import { CHECKOUT_PAGE_ID } from '@fincommerce/block-settings';
import { ReturnToCartButton } from '@fincommerce/base-components/cart-checkout';
import EditableButton from '@fincommerce/editor-components/editable-button';
import { useStoreCart } from '@fincommerce/base-context';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import { FormattedMonetaryAmount } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/block';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/editor.scss';
import {
	defaultPlaceOrderButtonLabel,
	defaultReturnToCartButtonLabel,
} from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const {
		cartPageId = 0,
		showReturnToCart = false,
		placeOrderButtonLabel,
		returnToCartButtonLabel,
	} = attributes;
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );
	const { current: savedCartPageId } = useRef( cartPageId );
	const currentPostId = useSelect(
		( select ) => {
			if ( ! savedCartPageId ) {
				const store = select( 'core/editor' );
				return store.getCurrentPostId();
			}
			return savedCartPageId;
		},
		[ savedCartPageId ]
	);

	const showPrice = blockProps.className.includes( 'is-style-with-price' );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Options', 'fincommerce' ) }>
					<ToggleControl
						label={ __(
							'Show a "Return to Cart" link',
							'fincommerce'
						) }
						help={ __(
							'Recommended to enable only if there is no Cart link in the header.',
							'fincommerce'
						) }
						checked={ showReturnToCart }
						onChange={ () =>
							setAttributes( {
								showReturnToCart: ! showReturnToCart,
							} )
						}
					/>

					{ showPrice && (
						<TextControl
							label={ __( 'Price separator', 'fincommerce' ) }
							id="price-separator"
							value={ attributes.priceSeparator }
							onChange={ ( value ) => {
								setAttributes( {
									priceSeparator: value,
								} );
							} }
						/>
					) }
				</PanelBody>

				{ showReturnToCart &&
					! (
						currentPostId === CHECKOUT_PAGE_ID &&
						savedCartPageId === 0
					) && (
						<PageSelector
							pageId={ cartPageId }
							setPageId={ ( id: number ) =>
								setAttributes( { cartPageId: id } )
							}
							labels={ {
								title: __(
									'Return to Cart button',
									'fincommerce'
								),
								default: __(
									'FinCommerce Cart Page',
									'fincommerce'
								),
							} }
						/>
					) }
			</InspectorControls>
			<div className="wc-block-checkout__actions">
				<div className="wc-block-checkout__actions_row">
					{ showReturnToCart && (
						<ReturnToCartButton element="span">
							<RichText
								multiline={ false }
								allowedFormats={ [] }
								value={ returnToCartButtonLabel }
								placeholder={ defaultReturnToCartButtonLabel }
								onChange={ ( content ) => {
									setAttributes( {
										returnToCartButtonLabel: content,
									} );
								} }
							/>
						</ReturnToCartButton>
					) }
					<EditableButton
						className={ clsx(
							'wc-block-cart__submit-button',
							'wc-block-components-checkout-place-order-button',
							{
								'wc-block-components-checkout-place-order-button--full-width':
									! showReturnToCart,
							}
						) }
						value={ placeOrderButtonLabel }
						placeholder={ defaultPlaceOrderButtonLabel }
						onChange={ ( content ) => {
							setAttributes( {
								placeOrderButtonLabel: content,
							} );
						} }
					>
						{ showPrice && (
							<>
								<style>
									{ `.wp-block-fincommerce-checkout-actions-block {
										.wc-block-components-checkout-place-order-button__separator {
											&::after {
												content: "${ attributes.priceSeparator }";
											}
										}
									}` }
								</style>
								<div className="wc-block-components-checkout-place-order-button__separator"></div>
								<div className="wc-block-components-checkout-place-order-button__price">
									<FormattedMonetaryAmount
										value={ cartTotals.total_price }
										currency={ totalsCurrency }
									/>
								</div>
							</>
						) }
					</EditableButton>
				</div>
			</div>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
