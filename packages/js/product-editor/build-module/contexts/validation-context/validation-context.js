/**
 * External dependencies
 */
import { createContext } from '@wordpress/element';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ValidationContext = createContext({
    errors: {},
    getFieldByValidatorId: () => ({}),
    registerValidator: () => () => { },
    unRegisterValidator: () => () => { },
    validateField: () => Promise.resolve(undefined),
    validateAll: () => Promise.resolve({}),
});
