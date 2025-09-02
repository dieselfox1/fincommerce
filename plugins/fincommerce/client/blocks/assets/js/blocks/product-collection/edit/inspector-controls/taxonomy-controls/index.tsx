/**
 * External dependencies
 */
import { Taxonomy } from '@finpress/core-data/src/entity-types';
import { useMemo } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { store as coreStore } from '@finpress/core-data';
import {
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@finpress/components';

/**
 * Internal dependencies
 */
import TaxonomyItem from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-controls/taxonomy-controls/taxonomy-item';
import { QueryControlProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import useTaxonomyControls from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-controls/taxonomy-controls/use-taxonomy-controls';

/**
 * Hook that returns the taxonomies associated with product post type.
 */
export const useTaxonomies = (): Taxonomy[] => {
	const taxonomies = useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );
		const filteredTaxonomies: Taxonomy[] = getTaxonomies( {
			type: 'product',
			per_page: -1,
		} );
		return filteredTaxonomies;
	}, [] );
	return useMemo( () => {
		return taxonomies?.filter(
			( { visibility } ) => !! visibility?.publicly_queryable
		);
	}, [ taxonomies ] );
};

/**
 * Normalize the name so first letter of every word is capitalized.
 */
const normalizeName = ( name: string | undefined | null ) => {
	if ( ! name ) {
		return '';
	}

	return name
		.split( ' ' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
};

function TaxonomyControls( {
	setQueryAttribute,
	trackInteraction,
	query,
	collection,
	renderMode = 'panel',
}: QueryControlProps & { collection: string | undefined } & {
	renderMode?: 'panel' | 'standalone';
} ) {
	const {
		filteredTaxonomies,
		taxQuery,
		createHandleChange,
		shouldShowTaxonomyControl,
	} = useTaxonomyControls( {
		query,
		collection,
		setQueryAttribute,
		trackInteraction,
		isFiltersPanel: renderMode === 'panel',
	} );

	if ( ! shouldShowTaxonomyControl ) {
		return null;
	}

	const createTaxonomyControl = ( taxonomy: Taxonomy ) => {
		const { slug } = taxonomy;
		const termIds = taxQuery?.[ slug ] || [];
		const handleChange = createHandleChange( slug );

		return (
			<TaxonomyItem
				key={ slug }
				taxonomy={ taxonomy }
				termIds={ termIds }
				onChange={ handleChange }
			/>
		);
	};

	const createTaxonomyToolsPanelItem = ( taxonomy: Taxonomy ) => {
		const { slug, name } = taxonomy;
		const termIds = taxQuery?.[ slug ] || [];
		const handleChange = createHandleChange( slug );
		const deselectCallback = () => handleChange( [] );

		return (
			<ToolsPanelItem
				key={ slug }
				label={ normalizeName( name ) }
				hasValue={ () => termIds.length > 0 }
				onDeselect={ deselectCallback }
				resetAllFilter={ deselectCallback }
			>
				{ createTaxonomyControl( taxonomy ) }
			</ToolsPanelItem>
		);
	};

	return (
		<>
			{ filteredTaxonomies.map( ( taxonomy: Taxonomy ) => {
				return renderMode === 'panel'
					? createTaxonomyToolsPanelItem( taxonomy )
					: createTaxonomyControl( taxonomy );
			} ) }
		</>
	);
}

export default TaxonomyControls;
