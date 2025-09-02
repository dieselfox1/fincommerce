/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@finpress/compose';
import { useSelect, useDispatch } from '@finpress/data';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { store } from './';
import { WCUser } from './types';

/**
 * Higher-order component used to hydrate current user data.
 *
 * @param {Object} currentUser Current user object in the same format as the WP REST API returns.
 */
export const withCurrentUserHydration = ( currentUser: WCUser ) =>
	createHigherOrderComponent<
		React.ComponentType< Record< string, unknown > >,
		React.ComponentType< Record< string, unknown > >
	>(
		( OriginalComponent ) => ( props ) => {
			// Use currentUser to hydrate calls to @finpress/core-data's getCurrentUser().

			const shouldHydrate = useSelect( ( select ) => {
				if ( ! currentUser ) {
					return;
				}

				const { isResolving, hasFinishedResolution } = select( store );
				return (
					! isResolving( 'getCurrentUser', [] ) &&
					! hasFinishedResolution( 'getCurrentUser', [] )
				);
			}, [] );

			const { startResolution, finishResolution, receiveCurrentUser } =
				useDispatch( store );

			if ( shouldHydrate ) {
				startResolution( 'getCurrentUser', [] );
				receiveCurrentUser( currentUser );
				finishResolution( 'getCurrentUser', [] );
			}

			return <OriginalComponent { ...props } />;
		},
		'withCurrentUserHydration'
	);
