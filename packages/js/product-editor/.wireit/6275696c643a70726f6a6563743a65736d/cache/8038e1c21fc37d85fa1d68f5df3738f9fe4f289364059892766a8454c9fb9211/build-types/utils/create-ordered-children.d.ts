import { Fill } from '@wordpress/components';
/**
 * Ordered fill item.
 *
 * @param {Node}   children    - Node children.
 * @param {number} order       - Node order.
 * @param {Array}  props       - Fill props.
 * @param {Object} injectProps - Props to inject.
 * @return {Node} Node.
 */
declare function createOrderedChildren<T = React.ComponentProps<typeof Fill>, S = Record<string, unknown>>(children: React.ReactNode, order: number, props: T, injectProps?: S): React.ReactElement;
export { createOrderedChildren };
//# sourceMappingURL=create-ordered-children.d.ts.map