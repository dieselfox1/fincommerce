"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditorHistory = useEditorHistory;
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const DEFAULT_MAX_HISTORY = 50;
function useEditorHistory({ maxHistory = DEFAULT_MAX_HISTORY, setBlocks, }) {
    const [edits, setEdits] = (0, element_1.useState)([]);
    const [offsetIndex, setOffsetIndex] = (0, element_1.useState)(0);
    const appendEdit = (0, compose_1.useDebounce)((0, element_1.useCallback)((edit) => {
        const currentEdits = edits.slice(0, offsetIndex + 1);
        const newEdits = [...currentEdits, edit].slice(maxHistory * -1);
        setEdits(newEdits);
        setOffsetIndex(newEdits.length - 1);
    }, [edits, maxHistory, offsetIndex]), 500);
    const undo = (0, element_1.useCallback)(() => {
        appendEdit.flush();
        const newIndex = Math.max(0, offsetIndex - 1);
        if (!edits[newIndex]) {
            return;
        }
        setBlocks(edits[newIndex]);
        setOffsetIndex(newIndex);
    }, [appendEdit, edits, offsetIndex, setBlocks]);
    const redo = (0, element_1.useCallback)(() => {
        appendEdit.flush();
        const newIndex = Math.min(edits.length - 1, offsetIndex + 1);
        if (!edits[newIndex]) {
            return;
        }
        setBlocks(edits[newIndex]);
        setOffsetIndex(newIndex);
    }, [appendEdit, edits, offsetIndex, setBlocks]);
    function hasUndo() {
        return !!edits.length && offsetIndex > 0;
    }
    function hasRedo() {
        return !!edits.length && offsetIndex < edits.length - 1;
    }
    return {
        appendEdit,
        hasRedo: hasRedo(),
        hasUndo: hasUndo(),
        redo,
        undo,
    };
}
