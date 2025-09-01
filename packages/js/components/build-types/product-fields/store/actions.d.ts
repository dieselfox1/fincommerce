/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { ProductFieldDefinition } from './types';
export declare function registerProductField(field: ProductFieldDefinition): {
    type: TYPES;
    field: ProductFieldDefinition;
};
export type Actions = ReturnType<typeof registerProductField>;
//# sourceMappingURL=actions.d.ts.map