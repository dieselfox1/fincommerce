/**
 * Internal dependencies
 */
import { TreeItemProps } from '../types';
export declare function useExpander({ shouldItemBeExpanded, item, }: Pick<TreeItemProps, 'shouldItemBeExpanded' | 'item'>): {
    isExpanded: boolean;
    onExpand: () => void;
    onCollapse: () => void;
    onToggleExpand: () => void;
};
//# sourceMappingURL=use-expander.d.ts.map