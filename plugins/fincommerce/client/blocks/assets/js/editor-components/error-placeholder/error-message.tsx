/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { escapeHTML } from '@finpress/escape-html';

/**
 * Internal dependencies
 */
import { ErrorObject } from '@fincommerce/block-library/assets/js/editor-components/error-placeholder';

export interface ErrorMessageProps {
	/**
	 * The error object.
	 */
	error: ErrorObject;
}

const getErrorMessage = ( { message, type }: ErrorObject ) => {
	if ( ! message ) {
		return __(
			'An error has prevented the block from being updated.',
			'fincommerce'
		);
	}

	if ( type === 'general' ) {
		return (
			<span>
				{ __( 'The following error was returned', 'fincommerce' ) }
				<br />
				<code>{ escapeHTML( message ) }</code>
			</span>
		);
	}

	if ( type === 'api' ) {
		return (
			<span>
				{ __(
					'The following error was returned from the API',
					'fincommerce'
				) }
				<br />
				<code>{ escapeHTML( message ) }</code>
			</span>
		);
	}

	return message;
};

const ErrorMessage = ( { error }: ErrorMessageProps ): JSX.Element => (
	<div className="wc-block-error-message">{ getErrorMessage( error ) }</div>
);

export default ErrorMessage;
