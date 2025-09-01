/**
 * External dependencies
 */
import { forwardRef } from '@wordpress/element';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { ForwardRefProps } from '@fincommerce/block-library/assets/js/base/components/sidebar-layout/types';

const Sidebar = forwardRef< HTMLDivElement, ForwardRefProps >(
	( { children, className = '' }, ref ): JSX.Element => {
		return (
			<div
				ref={ ref }
				className={ clsx( 'wc-block-components-sidebar', className ) }
			>
				{ children }
			</div>
		);
	}
);

export default Sidebar;
