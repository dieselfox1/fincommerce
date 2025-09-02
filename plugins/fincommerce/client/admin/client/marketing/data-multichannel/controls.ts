/**
 * External dependencies
 */
import { controls as dataControls } from '@finpress/data-controls';
import { AnyAction } from 'redux';

export const awaitResponseJson = (
	response: Response
): AnyAction & { response: Response } => {
	return {
		type: 'AWAIT_RESPONSE_JSON',
		response,
	};
};

const controls = {
	...dataControls,
	AWAIT_RESPONSE_JSON( action: AnyAction ) {
		return action.response.json();
	},
};

export default controls;
