/**
 * Internal dependencies
 */
import { CheckedStatus, TreeItemProps } from '../types';
export declare function useHighlighter({ item, multiple, checkedStatus, shouldItemBeHighlighted, }: Pick<TreeItemProps, 'item' | 'multiple' | 'shouldItemBeHighlighted'> & {
    checkedStatus: CheckedStatus;
}): {
    isHighlighted: boolean | undefined;
};
//# sourceMappingURL=use-highlighter.d.ts.map