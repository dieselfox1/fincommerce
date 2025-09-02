/**
 * External dependencies
 */
import { Card, CardBody } from '@finpress/components';
import { createElement } from '@finpress/element';
import { Story } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Badge, BadgeProps } from '../';

const Template: Story< BadgeProps > = ( args ) => (
	<Card>
		<CardBody>
			<Badge { ...args } />
		</CardBody>
	</Card>
);

export const Primary = Template.bind( {} );

Primary.args = {
	count: 15,
};

export default {
	title: 'Components/Badge',
	component: Badge,
};
