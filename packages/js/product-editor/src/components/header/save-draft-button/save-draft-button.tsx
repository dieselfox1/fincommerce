/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';
import { createElement } from '@finpress/element';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { Product } from '@fincommerce/data';
import { useDispatch } from '@finpress/data';

/**
 * Internal dependencies
 */
import { useErrorHandler } from '../../../hooks/use-error-handler';
import { recordProductEvent } from '../../../utils/record-product-event';
import { useSaveDraft } from '../hooks/use-save-draft';
import { SaveDraftButtonProps } from './types';
import { useFeedbackBar } from '../../../hooks/use-feedback-bar';

export function SaveDraftButton( {
	productStatus,
	productType = 'product',
	visibleTab = 'general',
	...props
}: SaveDraftButtonProps ) {
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( 'core/notices' );

	const { maybeShowFeedbackBar } = useFeedbackBar();

	const { getProductErrorMessageAndProps } = useErrorHandler();

	const saveDraftButtonProps = useSaveDraft( {
		productStatus,
		productType,
		...props,
		onSaveSuccess( savedProduct: Product ) {
			recordProductEvent( 'product_edit', savedProduct );

			createSuccessNotice(
				__( 'Product saved as draft.', 'fincommerce' )
			);

			maybeShowFeedbackBar();

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

	return <Button { ...saveDraftButtonProps } />;
}
