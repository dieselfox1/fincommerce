/* eslint-disable max-len */
/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import interpolateComponents from '@automattic/interpolate-components';
import React from 'react';

const documentationUrls = {
	tos: 'https://wordpress.com/tos/',
	signUpLink:
		'https://fincommerce.com/document/woopayments/startup-guide/#sign-up-process',
	merchantTerms: 'https://wordpress.com/tos/#more-woopay-specifically',
	privacyPolicy: 'https://automattic.com/privacy/',
};

export default {
	steps: {
		activate: {
			heading: __( 'Start accepting real payments', 'fincommerce' ),
			subheading: interpolateComponents( {
				mixedString: __(
					'You are currently testing payments on your store. To activate real payments, you will need to provide some additional details about your business. {{link}}Learn more{{/link}}.',
					'fincommerce'
				),
				components: {
					link: (
						// eslint-disable-next-line jsx-a11y/anchor-has-content
						<a
							rel="external noopener noreferrer"
							target="_blank"
							href={ documentationUrls.signUpLink }
						/>
					),
				},
			} ),
			cta: __( 'Activate payments', 'fincommerce' ),
		},
		business: {
			heading: __(
				'Let’s get your store ready to accept payments',
				'fincommerce'
			),
			subheading: __(
				'We’ll use these details to enable payments for your store. This information can’t be changed after your account is created.',
				'fincommerce'
			),
		},
		store: {
			heading: __( 'Please share a few more details', 'fincommerce' ),
			subheading: __(
				'This info will help us speed up the set up process.',
				'fincommerce'
			),
		},
		loading: {
			heading: __(
				'One last step! Verify your identity with our partner',
				'fincommerce'
			),
			subheading: __(
				'This will take place in a secure environment through our partner. Once your business details are verified, you’ll be redirected back to your store dashboard.',
				'fincommerce'
			),
			cta: __( 'Finish your verification process', 'fincommerce' ),
		},
		embedded: {
			heading: __(
				'One last step! Verify your identity with our partner',
				'fincommerce'
			),
			subheading: __(
				'This info will verify your account',
				'fincommerce'
			),
		},
	},
	fields: {
		country: __( 'Where is your business located?', 'fincommerce' ),
		business_type: __(
			'What type of legal entity is your business?',
			'fincommerce'
		),
		'company.structure': __(
			'What category of legal entity identify your business?',
			'fincommerce'
		),
		mcc: __(
			'What type of goods or services does your business sell? ',
			'fincommerce'
		),
	},
	errors: {
		generic: __( 'Please provide a response', 'fincommerce' ),
		country: __( 'Please provide a country', 'fincommerce' ),
		business_type: __( 'Please provide a business type', 'fincommerce' ),
		mcc: __( 'Please provide a type of goods or services', 'fincommerce' ),
	},
	placeholders: {
		generic: __( 'Select an option', 'fincommerce' ),
		country: __( 'Select a country', 'fincommerce' ),
	},
	tos: interpolateComponents( {
		mixedString: sprintf(
			/* translators: %1$s: WooPayments, %2$s: WooPay  */
			__(
				'By using %1$s, you agree to be bound by our {{tosLink}}Terms of Service{{/tosLink}} (including {{merchantTermsLink}}%2$s merchant terms{{/merchantTermsLink}}) and acknowledge that you have read our {{privacyPolicyLink}}Privacy Policy{{/privacyPolicyLink}}.',
				'fincommerce'
			),
			'WooPayments',
			'WooPay'
		),
		components: {
			tosLink: (
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<a
					rel="external noopener noreferrer"
					target="_blank"
					href={ documentationUrls.tos }
				/>
			),
			merchantTermsLink: (
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<a
					rel="external noopener noreferrer"
					target="_blank"
					href={ documentationUrls.merchantTerms }
				/>
			),
			privacyPolicyLink: (
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<a
					rel="external noopener noreferrer"
					target="_blank"
					href={ documentationUrls.privacyPolicy }
				/>
			),
		},
	} ),
	continue: __( 'Continue', 'fincommerce' ),
	back: __( 'Back', 'fincommerce' ),
	cancel: __( 'Cancel', 'fincommerce' ),
};
