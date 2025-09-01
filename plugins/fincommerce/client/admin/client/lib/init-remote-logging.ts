/**
 * External dependencies
 */
import { init } from '@fincommerce/remote-logging';

export const initRemoteLogging = () => {
	init( {
		errorRateLimitMs: 60000, // 1 minute
	} );
};
