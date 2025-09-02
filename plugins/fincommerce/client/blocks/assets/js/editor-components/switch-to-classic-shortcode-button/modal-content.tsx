/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

export const ModalContent = ( {
	blockType = 'fincommerce/cart',
}: {
	blockType: 'fincommerce/cart' | 'fincommerce/checkout';
} ): JSX.Element => {
	if ( blockType === 'fincommerce/cart' ) {
		return (
			<p>
				{ __(
					'If you continue, the cart block will be replaced with the classic experience powered by shortcodes. This means that you may lose customizations that you made to the cart block.',
					'fincommerce'
				) }
			</p>
		);
	}

	return (
		<>
			<p>
				{ __(
					'If you continue, the checkout block will be replaced with the classic experience powered by shortcodes. This means that you may lose:',
					'fincommerce'
				) }
			</p>
			<ul className="cross-list">
				<li>
					{ __(
						'Customizations and updates to the block',
						'fincommerce'
					) }
				</li>
				<li>
					{ __(
						'Additional local pickup options created for the new checkout',
						'fincommerce'
					) }
				</li>
			</ul>
		</>
	);
};
