/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Card, CardBody, CardHeader } from '@wordpress/components';
import { recordEvent } from '@fincommerce/tracks';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import './suggestion.scss';

const recordTrack = () => {
	recordEvent( 'tasklist_payments_wcpay_bnpl_click' );
};

export const Suggestion = ( { paymentGateway } ) => {
	const { id, title, content, settingsUrl, image } = paymentGateway;

	// If there is no settingsUrl, bail.
	if ( ! settingsUrl ) {
		return null;
	}

	const customizedSettingsUrl = addQueryArgs( settingsUrl, {
		from: 'WCADMIN_PAYMENT_TASK',
	} );

	return (
		<Card
			className="fincommerce-wcpay-bnpl-suggestion"
			size="medium"
			key={ id }
		>
			<div className="fincommerce-wcpay-bnpl-suggestion__contents-container">
				<CardHeader as="h2" isBorderless style={ { padding: 0 } }>
					{ title }
				</CardHeader>
				<CardBody
					className="fincommerce-wcpay-bnpl-suggestion__body"
					style={ { padding: 0 } }
				>
					<div
						className="fincommerce-wcpay-bnpl-suggestion__contents"
						style={ ! image ? { maxWidth: '100%' } : {} }
					>
						<p className="fincommerce-wcpay-bnpl-suggestion__description">
							{ content }
						</p>
						<Button
							className="fincommerce-wcpay-bnpl-suggestion__button"
							variant="primary"
							href={ customizedSettingsUrl }
							onClick={ recordTrack }
						>
							{ __( 'Get started', 'fincommerce' ) }
						</Button>
					</div>
				</CardBody>
			</div>
			{ image && (
				<img
					alt={ __( 'WooPayments BNPL illustration', 'fincommerce' ) }
					src={ image }
					className="svg-background"
				/>
			) }
		</Card>
	);
};
