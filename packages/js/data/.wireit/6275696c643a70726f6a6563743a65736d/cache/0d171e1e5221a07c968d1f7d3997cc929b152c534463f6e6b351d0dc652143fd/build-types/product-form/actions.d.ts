/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { ProductFormField, ProductForm } from './types';
export declare function getFieldsSuccess(fields: ProductFormField[]): {
    type: TYPES.GET_FIELDS_SUCCESS;
    fields: ProductFormField[];
};
export declare function getFieldsError(error: unknown): {
    type: TYPES.GET_FIELDS_ERROR;
    error: unknown;
};
export declare function getProductFormSuccess(productForm: ProductForm): {
    type: TYPES.GET_PRODUCT_FORM_SUCCESS;
    fields: ProductFormField[];
    sections: import("./types").ProductFormSection[];
    subsections: {
        id: string;
        plugin_id: string;
        order: number;
    }[];
    tabs: import("./types").Tabs[];
};
export declare function getProductFormError(error: unknown): {
    type: TYPES.GET_PRODUCT_FORM_ERROR;
    error: unknown;
};
export type Action = ReturnType<typeof getFieldsSuccess | typeof getFieldsError | typeof getProductFormSuccess | typeof getProductFormError>;
//# sourceMappingURL=actions.d.ts.map