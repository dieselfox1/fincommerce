/**
 * External dependencies
 */
import { Card, CardFooter } from '@finpress/components';
import { TableSummaryPlaceholder } from '@fincommerce/components';
import { createElement } from '@finpress/element';

export const Basic = () => {
	return (
		<Card>
			{ /* @ts-expect-error: justify is missing from the latest type def. */ }
			<CardFooter justify="center">
				<TableSummaryPlaceholder />
			</CardFooter>
		</Card>
	);
};

export default {
	title: 'Components/TableSummaryPlaceholder',
	component: TableSummaryPlaceholder,
};
