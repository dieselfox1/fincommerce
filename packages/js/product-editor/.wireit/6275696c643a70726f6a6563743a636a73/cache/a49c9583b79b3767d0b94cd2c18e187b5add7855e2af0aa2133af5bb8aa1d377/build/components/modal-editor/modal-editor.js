"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalEditor = ModalEditor;
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const compose_1 = require("@wordpress/compose");
/**
 * Internal dependencies
 */
const iframe_editor_1 = require("../iframe-editor");
const product_editor_ui_1 = require("../../store/product-editor-ui");
function ModalEditor({ initialBlocks, onChange, onClose, title, name, }) {
    const { closeModalEditor } = (0, data_1.useDispatch)(product_editor_ui_1.wooProductEditorUiStore);
    const debouncedOnChange = (0, compose_1.useDebounce)((blocks) => {
        onChange?.(blocks);
    }, 250);
    function handleClose() {
        const blocks = debouncedOnChange.flush();
        if (blocks) {
            onChange?.(blocks);
        }
        closeModalEditor();
        onClose?.();
    }
    return ((0, element_1.createElement)(components_1.Modal, { className: "fincommerce-modal-editor", title: title, onRequestClose: handleClose, shouldCloseOnClickOutside: false },
        (0, element_1.createElement)(iframe_editor_1.IframeEditor, { initialBlocks: initialBlocks, onInput: debouncedOnChange, onChange: debouncedOnChange, onClose: handleClose, name: name })));
}
