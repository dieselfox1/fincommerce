/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { isNil } from 'lodash';

function HistoricalDataProgress( { label, progress, total } ) {
	/* translators: %s: label */
	const labelText = sprintf( __( 'Imported %(label)s', 'fincommerce' ), {
		label,
	} );

	const labelCounters = ! isNil( total )
		? /* translators: 1: progress, 2: total */
		  sprintf( __( '%(progress)s of %(total)s', 'fincommerce' ), {
				progress: progress || 0,
				total,
		  } )
		: null;

	return (
		<div className="fincommerce-settings-historical-data__progress">
			<span className="fincommerce-settings-historical-data__progress-label">
				{ labelText }
			</span>
			{ labelCounters && (
				<span className="fincommerce-settings-historical-data__progress-label">
					{ labelCounters }
				</span>
			) }
			<progress
				className="fincommerce-settings-historical-data__progress-bar"
				max={ total }
				value={ progress || 0 }
			/>
		</div>
	);
}

export default HistoricalDataProgress;
