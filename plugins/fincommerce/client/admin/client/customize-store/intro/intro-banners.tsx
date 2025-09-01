/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { Button } from '@wordpress/components';
import { getNewPath } from '@fincommerce/navigation';
import interpolateComponents from '@automattic/interpolate-components';
import { Link } from '@fincommerce/components';

/**
 * Internal dependencies
 */
import { Intro } from '.';
import { IntroSiteIframe } from './intro-site-iframe';
import { ADMIN_URL, getAdminSetting } from '~/utils/admin-settings';
import { navigateOrParent } from '../utils';
import { trackEvent } from '../tracking';

export const BaseIntroBanner = ( {
	bannerTitle,
	bannerText,
	bannerClass,
	showAIDisclaimer,
	buttonIsLink,
	bannerButtonOnClick,
	bannerButtonText,
	secondaryButton,
	previewBanner,
	children,
}: {
	bannerTitle: string;
	bannerText: string;
	bannerClass: string;
	showAIDisclaimer: boolean;
	buttonIsLink?: boolean;
	bannerButtonOnClick?: () => void;
	bannerButtonText?: string;
	secondaryButton?: React.ReactNode;
	previewBanner?: React.ReactNode;
	children?: React.ReactNode;
} ) => {
	return (
		<div
			className={ clsx(
				'fincommerce-customize-store-banner',
				bannerClass
			) }
		>
			<div className={ `fincommerce-customize-store-banner-content` }>
				<div className="banner-actions">
					<h1>{ bannerTitle }</h1>
					<p>{ bannerText }</p>
					{ bannerButtonText && (
						<Button
							onClick={ () =>
								bannerButtonOnClick && bannerButtonOnClick()
							}
							variant={ buttonIsLink ? 'link' : 'primary' }
						>
							{ bannerButtonText }
						</Button>
					) }
					{ secondaryButton }
					{ showAIDisclaimer && (
						<p className="ai-disclaimer">
							{ interpolateComponents( {
								mixedString: __(
									'Powered by experimental AI. {{link}}Learn more{{/link}}',
									'fincommerce'
								),
								components: {
									link: (
										<Link
											href="https://automattic.com/ai-guidelines"
											target="_blank"
											type="external"
										/>
									),
								},
							} ) }
						</p>
					) }
				</div>
				{ children }
			</div>
			{ previewBanner }
		</div>
	);
};

export const NetworkOfflineBanner = () => {
	return (
		<BaseIntroBanner
			bannerTitle={ __(
				'Looking to design your store using AI?',
				'fincommerce'
			) }
			bannerText={ __(
				"Unfortunately, the [AI Store designer] isn't available right now as we can't detect your network. Please check your internet connection.",
				'fincommerce'
			) }
			bannerClass="offline-banner"
			bannerButtonOnClick={ () => {} }
			showAIDisclaimer={ true }
		/>
	);
};

export const JetpackOfflineBanner = ( {
	sendEvent,
}: {
	sendEvent: React.ComponentProps< typeof Intro >[ 'sendEvent' ];
} ) => {
	return (
		<BaseIntroBanner
			bannerTitle={ __(
				'Looking to design your store using AI?',
				'fincommerce'
			) }
			bannerText={ __(
				"It looks like you're using Jetpack's offline mode — switch to online mode to start designing with AI.",
				'fincommerce'
			) }
			bannerClass="offline-banner"
			buttonIsLink={ false }
			bannerButtonOnClick={ () => {
				sendEvent( {
					type: 'JETPACK_OFFLINE_HOWTO',
				} );
			} }
			bannerButtonText={ __( 'Find out how', 'fincommerce' ) }
			showAIDisclaimer={ true }
		/>
	);
};

export const NoAIBanner = ( {
	redirectToCYSFlow,
}: {
	redirectToCYSFlow: () => void;
} ) => {
	return (
		<>
			<BaseIntroBanner
				bannerTitle={ __( 'Design your own', 'fincommerce' ) }
				bannerText={ __(
					'Quickly create a beautiful store using our built-in store designer. Choose your layout, select a style, and much more.',
					'fincommerce'
				) }
				bannerClass="no-ai-banner"
				bannerButtonText={ __( 'Start designing', 'fincommerce' ) }
				bannerButtonOnClick={ () => {
					redirectToCYSFlow();
				} }
				showAIDisclaimer={ false }
			/>
		</>
	);
};

export const ExistingNoAiThemeBanner = () => {
	const siteUrl = getAdminSetting( 'siteUrl' ) + '?cys-hide-admin-bar=1';

	return (
		<BaseIntroBanner
			bannerTitle={ __( 'Customize your theme', 'fincommerce' ) }
			bannerText={ __(
				'Customize everything from the color palette and the fonts to the page layouts, making sure every detail aligns with your brand.',
				'fincommerce'
			) }
			bannerClass="existing-no-ai-theme-banner"
			buttonIsLink={ false }
			bannerButtonOnClick={ () => {
				trackEvent( 'customize_your_store_intro_customize_click', {
					theme_type: 'block',
				} );
				navigateOrParent(
					window,
					getNewPath(
						{ customizing: true },
						'/customize-store/assembler-hub',
						{}
					)
				);
			} }
			bannerButtonText={ __( 'Customize your store', 'fincommerce' ) }
			showAIDisclaimer={ false }
			previewBanner={ <IntroSiteIframe siteUrl={ siteUrl } /> }
		></BaseIntroBanner>
	);
};

export const ClassicThemeBanner = () => {
	const siteUrl = getAdminSetting( 'siteUrl' ) + '?cys-hide-admin-bar=1';

	return (
		<BaseIntroBanner
			bannerTitle={ __( 'Customize your theme', 'fincommerce' ) }
			bannerText={ __(
				'Customize everything from the color palette and the fonts to the page layouts, making sure every detail aligns with your brand.',
				'fincommerce'
			) }
			bannerClass="existing-no-ai-theme-banner"
			buttonIsLink={ false }
			bannerButtonOnClick={ () => {
				trackEvent( 'customize_your_store_intro_customize_click', {
					theme_type: 'classic',
				} );
				navigateOrParent(
					window,
					'customize.php?return=/wp-admin/themes.php'
				);
			} }
			bannerButtonText={ __( 'Go to the Customizer', 'fincommerce' ) }
			showAIDisclaimer={ false }
			previewBanner={ <IntroSiteIframe siteUrl={ siteUrl } /> }
		></BaseIntroBanner>
	);
};

export const NonDefaultBlockThemeBanner = () => {
	const siteUrl = getAdminSetting( 'siteUrl' ) + '?cys-hide-admin-bar=1';

	return (
		<BaseIntroBanner
			bannerTitle={ __( 'Customize your theme', 'fincommerce' ) }
			bannerText={ __(
				'Customize everything from the color palette and the fonts to the page layouts, making sure every detail aligns with your brand.',
				'fincommerce'
			) }
			bannerClass="existing-no-ai-theme-banner"
			buttonIsLink={ false }
			bannerButtonOnClick={ () => {
				trackEvent( 'customize_your_store_intro_customize_click', {
					theme_type: 'block',
				} );
				navigateOrParent( window, `${ ADMIN_URL }site-editor.php` );
			} }
			bannerButtonText={ __( 'Go to the Editor', 'fincommerce' ) }
			showAIDisclaimer={ false }
			previewBanner={ <IntroSiteIframe siteUrl={ siteUrl } /> }
		></BaseIntroBanner>
	);
};
