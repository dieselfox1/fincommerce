/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { Spinner } from '@fincommerce/components';
import { __ } from '@finpress/i18n';

export const SendMagicLinkButton = ( {
	onClickHandler,
	isFetching,
}: {
	onClickHandler: () => void;
	isFetching: boolean;
} ) => (
	<Button className="send-magic-link-button" onClick={ onClickHandler }>
		{ isFetching && <Spinner className="send-magic-link-spinner" /> }
		<div
			style={ {
				visibility: isFetching ? 'hidden' : 'visible',
			} }
			className="send-magic-link-button-contents"
		>
			<div className="send-magic-link-button-text">
				{ __( '✨️ Send the sign-in link', 'fincommerce' ) }
			</div>
		</div>
	</Button>
);
