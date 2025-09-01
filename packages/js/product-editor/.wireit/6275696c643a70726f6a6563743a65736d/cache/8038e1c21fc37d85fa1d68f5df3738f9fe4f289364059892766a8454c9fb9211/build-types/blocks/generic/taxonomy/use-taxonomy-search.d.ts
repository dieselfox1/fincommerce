/**
 * Internal dependencies
 */
import type { Taxonomy } from '../../../types';
interface UseTaxonomySearchOptions {
    fetchParents?: boolean;
}
declare const useTaxonomySearch: (taxonomyName: string, options?: UseTaxonomySearchOptions) => {
    searchEntity: (search: string) => Promise<Taxonomy[]>;
    isResolving: boolean;
};
export default useTaxonomySearch;
//# sourceMappingURL=use-taxonomy-search.d.ts.map