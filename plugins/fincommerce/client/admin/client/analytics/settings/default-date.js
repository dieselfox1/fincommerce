/**
 * External dependencies
 */
import { DateRangeFilterPicker } from '@fincommerce/components';
import { useSettings } from '@fincommerce/data';
import {
	getCurrentDates,
	getDateParamsFromQuery,
	isoDateFormat,
} from '@fincommerce/date';

const DefaultDate = ( { value, onChange } ) => {
	const { wcAdminSettings } = useSettings( 'wc_admin', [
		'wcAdminSettings',
	] );
	const { fincommerce_default_date_range: defaultDateRange } =
		wcAdminSettings;
	const change = ( query ) => {
		onChange( {
			target: {
				name: 'fincommerce_default_date_range',
				value: new URLSearchParams( query ).toString(),
			},
		} );
	};
	const query = Object.fromEntries(
		new URLSearchParams( value.replace( /&amp;/g, '&' ) )
	);
	const { period, compare, before, after } = getDateParamsFromQuery(
		query,
		defaultDateRange
	);
	const { primary: primaryDate, secondary: secondaryDate } = getCurrentDates(
		query,
		defaultDateRange
	);
	const dateQuery = {
		period,
		compare,
		before,
		after,
		primaryDate,
		secondaryDate,
	};
	return (
		<DateRangeFilterPicker
			query={ query }
			onRangeSelect={ change }
			dateQuery={ dateQuery }
			isoDateFormat={ isoDateFormat }
		/>
	);
};

export default DefaultDate;
