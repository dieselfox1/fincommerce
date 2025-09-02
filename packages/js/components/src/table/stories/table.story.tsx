/**
 * External dependencies
 */
import { Card } from '@finpress/components';
import { Table } from '@fincommerce/components';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { rows, headers } from './index';

export const Basic = () => (
	<Card size={ null }>
		<Table
			caption="Revenue last week"
			rows={ rows }
			headers={ headers }
			rowKey={ ( row ) => row[ 0 ].value }
		/>
	</Card>
);

export const NoDataCustomMessage = () => {
	return (
		/* @ts-expect-error: size must be one of small, medium, largel, xSmall, extraSmall. */
		<Card size={ null }>
			<Table
				caption="Revenue last week"
				rows={ [] }
				headers={ headers }
				rowKey={ ( row ) => row[ 0 ].value }
				emptyMessage="Custom empty message"
			/>
		</Card>
	);
};

export default {
	title: 'Components/Table',
	component: Table,
};
