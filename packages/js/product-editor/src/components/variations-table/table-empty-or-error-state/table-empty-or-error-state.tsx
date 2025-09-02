/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { TableEmptyOrErrorStateProps } from './types';
import { ErrorVariationsImage } from '../../../images/error-variations-image';
import { EmptyVariationsImage } from '../../../images/empty-variations-image';

export function EmptyOrErrorTableState( {
	message,
	actionText,
	isError,
	onActionClick,
}: TableEmptyOrErrorStateProps ) {
	return (
		<div className="fincommerce-variations-table-error-or-empty-state">
			{ isError ? <ErrorVariationsImage /> : <EmptyVariationsImage /> }
			<p className="fincommerce-variations-table-error-or-empty-state__message">
				{ isError
					? __( 'We couldn’t load the variations', 'fincommerce' )
					: message ?? __( 'No variations yet', 'fincommerce' ) }
			</p>

			<div className="fincommerce-variations-table-error-or-empty-state__actions">
				<Button variant="link" onClick={ onActionClick }>
					{ isError
						? __( 'Try again', 'fincommerce' )
						: actionText ??
						  __( 'Generate from options', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
}
