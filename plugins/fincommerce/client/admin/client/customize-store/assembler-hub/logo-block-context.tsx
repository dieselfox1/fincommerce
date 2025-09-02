/**
 * External dependencies
 */
import { createContext } from '@finpress/element';

export const LogoBlockContext = createContext< {
	logoBlockIds: Array< string >;
	setLogoBlockIds: ( clientIds: Array< string > ) => void;
} >( {
	logoBlockIds: [],
	setLogoBlockIds: () => {},
} );
