/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
export type ProductListProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    products: Product[];
    onRemove?(product: Product): void;
    onEdit?(product: Product): void;
    onPreview?(product: Product): void;
};
//# sourceMappingURL=types.d.ts.map