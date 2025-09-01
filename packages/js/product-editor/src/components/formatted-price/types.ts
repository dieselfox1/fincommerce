/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';

export type FormattedPriceProps = React.DetailedHTMLProps<
	React.HTMLAttributes< HTMLSpanElement >,
	HTMLSpanElement
> & {
	product: Product;
};
