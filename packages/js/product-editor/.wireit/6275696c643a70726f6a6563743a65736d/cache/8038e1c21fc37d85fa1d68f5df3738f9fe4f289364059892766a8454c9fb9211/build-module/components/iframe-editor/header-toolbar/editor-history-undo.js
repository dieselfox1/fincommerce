/**
 * External dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { createElement, forwardRef, useContext } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import { undo as undoIcon, redo as redoIcon } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { EditorContext } from '../context';
function EditorHistoryUndo(props, ref) {
    const { hasUndo, undo } = useContext(EditorContext);
    return (createElement(Button, { ...props, ref: ref, icon: !isRTL() ? undoIcon : redoIcon, 
        /* translators: button label text should, if possible, be under 16 characters. */
        label: __('Undo', 'fincommerce'), shortcut: displayShortcut.primary('z'), "aria-disabled": !hasUndo, onClick: hasUndo ? undo : undefined, className: "editor-history__undo" }));
}
export default forwardRef(EditorHistoryUndo);
