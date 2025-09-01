/**
 * External dependencies
 */
import '@fincommerce/notices';
import { lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Notices from './notices';

const StoreAlerts = lazy(
	() => import( /* webpackChunkName: "store-alerts" */ './store-alerts' )
);

export const PrimaryLayout = ( {
	children,
	showStoreAlerts = true,
	showNotices = true,
}: {
	children?: React.ReactNode;
	showStoreAlerts?: boolean;
	showNotices?: boolean;
} ) => {
	return (
		<div
			className="fincommerce-layout__primary"
			id="fincommerce-layout__primary"
		>
			{ window.wcAdminFeatures[ 'store-alerts' ] && showStoreAlerts && (
				<Suspense fallback={ null }>
					<StoreAlerts />
				</Suspense>
			) }
			{ showNotices && <Notices /> }
			{ children }
		</div>
	);
};
