/**
 * External dependencies
 */
import { ProductStatus } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import type { WPError } from '../hooks/use-error-handler';
export declare function formatProductError(error: WPError, productStatus: ProductStatus): {
    code: string;
    message?: string | undefined;
    validatorId?: string;
};
//# sourceMappingURL=format-product-error.d.ts.map