/**
 * External dependencies
 */
import { EmptyContent } from '@fincommerce/components';

export const Basic = () => (
	<EmptyContent
		title="Nothing here"
		message="Some descriptive text"
		actionLabel="Reload page"
		actionURL="#"
	/>
);

export default {
	title: 'Components/EmptyContent',
	component: EmptyContent,
};
