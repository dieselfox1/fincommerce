/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { MenuGroup, MenuItem } from '@wordpress/components';
import { cog, Icon } from '@wordpress/icons';
import { __experimentalWooProductMoreMenuItem as WooProductMoreMenuItem } from '@fincommerce/product-editor';

export function ProductEditorDevToolsMenu( {
	shouldShowDevTools,
	onToggleShowDevTools,
}: {
	shouldShowDevTools: boolean;
	onToggleShowDevTools: () => void;
} ) {
	return (
		<WooProductMoreMenuItem order={ 1000 }>
			{ ( { onClose } ) => (
				<MenuGroup label={ __( 'Developer tools', 'fincommerce' ) }>
					<MenuItem
						icon={ <Icon icon={ cog } /> }
						iconPosition="right"
						onClick={ () => {
							onToggleShowDevTools();
							onClose();
						} }
					>
						{ shouldShowDevTools
							? __( 'Hide developer tools', 'fincommerce' )
							: __( 'Show developer tools', 'fincommerce' ) }
					</MenuItem>
				</MenuGroup>
			) }
		</WooProductMoreMenuItem>
	);
}
