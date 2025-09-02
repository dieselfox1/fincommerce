/**
 * External dependencies
 */
import { useRef } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { __ } from '@finpress/i18n';
import EditableButton from '@fincommerce/editor-components/editable-button';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import PageSelector from '@fincommerce/editor-components/page-selector';
import { CART_PAGE_ID } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import { defaultButtonLabel } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		checkoutPageId: number;
		className: string;
		buttonLabel: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { checkoutPageId = 0, buttonLabel } = attributes;
	const { current: savedCheckoutPageId } = useRef( checkoutPageId );

	const currentPostId = useSelect(
		( select ) => {
			if ( ! savedCheckoutPageId ) {
				const store = select( 'core/editor' );
				return store.getCurrentPostId();
			}
			return savedCheckoutPageId;
		},
		[ savedCheckoutPageId ]
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				{ ! (
					currentPostId === CART_PAGE_ID && savedCheckoutPageId === 0
				) && (
					<PageSelector
						pageId={ checkoutPageId }
						setPageId={ ( id: number ) =>
							setAttributes( { checkoutPageId: id } )
						}
						labels={ {
							title: __(
								'Proceed to Checkout button',
								'fincommerce'
							),
							default: __(
								'FinCommerce Checkout Page',
								'fincommerce'
							),
						} }
					/>
				) }
			</InspectorControls>
			<EditableButton
				className="wc-block-cart__submit-button"
				value={ buttonLabel }
				placeholder={ defaultButtonLabel }
				onChange={ ( content ) => {
					setAttributes( {
						buttonLabel: content,
					} );
				} }
			/>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
