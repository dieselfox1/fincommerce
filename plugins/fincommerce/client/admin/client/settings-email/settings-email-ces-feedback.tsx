/**
 * External dependencies
 */
import { Button, TextareaControl, TextControl } from '@finpress/components';
import { isEmail } from '@finpress/url';
import { __ } from '@finpress/i18n';
import { useDispatch } from '@finpress/data';
import { useCallback, useEffect, useRef } from '@finpress/element';
import { STORE_KEY as CES_STORE_KEY } from '@fincommerce/customer-effort-score';

/**
 * Internal dependencies
 */
import FeedbackIcon from './icon-feedback';

interface EmailCesFeedbackProps {
	action: string;
	description?: string;
	question: string;
	showOnLoad?: boolean;
}

export const EmailCesFeedback = ( {
	action,
	description,
	question,
	showOnLoad = false,
}: EmailCesFeedbackProps ) => {
	const { showCesModal } = useDispatch( CES_STORE_KEY );
	const hasShownModalRef = useRef( false );

	const handleFeedbackClick = useCallback( () => {
		showCesModal( {
			action,
			title: __( 'Share your experience', 'fincommerce' ),
			showDescription: !! description,
			description,
			firstQuestion: question,
			getExtraFieldsToBeShown: (
				extraFieldsValues: { [ key: string ]: string },
				setExtraFieldsValues: ( values: {
					[ key: string ]: string;
				} ) => void,
				errors: Record< string, string > | undefined
			) => {
				return (
					<div>
						<br />
						<TextareaControl
							label={ __(
								'How can we improve the email customizer for you? (Optional)',
								'fincommerce'
							) }
							value={ extraFieldsValues.feedback_comment || '' }
							onChange={ ( value ) =>
								setExtraFieldsValues( {
									...extraFieldsValues,
									feedback_comment: value,
								} )
							}
							placeholder={ __(
								"What did you try to achieve with the customizer? What did and didn't work?",
								'fincommerce'
							) }
						/>
						<TextControl
							label={ __(
								'Email address (Optional)',
								'fincommerce'
							) }
							type="email"
							value={ extraFieldsValues.email || '' }
							onChange={ ( value ) =>
								setExtraFieldsValues( {
									...extraFieldsValues,
									email: value,
								} )
							}
							help={
								errors?.email ? (
									<span className="fincommerce-customer-effort-score__errors">
										{ errors.email }
									</span>
								) : (
									__(
										'Share if you would like to discuss your experience or participate in future research.',
										'fincommerce'
									)
								)
							}
						/>
					</div>
				);
			},
			validateExtraFields: ( { email = '' }: { email?: string } ) => {
				const errors: Record< string, string > | undefined = {};
				if ( email.length > 0 && ! isEmail( email ) ) {
					errors.email = __(
						'Please enter a valid email address.',
						'fincommerce'
					);
				}
				return errors;
			},
		} );
	}, [ action, description, question, showCesModal ] );

	useEffect( () => {
		if (
			window.wcTracks?.isEnabled &&
			showOnLoad &&
			! hasShownModalRef.current
		) {
			hasShownModalRef.current = true;
			handleFeedbackClick();
		}
	}, [ handleFeedbackClick, showOnLoad ] );

	return (
		window.wcTracks?.isEnabled &&
		! showOnLoad && (
			<Button
				variant="tertiary"
				icon={ <FeedbackIcon /> }
				iconSize={ 12 }
				onClick={ handleFeedbackClick }
			>
				{ __( 'Help us improve', 'fincommerce' ) }
			</Button>
		)
	);
};
