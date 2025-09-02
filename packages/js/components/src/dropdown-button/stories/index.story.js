/**
 * External dependencies
 */
import { Dropdown } from '@finpress/components';
import { DropdownButton } from '@fincommerce/components';

export const Basic = () => (
	<Dropdown
		renderToggle={ ( { isOpen, onToggle } ) => (
			<DropdownButton
				onClick={ onToggle }
				isOpen={ isOpen }
				labels={ [ 'All products Sold' ] }
			/>
		) }
		renderContent={ () => <p>Dropdown content here</p> }
	/>
);

export default {
	title: 'Components/DropdownButton',
	component: DropdownButton,
};
