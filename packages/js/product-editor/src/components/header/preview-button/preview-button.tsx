/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { createElement } from '@finpress/element';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { Product } from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';
import { useDispatch } from '@finpress/data';

/**
 * Internal dependencies
 */
import { useErrorHandler } from '../../../hooks/use-error-handler';
import { usePreview } from '../hooks/use-preview';
import { PreviewButtonProps } from './types';
import { TRACKS_SOURCE } from '../../../constants';

export function PreviewButton( {
	productStatus,
	visibleTab = 'general',
	...props
}: PreviewButtonProps ) {
	const { createErrorNotice } = useDispatch( 'core/notices' );
	const { getProductErrorMessageAndProps } = useErrorHandler();

	const previewButtonProps = usePreview( {
		productStatus,
		...props,
		onClick() {
			recordEvent( 'product_preview_changes', { source: TRACKS_SOURCE } );
		},
		onSaveSuccess( savedProduct: Product ) {
			if ( productStatus === 'auto-draft' ) {
				const url = getNewPath( {}, `/product/${ savedProduct.id }` );
				navigateTo( { url } );
			}
		},
		async onSaveError( error ) {
			const { message, errorProps } =
				await getProductErrorMessageAndProps( error, visibleTab );
			createErrorNotice( message, errorProps );
		},
	} );

	return <Button { ...previewButtonProps } />;
}
