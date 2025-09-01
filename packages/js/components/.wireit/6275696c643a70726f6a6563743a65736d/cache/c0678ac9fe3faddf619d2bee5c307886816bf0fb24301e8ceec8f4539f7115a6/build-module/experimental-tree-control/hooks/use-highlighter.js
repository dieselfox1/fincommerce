/**
 * External dependencies
 */
import { useMemo } from 'react';
export function useHighlighter({ item, multiple, checkedStatus, shouldItemBeHighlighted, }) {
    const isHighlighted = useMemo(() => {
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
