"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InserterSidebar;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const keycodes_1 = require("@wordpress/keycodes");
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const context_1 = require("../context");
function InserterSidebar() {
    const { setIsInserterOpened } = (0, element_1.useContext)(context_1.EditorContext);
    const isMobileViewport = (0, compose_1.useViewportMatch)('medium', '<');
    const { rootClientId } = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        const { getBlockRootClientId } = select(block_editor_1.store);
        return {
            rootClientId: getBlockRootClientId(''),
        };
    }, []);
    const closeInserter = (0, element_1.useCallback)(() => {
        return setIsInserterOpened(false);
    }, [setIsInserterOpened]);
    const closeOnEscape = (0, element_1.useCallback)((event) => {
        if (event.keyCode === keycodes_1.ESCAPE && !event.defaultPrevented) {
            event.preventDefault();
            closeInserter();
        }
    }, [closeInserter]);
    const libraryRef = (0, element_1.useRef)(null);
    (0, element_1.useEffect)(() => {
        // Focus the search input when the inserter is opened,
        // if using an older version of the Library.
        libraryRef.current?.focusSearch?.();
    }, []);
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (0, element_1.createElement)("div", { onKeyDown: (event) => closeOnEscape(event), className: "fincommerce-iframe-editor__inserter-panel" },
        (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__inserter-panel-content" },
            (0, element_1.createElement)(block_editor_1.__experimentalLibrary, { showInserterHelpPanel: true, shouldFocusBlock: isMobileViewport, rootClientId: rootClientId, ref: libraryRef, onClose: closeInserter, onSelect: () => {
                    if (isMobileViewport) {
                        closeInserter();
                    }
                } }))));
}
