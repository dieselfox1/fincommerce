/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export type LinkedProductListBlockEmptyState = {
	image: string | 'CashRegister' | 'ShoppingBags';
	tip: string;
	isDismissible: boolean;
};

export interface LinkedProductListBlockAttributes extends BlockAttributes {
	property: string;
	emptyState: LinkedProductListBlockEmptyState;
}
