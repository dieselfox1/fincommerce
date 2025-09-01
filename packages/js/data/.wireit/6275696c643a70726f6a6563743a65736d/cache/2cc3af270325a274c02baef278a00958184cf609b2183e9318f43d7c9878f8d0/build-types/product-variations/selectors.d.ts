/**
 * Internal dependencies
 */
import { ResourceState } from '../crud/reducer';
import { IdQuery } from '../crud/types';
export declare const isGeneratingVariations: (state: ResourceState, idQuery: IdQuery) => boolean;
export declare const generateProductVariationsError: (state: ResourceState, idQuery: IdQuery) => unknown;
export type CustomSelectors = {
    isGeneratingVariations: typeof isGeneratingVariations;
    generateProductVariationsError: typeof generateProductVariationsError;
};
//# sourceMappingURL=selectors.d.ts.map