import { createElement } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import { IframeEditor } from '../iframe-editor';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';
export function ModalEditor({ initialBlocks, onChange, onClose, title, name, }) {
    const { closeModalEditor } = useDispatch(wooProductEditorUiStore);
    const debouncedOnChange = useDebounce((blocks) => {
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
    return (createElement(Modal, { className: "fincommerce-modal-editor", title: title, onRequestClose: handleClose, shouldCloseOnClickOutside: false },
        createElement(IframeEditor, { initialBlocks: initialBlocks, onInput: debouncedOnChange, onChange: debouncedOnChange, onClose: handleClose, name: name })));
}
