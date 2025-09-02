/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { TableSummaryProps } from './types';

/**
 * A component to display summarized table data - the list of data passed in on a single line.
 */
const TableSummary = ( { data }: TableSummaryProps ) => {
	return (
		<ul className="fincommerce-table__summary" role="complementary">
			{ data.map( ( { label, value }, i ) => (
				<li className="fincommerce-table__summary-item" key={ i }>
					<span className="fincommerce-table__summary-value">
						{ value }
					</span>
					<span className="fincommerce-table__summary-label">
						{ label }
					</span>
				</li>
			) ) }
		</ul>
	);
};

export default TableSummary;

/**
 * A component to display a placeholder box for `TableSummary`. There is no prop for this component.
 *
 * @return {Object} -
 */
export const TableSummaryPlaceholder = () => {
	return (
		<ul
			className="fincommerce-table__summary is-loading"
			role="complementary"
		>
			<li className="fincommerce-table__summary-item">
				<span className="is-placeholder" />
			</li>
		</ul>
	);
};
