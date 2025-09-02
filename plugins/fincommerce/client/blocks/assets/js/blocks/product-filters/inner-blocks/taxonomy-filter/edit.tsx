/**
 * External dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockContextProvider,
} from '@finpress/block-editor';
import { withSpokenMessages } from '@finpress/components';
import { useEffect, useState } from '@finpress/element';
import { __, sprintf } from '@finpress/i18n';
import { useSelect } from '@finpress/data';
import { store as coreStore } from '@finpress/core-data';
import { useCollectionData } from '@fincommerce/base-context/hooks';
import { objectHasProp } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import { TaxonomyFilterInspectorControls } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/taxonomy-filter/inspector';
import { termOptionsPreview } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/taxonomy-filter/constants';
import { EditProps } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/taxonomy-filter/types';
import { getAllowedBlocks } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/get-allowed-blocks';
import { EXCLUDED_BLOCKS } from '@fincommerce/block-library/assets/js/blocks/product-filters/constants';
import type { FilterOptionItem } from '@fincommerce/block-library/assets/js/blocks/product-filters/types';
import { InitialDisabled } from '@fincommerce/block-library/assets/js/blocks/product-filters/components/initial-disabled';
import { Notice } from '@fincommerce/block-library/assets/js/blocks/product-filters/components/notice';
import { getTaxonomyLabel } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/taxonomy-filter/utils';
import { sortFilterOptions } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/sort-filter-options';

// Create hierarchical structure: parents followed by their children
function createHierarchicalList(
	terms: FilterOptionItem[],
	sortOrder: string
) {
	const children = new Map();

	// First: categorize terms
	terms.forEach( ( term ) => {
		if ( ! children.has( term.parent ) ) {
			children.set( term.parent, [] );
		}
		children.get( term.parent ).push( term );
	} );

	// Next: sort them
	children.keys().forEach( ( key ) => {
		children.set(
			key,
			sortFilterOptions( children.get( key ), sortOrder )
		);
	} );

	// Last: build hierarchical list
	const result: FilterOptionItem[] = [];
	function addTermsRecursively(
		termList: FilterOptionItem[],
		depth = 0,
		visited = new Set< number >()
	) {
		if ( depth > 10 ) {
			return;
		}
		termList.forEach( ( term ) => {
			if ( ! term.id || visited.has( term.id ) ) {
				return;
			}
			visited.add( term.id );
			result.push( { ...term, depth } );
			const termChildren = children.get( term.id ) || [];
			if ( termChildren.length > 0 ) {
				addTermsRecursively( termChildren, depth + 1, visited );
			}
		} );
	}

	addTermsRecursively( children.get( 0 ) );
	return result;
}

const Edit = ( props: EditProps ) => {
	const { attributes: blockAttributes } = props;

	const {
		taxonomy,
		isPreview,
		displayStyle,
		showCounts,
		sortOrder,
		hideEmpty,
	} = blockAttributes;

	const [ termOptions, setTermOptions ] = useState< FilterOptionItem[] >(
		isPreview
			? sortFilterOptions( [ ...termOptionsPreview ], sortOrder )
			: []
	);
	const [ isOptionsLoading, setIsOptionsLoading ] = useState< boolean >(
		! isPreview
	);

	// Fetch taxonomy terms using finpress core data
	const { taxonomyTerms, isTermsLoading } = useSelect(
		( select ) => {
			if ( isPreview || ! taxonomy ) {
				return { taxonomyTerms: [], isTermsLoading: false };
			}

			const { getEntityRecords, hasFinishedResolution } =
				select( coreStore );

			const selectArgs = {
				per_page: 15,
				hide_empty: hideEmpty,
				orderby: 'name',
				order: 'asc',
			};
			return {
				taxonomyTerms:
					getEntityRecords( 'taxonomy', taxonomy, selectArgs ) || [],
				isTermsLoading: ! hasFinishedResolution( 'getEntityRecords', [
					'taxonomy',
					taxonomy,
					selectArgs,
				] ),
			};
		},
		[ taxonomy, hideEmpty, isPreview ]
	);

	// Fetch taxonomy counts using the updated useCollectionData hook
	const { data: filteredCounts, isLoading: isFilterCountsLoading } =
		useCollectionData( {
			queryTaxonomy: isPreview ? undefined : taxonomy,
			queryState: {},
			isEditor: true,
		} );

	useEffect( () => {
		if ( isPreview ) {
			// In preview mode, use the preview data directly
			setTermOptions(
				sortFilterOptions( [ ...termOptionsPreview ], sortOrder )
			);
			setIsOptionsLoading( false );
			return;
		}

		if ( isTermsLoading || isFilterCountsLoading ) {
			setIsOptionsLoading( true );
			return;
		}

		if ( ! taxonomyTerms.length ) {
			setTermOptions( [] );
			setIsOptionsLoading( false );
			return;
		}

		// Get taxonomy counts from the API response
		const taxonomyCounts =
			objectHasProp( filteredCounts, 'taxonomy_counts' ) &&
			Array.isArray( filteredCounts.taxonomy_counts )
				? filteredCounts.taxonomy_counts
				: [];

		// Process the terms
		const processedTerms = taxonomyTerms.reduce(
			( acc: FilterOptionItem[], term ) => {
				const count =
					taxonomyCounts.find( ( item ) => item.term === term.id )
						?.count || 0;

				// If hideEmpty is true and count is 0, exclude this term
				if ( hideEmpty && count === 0 ) {
					return acc;
				}

				acc.push( {
					label: term.name,
					value: term.slug,
					selected: false,
					count,
					id: term.id,
					parent: term.parent || 0,
				} );

				return acc;
			},
			[]
		);

		// Create hierarchical structure then apply sorting
		const hierarchicalTerms = createHierarchicalList(
			processedTerms,
			sortOrder
		);
		setTermOptions( hierarchicalTerms );
		setIsOptionsLoading( false );
	}, [
		taxonomy,
		taxonomyTerms,
		filteredCounts,
		sortOrder,
		hideEmpty,
		isPreview,
		isTermsLoading,
		isFilterCountsLoading,
	] );

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		useBlockProps(),
		{
			allowedBlocks: getAllowedBlocks( EXCLUDED_BLOCKS ),
			template: [
				[
					'core/heading',
					{
						level: 3,
						content: getTaxonomyLabel( taxonomy ),
						style: {
							spacing: {
								margin: {
									bottom: '0.625rem',
									top: '0',
								},
							},
						},
					},
				],
				[ displayStyle ],
			],
		}
	);

	const isLoading = isPreview
		? false
		: isTermsLoading || isFilterCountsLoading || isOptionsLoading;

	if ( ! taxonomy )
		return (
			<div { ...innerBlocksProps }>
				<TaxonomyFilterInspectorControls { ...props } />
				<Notice>
					<p>
						{ __(
							'Please select a taxonomy to use this filter!',
							'fincommerce'
						) }
					</p>
				</Notice>
			</div>
		);

	if ( ! isLoading && ! isPreview && taxonomyTerms.length === 0 )
		return (
			<div { ...innerBlocksProps }>
				<TaxonomyFilterInspectorControls { ...props } />
				<Notice>
					<p>
						{ sprintf(
							// translators: %s: Taxonomy label.
							__(
								'There are no products associated with %s.',
								'fincommerce'
							),
							getTaxonomyLabel( taxonomy )
						) }
					</p>
				</Notice>
			</div>
		);

	return (
		<div { ...innerBlocksProps }>
			<TaxonomyFilterInspectorControls { ...props } />
			<InitialDisabled>
				<BlockContextProvider
					value={ {
						filterData: {
							items:
								termOptions.length === 0 && isPreview
									? termOptionsPreview
									: termOptions,
							isLoading,
							showCounts,
						},
					} }
				>
					{ children }
				</BlockContextProvider>
			</InitialDisabled>
		</div>
	);
};

export default withSpokenMessages( Edit );
