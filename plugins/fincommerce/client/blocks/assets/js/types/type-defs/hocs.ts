/**
 * External dependencies
 */
import { ErrorObject } from '@fincommerce/editor-components/error-placeholder';
import type {
	ProductResponseItem,
	ProductCategoryResponseItem,
} from '@fincommerce/types';

export interface WithInjectedProductVariations {
	error: ErrorObject | null;
	/**
	 * The id of the currently expanded product
	 */
	expandedProduct: number | null;
	variations: Record< number, ProductResponseItem[] >;
	variationsLoading: boolean;
}

export interface WithInjectedSearchedProducts {
	error: ErrorObject | null;
	isLoading: boolean;
	onSearch: ( ( search: string ) => void ) | null;
	products: ProductResponseItem[];
	selected: number[];
}

export interface WithInjectedSearchedCategories {
	error: ErrorObject | null;
	isLoading: boolean;
	categories: ProductCategoryResponseItem[];
	selected: number[];
}

export interface WithInjectedInstanceId {
	instanceId: string | number;
}
