"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentOverviewSidebar = DocumentOverviewSidebar;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const context_1 = require("../../context");
function DocumentOverviewSidebar() {
    const { setIsDocumentOverviewOpened: setIsListViewOpened } = (0, element_1.useContext)(context_1.EditorContext);
    // This hook handles focus when the sidebar first renders.
    const focusOnMountRef = (0, compose_1.useFocusOnMount)('firstElement');
    // The next 2 hooks handle focus for when the sidebar closes and returning focus to the element that had focus before sidebar opened.
    const headerFocusReturnRef = (0, compose_1.useFocusReturn)();
    const contentFocusReturnRef = (0, compose_1.useFocusReturn)();
    function closeOnEscape(event) {
        if (event.code === 'Escape' && !event.defaultPrevented) {
            event.preventDefault();
            setIsListViewOpened(false);
        }
    }
    // Use internal state instead of a ref to make sure that the component
    // re-renders when the dropZoneElement updates.
    const [dropZoneElement, setDropZoneElement] = (0, element_1.useState)(null);
    // Tracks our current tab.
    const [tab, setTab] = (0, element_1.useState)('list-view');
    // This ref refers to the list view application area.
    const listViewRef = (0, element_1.useRef)(null);
    // Must merge the refs together so focus can be handled properly in the next function.
    const listViewContainerRef = (0, compose_1.useMergeRefs)([
        contentFocusReturnRef,
        focusOnMountRef,
        listViewRef,
        setDropZoneElement,
    ]);
    /**
     * Render tab content for a given tab name.
     *
     * @param tabName The name of the tab to render.
     */
    function renderTabContent(tabName) {
        if (tabName === 'list-view') {
            return (0, element_1.createElement)(block_editor_1.__experimentalListView, { dropZoneElement: dropZoneElement });
        }
        return null;
    }
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__document-overview-sidebar", onKeyDown: closeOnEscape },
        (0, element_1.createElement)(components_1.Button, { className: "fincommerce-iframe-editor__document-overview-sidebar-close-button", ref: headerFocusReturnRef, icon: icons_1.closeSmall, label: (0, i18n_1.__)('Close', 'fincommerce'), onClick: () => setIsListViewOpened(false) }),
        (0, element_1.createElement)(components_1.TabPanel, { className: "fincommerce-iframe-editor__document-overview-sidebar-tab-panel", initialTabName: tab, onSelect: setTab, tabs: [
                {
                    name: 'list-view',
                    title: (0, i18n_1.__)('List View', 'fincommerce'),
                    className: 'fincommerce-iframe-editor__document-overview-sidebar-tab-item',
                },
            ] }, (currentTab) => ((0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__document-overview-sidebar-tab-content", ref: listViewContainerRef }, renderTabContent(currentTab.name))))));
}
