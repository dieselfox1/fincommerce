/**
 * External dependencies
 */
import { speak } from '@finpress/a11y';

export type Action = {
	message: string;
	ariaLive?: string;
};

export default {
	SPEAK( action: Action ) {
		speak( action.message, action.ariaLive || 'assertive' );
	},
};
