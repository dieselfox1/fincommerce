import TYPES from './action-types';
import { IdQuery, IdType, Item } from '../crud/types';
import type { BatchUpdateRequest, BatchUpdateResponse, GenerateRequest } from './types';
import CRUD_ACTIONS from './crud-actions';
import { Product, ProductProductAttribute, ProductDefaultAttribute } from '../products/types';
export declare function generateProductVariationsError(key: IdType, error: unknown): {
    type: TYPES.GENERATE_VARIATIONS_ERROR;
    key: IdType;
    error: unknown;
    errorType: CRUD_ACTIONS;
};
export declare function generateProductVariationsRequest(key: IdType): {
    type: TYPES.GENERATE_VARIATIONS_REQUEST;
    key: IdType;
};
export declare function generateProductVariationsSuccess(key: IdType): {
    type: TYPES.GENERATE_VARIATIONS_SUCCESS;
    key: IdType;
};
export declare const generateProductVariations: (idQuery: IdQuery, productData: {
    type?: string;
    attributes: ProductProductAttribute[];
    default_attributes?: ProductDefaultAttribute[];
    meta_data?: Product["meta_data"];
}, data: GenerateRequest & {
    meta_data?: Product["meta_data"];
}, saveAttributes?: boolean) => Generator<Object, Item, Item>;
export declare function batchUpdateProductVariationsError(key: IdType, error: unknown): {
    type: TYPES.BATCH_UPDATE_VARIATIONS_ERROR;
    key: IdType;
    error: unknown;
    errorType: string;
};
export declare function batchUpdateProductVariations(idQuery: IdQuery, data: BatchUpdateRequest): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: TYPES.BATCH_UPDATE_VARIATIONS_ERROR;
    key: IdType;
    error: unknown;
    errorType: string;
}, BatchUpdateResponse, BatchUpdateResponse>;
export type CustomActions = {
    generateProductVariationsRequest: typeof generateProductVariationsRequest;
    generateProductVariationsError: typeof generateProductVariationsError;
    generateProductVariationsSuccess: typeof generateProductVariationsSuccess;
    generateProductVariations: typeof generateProductVariations;
    batchUpdateProductVariationsError: typeof batchUpdateProductVariationsError;
    batchUpdateProductVariations: typeof batchUpdateProductVariations;
};
export type Actions = ReturnType<typeof generateProductVariationsRequest | typeof generateProductVariationsError | typeof generateProductVariationsSuccess | typeof batchUpdateProductVariationsError>;
//# sourceMappingURL=actions.d.ts.map