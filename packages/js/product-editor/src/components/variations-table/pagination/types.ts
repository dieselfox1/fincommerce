/**
 * External dependencies
 */
import { usePaginationProps } from '@fincommerce/components';

export type PaginationProps = usePaginationProps & {
	className?: string;
	perPageOptions?: number[];
	defaultPerPage?: number;
};
