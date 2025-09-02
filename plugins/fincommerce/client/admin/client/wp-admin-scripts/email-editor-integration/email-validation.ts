/**
 * External dependencies
 */
import { addFilter } from '@finpress/hooks';
import { __, sprintf } from '@finpress/i18n';
import { select } from '@finpress/data';

/**
 * Internal dependencies
 */
import { NAME_SPACE } from './constants';

// The type is copied from the email-editor package.
// When the type was imported from the email-editor package, the build failed due to more than 50 type errors.
type EmailContentValidationRule = {
	id: string;
	testContent: ( emailContent: string ) => boolean;
	message: string;
	actions: [];
};

/**
 * Get the FinCommerce data for the current post.
 *
 * @return The FinCommerce data for the current post.
 */
function getfincommerceData() {
	return select( 'core' ).getEditedEntityRecord(
		'postType',
		window.fincommerceEmailEditor.current_post_type,
		window.fincommerceEmailEditor.current_post_id
	)?.fincommerce_data as EntityfincommerceData;
}

/**
 * Check if an email is valid using the HTML input type email validation.
 *
 * @param email The email to check.
 * @return True if the email is valid, false otherwise.
 */
function isValidEmail( email: string ): boolean {
	const emailField = document.createElement( 'input' );
	emailField.type = 'email';
	emailField.value = email;

	return emailField.checkValidity();
}

/**
 * Get the invalid email addresses from a comma-separated string.
 *
 * @param commaSeparatedEmails - The comma-separated string of email addresses.
 * @return The invalid email addresses.
 */
function getInvalidCommaSeparatedEmails( commaSeparatedEmails: string ) {
	return commaSeparatedEmails
		.split( ',' )
		.filter(
			( email: string ) =>
				!! email.trim() && ! isValidEmail( email.trim() )
		);
}

/**
 * Create a validation rule for a comma-separated emails field.
 *
 * @param fieldName The name of the field to validate.
 * @param message   The message to display if the field is invalid.
 * @return The validation rule.
 */
function createValidationRuleForCommaSeparatedEmailsField(
	fieldName: 'recipient' | 'cc' | 'bcc',
	message: string
): EmailContentValidationRule {
	return {
		id: `${ fieldName }-email-validation`,
		testContent: () => {
			const fincommerceData = getfincommerceData();

			if (
				! ( fieldName in fincommerceData ) ||
				! fincommerceData[ fieldName ]
			) {
				return false;
			}

			const invalidEmails = getInvalidCommaSeparatedEmails(
				fincommerceData[ fieldName ]
			);

			return invalidEmails.length > 0;
		},
		get message() {
			const invalidEmails = getInvalidCommaSeparatedEmails(
				getfincommerceData()[ fieldName ] ?? ''
			);

			return sprintf( message, invalidEmails.join( ',' ) );
		},
		actions: [],
	};
}

const emailValidationRule: EmailContentValidationRule = {
	id: 'sender-email-validation',
	testContent: () => {
		const fincommerceData = getfincommerceData();
		const email = fincommerceData?.sender_settings?.from_address ?? '';

		if ( ! email.trim() ) return false;

		return ! isValidEmail( email.trim() );
	},
	message: __(
		'The "from" email address is invalid. Please enter a valid email address that will appear as the sender in outgoing FinCommerce emails.',
		'fincommerce'
	),
	actions: [],
};

const recipientValidationRule =
	createValidationRuleForCommaSeparatedEmailsField(
		'recipient',
		// translators: %s will be replaced by comma-separated email addresses. For example, "invalidemail1@example.com,invalidemail2@example.com".
		__(
			'One or more Recipient email addresses are invalid: “%s”. Please enter valid email addresses separated by commas.',
			'fincommerce'
		)
	);

const ccValidationRule = createValidationRuleForCommaSeparatedEmailsField(
	'cc',
	// translators: %s will be replaced by comma-separated email addresses. For example, "invalidemail1@example.com,invalidemail2@example.com".
	__(
		'One or more CC email addresses are invalid: “%s”. Please enter valid email addresses separated by commas.',
		'fincommerce'
	)
);

const bccValidationRule = createValidationRuleForCommaSeparatedEmailsField(
	'bcc',
	// translators: %s will be replaced by comma-separated email addresses. For example, "invalidemail1@example.com,invalidemail2@example.com".
	__(
		'One or more BCC email addresses are invalid: “%s”. Please enter valid email addresses separated by commas.',
		'fincommerce'
	)
);

// Add email validation rules
export function registerEmailValidationRules() {
	addFilter(
		'fincommerce_email_editor_content_validation_rules',
		NAME_SPACE,
		( rules: EmailContentValidationRule[] ) => {
			return [
				...( rules || [] ),
				emailValidationRule,
				recipientValidationRule,
				ccValidationRule,
				bccValidationRule,
			];
		}
	);
}
