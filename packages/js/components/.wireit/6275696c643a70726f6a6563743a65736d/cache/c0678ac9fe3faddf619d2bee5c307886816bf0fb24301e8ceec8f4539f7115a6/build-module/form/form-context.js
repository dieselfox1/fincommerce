/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';
export const FormContext = createContext({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormContext() {
    const formContext = useContext(FormContext);
    return formContext;
}
