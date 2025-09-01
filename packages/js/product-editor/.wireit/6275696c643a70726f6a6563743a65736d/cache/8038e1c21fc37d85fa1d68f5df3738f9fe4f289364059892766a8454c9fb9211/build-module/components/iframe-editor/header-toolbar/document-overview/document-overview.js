/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { createElement, forwardRef, useContext } from '@wordpress/element';
import { listView as listViewIcon } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';
import { EditorContext } from '../../context';
export const DocumentOverview = forwardRef(function ForwardedRefDocumentOverview(props, ref) {
    const { isDocumentOverviewOpened, setIsDocumentOverviewOpened } = useContext(EditorContext);
    function handleClick() {
        setIsDocumentOverviewOpened(!isDocumentOverviewOpened);
    }
    return (createElement(Button, { ...props, ref: ref, icon: listViewIcon, isPressed: isDocumentOverviewOpened, 
        /* translators: button label text should, if possible, be under 16 characters. */
        label: __('Document overview', 'fincommerce'), shortcut: displayShortcut.access('o'), onClick: handleClick, className: "document-overview" }));
});
