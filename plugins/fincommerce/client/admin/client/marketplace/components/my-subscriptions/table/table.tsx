/**
 * External dependencies
 */
import { EmptyTable, Table, TablePlaceholder } from '@fincommerce/components';
import {
	TableHeader,
	TableRow,
} from '@fincommerce/components/build-types/table/types';
import { getNewPath } from '@fincommerce/navigation';
import { createInterpolateElement } from '@finpress/element';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { MARKETPLACE_PATH } from '../../constants';

const tableHeadersDefault = [
	{
		key: 'name',
		label: __( 'Name', 'fincommerce' ),
	},
	{
		key: 'expiry',
		label: __( 'Expires/Renews on', 'fincommerce' ),
	},
	{
		key: 'subscription',
		label: __( 'Subscription', 'fincommerce' ),
	},
	{
		key: 'version',
		label: __( 'Version', 'fincommerce' ),
	},
];

function SubscriptionsTable( props: {
	rows?: TableRow[][];
	headers: TableHeader[];
	isLoading: boolean;
} ) {
	if ( props.isLoading ) {
		return (
			<TablePlaceholder
				caption={ __( 'Loading your subscriptions', 'fincommerce' ) }
				headers={ props.headers }
			/>
		);
	}

	const headersWithClasses = props.headers.map( ( header ) => {
		return {
			...header,
			cellClassName:
				'fincommerce-marketplace__my-subscriptions__table__header--' +
				header.key,
		};
	} );

	return (
		<Table
			className="fincommerce-marketplace__my-subscriptions__table"
			headers={ headersWithClasses }
			rows={ props.rows }
		/>
	);
}

export function InstalledSubscriptionsTable( props: {
	rows?: TableRow[][];
	isLoading: boolean;
} ) {
	const headers = [
		...tableHeadersDefault,
		{
			key: 'actions',
			label: __( 'Actions', 'fincommerce' ),
		},
	];

	if ( ! props.isLoading && ( ! props.rows || props.rows.length === 0 ) ) {
		const marketplaceBrowseURL = getNewPath( {}, MARKETPLACE_PATH, {} );
		const noInstalledSubscriptionsHTML = createInterpolateElement(
			__(
				'No extensions or themes installed. <a>Browse the Marketplace</a>',
				'fincommerce'
			),
			{
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				a: <a href={ marketplaceBrowseURL } />,
			}
		);

		return (
			<EmptyTable numberOfRows={ 4 }>
				{ noInstalledSubscriptionsHTML }
			</EmptyTable>
		);
	}

	return (
		<SubscriptionsTable
			rows={ props.rows }
			isLoading={ props.isLoading }
			headers={ headers }
		/>
	);
}

export function AvailableSubscriptionsTable( props: {
	rows?: TableRow[][];
	isLoading: boolean;
} ) {
	const headers = [
		...tableHeadersDefault,
		{
			key: 'actions',
			label: __( 'Actions', 'fincommerce' ),
		},
	];

	return (
		<SubscriptionsTable
			rows={ props.rows }
			isLoading={ props.isLoading }
			headers={ headers }
		/>
	);
}
