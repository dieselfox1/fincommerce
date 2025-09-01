/**
 * External dependencies
 */
import type { ProductVariation } from '@fincommerce/data';

export type VariationPricingFormProps = {
	initialValue?: Partial< ProductVariation >;
	onSubmit?(
		value: Pick< ProductVariation, 'regular_price' | 'sale_price' >
	): void;
	onCancel?(): void;
};
