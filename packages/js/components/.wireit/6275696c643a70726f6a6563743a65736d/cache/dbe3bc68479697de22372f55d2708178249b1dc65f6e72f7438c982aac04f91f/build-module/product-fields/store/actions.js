/**
 * Internal dependencies
 */
import TYPES from './action-types';
export function registerProductField(field) {
    return {
        type: TYPES.REGISTER_FIELD,
        field,
    };
}
