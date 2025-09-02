/**
 * External dependencies
 */
import { createContext, useContext } from '@finpress/element';

/**
 * Context consumed by inner blocks.
 */
export type CartBlockContextProps = {
	hasDarkControls: boolean;
};

export const CartBlockContext = createContext< CartBlockContextProps >( {
	hasDarkControls: false,
} );

export const useCartBlockContext = (): CartBlockContextProps => {
	return useContext( CartBlockContext );
};
