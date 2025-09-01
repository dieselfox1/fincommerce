/**
 * External dependencies
 */
import { DrawerCloseButton } from '@fincommerce/base-components/drawer';
import { CartEventsProvider } from '@fincommerce/base-context';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/register-components';

type MiniCartContentsBlockProps = {
	attributes: Record< string, unknown >;
	children: JSX.Element | JSX.Element[];
};

export const MiniCartContentsBlock = (
	props: MiniCartContentsBlockProps
): JSX.Element => {
	const { children } = props;

	return (
		<>
			<CartEventsProvider>
				<DrawerCloseButton />
				{ children }
			</CartEventsProvider>
		</>
	);
};
