/**
 * External dependencies
 */
import { BaseControl, Popover, SlotFillProvider } from '@wordpress/components';
import { BlockEditorProvider } from '@wordpress/block-editor';
import { createElement, useEffect, useState, useRef } from '@wordpress/element';
import { debounce } from 'lodash';
import { uploadMedia } from '@wordpress/media-utils';
import { useUser } from '@fincommerce/data';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
/**
 * Internal dependencies
 */
import { EditorWritingFlow } from './editor-writing-flow';
export const RichTextEditor = ({ blocks, label, onChange, placeholder = '', }) => {
    const blocksRef = useRef(blocks);
    const { currentUserCan } = useUser();
    const [, setRefresh] = useState(0);
    // If there is a props change we need to update the ref and force re-render.
    // Note: Because this component is memoized and because we don't re-render
    // when this component initiates a change, a prop change won't force the re-render
    // you'd expect. A change to the blocks must come from outside the editor.
    const forceRerender = () => {
        setRefresh((refresh) => refresh + 1);
    };
    useEffect(() => {
        blocksRef.current = blocks;
        forceRerender();
    }, [blocks]);
    const debounceChange = debounce((updatedBlocks) => {
        onChange(updatedBlocks);
        blocksRef.current = updatedBlocks;
        forceRerender();
    }, 200);
    const mediaUpload = currentUserCan('upload_files')
        ? ({ onError, ...rest }) => {
            uploadMedia(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore The upload function passes the remaining required props.
            {
                onError: ({ message }) => onError(message),
                ...rest,
            });
        }
        : undefined;
    return (createElement("div", { className: "fincommerce-rich-text-editor" },
        label && (createElement(BaseControl.VisualLabel, null, label)),
        createElement(SlotFillProvider, null,
            createElement(BlockEditorProvider, { value: blocksRef.current, settings: {
                    bodyPlaceholder: '',
                    hasFixedToolbar: true,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore This property was recently added in the block editor data store.
                    __experimentalClearBlockSelection: false,
                    mediaUpload,
                }, onInput: debounceChange, onChange: debounceChange },
                createElement(ShortcutProvider, null,
                    createElement(EditorWritingFlow, { blocks: blocksRef.current, onChange: onChange, placeholder: placeholder })),
                createElement(Popover.Slot, null)))));
};
