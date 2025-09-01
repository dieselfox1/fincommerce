import { Slot, Fill } from '@wordpress/components';
type FillProps = React.ComponentProps<typeof Fill>;
type SlotProps = React.ComponentProps<typeof Slot>;
/**
 * Ordered fill item.
 *
 * @param {Node}   children    - Node children.
 * @param {number} order       - Node order.
 * @param {Array}  props       - Fill props.
 * @param {Object} injectProps - Props to inject.
 * @return {Node} Node.
 */
declare function createOrderedChildren<T = FillProps, S = Record<string, unknown>>(children: React.ReactNode | ((props: T & {
    order: number;
}) => React.ReactNode), order: number, props: T, injectProps?: S): React.ReactNode;
export { createOrderedChildren };
/**
 * Sort fills by order for slot children.
 *
 * @param {Array} fills - slot's `Fill`s.
 * @return {Node} Node.
 */
export declare const sortFillsByOrder: SlotProps['children'];
export declare const escapeHTML: (string: string) => string;
//# sourceMappingURL=utils.d.ts.map