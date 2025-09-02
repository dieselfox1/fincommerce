/**
 * External dependencies
 */
import { useRegistry } from '@finpress/data';
import { useEffect } from '@finpress/element';
import {
	store as interfaceStore,
	// @ts-expect-error No types for this exist yet.
} from '@finpress/interface';

export const RegisterStores = () => {
	const registry = useRegistry();

	useEffect( () => {
		// @ts-expect-error No types for this exist yet.
		registry.register( interfaceStore );
	}, [ registry ] );

	return null;
};
