/**
 * External dependencies
 */
import { Card } from '@finpress/components';
import { TablePlaceholder } from '@fincommerce/components';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { headers } from './index';

export const Basic = () => {
	return (
		/* @ts-expect-error: size must be one of small, medium, largel, xSmall, extraSmall. */
		<Card size={ null }>
			<TablePlaceholder caption="Revenue last week" headers={ headers } />
		</Card>
	);
};

export default {
	title: 'Components/TablePlaceholder',
	component: TablePlaceholder,
};
