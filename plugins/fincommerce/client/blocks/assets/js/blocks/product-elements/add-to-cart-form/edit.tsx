/**
 * External dependencies
 */
import { useBlockProps, InspectorControls } from '@finpress/block-editor';
import { __ } from '@finpress/i18n';
import { ProductShortDescriptionSkeleton } from '@fincommerce/base-components/skeleton/patterns/product-short-description';
import { BlockEditProps } from '@finpress/blocks';
import { Disabled, Tooltip } from '@finpress/components';
import { isSiteEditorPage } from '@fincommerce/utils';
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import { QuantitySelectorStyle, AddToCartFormSettings } from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form/settings';
import { UpgradeNotice } from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form/components/upgrade-notice';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form';

const AddToCartFormEdit = ( props: BlockEditProps< Attributes > ) => {
	const { setAttributes } = props;

	const quantitySelectorStyleClass =
		props.attributes.quantitySelectorStyle === QuantitySelectorStyle.Input
			? 'wc-block-add-to-cart-form--input'
			: 'wc-block-add-to-cart-form--stepper';

	const blockProps = useBlockProps( {
		className: `wc-block-add-to-cart-form ${ quantitySelectorStyleClass }`,
	} );

	const isSiteEditor = isSiteEditorPage();

	const isBlockTheme = getSetting( 'isBlockTheme', false );
	const buttonBlockClass = ! isBlockTheme ? 'wp-block-button' : '';
	const buttonLinkClass = ! isBlockTheme
		? 'wp-block-button__link wc-block-components-button'
		: '';

	return (
		<>
			{ isBlockTheme && (
				<InspectorControls>
					<UpgradeNotice blockClientId={ props?.clientId } />
				</InspectorControls>
			) }
			<AddToCartFormSettings
				quantitySelectorStyle={ props.attributes.quantitySelectorStyle }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<Tooltip
					text={ __(
						'Customer will see product add-to-cart options in this space, dependent on the product type.',
						'fincommerce'
					) }
					position="bottom right"
				>
					<div className="wc-block-editor-add-to-cart-form-container">
						<ProductShortDescriptionSkeleton isStatic={ true } />
						<Disabled>
							{ props.attributes.quantitySelectorStyle ===
								QuantitySelectorStyle.Input && (
								<>
									<div className="quantity">
										<input
											style={
												// In the post editor, the editor isn't in an iframe, so finpress styles are applied. We need to remove them.
												! isSiteEditor
													? {
															backgroundColor:
																'#ffffff',
															lineHeight:
																'normal',
															minHeight: 'unset',
															boxSizing: 'unset',
															borderRadius:
																'unset',
													  }
													: {}
											}
											type="number"
											value="1"
											className="input-text qty text"
											readOnly
										/>
									</div>
									<div className={ buttonBlockClass }>
										<button
											className={ `single_add_to_cart_button alt wp-element-button ${ buttonLinkClass }` }
										>
											{ __(
												'Add to cart',
												'fincommerce'
											) }
										</button>
									</div>
								</>
							) }
							{ props.attributes.quantitySelectorStyle ===
								QuantitySelectorStyle.Stepper && (
								<>
									<div className="quantity wc-block-components-quantity-selector">
										<button className="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--minus">
											−
										</button>
										<input
											style={
												// In the post editor, the editor isn't in an iframe, so finpress styles are applied. We need to remove them.
												! isSiteEditor
													? {
															backgroundColor:
																'#ffffff',
															lineHeight:
																'normal',
															minHeight: 'unset',
															boxSizing: 'unset',
															borderRadius:
																'unset',
													  }
													: {}
											}
											type="number"
											value="1"
											className="input-text qty text"
											readOnly
										/>
										<button className="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--plus">
											+
										</button>
									</div>
									<div className={ buttonBlockClass }>
										<button
											className={ `single_add_to_cart_button alt wp-element-button ${ buttonLinkClass }` }
										>
											{ __(
												'Add to cart',
												'fincommerce'
											) }
										</button>
									</div>
								</>
							) }
						</Disabled>
					</div>
				</Tooltip>
			</div>
		</>
	);
};

export default AddToCartFormEdit;
