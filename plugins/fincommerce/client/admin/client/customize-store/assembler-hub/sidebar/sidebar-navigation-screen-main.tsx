/**
 * finpress dependencies
 */
/* eslint-disable @fincommerce/dependency-group */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext } from '@finpress/element';
import {
	// @ts-ignore No types for this exist yet.
	__experimentalItemGroup as ItemGroup,
	// @ts-ignore No types for this exist yet.
	__experimentalNavigatorButton as NavigatorButton,
	// @ts-ignore No types for this exist yet.
	__experimentalHeading as Heading,
} from '@finpress/components';
import { __ } from '@finpress/i18n';
import {
	siteLogo,
	color,
	typography,
	header,
	home,
	footer,
} from '@finpress/icons';
// @ts-ignore No types for this exist yet.
import SidebarNavigationItem from '@finpress/edit-site/build-module/components/sidebar-navigation-item';

/**
 * Internal dependencies
 */
import { SidebarNavigationScreen } from './sidebar-navigation-screen';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import {
	SidebarNavigationAnimationDirection,
	SidebarNavigationContext,
} from '../components/sidebar';
import { isFullComposabilityFeatureAndAPIAvailable } from '../utils/is-full-composability-enabled';
import { trackEvent } from '~/customize-store/tracking';

export const SidebarNavigationScreenMain = () => {
	const { navigate } = useContext( SidebarNavigationContext );

	return (
		<SidebarNavigationScreen
			isRoot
			title={ __( "Let's get creative", 'fincommerce' ) }
			description={ __(
				'Use our style and layout tools to customize the design of your store. Content and images can be added or changed via the Editor later.',
				'fincommerce'
			) }
			content={
				<>
					<div className="fincommerce-edit-site-sidebar-navigation-screen-patterns__group-header">
						<Heading level={ 2 }>
							{ __( 'Style', 'fincommerce' ) }
						</Heading>
					</div>
					<ItemGroup>
						<NavigatorButton
							as={ SidebarNavigationItem }
							path="/customize-store/assembler-hub/logo"
							withChevron
							icon={ siteLogo }
							onClick={ () => {
								const logoUrl = getNewPath(
									{ customizing: true },
									'/customize-store/assembler-hub/logo',
									{}
								);

								navigateTo( { url: logoUrl } );
								navigate(
									SidebarNavigationAnimationDirection.Forward
								);
								trackEvent(
									'customize_your_store_assembler_hub_sidebar_item_click',
									{
										item: 'logo',
									}
								);
							} }
						>
							{ __( 'Add your logo', 'fincommerce' ) }
						</NavigatorButton>
						<NavigatorButton
							as={ SidebarNavigationItem }
							path="/customize-store/assembler-hub/color-palette"
							withChevron
							icon={ color }
							onClick={ () => {
								const colorPaletteUrl = getNewPath(
									{ customizing: true },
									'/customize-store/assembler-hub/color-palette',
									{}
								);

								navigateTo( { url: colorPaletteUrl } );
								navigate(
									SidebarNavigationAnimationDirection.Forward
								);
								trackEvent(
									'customize_your_store_assembler_hub_sidebar_item_click',
									{
										item: 'color-palette',
									}
								);
							} }
						>
							{ __( 'Choose your color palette', 'fincommerce' ) }
						</NavigatorButton>
						<NavigatorButton
							as={ SidebarNavigationItem }
							path="/customize-store/assembler-hub/typography"
							withChevron
							icon={ typography }
							onClick={ () => {
								const typographyUrl = getNewPath(
									{ customizing: true },
									'/customize-store/assembler-hub/typography',
									{}
								);

								navigateTo( { url: typographyUrl } );
								navigate(
									SidebarNavigationAnimationDirection.Forward
								);
								trackEvent(
									'customize_your_store_assembler_hub_sidebar_item_click',
									{
										item: 'typography',
									}
								);
							} }
						>
							{ __( 'Choose fonts', 'fincommerce' ) }
						</NavigatorButton>
					</ItemGroup>
					<div className="fincommerce-edit-site-sidebar-navigation-screen-patterns__group-header">
						<Heading level={ 2 }>
							{ __( 'Layout', 'fincommerce' ) }
						</Heading>
					</div>
					<ItemGroup>
						<NavigatorButton
							as={ SidebarNavigationItem }
							path="/customize-store/assembler-hub/header"
							withChevron
							icon={ header }
							onClick={ () => {
								const headerUrl = getNewPath(
									{ customizing: true },
									'/customize-store/assembler-hub/header',
									{}
								);

								navigateTo( { url: headerUrl } );
								navigate(
									SidebarNavigationAnimationDirection.Forward
								);
								trackEvent(
									'customize_your_store_assembler_hub_sidebar_item_click',
									{
										item: 'header',
									}
								);
							} }
						>
							{ __( 'Choose your header', 'fincommerce' ) }
						</NavigatorButton>
						<NavigatorButton
							as={ SidebarNavigationItem }
							path="/customize-store/assembler-hub/homepage"
							withChevron
							icon={ home }
							onClick={ () => {
								const homepageUrl =
									isFullComposabilityFeatureAndAPIAvailable()
										? getNewPath(
												{ customizing: true },
												'/customize-store/assembler-hub/homepage/intro',
												{}
										  )
										: getNewPath(
												{ customizing: true },
												'/customize-store/assembler-hub/homepage',
												{}
										  );

								navigateTo( { url: homepageUrl } );
								navigate(
									SidebarNavigationAnimationDirection.Forward
								);
								trackEvent(
									'customize_your_store_assembler_hub_sidebar_item_click',
									{
										item: 'home',
									}
								);
							} }
						>
							{ __( 'Design your homepage', 'fincommerce' ) }
						</NavigatorButton>
						<NavigatorButton
							as={ SidebarNavigationItem }
							path="/customize-store/assembler-hub/footer"
							withChevron
							icon={ footer }
							onClick={ () => {
								const footerUrl = getNewPath(
									{ customizing: true },
									'/customize-store/assembler-hub/footer',
									{}
								);

								navigateTo( { url: footerUrl } );
								navigate(
									SidebarNavigationAnimationDirection.Forward
								);
								trackEvent(
									'customize_your_store_assembler_hub_sidebar_item_click',
									{
										item: 'footer',
									}
								);
							} }
						>
							{ __( 'Choose your footer', 'fincommerce' ) }
						</NavigatorButton>
					</ItemGroup>
				</>
			}
		/>
	);
};
