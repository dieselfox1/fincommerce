import { ProductFormField, ProductForm } from './types';
export declare function getFields(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    type: import("./action-types").TYPES.GET_FIELDS_SUCCESS;
    fields: ProductFormField[];
} | {
    type: import("./action-types").TYPES.GET_FIELDS_ERROR;
    error: unknown;
}, ProductFormField[]>;
export declare function getProductForm(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    type: import("./action-types").TYPES.GET_PRODUCT_FORM_SUCCESS;
    fields: ProductFormField[];
    sections: import("./types").ProductFormSection[];
    subsections: {
        id: string;
        plugin_id: string;
        order: number;
    }[];
    tabs: import("./types").Tabs[];
} | {
    type: import("./action-types").TYPES.GET_PRODUCT_FORM_ERROR;
    error: unknown;
}, ProductForm>;
//# sourceMappingURL=resolvers.d.ts.map