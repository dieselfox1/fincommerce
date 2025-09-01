/**
 * Internal dependencies
 */
import { ProductFieldState } from './types';
export declare function getProductField(state: ProductFieldState, name: string): import("./types").ProductFieldDefinition;
export declare const getRegisteredProductFields: import("memoize-one").MemoizedFn<(state: ProductFieldState) => string[]>;
//# sourceMappingURL=selectors.d.ts.map