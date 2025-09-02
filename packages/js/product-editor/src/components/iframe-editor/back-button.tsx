/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { arrowLeft } from '@finpress/icons';
import { Button } from '@finpress/components';
import { createElement } from '@finpress/element';

type BackButtonProps = {
	onClick: () => void;
};

export function BackButton( { onClick }: BackButtonProps ) {
	return (
		<Button
			className="fincommerce-iframe-editor__back-button"
			icon={ arrowLeft }
			onClick={ onClick }
		>
			{ __( 'Back', 'fincommerce' ) }
		</Button>
	);
}
