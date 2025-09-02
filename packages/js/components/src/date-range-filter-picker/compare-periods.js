/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createElement, Component } from '@finpress/element';
import PropTypes from 'prop-types';

import { periods } from '@fincommerce/date';

/**
 * Internal dependencies
 */
import SegmentedSelection from '../segmented-selection';

class ComparePeriods extends Component {
	render() {
		const { onSelect, compare } = this.props;
		return (
			<SegmentedSelection
				options={ periods }
				selected={ compare }
				onSelect={ onSelect }
				name="compare"
				legend={ __( 'compare to', 'fincommerce' ) }
			/>
		);
	}
}

ComparePeriods.propTypes = {
	onSelect: PropTypes.func.isRequired,
	compare: PropTypes.string,
};

export default ComparePeriods;
