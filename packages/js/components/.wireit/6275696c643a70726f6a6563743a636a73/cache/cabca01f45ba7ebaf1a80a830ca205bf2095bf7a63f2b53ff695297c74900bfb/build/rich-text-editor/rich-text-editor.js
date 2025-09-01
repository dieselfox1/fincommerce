"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextEditor = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const block_editor_1 = require("@wordpress/block-editor");
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
const media_utils_1 = require("@wordpress/media-utils");
const data_1 = require("@fincommerce/data");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
/**
 * Internal dependencies
 */
const editor_writing_flow_1 = require("./editor-writing-flow");
const RichTextEditor = ({ blocks, label, onChange, placeholder = '', }) => {
    const blocksRef = (0, element_1.useRef)(blocks);
    const { currentUserCan } = (0, data_1.useUser)();
    const [, setRefresh] = (0, element_1.useState)(0);
    // If there is a props change we need to update the ref and force re-render.
    // Note: Because this component is memoized and because we don't re-render
    // when this component initiates a change, a prop change won't force the re-render
    // you'd expect. A change to the blocks must come from outside the editor.
    const forceRerender = () => {
        setRefresh((refresh) => refresh + 1);
    };
    (0, element_1.useEffect)(() => {
        blocksRef.current = blocks;
        forceRerender();
    }, [blocks]);
    const debounceChange = (0, lodash_1.debounce)((updatedBlocks) => {
        onChange(updatedBlocks);
        blocksRef.current = updatedBlocks;
        forceRerender();
    }, 200);
    const mediaUpload = currentUserCan('upload_files')
        ? ({ onError, ...rest }) => {
            (0, media_utils_1.uploadMedia)(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore The upload function passes the remaining required props.
            {
                onError: ({ message }) => onError(message),
                ...rest,
            });
        }
        : undefined;
    return ((0, element_1.createElement)("div", { className: "fincommerce-rich-text-editor" },
        label && ((0, element_1.createElement)(components_1.BaseControl.VisualLabel, null, label)),
        (0, element_1.createElement)(components_1.SlotFillProvider, null,
            (0, element_1.createElement)(block_editor_1.BlockEditorProvider, { value: blocksRef.current, settings: {
                    bodyPlaceholder: '',
                    hasFixedToolbar: true,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore This property was recently added in the block editor data store.
                    __experimentalClearBlockSelection: false,
                    mediaUpload,
                }, onInput: debounceChange, onChange: debounceChange },
                (0, element_1.createElement)(keyboard_shortcuts_1.ShortcutProvider, null,
                    (0, element_1.createElement)(editor_writing_flow_1.EditorWritingFlow, { blocks: blocksRef.current, onChange: onChange, placeholder: placeholder })),
                (0, element_1.createElement)(components_1.Popover.Slot, null)))));
};
exports.RichTextEditor = RichTextEditor;
