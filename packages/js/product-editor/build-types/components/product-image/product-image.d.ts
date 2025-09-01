import { Product } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { ProductImageProps } from './types';
export declare function getProductImageStyle(product: Product): {
    backgroundImage: string;
} | undefined;
export declare function ProductImage({ product, className, style, ...props }: ProductImageProps): JSX.Element;
//# sourceMappingURL=product-image.d.ts.map