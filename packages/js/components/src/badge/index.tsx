/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

export type BadgeProps = {
	count: number;
} & React.HTMLAttributes< HTMLSpanElement >;

export const Badge = ( { count, className = '', ...props }: BadgeProps ) => {
	return (
		<span className={ `fincommerce-badge ${ className }` } { ...props }>
			{ count }
		</span>
	);
};
