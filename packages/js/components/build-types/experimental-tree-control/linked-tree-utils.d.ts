/**
 * Internal dependencies
 */
import { Item, LinkedTree } from './types';
export declare function createLinkedTree(items: Item[], value: string | undefined): LinkedTree[];
export declare function toggleNode(tree: LinkedTree[], number: number, value: boolean): LinkedTree[];
export declare function getVisibleNodeIndex(tree: LinkedTree[], highlightedIndex: number, direction: 'up' | 'down'): number | undefined;
export declare function countNumberOfNodes(linkedTree: LinkedTree[]): number;
export declare function getNodeDataByIndex(linkedTree: LinkedTree[], index: number): Item | undefined;
//# sourceMappingURL=linked-tree-utils.d.ts.map