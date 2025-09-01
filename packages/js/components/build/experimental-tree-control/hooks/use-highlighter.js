"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHighlighter = useHighlighter;
/**
 * External dependencies
 */
const react_1 = require("react");
function useHighlighter({ item, multiple, checkedStatus, shouldItemBeHighlighted, }) {
    const isHighlighted = (0, react_1.useMemo)(() => {
        if (typeof shouldItemBeHighlighted === 'function') {
            if (multiple || item.children.length === 0) {
                return shouldItemBeHighlighted(item);
            }
        }
        if (!multiple) {
            return checkedStatus === 'checked';
        }
    }, [item, multiple, checkedStatus, shouldItemBeHighlighted]);
    return { isHighlighted };
}
