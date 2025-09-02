/**
 * External dependencies
 */
import React from '@finpress/element';

/**
 * Internal dependencies
 */
import './style.scss';

export const QuickLinkCategory = ( { title, children } ) => {
	return (
		<div className="fincommerce-quick-links__category">
			<h3 className="fincommerce-quick-links__category-header">
				{ title }
			</h3>
			{ children }
		</div>
	);
};
