/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useEffect } from '@finpress/element';
import { CURRENT_USER_IS_ADMIN } from '@fincommerce/settings';
import BlockErrorBoundary from '@fincommerce/base-components/block-error-boundary';
import { translateJQueryEventToNative } from '@fincommerce/base-utils';
import withScrollToTop from '@fincommerce/base-hocs/with-scroll-to-top';
import {
	CartEventsProvider,
	CartProvider,
	noticeContexts,
} from '@fincommerce/base-context';
import { SlotFillProvider } from '@fincommerce/blocks-checkout';
import { StoreNoticesContainer } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import { CartBlockContext } from '@fincommerce/block-library/assets/js/blocks/cart/context';
import '@fincommerce/block-library/assets/js/blocks/cart/style.scss';

const reloadPage = () => void window.location.reload( true );

const Cart = ( { children, attributes = {} } ) => {
	const { hasDarkControls } = attributes;

	return (
		<CartBlockContext.Provider
			value={ {
				hasDarkControls,
			} }
		>
			{ children }
		</CartBlockContext.Provider>
	);
};

const ScrollOnError = ( { scrollToTop } ) => {
	useEffect( () => {
		// Make it so we can read jQuery events triggered by WC Core elements.
		const removeJQueryAddedToCartEvent = translateJQueryEventToNative(
			'added_to_cart',
			'wc-blocks_added_to_cart'
		);

		document.body.addEventListener(
			'wc-blocks_added_to_cart',
			scrollToTop
		);

		return () => {
			removeJQueryAddedToCartEvent();

			document.body.removeEventListener(
				'wc-blocks_added_to_cart',
				scrollToTop
			);
		};
	}, [ scrollToTop ] );

	return null;
};
const Block = ( { attributes, children, scrollToTop } ) => (
	<BlockErrorBoundary
		header={ __(
			'Something went wrong. Please contact us for assistance.',
			'fincommerce'
		) }
		text={ __(
			'The cart has encountered an unexpected error. If the error persists, please get in touch with us for help.',
			'fincommerce'
		) }
		button={
			<button className="wc-block-button" onClick={ reloadPage }>
				{ __( 'Reload the page', 'fincommerce' ) }
			</button>
		}
		showErrorMessage={ CURRENT_USER_IS_ADMIN }
	>
		<StoreNoticesContainer context={ noticeContexts.CART } />
		<SlotFillProvider>
			<CartProvider>
				<CartEventsProvider>
					<Cart attributes={ attributes }>{ children }</Cart>
					<ScrollOnError scrollToTop={ scrollToTop } />
				</CartEventsProvider>
			</CartProvider>
		</SlotFillProvider>
	</BlockErrorBoundary>
);
export default withScrollToTop( Block );
