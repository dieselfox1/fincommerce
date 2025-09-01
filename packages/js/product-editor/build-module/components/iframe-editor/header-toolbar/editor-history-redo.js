/**
 * External dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { createElement, forwardRef, useContext } from '@wordpress/element';
import { redo as redoIcon, undo as undoIcon } from '@wordpress/icons';
import { displayShortcut, isAppleOS } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */
import { EditorContext } from '../context';
function EditorHistoryRedo(props, ref) {
    const shortcut = isAppleOS()
        ? displayShortcut.primaryShift('z')
        : displayShortcut.primary('y');
    const { hasRedo, redo } = useContext(EditorContext);
    return (createElement(Button, { ...props, ref: ref, icon: !isRTL() ? redoIcon : undoIcon, 
        /* translators: button label text should, if possible, be under 16 characters. */
        label: __('Redo', 'fincommerce'), shortcut: shortcut, "aria-disabled": !hasRedo, onClick: hasRedo ? redo : undefined, className: "editor-history__redo" }));
}
export default forwardRef(EditorHistoryRedo);
