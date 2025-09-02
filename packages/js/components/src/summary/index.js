/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createElement, Children, cloneElement } from '@finpress/element';
import { Dropdown } from '@finpress/components';
import PropTypes from 'prop-types';
import { withViewportMatch } from '@finpress/viewport';

/**
 * Internal dependencies
 */
import Menu from './menu';

/**
 * A container element for a list of SummaryNumbers. This component handles detecting & switching to
 * the mobile format on smaller screens.
 *
 * @param {Object} props
 * @param {Node}   props.children
 * @param {string} props.isDropdownBreakpoint
 * @param {string} props.label
 * @return {Object} -
 */
const SummaryList = ( {
	children,
	isDropdownBreakpoint,
	label = __( 'Performance Indicators', 'fincommerce' ),
} ) => {
	const items = children( {} );
	// We default to "one" because we can't have empty children.
	const itemCount = Children.count( items ) || 1;
	const orientation = isDropdownBreakpoint ? 'vertical' : 'horizontal';
	const summaryMenu = (
		<Menu
			label={ label }
			orientation={ orientation }
			itemCount={ itemCount }
			items={ items }
		/>
	);

	// On large screens, or if there are not multiple SummaryNumbers, we'll display the plain list.
	if ( ! isDropdownBreakpoint || itemCount < 2 ) {
		return summaryMenu;
	}

	const selected = items.find( ( item ) => !! item.props.selected );
	if ( ! selected ) {
		return summaryMenu;
	}

	return (
		<Dropdown
			className="fincommerce-summary"
			popoverProps={ {
				placement: 'bottom',
			} }
			headerTitle={ label }
			renderToggle={ ( { isOpen, onToggle } ) =>
				cloneElement( selected, { onToggle, isOpen } )
			}
			renderContent={ ( renderContentArgs ) => (
				<Menu
					label={ label }
					orientation={ orientation }
					itemCount={ itemCount }
					items={ children( renderContentArgs ) }
				/>
			) }
		/>
	);
};

SummaryList.propTypes = {
	/**
	 * A function returning a list of `<SummaryNumber />`s
	 */
	children: PropTypes.func.isRequired,
	/**
	 * An optional label of this group, read to screen reader users.
	 */
	label: PropTypes.string,
};

export default withViewportMatch( {
	isDropdownBreakpoint: '< large',
} )( SummaryList );
