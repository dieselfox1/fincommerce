/**
 * External dependencies
 */
import { __, isRTL } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { createElement, forwardRef, useContext } from '@finpress/element';

import { redo as redoIcon, undo as undoIcon } from '@finpress/icons';
import { Ref } from 'react';
import { displayShortcut, isAppleOS } from '@finpress/keycodes';

/**
 * Internal dependencies
 */
import { EditorContext } from '../context';

function EditorHistoryRedo(
	props: { [ key: string ]: unknown },
	ref: Ref< HTMLButtonElement >
) {
	const shortcut = isAppleOS()
		? displayShortcut.primaryShift( 'z' )
		: displayShortcut.primary( 'y' );

	const { hasRedo, redo } = useContext( EditorContext );

	return (
		<Button
			{ ...props }
			ref={ ref }
			icon={ ! isRTL() ? redoIcon : undoIcon }
			/* translators: button label text should, if possible, be under 16 characters. */
			label={ __( 'Redo', 'fincommerce' ) }
			shortcut={ shortcut }
			// If there are no redo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/finpress/gutenberg/issues/3486
			aria-disabled={ ! hasRedo }
			onClick={ hasRedo ? redo : undefined }
			className="editor-history__redo"
		/>
	);
}

export default forwardRef( EditorHistoryRedo );
