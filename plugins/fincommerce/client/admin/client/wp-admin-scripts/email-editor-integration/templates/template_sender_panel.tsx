/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, TextControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useCallback, useRef } from '@wordpress/element';

type TemplateSenderPanelProps = {
	debouncedRecordEvent: (
		name: string,
		data?: Record< string, unknown >
	) => void;
};

function TemplateSenderPanel( {
	debouncedRecordEvent,
}: TemplateSenderPanelProps ) {
	const [ fincommerce_template_data, setfincommerceTemplateData ] =
		useEntityProp( 'postType', 'wp_template', 'fincommerce_data' );
	const emailInputRef = useRef< HTMLInputElement >( null );

	const handleFromNameChange = useCallback(
		( value: string ) => {
			setfincommerceTemplateData( {
				...fincommerce_template_data,
				sender_settings: {
					...fincommerce_template_data?.sender_settings,
					from_name: value,
				},
			} );
			debouncedRecordEvent( 'email_from_name_input_updated', { value } );
		},
		[ fincommerce_template_data, setfincommerceTemplateData ]
	);
	const handleFromAddressChange = useCallback(
		( value: string ) => {
			setfincommerceTemplateData( {
				...fincommerce_template_data,
				sender_settings: {
					...fincommerce_template_data?.sender_settings,
					from_address: value,
				},
			} );

			// Use HTML5 validation
			if ( emailInputRef.current ) {
				emailInputRef.current.checkValidity();
				emailInputRef.current.reportValidity();
			}
			debouncedRecordEvent( 'email_from_address_input_updated', {
				value,
			} );
		},
		[ fincommerce_template_data, setfincommerceTemplateData ]
	);

	return (
		<>
			<h2>{ __( 'Sender Options', 'fincommerce' ) }</h2>
			<PanelRow>
				<p>
					{ __(
						'This is how your sender name and email address would appear in outgoing FinCommerce emails.',
						'fincommerce'
					) }
				</p>
			</PanelRow>

			<PanelRow>
				<TextControl
					className="fincommerce-email-sidebar-template-settings-sender-options-input"
					/* translators: Label for the sender's `“from” name` in email settings. */
					label={ __( '“from” name', 'fincommerce' ) }
					name="from_name"
					type="text"
					value={
						fincommerce_template_data?.sender_settings?.from_name ||
						''
					}
					onChange={ handleFromNameChange }
				/>
			</PanelRow>

			<PanelRow>
				<TextControl
					ref={ emailInputRef }
					className="fincommerce-email-sidebar-template-settings-sender-options-input"
					/* translators: Label for the sender's `“from” email` in email settings. */
					label={ __( '“from” email', 'fincommerce' ) }
					name="from_email"
					type="email"
					value={
						fincommerce_template_data?.sender_settings
							?.from_address || ''
					}
					onChange={ handleFromAddressChange }
					required
				/>
			</PanelRow>
		</>
	);
}

export { TemplateSenderPanel };
