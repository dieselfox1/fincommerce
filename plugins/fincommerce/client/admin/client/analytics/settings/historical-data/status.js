/**
 * External dependencies
 */
import { __, sprintf } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
import moment from 'moment';
import { Spinner } from '@finpress/components';

const HISTORICAL_DATA_STATUS_FILTER = 'fincommerce_admin_import_status';

function HistoricalDataStatus( { importDate, status } ) {
	/**
	 * Historical data import statuses.
	 *
	 * @filter fincommerce_admin_import_status
	 *
	 * @param {Object} statuses              Import statuses.
	 * @param {string} statuses.nothing      Nothing to import.
	 * @param {string} statuses.ready        Ready to import.
	 * @param {Array}  statuses.initializing Initializing string and spinner.
	 * @param {Array}  statuses.customers    Importing customers string and spinner.
	 * @param {Array}  statuses.orders       Importing orders string and spinner.
	 * @param {Array}  statuses.finalizing   Finalizing string and spinner.
	 * @param {string} statuses.finished     Message displayed after import.
	 */
	const statusLabels = applyFilters( HISTORICAL_DATA_STATUS_FILTER, {
		nothing: __( 'Nothing To Import', 'fincommerce' ),
		ready: __( 'Ready To Import', 'fincommerce' ),
		initializing: [
			__( 'Initializing', 'fincommerce' ),
			<Spinner key="spinner" />,
		],
		customers: [
			__( 'Importing Customers', 'fincommerce' ),
			<Spinner key="spinner" />,
		],
		orders: [
			__( 'Importing Orders', 'fincommerce' ),
			<Spinner key="spinner" />,
		],
		finalizing: [
			__( 'Finalizing', 'fincommerce' ),
			<Spinner key="spinner" />,
		],
		finished:
			importDate === -1
				? __( 'All historical data imported', 'fincommerce' )
				: sprintf(
						/* translators: %s: YYYY-MM-DD formatted date */
						__(
							'Historical data from %s onward imported',
							'fincommerce'
						),
						// @todo The date formatting should be localized ( 'll' ), but this is currently broken in Gutenberg.
						// See https://github.com/finpress/gutenberg/issues/12626 for details.
						moment( importDate ).format( 'YYYY-MM-DD' )
				  ),
	} );

	return (
		<span className="fincommerce-settings-historical-data__status">
			{ __( 'Status:', 'fincommerce' ) + ' ' }
			{ statusLabels[ status ] }
		</span>
	);
}

export default HistoricalDataStatus;
