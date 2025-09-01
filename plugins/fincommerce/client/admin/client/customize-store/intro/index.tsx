/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import interpolateComponents from '@automattic/interpolate-components';
import { getNewPath } from '@fincommerce/navigation';
import { Sender } from 'xstate';
import { Notice, Card, CardHeader, CardFooter } from '@wordpress/components';
import { Text } from '@fincommerce/experimental';

/**
 * Internal dependencies
 */
import { CustomizeStoreComponent } from '../types';
import { SiteHub } from '../assembler-hub/site-hub';
import { ThemeCard } from './theme-card';
import { ThemeSwitchWarningModal } from './warning-modals';
import { useNetworkStatus } from '~/utils/react-hooks/use-network-status';
import './intro.scss';
import {
	NetworkOfflineBanner,
	JetpackOfflineBanner,
	NoAIBanner,
	ExistingNoAiThemeBanner,
	ClassicThemeBanner,
	NonDefaultBlockThemeBanner,
} from './intro-banners';
import welcomeTourImg from '../assets/images/design-your-own.svg';
import professionalThemeImg from '../assets/images/professional-theme.svg';
import { navigateOrParent } from '~/customize-store/utils';
import { RecommendThemesAPIResponse } from '~/customize-store/types';
import { customizeStoreStateMachineEvents } from '~/customize-store';
import { trackEvent } from '~/customize-store/tracking';

export type events =
	| { type: 'JETPACK_OFFLINE_HOWTO' }
	| { type: 'CLICKED_ON_BREADCRUMB' }
	| { type: 'SELECTED_BROWSE_ALL_THEMES' }
	| { type: 'SELECTED_ACTIVE_THEME'; payload: { theme: string } }
	| { type: 'SELECTED_NEW_THEME'; payload: { theme: string } }
	| { type: 'DESIGN_WITHOUT_AI' };

export * as actions from './actions';
export * as services from './services';

type BannerStatus = keyof typeof BANNER_COMPONENTS;

const BANNER_COMPONENTS = {
	'network-offline': NetworkOfflineBanner,
	'jetpack-offline': JetpackOfflineBanner,
	'no-ai': NoAIBanner,
	'existing-no-ai-theme': ExistingNoAiThemeBanner,
	'classic-theme': ClassicThemeBanner,
	'non-default-block-theme': NonDefaultBlockThemeBanner,
};

const ThemeCards = ( {
	sendEvent,
	themeData,
}: {
	sendEvent: Sender< customizeStoreStateMachineEvents >;
	themeData: RecommendThemesAPIResponse;
} ) => {
	return (
		<>
			<p className="select-theme-text">
				{ __(
					'Or select a professionally designed theme to customize and make your own.',
					'fincommerce'
				) }
			</p>

			<div className="fincommerce-customize-store-theme-cards">
				{ themeData.themes?.map( ( theme ) => (
					<ThemeCard
						key={ theme.slug }
						slug={ theme.slug }
						description={ theme.description }
						thumbnail_url={ theme.thumbnail_url }
						name={ theme.name }
						color_palettes={ theme.color_palettes }
						total_palettes={ theme.total_palettes }
						link_url={ theme?.link_url }
						is_active={ theme.is_active }
						is_free={ theme.is_free }
						price={ theme.price }
						onClick={ () => {
							if ( theme.is_active ) {
								sendEvent( {
									type: 'SELECTED_ACTIVE_THEME',
									payload: { theme: theme.slug },
								} );
							} else {
								sendEvent( {
									type: 'SELECTED_NEW_THEME',
									payload: { theme: theme.slug },
								} );
							}
						} }
					/>
				) ) }
			</div>

			<Card className="fincommerce-customize-store-browse-themes">
				<CardHeader>
					<Text
						variant="title.small"
						as="h2"
						className="fincommerce-browse-themes-card__title"
					>
						{ __(
							'Visit the FinCommerce Theme Marketplace',
							'fincommerce'
						) }
					</Text>
				</CardHeader>
				<CardFooter>
					<Text variant="body.small" as="p">
						{ __(
							'Browse more than 100 free and paid themes tailored to different industries—30-day money-back guarantee. If you change your mind within 30 days of your purchase, we’ll give you a full refund — hassle-free.',
							'fincommerce'
						) }
					</Text>
					<button
						onClick={ () =>
							sendEvent( {
								type: 'SELECTED_BROWSE_ALL_THEMES',
							} )
						}
					>
						{ __( 'Browse all themes', 'fincommerce' ) }
					</button>
				</CardFooter>
			</Card>
		</>
	);
};

const CustomizedThemeBanners = ( {
	isBlockTheme,
	isDefaultTheme,
	sendEvent,
}: {
	isBlockTheme: boolean | undefined;
	isDefaultTheme: boolean | undefined;
	sendEvent: Sender< customizeStoreStateMachineEvents >;
} ) => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	return (
		<>
			<p className="select-theme-text">
				{ __( 'Design or choose a new theme', 'fincommerce' ) }
			</p>

			<div className="fincommerce-customize-store-cards">
				<div className="intro-card">
					<img
						src={ welcomeTourImg }
						alt={ __( 'Design your own theme', 'fincommerce' ) }
					/>

					<div>
						<h2 className="intro-card__title">
							{ __( 'Design your own theme', 'fincommerce' ) }
						</h2>

						<button
							className="intro-card__link"
							onClick={ () => {
								trackEvent(
									'customize_your_store_intro_design_theme',
									{
										theme_type: isBlockTheme
											? 'block'
											: 'classic',
									}
								);
								if ( isDefaultTheme ) {
									navigateOrParent(
										window,
										getNewPath(
											{ customizing: true },
											'/customize-store/assembler-hub',
											{}
										)
									);
								} else {
									setIsModalOpen( true );
								}
							} }
						>
							{ __( 'Use the store designer', 'fincommerce' ) }
						</button>
					</div>
				</div>

				<div className="intro-card">
					<img
						src={ professionalThemeImg }
						alt={ __(
							'Choose a professionally designed theme',
							'fincommerce'
						) }
					/>

					<div>
						<h2 className="intro-card__title">
							{ __(
								'Choose a professionally designed theme',
								'fincommerce'
							) }
						</h2>

						<button
							className="intro-card__link"
							onClick={ () => {
								trackEvent(
									'customize_your_store_intro_browse_themes'
								);
								sendEvent( {
									type: 'SELECTED_BROWSE_ALL_THEMES',
								} );
							} }
						>
							{ __( 'Browse themes', 'fincommerce' ) }
						</button>
					</div>
				</div>
			</div>
			{ isModalOpen && (
				<ThemeSwitchWarningModal
					setIsModalOpen={ setIsModalOpen }
					redirectToCYSFlow={ () =>
						sendEvent( {
							type: 'DESIGN_WITHOUT_AI',
						} )
					}
				/>
			) }
		</>
	);
};

export const Intro: CustomizeStoreComponent = ( { sendEvent, context } ) => {
	const {
		intro: { activeTheme, themeData, customizeStoreTaskCompleted },
	} = context;

	const isJetpackOffline = false;

	const isNetworkOffline = useNetworkStatus();

	const [ showError, setShowError ] = useState( context.intro.hasErrors );

	const errorMessage =
		context.intro.errorStatus === 403
			? __(
					"Sorry, you don't have permission to update the theme.",
					'fincommerce'
			  )
			: __(
					'Oops! We encountered a problem while setting up the foundations. {{anchor}}Please try again{{/anchor}} or start with a theme.',
					'fincommerce'
			  );

	let bannerStatus: BannerStatus = 'no-ai';

	const isDefaultTheme = activeTheme === 'twentytwentyfour';
	interface Theme {
		is_block_theme?: boolean;
	}

	const currentTheme = useSelect( ( select ) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return select( 'core' ).getCurrentTheme() as Theme;
	}, [] );

	const isBlockTheme = currentTheme?.is_block_theme;

	switch ( true ) {
		case isNetworkOffline:
			bannerStatus = 'network-offline';
			break;
		case isJetpackOffline as boolean:
			bannerStatus = 'jetpack-offline';
			break;
		case ! isBlockTheme:
			bannerStatus = 'classic-theme';
			break;
		case isBlockTheme && ! isDefaultTheme:
			bannerStatus = 'non-default-block-theme';
			break;
		case ! customizeStoreTaskCompleted:
			bannerStatus = 'no-ai';
			break;
		case customizeStoreTaskCompleted:
			bannerStatus = 'existing-no-ai-theme';
			break;
	}

	const BannerComponent = BANNER_COMPONENTS[ bannerStatus ];

	const sidebarMessage = __(
		'Design a store that reflects your brand and business. Customize your active theme, select a professionally designed theme, or create a new look using our store designer.',
		'fincommerce'
	);

	return (
		<>
			<div className="fincommerce-customize-store-header">
				<SiteHub
					isTransparent={ false }
					className="fincommerce-customize-store__content"
				/>
			</div>

			<div className="fincommerce-customize-store-container">
				<div className="fincommerce-customize-store-sidebar">
					<div className="fincommerce-customize-store-sidebar__title">
						<button
							onClick={ () => {
								sendEvent( 'CLICKED_ON_BREADCRUMB' );
							} }
						>
							{ chevronLeft }
						</button>
						{ __( 'Customize your store', 'fincommerce' ) }
					</div>
					<p>{ sidebarMessage }</p>
				</div>

				<div className="fincommerce-customize-store-main">
					{ showError && (
						<Notice
							onRemove={ () => setShowError( false ) }
							className="fincommerce-cys-design-with-ai__error-notice"
							status="error"
						>
							{ interpolateComponents( {
								mixedString: errorMessage,
								components: {
									anchor: (
										// eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid
										<a
											className="fincommerce-customize-store-error-link"
											onClick={ () =>
												sendEvent( 'DESIGN_WITHOUT_AI' )
											}
										/>
									),
								},
							} ) }
						</Notice>
					) }
					<BannerComponent
						redirectToCYSFlow={ () =>
							sendEvent( 'DESIGN_WITHOUT_AI' )
						}
						sendEvent={ sendEvent }
					/>

					{ isDefaultTheme && ! customizeStoreTaskCompleted ? (
						<ThemeCards
							sendEvent={ sendEvent }
							themeData={ themeData }
						/>
					) : (
						<CustomizedThemeBanners
							isBlockTheme={ isBlockTheme }
							isDefaultTheme={ isDefaultTheme }
							sendEvent={ sendEvent }
						/>
					) }
				</div>
			</div>
		</>
	);
};
