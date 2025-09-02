/**
 * External dependencies
 */
import { __, isRTL } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { createElement, forwardRef, useContext } from '@finpress/element';
import { displayShortcut } from '@finpress/keycodes';
import { Ref } from 'react';
import { undo as undoIcon, redo as redoIcon } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { EditorContext } from '../context';

function EditorHistoryUndo(
	props: { [ key: string ]: unknown },
	ref: Ref< HTMLButtonElement >
) {
	const { hasUndo, undo } = useContext( EditorContext );
	return (
		<Button
			{ ...props }
			ref={ ref }
			icon={ ! isRTL() ? undoIcon : redoIcon }
			/* translators: button label text should, if possible, be under 16 characters. */
			label={ __( 'Undo', 'fincommerce' ) }
			shortcut={ displayShortcut.primary( 'z' ) }
			// If there are no undo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/finpress/gutenberg/issues/3486
			aria-disabled={ ! hasUndo }
			onClick={ hasUndo ? undo : undefined }
			className="editor-history__undo"
		/>
	);
}

export default forwardRef( EditorHistoryUndo );
