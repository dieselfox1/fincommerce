/**
 * External dependencies
 */
import { Button, Modal, TextControl } from '@finpress/components';
import { Icon, check, warning } from '@finpress/icons';
import apiFetch from '@finpress/api-fetch';
import { useState } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { isValidEmail } from '@fincommerce/product-editor/build/utils/validate-email'; // Import from the build directory so we don't load the entire product editor since we only need this one function.

/**
 * Internal dependencies
 */
import { emailPreviewNonce } from './settings-email-preview-nonce';

type EmailPreviewSendProps = {
	type: string;
};

type EmailPreviewSendResponse = {
	message: string;
};

type WPError = {
	message: string;
	code: string;
	data: {
		status: number;
	};
};

export const EmailPreviewSend = ( { type }: EmailPreviewSendProps ) => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ email, setEmail ] = useState( '' );
	const [ isSending, setIsSending ] = useState( false );
	const [ notice, setNotice ] = useState( '' );
	const [ noticeType, setNoticeType ] = useState( '' );
	const nonce = emailPreviewNonce();

	const handleSendEmail = async () => {
		setIsSending( true );
		setNotice( '' );
		try {
			const response: EmailPreviewSendResponse = await apiFetch( {
				path: `wc-admin-email/settings/email/send-preview?nonce=${ nonce }`,
				method: 'POST',
				data: { email, type },
			} );
			setNotice( response.message );
			setNoticeType( 'success' );
			recordEvent( 'settings_emails_preview_test_sent_successful', {
				email_type: type,
			} );
		} catch ( e ) {
			const wpError = e as WPError;
			setNotice( wpError.message );
			setNoticeType( 'error' );
			recordEvent( 'settings_emails_preview_test_sent_failed', {
				email_type: type,
				error: wpError.message,
			} );
		}
		setIsSending( false );
	};

	return (
		<div className="wc-settings-email-preview-send">
			<Button
				variant="secondary"
				onClick={ () => setIsModalOpen( true ) }
			>
				{ __( 'Send a test email', 'fincommerce' ) }
			</Button>

			{ isModalOpen && (
				<Modal
					title={ __( 'Send a test email', 'fincommerce' ) }
					onRequestClose={ () => {
						setIsModalOpen( false );
						setIsSending( false );
					} }
					className="wc-settings-email-preview-send-modal"
				>
					<p>
						{ __(
							'Send yourself a test email to check how your email looks in different email apps.',
							'fincommerce'
						) }
					</p>

					<TextControl
						label={ __( 'Send to', 'fincommerce' ) }
						type="email"
						value={ email }
						placeholder={ __( 'Enter an email', 'fincommerce' ) }
						onChange={ setEmail }
					/>
					{ notice && (
						<div
							className={ `wc-settings-email-preview-send-modal-notice wc-settings-email-preview-send-modal-notice-${ noticeType }` }
						>
							<Icon
								icon={
									noticeType === 'success' ? check : warning
								}
							/>
							<span>{ notice }</span>
						</div>
					) }

					<div className="wc-settings-email-preview-send-modal-buttons">
						<Button
							variant="tertiary"
							onClick={ () => setIsModalOpen( false ) }
						>
							{ __( 'Cancel', 'fincommerce' ) }
						</Button>
						<Button
							variant="primary"
							onClick={ handleSendEmail }
							isBusy={ isSending }
							disabled={ ! isValidEmail( email ) || isSending }
						>
							{ isSending
								? __( 'Sending…', 'fincommerce' )
								: __( 'Send test email', 'fincommerce' ) }
						</Button>
					</div>
				</Modal>
			) }
		</div>
	);
};
