/**
 * External dependencies
 */
import { MenuItem, VisuallyHidden } from '@finpress/components';
import { createElement } from '@finpress/element';
import { external } from '@finpress/icons';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';

export const HelpMenuItem = () => {
	const recordClick = () => {
		recordEvent( 'product_iframe_editor_help_menu_item_click' );
	};

	return (
		<MenuItem
			role="menuitem"
			icon={ external }
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore href is okay here
			href={ __(
				'https://finpress.org/documentation/article/finpress-block-editor/',
				'fincommerce'
			) }
			onClick={ recordClick }
			target="_blank"
			rel="noopener noreferrer"
		>
			{ __( 'Help', 'fincommerce' ) }
			<VisuallyHidden as="span">
				{
					/* translators: accessibility text */
					__( '(opens in a new tab)', 'fincommerce' )
				}
			</VisuallyHidden>
		</MenuItem>
	);
};
