/**
 * Internal dependencies
 */
import { Metadata } from '../types';
interface Options {
    postType?: string;
    id?: number;
}
declare function useProductMetadata(options?: Options): {
    metadata: Record<string, string | undefined>;
    update: (entries: Metadata<string>[]) => any;
    isLoading: boolean;
};
export default useProductMetadata;
//# sourceMappingURL=use-product-metadata.d.ts.map