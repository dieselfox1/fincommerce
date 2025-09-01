/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
export type PermalinkParts = {
    prefix: string | undefined;
    postName: string | undefined;
    suffix: string | undefined;
};
export declare const getPermalinkParts: (product: Product) => PermalinkParts;
//# sourceMappingURL=get-permalink-parts.d.ts.map