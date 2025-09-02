/**
 * External dependencies
 */
import { createElement, Fragment } from '@finpress/element';
import { TabPanel } from '@finpress/components';
import { addQueryArgs } from '@finpress/url';
import { useHistory, useLocation } from '@automattic/site-admin';

export const SectionTabs = ( {
	children,
	tabs = [],
	activeSection,
}: {
	children: React.ReactNode;
	tabs?: Array< {
		name: string;
		title: string;
	} >;
	activeSection?: string;
} ) => {
	const { navigate } = useHistory();
	const { query } = useLocation();
	const { tab, section } = query || {};

	if ( tabs.length <= 1 ) {
		return <div>{ children }</div>;
	}

	const onSelect = ( tabName: string ) => {
		if ( section === tabName ) {
			return;
		}

		const queryArgs =
			tabName === 'default'
				? {
						tab,
				  }
				: {
						tab,
						section: tabName,
				  };

		navigate( addQueryArgs( 'wc-settings', queryArgs ) );
	};

	return (
		<TabPanel
			className="fincommerce-settings-section-tabs"
			tabs={ tabs }
			onSelect={ onSelect }
			initialTabName={ activeSection || tabs[ 0 ].name }
		>
			{ () => <>{ children }</> }
		</TabPanel>
	);
};
