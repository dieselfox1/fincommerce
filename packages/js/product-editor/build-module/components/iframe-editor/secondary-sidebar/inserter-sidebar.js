/**
 * External dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { createElement, useCallback, useContext, useEffect, useRef, } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { ESCAPE } from '@wordpress/keycodes';
import { store as blockEditorStore, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore This is actively used in the GB repo and probably safe to use.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
__experimentalLibrary as Library, } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { EditorContext } from '../context';
export default function InserterSidebar() {
    const { setIsInserterOpened } = useContext(EditorContext);
    const isMobileViewport = useViewportMatch('medium', '<');
    const { rootClientId } = useSelect((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        const { getBlockRootClientId } = select(blockEditorStore);
        return {
            rootClientId: getBlockRootClientId(''),
        };
    }, []);
    const closeInserter = useCallback(() => {
        return setIsInserterOpened(false);
    }, [setIsInserterOpened]);
    const closeOnEscape = useCallback((event) => {
        if (event.keyCode === ESCAPE && !event.defaultPrevented) {
            event.preventDefault();
            closeInserter();
        }
    }, [closeInserter]);
    const libraryRef = useRef(null);
    useEffect(() => {
        // Focus the search input when the inserter is opened,
        // if using an older version of the Library.
        libraryRef.current?.focusSearch?.();
    }, []);
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    createElement("div", { onKeyDown: (event) => closeOnEscape(event), className: "fincommerce-iframe-editor__inserter-panel" },
        createElement("div", { className: "fincommerce-iframe-editor__inserter-panel-content" },
            createElement(Library, { showInserterHelpPanel: true, shouldFocusBlock: isMobileViewport, rootClientId: rootClientId, ref: libraryRef, onClose: closeInserter, onSelect: () => {
                    if (isMobileViewport) {
                        closeInserter();
                    }
                } }))));
}
