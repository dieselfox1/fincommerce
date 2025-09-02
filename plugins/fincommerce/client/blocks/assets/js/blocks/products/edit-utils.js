/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button, Placeholder } from '@finpress/components';
import { ADMIN_URL } from '@fincommerce/settings';
import { Icon, external } from '@finpress/icons';

export const renderNoProductsPlaceholder = ( blockTitle, blockIcon ) => (
	<Placeholder
		className="wc-block-products"
		icon={ blockIcon }
		label={ blockTitle }
	>
		<p>
			{ __(
				"You haven't published any products to list here yet.",
				'fincommerce'
			) }
		</p>
		<Button
			className="wc-block-products__add-product-button"
			variant="secondary"
			href={ ADMIN_URL + 'post-new.php?post_type=product' }
			target="_top"
		>
			{ __( 'Add new product', 'fincommerce' ) + ' ' }
			<Icon icon={ external } />
		</Button>
		<Button
			className="wc-block-products__read_more_button"
			variant="tertiary"
			href="https://fincommerce.com/document/managing-products/"
			target="_blank"
		>
			{ __( 'Learn more', 'fincommerce' ) }
		</Button>
	</Placeholder>
);

export const renderHiddenContentPlaceholder = ( blockTitle, blockIcon ) => (
	<Placeholder
		className="wc-block-products"
		icon={ blockIcon }
		label={ blockTitle }
	>
		{ __(
			'The content for this block is hidden due to block settings.',
			'fincommerce'
		) }
	</Placeholder>
);
