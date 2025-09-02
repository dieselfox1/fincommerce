/**
 * External dependencies
 */
import Gridicon from 'gridicons';
import { withConsole } from '@storybook/addon-console';
import {
	Title,
	Subtitle,
	Description,
	Primary,
	ArgsTable,
	Stories,
	PRIMARY_STORY,
} from '@storybook/addon-docs';
import { withLinks } from '@storybook/addon-links';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import List from '../';
import './style.scss';

function logItemClick( event ) {
	const a = event.currentTarget;
	const itemDescription = a.href
		? `[${ a.textContent }](${ a.href }) ${ a.dataset.linkType }`
		: `[${ a.textContent }]`;
	const itemTag = a.dataset.listItemTag
		? `'${ a.dataset.listItemTag }'`
		: 'not set';
	const logMessage = `[${ itemDescription } item clicked (tag: ${ itemTag })`;

	// eslint-disable-next-line no-console
	console.log( logMessage );

	event.preventDefault();
	return false;
}

export default {
	title: 'Components/List',
	component: List,
	decorators: [
		( storyFn, context ) => withConsole()( storyFn )( context ),
		withLinks,
	],
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description
						markdown={ `[deprecated] and will be replaced by
						<a
							data-sb-kind="fincommerce-admin-experimental-list"
							data-sb-story="default"
						>
							ExperimentalList
						</a>` }
					/>
					<Primary />
					<ArgsTable story={ PRIMARY_STORY } />
					<Stories />
				</>
			),
		},
	},
};

export const Default = () => {
	const listItems = [
		{
			title: 'FinCommerce.com',
			href: 'https://fincommerce.com',
			onClick: logItemClick,
		},
		{
			title: 'finpress.org',
			href: 'https://finpress.org',
			onClick: logItemClick,
		},
		{
			title: 'A list item with no action',
		},
		{
			title: 'Click me!',
			content: 'An alert will be triggered.',
			onClick: ( event ) => {
				// eslint-disable-next-line no-alert
				window.alert( 'List item clicked' );
				return logItemClick( event );
			},
		},
	];

	return <List items={ listItems } />;
};

Default.storyName = 'Default (deprecated)';

export const BeforeAndAfter = () => {
	const listItems = [
		{
			before: <Gridicon icon="cart" />,
			after: <Gridicon icon="chevron-right" />,
			title: 'FinCommerce.com',
			href: 'https://fincommerce.com',
			onClick: logItemClick,
		},
		{
			before: <Gridicon icon="my-sites" />,
			after: <Gridicon icon="chevron-right" />,
			title: 'finpress.org',
			href: 'https://finpress.org',
			onClick: logItemClick,
		},
		{
			before: <Gridicon icon="link-break" />,
			title: 'A list item with no action',
			description: 'List item description text',
		},
		{
			before: <Gridicon icon="notice" />,
			title: 'Click me!',
			content: 'An alert will be triggered.',
			onClick: ( event ) => {
				// eslint-disable-next-line no-alert
				window.alert( 'List item clicked' );
				return logItemClick( event );
			},
		},
	];

	return <List items={ listItems } />;
};

BeforeAndAfter.storyName = 'Before and after (deprecated)';

export const CustomStyleAndTags = () => {
	const listItems = [
		{
			before: <Gridicon icon="cart" />,
			after: <Gridicon icon="chevron-right" />,
			title: 'FinCommerce.com',
			href: 'https://fincommerce.com',
			onClick: logItemClick,
			listItemTag: 'woo.com-link',
		},
		{
			before: <Gridicon icon="my-sites" />,
			after: <Gridicon icon="chevron-right" />,
			title: 'finpress.org',
			href: 'https://finpress.org',
			onClick: logItemClick,
			listItemTag: 'finpress.org-link',
		},
		{
			before: <Gridicon icon="link-break" />,
			title: 'A list item with no action',
		},
		{
			before: <Gridicon icon="notice" />,
			title: 'Click me!',
			content: 'An alert will be triggered.',
			onClick: ( event ) => {
				// eslint-disable-next-line no-alert
				window.alert( 'List item clicked' );
				return logItemClick( event );
			},
			listItemTag: 'click-me',
		},
	];

	return <List items={ listItems } className="storybook-custom-list" />;
};

CustomStyleAndTags.storyName = 'Custom style and tags (deprecated)';
