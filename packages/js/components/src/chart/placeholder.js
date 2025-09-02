/**
 * External dependencies
 */
import { createElement, Component } from '@finpress/element';
import PropTypes from 'prop-types';
import { Spinner } from '@finpress/components';

/**
 * `ChartPlaceholder` displays a large loading indiciator for use in place of a `Chart` while data is loading.
 */
class ChartPlaceholder extends Component {
	render() {
		const { height } = this.props;

		return (
			<div
				aria-hidden="true"
				className="fincommerce-chart-placeholder"
				style={ { height } }
			>
				<Spinner />
			</div>
		);
	}
}

ChartPlaceholder.propTypes = {
	height: PropTypes.number,
};

ChartPlaceholder.defaultProps = {
	height: 0,
};

export default ChartPlaceholder;
