/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Icon, warning } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { Tooltip } from '../';

export const Basic = () => {
	return (
		<Tooltip
			text={
				<>
					This is a <strong>tooltip</strong>!
				</>
			}
		/>
	);
};

export const CustomIcon = () => {
	return (
		<Tooltip text="I'm a tooltip with a custom button icon">
			<Icon icon={ warning } />
		</Tooltip>
	);
};

export default {
	title: 'Experimental/Tooltip',
	component: Tooltip,
};
