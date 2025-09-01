/**
 * External dependencies
 */
import { ProductProductAttribute, ProductAttributeTerm } from '@fincommerce/data';
export type VariationsFilterProps = {
    initialValues: ProductAttributeTerm['slug'][];
    attribute: ProductProductAttribute;
    onFilter(values: ProductAttributeTerm['slug'][]): void;
};
//# sourceMappingURL=types.d.ts.map