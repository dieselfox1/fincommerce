/**
 * External dependencies
 */
import { registerBlockType, registerBlockVariation } from '@finpress/blocks';
import { Icon } from '@finpress/icons';
import { customerAccount } from '@fincommerce/icons';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/customer-account/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/customer-account/edit';
import '@fincommerce/block-library/assets/js/blocks/customer-account/style.scss';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ customerAccount }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );

// We needed to change the size of the icon without affecting already existing blocks.
// This is why we are registering a new variation with a different icon class instead of changing directly the icon
// size in the css. By giving it the same name and making it default we are making sure that new blocks will use the
// new icon size and existing blocks will keep using the old one after updating the plugin.
// For more context, see https://github.com/dieselfox1/fincommerce-blocks/pull/8594
registerBlockVariation( 'fincommerce/customer-account', {
	name: 'fincommerce/customer-account',
	title: __( 'Customer account', 'fincommerce' ),
	isDefault: true,
	attributes: {
		...metadata.attributes,
		displayStyle: 'icon_and_text',
		iconStyle: 'default',
		iconClass: 'wc-block-customer-account__account-icon',
	},
} );
