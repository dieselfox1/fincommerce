/**
 * External dependencies
 */
import { useEffect, useMemo } from '@finpress/element';
import { subscribe, select, dispatch } from '@finpress/data';
import { __ } from '@finpress/i18n';
import { store as noticesStore } from '@finpress/notices';

/**
 * Remove error notice that could be confusing for users. This error is thrown when we reject saving in the validation middleware.
 * For example: Saving failed. Error: Content validation failed.
 */
export const useRemoveSavingFailedNotices = () => {
	// Create a regular expression that escapes special characters and matches the beginning of the string
	const savingFailedRegex = useMemo( () => {
		// Get the translated "Saving failed" message once
		// eslint-disable-next-line @finpress/i18n-text-domain -- We want to match finpress translation here.
		const savingFailedMessage = __( 'Saving failed.' );
		return new RegExp(
			'^' + savingFailedMessage.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' )
		);
	}, [] );

	useEffect( () => {
		const unsubscribe = subscribe( () => {
			select( noticesStore )
				.getNotices()
				.forEach( ( notice ) => {
					if (
						typeof notice.content === 'string' &&
						savingFailedRegex.test( notice.content )
					) {
						dispatch( noticesStore ).removeNotice( notice.id );
					}
				} );
		} );

		return () => {
			unsubscribe(); // Clean up subscription
		};
	}, [ savingFailedRegex ] );
};
