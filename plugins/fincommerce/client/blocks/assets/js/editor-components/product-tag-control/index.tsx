/**
 * External dependencies
 */
import { __, _n, sprintf } from '@finpress/i18n';
import { useState, useEffect, useCallback, useMemo } from '@finpress/element';
import { SearchListControl } from '@fincommerce/editor-components/search-list-control';
import { SelectControl } from '@finpress/components';
import { getSetting } from '@fincommerce/settings';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Internal dependencies
 */
import type { SearchListItem as SearchListItemProps } from '@fincommerce/block-library/assets/js/editor-components/search-list-control/types';
import ProductTagItem from '@fincommerce/block-library/assets/js/editor-components/product-tag-control/product-tag-item';
import type { ProductTagControlProps } from '@fincommerce/block-library/assets/js/editor-components/product-tag-control/types';
import { getProductTags } from '@fincommerce/block-library/assets/js/editor-components/utils';
import '@fincommerce/block-library/assets/js/editor-components/product-tag-control/style.scss';

/**
 * Component to handle searching and selecting product tags.
 */
const ProductTagControl = ( {
	isCompact = false,
	onChange,
	onOperatorChange,
	operator = 'any',
	selected,
}: ProductTagControlProps ): JSX.Element => {
	const [ list, setList ] = useState< SearchListItemProps[] >( [] );
	const [ loading, setLoading ] = useState( true );
	const [ isMounted, setIsMounted ] = useState( false );
	const limitTags = getSetting( 'limitTags', false );

	const selectedTags = useMemo< SearchListItemProps[] >( () => {
		return list.filter( ( item ) => selected.includes( item.id ) );
	}, [ list, selected ] );

	const onSearch = useCallback(
		( search: string ) => {
			setLoading( true );
			getProductTags( { selected, search } )
				.then( ( newList ) => {
					setList( newList );
					setLoading( false );
				} )
				.catch( () => {
					setLoading( false );
				} );
		},
		[ selected ]
	);

	// Load on mount.
	useEffect( () => {
		if ( isMounted ) {
			return;
		}
		onSearch( '' );
		setIsMounted( true );
	}, [ onSearch, isMounted ] );

	const debouncedOnSearch = useDebouncedCallback( onSearch, 400 );

	const messages = {
		clear: __( 'Clear all product tags', 'fincommerce' ),
		list: __( 'Product Tags', 'fincommerce' ),
		noItems: __(
			'You have not set up any product tags on your store.',
			'fincommerce'
		),
		search: __( 'Search for product tags', 'fincommerce' ),
		selected: ( n: number ) =>
			sprintf(
				/* translators: %d is the count of selected tags. */
				_n( '%d tag selected', '%d tags selected', n, 'fincommerce' ),
				n
			),
		updated: __( 'Tag search results updated.', 'fincommerce' ),
	};

	return (
		<>
			<SearchListControl
				className="fincommerce-product-tags"
				list={ list }
				isLoading={ loading }
				selected={ selectedTags }
				onChange={ onChange }
				onSearch={ limitTags ? debouncedOnSearch : undefined }
				renderItem={ ProductTagItem }
				messages={ messages }
				isCompact={ isCompact }
				isHierarchical
				isSingle={ false }
			/>
			{ !! onOperatorChange && (
				<div hidden={ selected.length < 2 }>
					<SelectControl
						className="fincommerce-product-tags__operator"
						label={ __(
							'Display products matching',
							'fincommerce'
						) }
						help={ __(
							'Pick at least two tags to use this setting.',
							'fincommerce'
						) }
						value={ operator }
						onChange={ onOperatorChange }
						options={ [
							{
								label: __( 'Any selected tags', 'fincommerce' ),
								value: 'any',
							},
							{
								label: __( 'All selected tags', 'fincommerce' ),
								value: 'all',
							},
						] }
					/>
				</div>
			) }
		</>
	);
};

export default ProductTagControl;
