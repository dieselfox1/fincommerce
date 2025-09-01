/**
 * External dependencies
 */
import memoize from 'memoize-one';
export function getProductField(state, name) {
    return state.fields[name] || null;
}
export const getRegisteredProductFields = memoize((state) => Object.keys(state.fields), ([newState], [oldState]) => {
    return newState.fields === oldState.fields;
});
