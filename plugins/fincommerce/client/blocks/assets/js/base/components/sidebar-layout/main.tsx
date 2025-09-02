/**
 * External dependencies
 */
import { forwardRef } from '@finpress/element';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { ForwardRefProps } from '@fincommerce/block-library/assets/js/base/components/sidebar-layout/types';

const Main = forwardRef< HTMLInputElement, ForwardRefProps >(
	( { children, className = '' }, ref ): JSX.Element => {
		return (
			<div
				ref={ ref }
				className={ clsx( 'wc-block-components-main', className ) }
			>
				{ children }
			</div>
		);
	}
);

export default Main;
