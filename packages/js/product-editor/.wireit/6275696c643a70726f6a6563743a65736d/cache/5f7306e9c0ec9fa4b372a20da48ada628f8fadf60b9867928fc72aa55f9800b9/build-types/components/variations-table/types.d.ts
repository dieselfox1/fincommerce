/**
 * External dependencies
 */
import { PartialProductVariation, ProductVariation } from '@fincommerce/data';
export type VariationActionsMenuItemProps = {
    selection: ProductVariation[];
    onChange(values: PartialProductVariation[] | React.FormEvent<HTMLDivElement>, showSuccess?: boolean): void;
    onClose(): void;
    supportsMultipleSelection?: boolean;
};
//# sourceMappingURL=types.d.ts.map