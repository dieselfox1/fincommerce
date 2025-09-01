"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorWritingFlow = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const compose_1 = require("@wordpress/compose");
const blocks_1 = require("@wordpress/blocks");
const element_1 = require("@wordpress/element");
const block_editor_1 = require("@wordpress/block-editor");
const EditorWritingFlow = ({ blocks, onChange, placeholder = '', }) => {
    const instanceId = (0, compose_1.useInstanceId)(exports.EditorWritingFlow);
    const firstBlock = blocks[0];
    const isEmpty = !blocks.length;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore This action is available in the block editor data store.
    const { insertBlock, selectBlock, __unstableSetEditorMode } = (0, data_1.useDispatch)(block_editor_1.store);
    const { selectedBlockClientIds, editorMode } = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore This selector is available in the block editor data store.
        const { getSelectedBlockClientIds, __unstableGetEditorMode } = select(block_editor_1.store);
        return {
            editorMode: __unstableGetEditorMode(),
            selectedBlockClientIds: getSelectedBlockClientIds(),
        };
    }, []);
    // This is a workaround to prevent focusing the block on initialization.
    // Changing to a mode other than "edit" ensures that no initial position
    // is found and no element gets subsequently focused.
    // See https://github.com/WordPress/gutenberg/blob/411b6eee8376e31bf9db4c15c92a80524ae38e9b/packages/block-editor/src/components/block-list/use-block-props/use-focus-first-element.js#L42
    const setEditorIsInitializing = (isInitializing) => {
        if (typeof __unstableSetEditorMode !== 'function') {
            return;
        }
        __unstableSetEditorMode(isInitializing ? 'initialized' : 'edit');
    };
    (0, element_1.useEffect)(() => {
        if (selectedBlockClientIds?.length || !firstBlock) {
            return;
        }
        setEditorIsInitializing(true);
        selectBlock(firstBlock.clientId);
    }, [firstBlock, selectedBlockClientIds]);
    (0, element_1.useEffect)(() => {
        if (isEmpty) {
            const initialBlock = (0, blocks_1.createBlock)('core/paragraph', {
                content: '',
                placeholder,
            });
            insertBlock(initialBlock);
            onChange([initialBlock]);
        }
    }, [isEmpty]);
    const maybeSetEditMode = () => {
        if (editorMode === 'edit') {
            return;
        }
        setEditorIsInitializing(false);
    };
    return (
    /* Gutenberg handles the keyboard events when focusing the content editable area. */
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    (0, element_1.createElement)("div", { className: "fincommerce-rich-text-editor__writing-flow", id: `fincommerce-rich-text-editor__writing-flow-${instanceId}`, style: {
            cursor: isEmpty ? 'text' : 'initial',
        } },
        (0, element_1.createElement)(block_editor_1.BlockTools, null,
            (0, element_1.createElement)(block_editor_1.WritingFlow
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore These are forwarded as props to the WritingFlow component.
            , { 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore These are forwarded as props to the WritingFlow component.
                onClick: maybeSetEditMode, onFocus: maybeSetEditMode },
                (0, element_1.createElement)(block_editor_1.ObserveTyping, null,
                    (0, element_1.createElement)(block_editor_1.BlockList, null)))))
    /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    );
};
exports.EditorWritingFlow = EditorWritingFlow;
