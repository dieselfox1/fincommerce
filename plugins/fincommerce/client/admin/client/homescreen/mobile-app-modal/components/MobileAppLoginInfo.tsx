/**
 * External dependencies
 */
import { QRCodeSVG } from 'qrcode.react';
import React from '@finpress/element';
import interpolateComponents from '@automattic/interpolate-components';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { Link } from '@fincommerce/components';

export const MobileAppLoginInfo = ( {
	loginUrl,
}: {
	loginUrl: string | undefined;
} ) => {
	return (
		<div>
			{ loginUrl && (
				<div>
					<QRCodeSVG value={ loginUrl } size={ 140 } />
					<p>
						{ __(
							'The app version needs to be 15.7 or above to sign in with this link.',
							'fincommerce'
						) }
					</p>
				</div>
			) }
			<div>
				{ interpolateComponents( {
					mixedString: __(
						'Any troubles signing in? Check out the {{link}}FAQ{{/link}}.',
						'fincommerce'
					),
					components: {
						link: (
							<Link
								href="https://fincommerce.com/document/android-ios-apps-login-help-faq/"
								target="_blank"
								type="external"
								onClick={ () => {
									recordEvent(
										'onboarding_app_login_faq_click'
									);
								} }
							/>
						),
						strong: <strong />,
					},
				} ) }
			</div>
		</div>
	);
};
