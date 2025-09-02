/**
 * External dependencies
 */
import { __, _n, sprintf } from '@finpress/i18n';
import {
	SearchListControl,
	SearchListItem,
} from '@fincommerce/editor-components/search-list-control';
import { SelectControl } from '@finpress/components';
import { withSearchedCategories } from '@fincommerce/block-hocs';
import ErrorMessage from '@fincommerce/editor-components/error-placeholder/error-message';
import clsx from 'clsx';
import type { RenderItemArgs } from '@fincommerce/editor-components/search-list-control/types';
import type {
	ProductCategoryResponseItem,
	WithInjectedSearchedCategories,
} from '@fincommerce/types';
import { convertProductCategoryResponseItemToSearchItem } from '@fincommerce/utils';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/editor-components/product-category-control/style.scss';

interface ProductCategoryControlProps {
	/**
	 * Callback to update the selected product categories.
	 */
	onChange: () => void;
	/**
	 * Whether or not the search control should be displayed in a compact way, so it occupies less space.
	 */
	isCompact?: boolean;
	/**
	 * Allow only a single selection. Defaults to false.
	 */
	isSingle?: boolean;
	/**
	 * Callback to update the category operator. If not passed in, setting is not used.
	 */
	onOperatorChange?: () => void;
	/**
	 * Setting for whether products should match all or any selected categories.
	 */
	operator?: 'all' | 'any';
	/**
	 * Whether or not to display the number of reviews for a category in the list.
	 */
	showReviewCount?: boolean;
}

const ProductCategoryControl = ( {
	categories = [],
	error = null,
	isLoading = false,
	onChange,
	onOperatorChange,
	operator = 'any',
	selected,
	isCompact = false,
	isSingle = false,
	showReviewCount,
}: ProductCategoryControlProps & WithInjectedSearchedCategories ) => {
	const renderItem = (
		args: RenderItemArgs< ProductCategoryResponseItem >
	) => {
		const { item, search, depth = 0 } = args;

		const accessibleName = ! item.breadcrumbs.length
			? item.name
			: `${ item.breadcrumbs.join( ', ' ) }, ${ item.name }`;

		const listItemAriaLabel = showReviewCount
			? sprintf(
					/* translators: %1$s is the item name, %2$d is the count of reviews for the item. */
					_n(
						'%1$s, has %2$d review',
						'%1$s, has %2$d reviews',
						item.details?.review_count || 0,
						'fincommerce'
					),
					accessibleName,
					item.details?.review_count || 0
			  )
			: sprintf(
					/* translators: %1$s is the item name, %2$d is the count of products for the item. */
					_n(
						'%1$s, has %2$d product',
						'%1$s, has %2$d products',
						item.details?.count || 0,
						'fincommerce'
					),
					accessibleName,
					item.details?.count || 0
			  );

		const listItemCountLabel = showReviewCount
			? sprintf(
					/* translators: %d is the count of reviews. */
					_n(
						'%d review',
						'%d reviews',
						item.details?.review_count || 0,
						'fincommerce'
					),
					item.details?.review_count || 0
			  )
			: sprintf(
					/* translators: %d is the count of products. */
					_n(
						'%d product',
						'%d products',
						item.details?.count || 0,
						'fincommerce'
					),
					item.details?.count || 0
			  );

		return (
			<SearchListItem
				className={ clsx(
					'fincommerce-product-categories__item',
					'has-count',
					{
						'is-searching': search.length > 0,
						'is-skip-level': depth === 0 && item.parent !== 0,
					}
				) }
				{ ...args }
				countLabel={ listItemCountLabel }
				aria-label={ listItemAriaLabel }
			/>
		);
	};

	const messages = {
		clear: __( 'Clear all product categories', 'fincommerce' ),
		list: __( 'Product Categories', 'fincommerce' ),
		noItems: __(
			"Your store doesn't have any product categories.",
			'fincommerce'
		),
		search: __( 'Search for product categories', 'fincommerce' ),
		selected: ( n: number ) =>
			sprintf(
				/* translators: %d is the count of selected categories. */
				_n(
					'%d category selected',
					'%d categories selected',
					n,
					'fincommerce'
				),
				n
			),
		updated: __( 'Category search results updated.', 'fincommerce' ),
	};

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	const currentList = categories.map(
		convertProductCategoryResponseItemToSearchItem
	);

	return (
		<>
			<SearchListControl
				className="fincommerce-product-categories"
				list={ currentList }
				isLoading={ isLoading }
				selected={ currentList.filter( ( { id } ) =>
					selected.includes( Number( id ) )
				) }
				onChange={ onChange }
				renderItem={ renderItem }
				messages={ messages }
				isCompact={ isCompact }
				isHierarchical
				isSingle={ isSingle }
			/>
			{ !! onOperatorChange && (
				<div hidden={ selected.length < 2 }>
					<SelectControl
						className="fincommerce-product-categories__operator"
						label={ __(
							'Display products matching',
							'fincommerce'
						) }
						help={ __(
							'Pick at least two categories to use this setting.',
							'fincommerce'
						) }
						value={ operator }
						onChange={ onOperatorChange }
						options={ [
							{
								label: __(
									'Any selected categories',
									'fincommerce'
								),
								value: 'any',
							},
							{
								label: __(
									'All selected categories',
									'fincommerce'
								),
								value: 'all',
							},
						] }
					/>
				</div>
			) }
		</>
	);
};

export default withSearchedCategories( ProductCategoryControl );
