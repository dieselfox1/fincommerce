/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Icon, warning } from '@finpress/icons';
import clsx from 'clsx';
import { Button, Placeholder, Spinner } from '@finpress/components';

/**
 * Internal dependencies
 */
import ErrorMessage from '@fincommerce/block-library/assets/js/editor-components/error-placeholder/error-message';
import '@fincommerce/block-library/assets/js/editor-components/error-placeholder/editor.scss';

export interface ErrorObject {
	/**
	 * Error code for more specific identification of the error.
	 */
	code?: string;
	/**
	 * Human-readable error message to display.
	 */
	message: string;
	/**
	 * Context in which the error was triggered. That will determine how the error is displayed to the user.
	 */
	type: 'api' | 'general' | string;
}

export interface ErrorPlaceholderProps {
	/**
	 * Classname to add to placeholder in addition to the defaults.
	 */
	className?: string;
	/**
	 * The error object.
	 */
	error: ErrorObject;
	/**
	 * Whether there is a request running, so the 'Retry' button is hidden and
	 * a spinner is shown instead.
	 */
	isLoading: boolean;
	/**
	 * Callback to retry an action.
	 */
	onRetry?: ( () => void ) | undefined;
}

const ErrorPlaceholder = ( {
	className = '',
	error,
	isLoading = false,
	onRetry,
}: ErrorPlaceholderProps ): JSX.Element => (
	<Placeholder
		icon={ <Icon icon={ warning } /> }
		label={ __( 'Sorry, an error occurred', 'fincommerce' ) }
		className={ clsx( 'wc-block-api-error', className ) }
	>
		<ErrorMessage error={ error } />
		{ onRetry && (
			<>
				{ isLoading ? (
					<Spinner />
				) : (
					<Button variant="secondary" onClick={ onRetry }>
						{ __( 'Retry', 'fincommerce' ) }
					</Button>
				) }
			</>
		) }
	</Placeholder>
);

export default ErrorPlaceholder;
