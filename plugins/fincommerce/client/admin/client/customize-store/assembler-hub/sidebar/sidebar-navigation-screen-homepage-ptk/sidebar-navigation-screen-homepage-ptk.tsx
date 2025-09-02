/* eslint-disable @fincommerce/dependency-group */
/**
 * External dependencies
 */
import {
	Button,
	CheckboxControl,
	__experimentalItemGroup as ItemGroup,
	Modal,
	__experimentalNavigatorButton as NavigatorButton,
	Spinner,
} from '@finpress/components';
import {
	createInterpolateElement,
	useContext,
	useMemo,
	useState,
} from '@finpress/element';
import { __ } from '@finpress/i18n';
import interpolateComponents from '@automattic/interpolate-components';
import { store as coreStore } from '@finpress/core-data';
// @ts-expect-error No types for this exist yet.
import SidebarNavigationItem from '@finpress/edit-site/build-module/components/sidebar-navigation-item';

/**
 * Internal dependencies
 */
import { SidebarNavigationScreen } from '../sidebar-navigation-screen';
import { trackEvent } from '~/customize-store/tracking';
import { CustomizeStoreContext } from '../..';
import { Link } from '@fincommerce/components';
import { PATTERN_CATEGORIES } from '../pattern-screen/categories';
import { capitalize } from 'lodash';
import { getNewPath, navigateTo, useQuery } from '@fincommerce/navigation';
import { useSelect } from '@finpress/data';
import { useNetworkStatus } from '~/utils/react-hooks/use-network-status';
import { useEditorBlocks } from '../../hooks/use-editor-blocks';
import { isTrackingAllowed } from '../../utils/is-tracking-allowed';
import clsx from 'clsx';
import './style.scss';
import { usePatterns } from '~/customize-store/assembler-hub/hooks/use-patterns';
import { THEME_SLUG } from '~/customize-store/data/constants';
import apiFetch from '@finpress/api-fetch';
import { enableTracking } from '~/customize-store/design-without-ai/services';

const isActiveElement = ( path: string | undefined, category: string ) => {
	if ( path?.includes( category ) ) {
		return true;
	}
};

export const SidebarNavigationScreenHomepagePTK = ( {
	onNavigateBackClick,
}: {
	onNavigateBackClick: () => void;
} ) => {
	const { context } = useContext( CustomizeStoreContext );

	const isNetworkOffline = useNetworkStatus();
	const isPTKPatternsAPIAvailable = context.isPTKPatternsAPIAvailable;

	const currentTemplateId: string | undefined = useSelect(
		( sel ) => sel( coreStore ).getDefaultTemplateId( { slug: 'home' } ),
		[]
	);

	const [ blocks ] = useEditorBlocks(
		'wp_template',
		currentTemplateId || ''
	);

	const numberOfPatternsAdded = useMemo( () => {
		const categories = Object.keys( PATTERN_CATEGORIES );

		const initialAccumulator = categories.reduce(
			( acc, cat ) => ( {
				...acc,
				[ cat ]: 0,
			} ),
			{} as Record< string, number >
		);

		return blocks.reduce( ( acc, block ) => {
			const blockCategories: Array< string > =
				block.attributes?.metadata?.categories ?? [];

			const foundCategory = blockCategories.find( ( blockCategory ) =>
				categories.includes( blockCategory )
			);

			if ( foundCategory ) {
				return {
					...acc,
					[ foundCategory ]: acc[ foundCategory ] + 1,
				};
			}

			return acc;
		}, initialAccumulator );
	}, [ blocks ] );

	const {
		blockPatterns,
		isLoading: isLoadingPatterns,
		invalidateCache,
	} = usePatterns();

	const patternsFromPTK = blockPatterns.filter(
		( pattern ) =>
			! pattern.name.includes( THEME_SLUG ) &&
			! pattern.name.includes( 'fincommerce' ) &&
			pattern.source !== 'core' &&
			pattern.source !== 'pattern-directory/featured' &&
			pattern.source !== 'pattern-directory/theme' &&
			pattern.source !== 'pattern-directory/core'
	);

	const notice = useMemo( () => {
		let noticeText;
		if ( isNetworkOffline ) {
			noticeText = __(
				"Looks like we can't detect your network. Please double-check your internet connection and refresh the page.",
				'fincommerce'
			);
		} else if ( ! isPTKPatternsAPIAvailable ) {
			noticeText = __(
				"Unfortunately, we're experiencing some technical issues — please come back later to access more patterns.",
				'fincommerce'
			);
		} else if ( ! isTrackingAllowed() ) {
			noticeText = __(
				'Opt in to <OptInModal>usage tracking</OptInModal> to get access to more patterns.',
				'fincommerce'
			);
		} else if ( ! isLoadingPatterns && patternsFromPTK.length === 0 ) {
			noticeText = __(
				'Unfortunately, a technical issue is preventing more patterns from being displayed. Please <FetchPatterns>try again</FetchPatterns> later.',
				'fincommerce'
			);
		}
		return noticeText;
	}, [
		isNetworkOffline,
		isPTKPatternsAPIAvailable,
		isLoadingPatterns,
		patternsFromPTK.length,
	] );

	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const openModal = () => setIsModalOpen( true );
	const closeModal = () => setIsModalOpen( false );

	const [ optInDataSharing, setIsOptInDataSharing ] =
		useState< boolean >( true );

	const [ isSettingTracking, setIsSettingTracking ] = useState( false );

	const optIn = () => {
		trackEvent(
			'customize_your_store_assembler_hub_opt_in_usage_tracking'
		);
	};

	const skipOptIn = () => {
		trackEvent(
			'customize_your_store_assembler_hub_skip_opt_in_usage_tracking'
		);
	};

	const title = __( 'Design your homepage', 'fincommerce' );

	const sidebarMessage = __(
		'Create an engaging homepage by adding and combining different patterns and layouts. You can continue customizing this page, including the content, later via the Editor.',
		'fincommerce'
	);

	const path = useQuery().path;

	return (
		<SidebarNavigationScreen
			title={ title }
			onNavigateBackClick={ onNavigateBackClick }
			description={ sidebarMessage }
			content={
				<div className="fincommerce-customize-store__sidebar-homepage-content">
					<div className="fincommerce-edit-site-sidebar-navigation-screen-patterns__group-homepage">
						{ Object.entries( PATTERN_CATEGORIES ).map(
							( [ categoryKey, { label } ], index ) => (
								<ItemGroup key={ index }>
									<NavigatorButton
										className={ clsx( {
											'fincommerce-edit-site-sidebar-navigation-screen-patterns__group-homepage-item--active':
												isActiveElement(
													path,
													categoryKey
												),
										} ) }
										path={ `/customize-store/assembler-hub/homepage/${ categoryKey }` }
										onClick={ () => {
											const categoryUrl = getNewPath(
												{ customizing: true },
												`/customize-store/assembler-hub/homepage/${ categoryKey }`,
												{}
											);
											navigateTo( {
												url: categoryUrl,
											} );
											trackEvent(
												'customize_your_store_assembler_pattern_category_click',
												{ category: categoryKey }
											);
										} }
										as={ SidebarNavigationItem }
										withChevron
									>
										<div className="fincommerce-edit-site-sidebar-navigation-screen-patterns__group-homepage-label-container">
											<span>{ capitalize( label ) }</span>
											{ blocks.length > 0 &&
												numberOfPatternsAdded[
													categoryKey
												] > 0 && (
													<span className="fincommerce-edit-site-sidebar-navigation-screen-patterns__group-homepage-number-pattern">
														{
															numberOfPatternsAdded[
																categoryKey
															]
														}
													</span>
												) }
										</div>
									</NavigatorButton>
								</ItemGroup>
							)
						) }
						{ notice && (
							<div className="fincommerce-customize-store_sidebar-patterns-upgrade-notice">
								<h4>
									{ __(
										'Want more patterns?',
										'fincommerce'
									) }
								</h4>
								<p>
									{ createInterpolateElement( notice, {
										OptInModal: (
											<Button
												onClick={ () => {
													openModal();
												} }
												variant="link"
											/>
										),
										FetchPatterns: (
											<Button
												onClick={ async () => {
													await apiFetch( {
														path: `/wc/private/patterns`,
														method: 'POST',
													} );

													invalidateCache();
												} }
												variant="link"
											/>
										),
									} ) }
								</p>
								{ isModalOpen && (
									<Modal
										className={
											'fincommerce-customize-store__opt-in-usage-tracking-modal'
										}
										title={ __(
											'Access more patterns',
											'fincommerce'
										) }
										onRequestClose={ closeModal }
										shouldCloseOnClickOutside={ false }
									>
										<CheckboxControl
											className="core-profiler__checkbox"
											// @ts-expect-error Types are incorrect for this prop.
											label={ interpolateComponents( {
												mixedString: __(
													'More patterns from the FinCommerce.com library are available! Opt in to connect your store and access the full library, plus get more relevant content and a tailored store setup experience. Opting in will enable {{link}}usage tracking{{/link}}, which you can opt out of at any time via FinCommerce settings.',
													'fincommerce'
												),
												components: {
													link: (
														<Link
															href="https://fincommerce.com/usage-tracking?utm_medium=product"
															target="_blank"
															type="external"
														/>
													),
												},
											} ) }
											checked={ optInDataSharing }
											onChange={ setIsOptInDataSharing }
										/>
										<div className="fincommerce-customize-store__design-change-warning-modal-footer">
											<Button
												onClick={ () => {
													skipOptIn();
													closeModal();
												} }
												variant="link"
											>
												{ __(
													'Cancel',
													'fincommerce'
												) }
											</Button>
											<Button
												onClick={ async () => {
													optIn();
													await enableTracking();
													setIsSettingTracking(
														true
													);
													closeModal();
													setIsSettingTracking(
														false
													);
												} }
												variant="primary"
												disabled={ ! optInDataSharing }
											>
												{ isSettingTracking ? (
													<Spinner />
												) : (
													__(
														'Opt in',
														'fincommerce'
													)
												) }
											</Button>
										</div>
									</Modal>
								) }
							</div>
						) }
					</div>
				</div>
			}
		/>
	);
};
