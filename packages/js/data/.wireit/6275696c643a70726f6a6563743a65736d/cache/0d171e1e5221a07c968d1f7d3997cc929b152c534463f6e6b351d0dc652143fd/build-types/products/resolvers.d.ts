import { GetSuggestedProductsOptions, Product, ProductQuery } from './types';
export declare function getProducts(query: Partial<ProductQuery>): Generator<{
    type: import("./action-types").TYPES.GET_PRODUCTS_SUCCESS;
    products: import("./types").PartialProduct[];
    query: Partial<ProductQuery>;
    totalCount: number;
} | {
    type: import("./action-types").TYPES.GET_PRODUCTS_ERROR;
    query: Partial<ProductQuery>;
    error: unknown;
} | {
    type: import("./action-types").TYPES.GET_PRODUCTS_TOTAL_COUNT_SUCCESS;
    query: Partial<ProductQuery>;
    totalCount: number;
} | Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    items: unknown[];
    totalCount: number;
} | undefined, unknown[] | ({
    data: unknown[];
} & Response)>, Product[], {
    items: Product[];
    totalCount: number;
}>;
export declare function getProduct(productId: number): Generator<Object, Product, Omit<import("@wordpress/core-data").Post, "status" | "categories"> & {
    attributes: import("./types").ProductProductAttribute[];
    average_rating: string;
    backordered: boolean;
    backorders: "no" | "notify" | "yes";
    backorders_allowed: boolean;
    button_text: string;
    categories: Pick<import("..").ProductCategory, "id" | "name" | "slug">[];
    catalog_visibility: import("./types").ProductCatalogVisibility;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to_gmt: string | null;
    default_attributes: import("./types").ProductDefaultAttribute[];
    description: string;
    dimensions: import("./types").ProductDimensions;
    download_expiry: number;
    download_limit: number;
    downloadable: boolean;
    downloads: import("./types").ProductDownload[];
    external_url: string;
    featured: boolean;
    generated_slug: string;
    id: number;
    low_stock_amount: number;
    meta_data: {
        id?: number;
        key: string;
        value?: string;
    }[];
    manage_stock: boolean;
    menu_order: number;
    name: string;
    on_sale: boolean;
    permalink: string;
    permalink_template: string;
    price: string;
    price_html: string;
    purchasable: boolean;
    regular_price: string;
    rating_count: number;
    related_ids: number[];
    reviews_allowed: boolean;
    sale_price: string;
    shipping_class: string;
    shipping_class_id: number;
    shipping_required: boolean;
    shipping_taxable: boolean;
    short_description: string;
    slug: string;
    sku: string;
    status: import("./types").ProductStatus;
    stock_quantity: number;
    stock_status: "instock" | "outofstock" | "onbackorder";
    tags: Pick<import("..").ProductTag, "id" | "name">[];
    tax_class: "standard" | "reduced-rate" | "zero-rate" | undefined;
    tax_status: "taxable" | "shipping" | "none";
    total_sales: number;
    type: import("./types").ProductType;
    variations: number[];
    virtual: boolean;
    weight: string;
}>;
export declare function getRelatedProducts(productId: number): Generator<Object, Product[], Omit<import("@wordpress/core-data").Post, "status" | "categories"> & {
    attributes: import("./types").ProductProductAttribute[];
    average_rating: string;
    backordered: boolean;
    backorders: "no" | "notify" | "yes";
    backorders_allowed: boolean;
    button_text: string;
    categories: Pick<import("..").ProductCategory, "id" | "name" | "slug">[];
    catalog_visibility: import("./types").ProductCatalogVisibility;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to_gmt: string | null;
    default_attributes: import("./types").ProductDefaultAttribute[];
    description: string;
    dimensions: import("./types").ProductDimensions;
    download_expiry: number;
    download_limit: number;
    downloadable: boolean;
    downloads: import("./types").ProductDownload[];
    external_url: string;
    featured: boolean;
    generated_slug: string;
    id: number;
    low_stock_amount: number;
    meta_data: {
        id?: number;
        key: string;
        value?: string;
    }[];
    manage_stock: boolean;
    menu_order: number;
    name: string;
    on_sale: boolean;
    permalink: string;
    permalink_template: string;
    price: string;
    price_html: string;
    purchasable: boolean;
    regular_price: string;
    rating_count: number;
    related_ids: number[];
    reviews_allowed: boolean;
    sale_price: string;
    shipping_class: string;
    shipping_class_id: number;
    shipping_required: boolean;
    shipping_taxable: boolean;
    short_description: string;
    slug: string;
    sku: string;
    status: import("./types").ProductStatus;
    stock_quantity: number;
    stock_status: "instock" | "outofstock" | "onbackorder";
    tags: Pick<import("..").ProductTag, "id" | "name">[];
    tax_class: "standard" | "reduced-rate" | "zero-rate" | undefined;
    tax_status: "taxable" | "shipping" | "none";
    total_sales: number;
    type: import("./types").ProductType;
    variations: number[];
    virtual: boolean;
    weight: string;
} & Product[]>;
export declare function getProductsTotalCount(query: Partial<ProductQuery>): Generator<{
    type: import("./action-types").TYPES.GET_PRODUCTS_TOTAL_COUNT_SUCCESS;
    query: Partial<ProductQuery>;
    totalCount: number;
} | {
    type: import("./action-types").TYPES.GET_PRODUCTS_TOTAL_COUNT_ERROR;
    query: Partial<ProductQuery>;
    error: unknown;
} | Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    items: Product[];
    totalCount: number;
} | undefined, Product[] | ({
    data: Product[];
} & Response)>, any, {
    totalCount: any;
}>;
export declare function getPermalinkParts(productId: number): Generator<Object, void, unknown>;
export declare const getSuggestedProducts: (options: GetSuggestedProductsOptions) => ({ dispatch: contextualDispatch }: {
    dispatch: any;
}) => Promise<void>;
//# sourceMappingURL=resolvers.d.ts.map