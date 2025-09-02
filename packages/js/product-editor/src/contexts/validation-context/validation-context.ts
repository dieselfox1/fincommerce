/**
 * External dependencies
 */
import { createContext } from '@finpress/element';

/**
 * Internal dependencies
 */
import { ValidationContextProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ValidationContext = createContext< ValidationContextProps< any > >(
	{
		errors: {},
		getFieldByValidatorId: () => ( {} as Promise< HTMLInputElement > ),
		registerValidator: () => () => {},
		unRegisterValidator: () => () => {},
		validateField: () => Promise.resolve( undefined ),
		validateAll: () => Promise.resolve( {} ),
	}
);
