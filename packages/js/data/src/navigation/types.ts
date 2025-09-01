/**
 * External dependencies
 */
import { getPersistedQuery } from '@fincommerce/navigation';

// https://github.com/dieselfox1/fincommerce/blob/ecec9eaa76cb7b2e36f79175837b71f4f64996b1/plugins/fincommerce/src/Admin/Features/Navigation/Menu.php
export type MenuItem = {
	id: string;
	title: string;
	url: string;
	order: number;
	migrate: boolean;
	menuId: string;
	isCategory?: boolean;
	badge?: number;
	backButtonLabel?: string;
	parent?: string;
	capability?: string;
	matchExpression?: string;
};

export type NavigationState = {
	error: null | unknown;
	menuItems: MenuItem[];
	favorites: string[];
	requesting: {
		[ key: string ]: boolean | unknown;
	};
	persistedQuery: ReturnType< typeof getPersistedQuery >;
};
