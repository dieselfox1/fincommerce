/**
 * External dependencies
 */
import { ProductVariation } from '@fincommerce/data';
export type ShippingMenuItemProps = {
    variation: ProductVariation;
    handlePrompt(label?: string, parser?: (value: string) => Partial<ProductVariation> | null): void;
    onClose(): void;
};
//# sourceMappingURL=types.d.ts.map