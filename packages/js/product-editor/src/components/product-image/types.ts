/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';

export type ProductImageProps = React.DetailedHTMLProps<
	React.HTMLAttributes< HTMLDivElement >,
	HTMLDivElement
> & { product: Product };
