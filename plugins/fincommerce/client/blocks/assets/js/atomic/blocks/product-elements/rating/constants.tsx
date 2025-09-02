/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { starEmpty, Icon } from '@finpress/icons';

export const BLOCK_TITLE: string = __( 'Product Rating', 'fincommerce' );
export const BLOCK_ICON: JSX.Element = (
	<Icon
		icon={ starEmpty }
		className="wc-block-editor-components-block-icon"
	/>
);
export const BLOCK_DESCRIPTION: string = __(
	'Display the average rating of a product.',
	'fincommerce'
);
