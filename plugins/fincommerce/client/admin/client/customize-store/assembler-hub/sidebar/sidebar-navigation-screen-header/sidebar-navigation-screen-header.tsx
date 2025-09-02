/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from '@finpress/element';
import { Spinner } from '@finpress/components';
import { useSelect } from '@finpress/data';
import { store as coreStore } from '@finpress/core-data';
import { BlockInstance } from '@finpress/blocks';
// @ts-expect-error No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { __experimentalBlockPatternsList as BlockPatternList } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { SidebarNavigationScreen } from '../sidebar-navigation-screen';
import { usePatternsByCategory } from '../../hooks/use-patterns';
import { useSelectedPattern } from '../../hooks/use-selected-pattern';
import { useEditorBlocks } from '../../hooks/use-editor-blocks';
import { HighlightedBlockContext } from '../../context/highlighted-block-context';
import { useEditorScroll } from '../../hooks/use-editor-scroll';
import { findPatternByBlock } from '../utils';
import { headerTemplateId } from '~/customize-store/data/homepageTemplates';

import './style.scss';
import { PatternWithBlocks } from '~/customize-store/types/pattern';

const SUPPORTED_HEADER_PATTERNS = [
	'fincommerce-blocks/header-centered-menu',
	'fincommerce-blocks/header-essential',
	'fincommerce-blocks/header-minimal',
	'fincommerce-blocks/header-large',
	'fincommerce-blocks/header-distraction-free',
];
export const SidebarNavigationScreenHeader = ( {
	onNavigateBackClick,
}: {
	onNavigateBackClick: () => void;
} ) => {
	const { scroll } = useEditorScroll( {
		editorSelector: '.fincommerce-customize-store__block-editor iframe',
		scrollDirection: 'top',
	} );

	const { isLoading, patterns } = usePatternsByCategory( 'woo-commerce' );

	const currentTemplateId: string | undefined = useSelect(
		( select ) =>
			select( coreStore ).getDefaultTemplateId( { slug: 'home' } ),
		[]
	);

	const [ mainTemplateBlocks ] = useEditorBlocks(
		'wp_template',
		currentTemplateId || ''
	);

	const [ blocks, , onChange ] = useEditorBlocks(
		'wp_template_part',
		headerTemplateId
	);

	const headerTemplatePartBlock = mainTemplateBlocks.find(
		( block ) => block.attributes.slug === 'header'
	);

	const { setHighlightedBlockClientId, resetHighlightedBlockClientId } =
		useContext( HighlightedBlockContext );
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const { selectedPattern, setSelectedPattern } = useSelectedPattern();

	useEffect( () => {
		setHighlightedBlockClientId(
			headerTemplatePartBlock?.clientId ?? null
		);
	}, [ headerTemplatePartBlock?.clientId, setHighlightedBlockClientId ] );
	const headerPatterns = useMemo(
		() =>
			patterns
				.filter( ( pattern ) =>
					SUPPORTED_HEADER_PATTERNS.includes( pattern.name )
				)
				.sort(
					( a, b ) =>
						SUPPORTED_HEADER_PATTERNS.indexOf( a.name ) -
						SUPPORTED_HEADER_PATTERNS.indexOf( b.name )
				),
		[ patterns ]
	);

	useEffect( () => {
		if ( selectedPattern || ! blocks.length || ! headerPatterns.length ) {
			return;
		}

		const currentSelectedPattern = findPatternByBlock(
			headerPatterns,
			blocks[ 0 ]
		);
		setSelectedPattern( currentSelectedPattern );

		// eslint-disable-next-line react-hooks/exhaustive-deps -- we don't want to re-run this effect when currentSelectedPattern changes
	}, [ blocks, headerPatterns ] );
	const onClickHeaderPattern = useCallback(
		( pattern: PatternWithBlocks, selectedBlocks: BlockInstance[] ) => {
			setSelectedPattern( pattern );
			onChange( [ selectedBlocks[ 0 ], ...blocks.slice( 1 ) ], {
				selection: {},
			} );
			scroll();
		},
		[ blocks, onChange, setSelectedPattern, scroll ]
	);

	const title = __( 'Choose your header', 'fincommerce' );

	return (
		<SidebarNavigationScreen
			title={ title }
			onNavigateBackClick={ () => {
				resetHighlightedBlockClientId();
				onNavigateBackClick();
			} }
			description={ __(
				"Select a new header from the options below. Your header includes your site's navigation and will be added to every page. You can continue customizing this via the Editor.",
				'fincommerce'
			) }
			content={
				<>
					<div className="fincommerce-customize-store__sidebar-header-content">
						{ isLoading && (
							<span className="components-placeholder__preview">
								<Spinner />
							</span>
						) }

						{ ! isLoading && (
							<BlockPatternList
								shownPatterns={ headerPatterns }
								blockPatterns={ headerPatterns }
								onClickPattern={ onClickHeaderPattern }
								label={ 'Headers' }
								orientation="vertical"
								isDraggable={ false }
								onHover={ () => {} }
								showTitlesAsTooltip={ true }
							/>
						) }
					</div>
				</>
			}
		/>
	);
};
