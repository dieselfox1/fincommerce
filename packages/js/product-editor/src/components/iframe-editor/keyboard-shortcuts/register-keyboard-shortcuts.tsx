/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { isAppleOS } from '@wordpress/keycodes';

export const RegisterKeyboardShortcuts = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore registerShortcut is not defined in the types
	const { registerShortcut } = useDispatch( keyboardShortcutsStore );

	useEffect( () => {
		registerShortcut( {
			name: 'fincommerce/product-editor/modal-block-editor/undo',
			category: 'global',
			description: __( 'Undo your last changes.', 'fincommerce' ),
			keyCombination: {
				modifier: 'primary',
				character: 'z',
			},
		} );

		registerShortcut( {
			name: 'fincommerce/product-editor/modal-block-editor/redo',
			category: 'global',
			description: __( 'Redo your last undo.', 'fincommerce' ),
			keyCombination: {
				modifier: 'primaryShift',
				character: 'z',
			},
			// Disable on Apple OS because it conflicts with the browser's
			// history shortcut. It's a fine alias for both Windows and Linux.
			// Since there's no conflict for Ctrl+Shift+Z on both Windows and
			// Linux, we keep it as the default for consistency.
			aliases: isAppleOS()
				? []
				: [
						{
							modifier: 'primary',
							character: 'y',
						},
				  ],
		} );

		registerShortcut( {
			name: 'fincommerce/product-editor/modal-block-editor/toggle-list-view',
			category: 'global',
			description: __( 'Open the block list view.', 'fincommerce' ),
			keyCombination: {
				modifier: 'access',
				character: 'o',
			},
		} );

		registerShortcut( {
			name: 'fincommerce/product-editor/modal-block-editor/toggle-sidebar',
			category: 'global',
			description: __(
				'Show or hide the Settings sidebar.',
				'fincommerce'
			),
			keyCombination: {
				modifier: 'primaryShift',
				character: ',',
			},
		} );
	}, [ registerShortcut ] );

	return null;
};
