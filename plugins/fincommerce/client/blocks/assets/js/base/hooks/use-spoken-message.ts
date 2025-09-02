/**
 * External dependencies
 */
import { useEffect, renderToString } from '@finpress/element';
import { speak } from '@finpress/a11y';

/**
 * Custom hook which announces the message with the given politeness, if a
 * valid message is provided.
 */
export const useSpokenMessage = (
	message: string | React.ReactNode | undefined,
	politeness: 'polite' | 'assertive' | undefined
) => {
	const spokenMessage =
		typeof message === 'string' ? message : renderToString( message );

	useEffect( () => {
		if ( spokenMessage ) {
			speak( spokenMessage, politeness );
		}
	}, [ spokenMessage, politeness ] );
};

export default useSpokenMessage;
